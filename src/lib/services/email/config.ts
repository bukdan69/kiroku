/**
 * Email Service Configuration
 * Supports SendGrid and AWS SES
 */

export const emailConfig = {
  provider: process.env.EMAIL_PROVIDER || 'sendgrid', // 'sendgrid' or 'ses'
  
  // SendGrid
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || '',
    fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@kiroku.app',
    fromName: process.env.SENDGRID_FROM_NAME || 'Kiroku',
  },
  
  // AWS SES
  ses: {
    region: process.env.AWS_REGION || 'ap-southeast-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    fromEmail: process.env.AWS_SES_FROM_EMAIL || 'noreply@kiroku.app',
    fromName: process.env.AWS_SES_FROM_NAME || 'Kiroku',
  },
  
  // Email templates
  templates: {
    welcome: 'welcome',
    kyc_approved: 'kyc_approved',
    kyc_rejected: 'kyc_rejected',
    payment_reminder: 'payment_reminder',
    payment_received: 'payment_received',
    winner_selected: 'winner_selected',
    payout_processed: 'payout_processed',
    group_invitation: 'group_invitation',
    affiliate_approved: 'affiliate_approved',
    withdrawal_approved: 'withdrawal_approved',
    withdrawal_rejected: 'withdrawal_rejected',
  },
};

export type EmailTemplate = keyof typeof emailConfig.templates;
