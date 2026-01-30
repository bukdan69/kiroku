// WhatsApp Business API Configuration
export const WHATSAPP_CONFIG = {
  // WhatsApp Business API
  API_URL: 'https://graph.facebook.com/v20.0',
  VERSION: 'v20.0',
  
  // WhatsApp Business Account (Perlu diisi di .env.local)
  BUSINESS_ACCOUNT_ID: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
  ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN || '',
  PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
  WEBHOOK_SECRET: process.env.WHATSAPP_WEBHOOK_SECRET || '',
  
  // Phone number formatting
  COUNTRY_CODE: '62', // Indonesia
  
  // Rate limiting
  MAX_MESSAGES_PER_MINUTE: 1000,
  MAX_MESSAGES_PER_HOUR: 10000,
  MAX_MESSAGES_PER_DAY: 100000,
  
  // Templates (Perlu approval dari Meta)
  TEMPLATES: {
    PAYMENT_REMINDER_7DAYS: 'payment_reminder_7_days',
    PAYMENT_REMINDER_3DAYS: 'payment_reminder_3_days',
    PAYMENT_REMINDER_1DAY: 'payment_reminder_1_day',
    PAYMENT_DUE_SOON: 'payment_due_soon',
    PAYMENT_OVERDUE: 'payment_overdue',
    PAYMENT_SUCCESS: 'payment_success',
    PAYMENT_FAILED: 'payment_failed',
    WINNER_ANNOUNCEMENT: 'winner_announcement',
    KYC_SUBMITTED: 'kyc_submitted',
    KYC_APPROVED: 'kyc_approved',
    KYC_REJECTED: 'kyc_rejected',
    GROUP_INVITATION: 'group_invitation',
    ARISAN_STARTING: 'arisan_starting',
    DRAW_RESULT: 'draw_result',
    VIOLATION_ALERT: 'violation_alert',
    SYSTEM_ANNOUNCEMENT: 'system_announcement'
  },
  
  // Business verification
  IS_VERIFIED_BUSINESS: process.env.WHATSAPP_VERIFIED_BUSINESS === 'true',
  
  // Webhook URLs (sesuaikan dengan deployment)
  WEBHOOK_URL: process.env.WHATSAPP_WEBHOOK_URL || '',
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // milliseconds
} as const

export interface WhatsAppMessage {
  to: string
  type: 'template'
  template: {
    name: string
    language: string
    components: WhatsAppTemplateComponent[]
  }
}

export interface WhatsAppTemplateComponent {
  type: 'header' | 'body' | 'footer' | 'buttons'
  parameters: WhatsAppTemplateParameter[]
}

export interface WhatsAppTemplateParameter {
  type: 'text' | 'currency' | 'date_time' | 'image'
  text: string
  currency?: {
    code: string
    amount_1000: number
    fallback_value: string
  }
  date_time?: string
  image?: {
    link: string
    provider: {
      name: string
      url: string
      [key: string]: any
    }
}

export interface WhatsAppResponse {
  messaging_product: string
  contacts: any[]
  messages: WhatsAppMessageResponse[]
  error?: {
    message: string
    type: string
    code: number
    error_data: any
  }
  status: string
}

export interface WhatsAppMessageResponse {
  id: string
  status: string
  timestamp: string
  direction: string
  message_status?: string
}

export interface WhatsAppWebhookPayload {
  object: string
  entry: WhatsAppWebhookEntry[]
}

export interface WhatsAppWebhookEntry {
  id: string
  changes: WhatsAppWebhookChange[]
}

export interface WhatsAppWebhookChange {
  field: string
  value: WhatsAppWebhookMessage
}

export interface WhatsAppWebhookMessage {
  from: string
  id: string
  timestamp: string
  type: string
  conversation: {
    id: string
  expiration_timestamp?: string
    status?: string
  text?: string
  update?: WhatsAppWebhookMessageUpdate
  }
  metadata?: any
}

export interface WhatsAppWebhookMessageUpdate {
  status?: string
  read_receipt?: {
    read_timestamp: string
    message_id: string
  }
}