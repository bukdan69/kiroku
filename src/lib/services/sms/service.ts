/**
 * SMS Service
 * Unified interface for Twilio and AWS SNS
 */

import { smsConfig, SMSTemplate } from './config';

interface SMSParams {
  to: string; // Phone number in E.164 format (+62xxx)
  template: SMSTemplate;
  data: Record<string, any>;
}

interface SMSResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

class SMSService {
  private provider: string;

  constructor() {
    this.provider = smsConfig.provider;
  }

  /**
   * Send SMS using configured provider
   */
  async send(params: SMSParams): Promise<SMSResult> {
    try {
      // Validate phone number format
      if (!this.isValidPhoneNumber(params.to)) {
        throw new Error('Invalid phone number format. Use E.164 format (+62xxx)');
      }

      if (this.provider === 'twilio') {
        return await this.sendWithTwilio(params);
      } else if (this.provider === 'sns') {
        return await this.sendWithSNS(params);
      } else {
        throw new Error(`Unsupported SMS provider: ${this.provider}`);
      }
    } catch (error) {
      console.error('SMS send error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Send SMS using Twilio
   */
  private async sendWithTwilio(params: SMSParams): Promise<SMSResult> {
    const twilio = await import('twilio');
    const client = twilio.default(
      smsConfig.twilio.accountSid,
      smsConfig.twilio.authToken
    );

    const message = this.renderTemplate(params.template, params.data);

    const response = await client.messages.create({
      body: message,
      from: smsConfig.twilio.fromNumber,
      to: params.to,
    });

    return {
      success: true,
      messageId: response.sid,
    };
  }

  /**
   * Send SMS using AWS SNS
   */
  private async sendWithSNS(params: SMSParams): Promise<SMSResult> {
    const { SNSClient, PublishCommand } = await import('@aws-sdk/client-sns');
    
    const client = new SNSClient({
      region: smsConfig.sns.region,
      credentials: {
        accessKeyId: smsConfig.sns.accessKeyId,
        secretAccessKey: smsConfig.sns.secretAccessKey,
      },
    });

    const message = this.renderTemplate(params.template, params.data);

    const command = new PublishCommand({
      PhoneNumber: params.to,
      Message: message,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          DataType: 'String',
          StringValue: smsConfig.sns.senderId,
        },
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional',
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
   * Render SMS template with data
   */
  private renderTemplate(template: SMSTemplate, data: Record<string, any>): string {
    let message = smsConfig.templates[template];
    
    // Replace placeholders with data
    Object.keys(data).forEach(key => {
      const placeholder = `{${key}}`;
      message = message.replace(new RegExp(placeholder, 'g'), data[key]);
    });

    return message;
  }

  /**
   * Validate phone number format (E.164)
   */
  private isValidPhoneNumber(phone: string): boolean {
    // E.164 format: +[country code][number]
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    return e164Regex.test(phone);
  }

  /**
   * Format Indonesian phone number to E.164
   */
  formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Handle different formats
    if (cleaned.startsWith('62')) {
      // Already has country code
      return '+' + cleaned;
    } else if (cleaned.startsWith('0')) {
      // Remove leading 0 and add country code
      return '+62' + cleaned.substring(1);
    } else {
      // Add country code
      return '+62' + cleaned;
    }
  }

  /**
   * Send bulk SMS
   */
  async sendBulk(messages: SMSParams[]): Promise<SMSResult[]> {
    const results = await Promise.all(
      messages.map(msg => this.send(msg))
    );
    return results;
  }

  /**
   * Send OTP
   */
  async sendOTP(phone: string, code: string): Promise<SMSResult> {
    return this.send({
      to: this.formatPhoneNumber(phone),
      template: 'otp',
      data: { code },
    });
  }
}

// Export singleton instance
export const smsService = new SMSService();
