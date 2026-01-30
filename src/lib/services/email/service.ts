/**
 * Email Service
 * Unified interface for SendGrid and AWS SES
 */

import { emailConfig, EmailTemplate } from './config';

interface EmailParams {
  to: string;
  subject: string;
  template: EmailTemplate;
  data: Record<string, any>;
  cc?: string[];
  bcc?: string[];
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

class EmailService {
  private provider: string;

  constructor() {
    this.provider = emailConfig.provider;
  }

  /**
   * Send email using configured provider
   */
  async send(params: EmailParams): Promise<EmailResult> {
    try {
      if (this.provider === 'sendgrid') {
        return await this.sendWithSendGrid(params);
      } else if (this.provider === 'ses') {
        return await this.sendWithSES(params);
      } else {
        throw new Error(`Unsupported email provider: ${this.provider}`);
      }
    } catch (error) {
      console.error('Email send error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Send email using SendGrid
   */
  private async sendWithSendGrid(params: EmailParams): Promise<EmailResult> {
    const sgMail = await import('@sendgrid/mail');
    sgMail.default.setApiKey(emailConfig.sendgrid.apiKey);

    const html = this.renderTemplate(params.template, params.data);

    const msg = {
      to: params.to,
      from: {
        email: emailConfig.sendgrid.fromEmail,
        name: emailConfig.sendgrid.fromName,
      },
      subject: params.subject,
      html,
      cc: params.cc,
      bcc: params.bcc,
    };

    const [response] = await sgMail.default.send(msg);
    
    return {
      success: true,
      messageId: response.headers['x-message-id'] as string,
    };
  }

  /**
   * Send email using AWS SES
   */
  private async sendWithSES(params: EmailParams): Promise<EmailResult> {
    const { SESClient, SendEmailCommand } = await import('@aws-sdk/client-ses');
    
    const client = new SESClient({
      region: emailConfig.ses.region,
      credentials: {
        accessKeyId: emailConfig.ses.accessKeyId,
        secretAccessKey: emailConfig.ses.secretAccessKey,
      },
    });

    const html = this.renderTemplate(params.template, params.data);

    const command = new SendEmailCommand({
      Source: `${emailConfig.ses.fromName} <${emailConfig.ses.fromEmail}>`,
      Destination: {
        ToAddresses: [params.to],
        CcAddresses: params.cc,
        BccAddresses: params.bcc,
      },
      Message: {
        Subject: {
          Data: params.subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: html,
            Charset: 'UTF-8',
          },
        },
      },
    });

    const response = await client.send(command);
    
    return {
      success: true,
      messageId: response.MessageId,
    };
  }

  /**
   * Render email template with data
   */
  private renderTemplate(template: EmailTemplate, data: Record<string, any>): string {
    // Template rendering logic
    const templates: Record<EmailTemplate, (data: any) => string> = {
      welcome: (d) => `
        <h1>Selamat Datang di Kiroku!</h1>
        <p>Halo ${d.name},</p>
        <p>Terima kasih telah bergabung dengan Kiroku. Kami senang Anda menjadi bagian dari komunitas kami.</p>
        <p>Mulai kelola arisan Anda dengan mudah dan aman.</p>
        <a href="${d.dashboardUrl}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Buka Dashboard</a>
      `,
      
      kyc_approved: (d) => `
        <h1>KYC Anda Disetujui!</h1>
        <p>Halo ${d.name},</p>
        <p>Verifikasi identitas Anda telah disetujui. Anda sekarang dapat menggunakan semua fitur Kiroku.</p>
        <a href="${d.dashboardUrl}">Buka Dashboard</a>
      `,
      
      kyc_rejected: (d) => `
        <h1>KYC Anda Ditolak</h1>
        <p>Halo ${d.name},</p>
        <p>Maaf, verifikasi identitas Anda ditolak dengan alasan: ${d.reason}</p>
        <p>Silakan submit ulang dengan dokumen yang benar.</p>
        <a href="${d.kycUrl}">Submit Ulang KYC</a>
      `,
      
      payment_reminder: (d) => `
        <h1>Pengingat Pembayaran Arisan</h1>
        <p>Halo ${d.name},</p>
        <p>Ini adalah pengingat untuk pembayaran arisan Anda:</p>
        <ul>
          <li>Grup: ${d.groupName}</li>
          <li>Jumlah: Rp ${d.amount.toLocaleString('id-ID')}</li>
          <li>Jatuh Tempo: ${d.dueDate}</li>
        </ul>
        <a href="${d.paymentUrl}">Bayar Sekarang</a>
      `,
      
      payment_received: (d) => `
        <h1>Pembayaran Diterima</h1>
        <p>Halo ${d.name},</p>
        <p>Pembayaran Anda telah diterima:</p>
        <ul>
          <li>Grup: ${d.groupName}</li>
          <li>Jumlah: Rp ${d.amount.toLocaleString('id-ID')}</li>
          <li>Tanggal: ${d.date}</li>
        </ul>
        <p>Terima kasih!</p>
      `,
      
      winner_selected: (d) => `
        <h1>Selamat! Anda Terpilih sebagai Pemenang!</h1>
        <p>Halo ${d.name},</p>
        <p>Anda terpilih sebagai pemenang undian arisan:</p>
        <ul>
          <li>Grup: ${d.groupName}</li>
          <li>Periode: ${d.period}</li>
          <li>Jumlah: Rp ${d.amount.toLocaleString('id-ID')}</li>
        </ul>
        <p>Dana akan segera ditransfer ke rekening Anda.</p>
      `,
      
      payout_processed: (d) => `
        <h1>Dana Telah Ditransfer</h1>
        <p>Halo ${d.name},</p>
        <p>Dana kemenangan Anda telah ditransfer:</p>
        <ul>
          <li>Jumlah: Rp ${d.amount.toLocaleString('id-ID')}</li>
          <li>Bank: ${d.bankName}</li>
          <li>Rekening: ${d.accountNumber}</li>
          <li>Tanggal: ${d.date}</li>
        </ul>
        <p>Silakan cek rekening Anda.</p>
      `,
      
      group_invitation: (d) => `
        <h1>Undangan Bergabung Grup Arisan</h1>
        <p>Halo ${d.name},</p>
        <p>${d.inviterName} mengundang Anda untuk bergabung dengan grup arisan:</p>
        <ul>
          <li>Nama Grup: ${d.groupName}</li>
          <li>Iuran: Rp ${d.amount.toLocaleString('id-ID')}</li>
          <li>Periode: ${d.period}</li>
        </ul>
        <a href="${d.inviteUrl}">Terima Undangan</a>
      `,
      
      affiliate_approved: (d) => `
        <h1>Affiliate Anda Disetujui!</h1>
        <p>Halo ${d.name},</p>
        <p>Selamat! Pendaftaran affiliate Anda telah disetujui.</p>
        <p>Mulai dapatkan komisi dengan membagikan link referral Anda:</p>
        <p><strong>${d.referralLink}</strong></p>
        <a href="${d.dashboardUrl}">Lihat Dashboard Affiliate</a>
      `,
      
      withdrawal_approved: (d) => `
        <h1>Penarikan Dana Disetujui</h1>
        <p>Halo ${d.name},</p>
        <p>Permintaan penarikan dana Anda telah disetujui:</p>
        <ul>
          <li>Jumlah: Rp ${d.amount.toLocaleString('id-ID')}</li>
          <li>Bank: ${d.bankName}</li>
          <li>Rekening: ${d.accountNumber}</li>
        </ul>
        <p>Dana akan ditransfer dalam 1-3 hari kerja.</p>
      `,
      
      withdrawal_rejected: (d) => `
        <h1>Penarikan Dana Ditolak</h1>
        <p>Halo ${d.name},</p>
        <p>Maaf, permintaan penarikan dana Anda ditolak dengan alasan: ${d.reason}</p>
        <p>Silakan hubungi support untuk informasi lebih lanjut.</p>
      `,
    };

    return templates[template](data);
  }

  /**
   * Send bulk emails
   */
  async sendBulk(emails: EmailParams[]): Promise<EmailResult[]> {
    const results = await Promise.all(
      emails.map(email => this.send(email))
    );
    return results;
  }
}

// Export singleton instance
export const emailService = new EmailService();
