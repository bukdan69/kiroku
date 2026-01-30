import { WHATSAPP_CONFIG } from './config'
import { notificationLogs, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export class WhatsAppService {
  private accessToken: string
  private businessAccountId: string

  constructor() {
    this.accessToken = WHATSAPP_CONFIG.ACCESS_TOKEN
    this.businessAccountId = WHATSAPP_CONFIG.BUSINESS_ACCOUNT_ID
  }

  async sendPaymentReminder(
    userId: string,
    recipientPhone: string,
    deadline: Date,
    periode: string,
    amount: string,
    groupName: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.PAYMENT_REMINDER_7DAYS
    const variables = {
      deadline: this.formatDate(deadline),
      periode,
      amount,
      groupName
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'payment_reminder',
      deadline: deadline.toISOString(),
      periode,
      amount,
      groupName
    })
  }

  async sendPaymentDueSoon(
    userId: string,
    recipientPhone: string,
    deadline: Date,
    periode: string,
    amount: string,
    groupName: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.PAYMENT_DUE_SOON
    const variables = {
      deadline: this.formatDate(deadline),
      periode,
      amount,
      groupName
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'payment_due_soon',
      deadline: deadline.toISOString(),
      periode,
      amount,
      groupName
    })
  }

  async sendPaymentOverdue(
    userId: string,
    recipientPhone: string,
    deadline: Date,
    periode: string,
    amount: string,
    groupName: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.PAYMENT_OVERDUE
    const variables = {
      deadline: this.formatDate(deadline),
      periode,
      amount,
      groupName,
      daysOverdue: Math.ceil((Date.now() - deadline.getTime()) / (1000 * 60 * 60 * 24)).toString()
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'payment_overdue',
      deadline: deadline.toISOString(),
      periode,
      amount,
      groupName,
      daysOverdue: Math.ceil((Date.now() - deadline.getTime()) / (1000 * 60 * 60 * 24))
    })
  }

  async sendPaymentSuccess(
    userId: string,
    recipientPhone: string,
    amount: string,
    groupName: string,
    periode: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.PAYMENT_SUCCESS
    const variables = {
      amount,
      groupName,
      periode
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'payment_success',
      amount,
      groupName,
      periode
    })
  }

  async sendPaymentFailed(
    userId: string,
    recipientPhone: string,
    amount: string,
    groupName: string,
    periode: string,
    error: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.PAYMENT_FAILED
    const variables = {
      amount,
      groupName,
      periode,
      error
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'payment_failed',
      amount,
      groupName,
      periode,
      error
    })
  }

  async sendWinnerAnnouncement(
    userId: string,
    recipientPhone: string,
    userName: string,
    groupName: string,
    periode: string,
    prizeAmount: string,
    groupName2: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.WINNER_ANNOUNCEMENT
    const variables = {
      userName,
      groupName,
      periode,
      prizeAmount,
      groupName2: groupName2 || groupName
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'winner_announcement',
      userName,
      groupName,
      periode,
      prizeAmount
    })
  }

  async sendKycApproved(
    userId: string,
    recipientPhone: string,
    userName: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.KYC_APPROVED
    const variables = {
      userName
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'kyc_approved',
      userName
    })
  }

  async sendKycRejected(
    userId: string,
    recipientPhone: string,
    userName: string,
    reason: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.KYC_REJECTED
    const variables = {
      userName,
      reason: reason || 'Data tidak valid'
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'kyc_rejected',
      userName,
      reason
    })
  }

  async sendGroupInvitation(
    userId: string,
    recipientPhone: string,
    groupName: string,
    inviterName: string,
    inviteCode: string,
    maxParticipants: string,
    contributionAmount: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.GROUP_INVITATION
    const variables = {
      groupName,
      inviterName,
      inviteCode,
      maxParticipants,
      contributionAmount
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'group_invitation',
      groupName,
      inviterName,
      inviteCode,
      maxParticipants,
      contributionAmount
    })
  }

  async sendArisanStarting(
    userId: string,
    recipientPhone: string,
    groupName: string,
    startDate: string,
    contributionAmount: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.ARISAN_STARTING
    const variables = {
      groupName,
      startDate,
      contributionAmount
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'arisan_starting',
      groupName,
      startDate,
      contributionAmount
    })
  }

  async sendDrawResult(
    userId: string,
    recipientPhone: string,
    userName: string,
    groupName: string,
    periode: string,
    result: string,
    prize?: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.DRAW_RESULT
    const variables = {
      userName,
      groupName,
      periode,
      result,
      prize: prize || 'Rp 0'
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'draw_result',
      userName,
      groupName,
      periode,
      result,
      prize
    })
  }

  async sendViolationAlert(
    userId: string,
    recipientPhone: string,
    userName: string,
    violationType: string,
    groupName?: string,
    description: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.VIOLATION_ALERT
    const variables = {
      userName,
      violationType,
      groupName: groupName || '',
      description
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'violation_alert',
      userName,
      violationType,
      groupName,
      description
    })
  }

  async sendSystemAnnouncement(
    userId: string,
    recipientPhone: string,
    message: string
  ): Promise<boolean> {
    const template = WHATSAPP_CONFIG.TEMPLATES.SYSTEM_ANNOUNCEMENT
    const variables = {
      message
    }

    return this.sendTemplateMessage(userId, recipientPhone, template, variables, {
      type: 'system_announcement',
      message
    })
  }

  private async sendTemplateMessage(
    userId: string,
    recipientPhone: string,
    templateName: string,
    variables: Record<string, any>,
    metadata: Record<string, any> = {}
  ): Promise<boolean> {
    try {
      // Format Indonesian phone number
      const formattedPhone = this.formatIndonesianPhone(recipientPhone)
      
      // Create WhatsApp API request
      const response = await fetch(`${WHATSAPP_CONFIG.API_URL}/${WHATSAPP_CONFIG.BUSINESS_ACCOUNT_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'template',
          template: {
            name: templateName,
            language: 'id',
            components: this.formatTemplateComponents(variables)
          }
        })
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('WhatsApp API Error:', result)
        
        // Log failed notification
        await this.logNotification(userId, templateName, 'failed', formattedPhone, null, {
          error: result.error?.message || 'API Error',
          status: response.status
        })
        
        return false
      }

      // Log successful notification
      const messageId = result.messages?.[0]?.id
      await this.logNotification(userId, templateName, 'sent', formattedPhone, messageId, metadata)

      return true
    } catch (error) {
      console.error('WhatsApp Service Error:', error)
      
      // Log error
      await this.logNotification(userId, templateName, 'failed', formattedPhone, null, {
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      
      return false
    }
  }

  private formatIndonesianPhone(phone: string): string {
    // Remove any non-digit characters except +
    const cleaned = phone.replace(/\D/g, '')
    
    // Remove leading 0 and add Indonesian country code if needed
    if (cleaned.startsWith('0')) {
      return WHATSAPP_CONFIG.COUNTRY_CODE + cleaned.substring(1)
    }
    
    // If already starts with country code, return as is
    if (cleaned.startsWith(WHATSAPP_CONFIG.COUNTRY_CODE)) {
      return cleaned
    }
    
    // Default: assume Indonesian number
    return WHATSAPP_CONFIG.COUNTRY_CODE + cleaned
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  private async logNotification(
    userId: string,
    templateName: string,
    status: 'sent' | 'failed',
    phoneNumber: string,
    messageId: string | null,
    metadata: Record<string, any> = {},
    error?: string
  ): Promise<void> {
    try {
      // Import at runtime to avoid circular dependencies
      const { db } = await import('@/lib/db')
      const { notificationLogs } = await import('@/lib/db/schema')

      const title = this.getNotificationTitle(templateName)
      const type = this.getNotificationType(templateName)

      await db.insert(notificationLogs).values({
        id: crypto.randomUUID(),
        userId,
        type,
        status,
        title,
        message: this.generateMessagePreview(templateName, metadata),
        phoneNumber,
        messageId,
        channel: 'whatsapp',
        metadata: { templateName, ...metadata },
        errorMessage: error,
        sentAt: status === 'sent' ? new Date().toISOString() : undefined,
        failedAt: status === 'failed' ? new Date().toISOString() : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error logging notification:', error)
    }
  }

  private generateMessagePreview(templateName: string, variables: Record<string, any>): string {
    const previews: Record<string, string> = {
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_REMINDER_7DAYS]: `Pengingatan pembayaran untuk periode ${variables.periode || 'n/a'} - deadline: ${variables.deadline || 'n/a'}`,
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_DUE_SOON]: `Pembayaran akan jatuh tempo dalam 3 hari untuk periode ${variables.periode || 'n/a'}`,
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_OVERDUE]: `Pembayaran terlambat untuk periode ${variables.periode || 'n/a'} - terlambat ${variables.daysOverdue || 'n/a'} hari`,
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_SUCCESS]: `Pembayaran berhasil untuk ${variables.groupName || 'grup'} periode ${variables.periode || 'n/a'} sebesar ${variables.amount || 'Rp 0'}`,
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_FAILED]: `Pembayaran gagal: ${variables.error || 'error tidak diketahui'}`,
      [WHATSAPP_CONFIG.TEMPLATES.WINNER_ANNOUNCEMENT]: `🎉 Selamat ${variables.userName || 'pengguna'}! Anda adalah pemenang ${variables.groupName || 'grup'} periode ${variables.periode || 'n/a'} dengan hadiah ${variables.prize || 'Rp 0'}`,
      [WHATSAPP_CONFIG.TEMPLATES.KYC_APPROVED]: `✅ Verifikasi KYC berhasil untuk ${variables.userName || 'pengguna'}`,
      [WHATSAPP_CONFIG.TEMPLATES.KYC_REJECTED]: `❌ Verifikasi KYC ditolak untuk ${variables.userName || 'pengguna'}: ${variables.reason || 'Data tidak valid'}`,
      [WHATSAPP_CONFIG.TEMPLATES.GROUP_INVITATION]: `Undangan bergabung ${variables.groupName || 'grup'} - Kode: ${variables.inviteCode || 'n/a'}`,
      [WHATSAPP_CONFIG.TEMPLATES.ARISAN_STARTING]: `Grup ${variables.groupName || 'n/a'} dimulai - Pembayaran: ${variables.contributionAmount || 'Rp 0'}`,
      [WHATSAPP_CONFIG.TEMPLATES.DRAW_RESULT]: `Hasil undian ${variables.groupName || 'grup'} periode ${variables.periode || 'n/a'}: ${variables.result || 'n/a'}`,
      [WHATSAPP_CONFIG.TEMPLATES.VIOLATION_ALERT]: `⚠️ Pelanggaran: ${variables.violationType || 'Tidak diketahui'} - ${variables.description || 'Tidak ada keterangan'}`,
      [WHATSAPP_CONFIG.TEMPLATES.SYSTEM_ANNOUNCEMENT]: `📢 ${variables.message || 'Pengumuman sistem'}`
    }

    return previews[templateName] || `Notifikasi dengan template ${templateName}`
  }

  private getNotificationType(templateName: string): string {
    const typeMap: Record<string, string> = {
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_REMINDER_7DAYS]: 'payment_reminder',
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_DUE_SOON]: 'payment_reminder',
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_OVERDUE]: 'payment_reminder',
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_SUCCESS]: 'payout_notification',
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_FAILED]: 'payout_notification',
      [WHATSAPP_CONFIG.TEMPLATES.WINNER_ANNOUNCEMENT]: 'winner_notification',
      [WHATSAPP_CONFIG.TEMPLATES.KYC_SUBMITTED]: 'kyc_status',
      [WHATSAPP_CONFIG.TEMPLATES.KYC_APPROVED]: 'kyc_status',
      [WHATSAPP_CONFIG.TEMPLATES.KYC_REJECTED]: 'kyc_status',
      [WHATSAPP_CONFIG.TEMPLATES.GROUP_INVITATION]: 'arisan_notification',
      [WHATSAPP_CONFIG.TEMPLATES.ARISAN_STARTING]: 'arisan_notification',
      [WHATSAPP_CONFIG.TEMPLATES.DRAW_RESULT]: 'draw_result',
      [WHATSAPP_CONFIG.TEMPLATES.VIOLATION_ALERT]: 'violation',
      [WHATSAPP_CONFIG.TEMPLATES.SYSTEM_ANNOUNCEMENT]: 'system_notification'
    }

    return typeMap[templateName] || 'arisan_notification'
  }

  private getNotificationTitle(templateName: string): string {
    const titleMap: Record<string, string> = {
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_REMINDER_7DAYS]: 'Pengingatan Pembayaran (7 Hari)',
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_DUE_SOON]: 'Pengingatan Pembayaran (3 Hari)',
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_OVERDUE]: 'Pembayaran Terlambat',
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_SUCCESS]: 'Pembayaran Berhasil',
      [WHATSAPP_CONFIG.TEMPLATES.PAYMENT_FAILED]: 'Pembayaran Gagal',
      [WHATSAPP_CONFIG.TEMPLATES.WINNER_ANNOUNCEMENT]: '🎉 Selamat Anda Menang!',
      [WHATSAPP_CONFIG.TEMPLATES.KYC_SUBMITTED]: 'KYC Diajukan',
      [WHATSAPP_CONFIG.TEMPLATES.KYC_APPROVED]: 'KYC Disetujui',
      [WHATSAPP_CONFIG.TEMPLATES.KYC_REJECTED]: 'KYC Ditolak',
      [WHATSAPP_CONFIG.TEMPLATES.GROUP_INVITATION]: 'Undangan Grup Arisan',
      [WHATSAPP_CONFIG.TEMPLATES.ARISAN_STARTING]: 'Grup Arisan Dimulai',
      [WHATSAPP_CONFIG.TEMPLATES.DRAW_RESULT]: 'Hasil Undian Arisan',
      [WHATSAPP_CONFIG.TEMPLATES.VIOLATION_ALERT]: '⚠️ Pelanggaran Akun',
      [WHATSAPP_CONFIG.TEMPLATES.SYSTEM_ANNOUNCEMENT]: '📢 Pengumuman Sistem'
    }

    return titleMap[templateName] || 'Notifikasi Arisan'
  }
}