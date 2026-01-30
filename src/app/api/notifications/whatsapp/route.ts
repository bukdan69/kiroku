import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { notificationLogs, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// WhatsApp Business Configuration
const WHATSAPP_API_URL = 'https://graph.facebook.com/v20.0'
const WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID!
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!

// Message Templates
const WHATSAPP_TEMPLATES = {
  PAYMENT_REMINDER: 'payment_reminder_7_days',
  PAYMENT_DUE_SOON: 'payment_due_soon', 
  PAYMENT_OVERDUE: 'payment_overdue',
  PAYMENT_SUCCESS: 'payment_success',
  WINNER_ANNOUNCEMENT: 'winner_announcement',
  KYC_APPROVED: 'kyc_approved',
  KYC_REJECTED: 'kyc_rejected',
  KYC_NEEDS_REVIEW: 'kyc_needs_review',
  GROUP_INVITATION: 'group_invitation',
  ARISAN_STARTING: 'arisan_starting',
  DRAW_RESULT: 'draw_result',
  VIOLATION_ALERT: 'violation_alert'
} as const

export async function POST(request: NextRequest) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { type, recipientPhone, templateName, variables, metadata } = body

    if (!type || !recipientPhone || !templateName) {
      return NextResponse.json({ 
        error: 'Missing required fields: type, recipientPhone, templateName' 
      }, { status: 400 })
    }

    // Get user's phone from database
    const userData = await db.select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1)

    const userPhone = userData[0]?.phone_number
    if (!userPhone) {
      return NextResponse.json({ 
        error: 'User phone number not found. Please update your profile.' 
      }, { status: 400 })
    }

    // Format Indonesian phone number
    const formattedPhone = userPhone.startsWith('0') 
      ? '62' + userPhone.substring(1) 
      : userPhone

    // Send WhatsApp message
    const result = await sendWhatsAppMessage(formattedPhone, templateName, variables, metadata)

    if (result.success) {
      // Log notification
      await db.insert(notificationLogs).values({
        id: crypto.randomUUID(),
        userId: user.id,
        type: getNotificationTypeFromTemplate(templateName),
        status: 'sent',
        title: getNotificationTitle(templateName),
        message: result.message,
        phoneNumber: formattedPhone,
        messageId: result.messageId,
        channel: 'whatsapp',
        metadata: { templateName, variables, ...metadata },
        sentAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      return NextResponse.json({ 
        message: 'WhatsApp notification sent successfully',
        messageId: result.messageId,
        data: result
      })
    } else {
      // Log failed notification
      await db.insert(notificationLogs).values({
        id: crypto.randomUUID(),
        userId: user.id,
        type: getNotificationTypeFromTemplate(templateName),
        status: 'failed',
        title: getNotificationTitle(templateName),
        message: 'Failed to send WhatsApp notification',
        phoneNumber: formattedPhone,
        errorMessage: result.error,
        channel: 'whatsapp',
        metadata: { templateName, variables, ...metadata },
        failedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      return NextResponse.json({ 
        error: result.error || 'Failed to send WhatsApp notification' 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('WhatsApp notification error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

async function sendWhatsAppMessage(
  recipientPhone: string, 
  templateName: string, 
  variables: Record<string, any>, 
  metadata: Record<string, any> = {}
) {
  try {
    // WhatsApp API call
    const response = await fetch(`${WHATSAPP_API_URL}/${WHATSAFP_BUSINESS_ACCOUNT_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipientPhone,
        type: 'template',
        template: {
          name: templateName,
          language: 'id',
          components: formatTemplateComponents(variables)
        }
      })
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: `WhatsApp API Error: ${response.statusText} - ${result.error?.message || 'Unknown error'}`
      }
    }

    return {
      success: true,
      messageId: result.messages?.[0]?.id,
      message: generateMessagePreview(templateName, variables),
      data: result
    }
  } catch (error) {
    console.error('WhatsApp API Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

function formatTemplateComponents(variables: Record<string, any>) {
  const components = []

  // Format variables for WhatsApp template
  Object.entries(variables).forEach(([key, value]) => {
    components.push({
      type: 'body',
      parameters: [{
        type: 'text',
        text: value.toString()
      }]
    })
  })

  return components
}

function getNotificationTypeFromTemplate(templateName: string): string {
  const typeMap: Record<string, string> = {
    [WHATSAPP_TEMPLATES.PAYMENT_REMINDER]: 'payment_reminder',
    [WHATSAPP_TEMPLATES.PAYMENT_DUE_SOON]: 'payment_reminder',
    [WHATSAPP_TEMPLATES.PAYMENT_OVERDUE]: 'payment_reminder',
    [WHATSAPP_TEMPLATES.PAYMENT_SUCCESS]: 'payout_notification',
    [WHATSAPP_TEMPLATES.WINNER_ANNOUNCEMENT]: 'winner_notification',
    [WHATSAPP_TEMPLATES.KYC_APPROVED]: 'kyc_status',
    [WHATSAPP_TEMPLATES.KYC_REJECTED]: 'kyc_status',
    [WHATSAPP_TEMPLATES.KYC_NEEDS_REVIEW]: 'kyc_status',
    [WHATSAPP_TEMPLATES.GROUP_INVITATION]: 'arisan_notification',
    [WHATSAPP_TEMPLATES.ARISAN_STARTING]: 'arisan_notification',
    [WHATSAPP_TEMPLATES.DRAW_RESULT]: 'draw_result',
    [WHATSAPP_TEMPLATES.VIOLATION_ALERT]: 'violation'
  }

  return typeMap[templateName] || 'arisan_notification'
}

function getNotificationTitle(templateName: string): string {
  const titleMap: Record<string, string> = {
    [WHATSAPP_TEMPLATES.PAYMENT_REMINDER]: 'Pengingatan Pembayaran',
    [WHATSAPP_TEMPLATES.PAYMENT_DUE_SOON]: 'Pengingatan Pembayaran Mendesak',
    [WHATSAPP_TEMPLATES.PAYMENT_OVERDUE]: 'Pembayaran Terlambat',
    [WHATSAPP_TEMPLATES.PAYMENT_SUCCESS]: 'Pembayaran Berhasil',
    [WHATSAPP_TEMPLATES.WINNER_ANNOUNCEMENT]: 'Selamat! Anda Menang!',
    [WHATSAPP_TEMPLATES.KYC_APPROVED]: 'Verifikasi Berhasil',
    [WHATSAPP_TEMPLATES.KYC_REJECTED]: 'Verifikasi Ditolak',
    [WHATSAPP_TEMPLATES.KYC_NEEDS_REVIEW]: 'KYC Perlu Review',
    [WHATSAPP_TEMPLATES.GROUP_INVITATION]: 'Undangan Grup Arisan',
    [WHATSAPP_TEMPLATES.ARISAN_STARTING]: 'Grup Arisan Dimulai',
    [WHATSAPP_TEMPLATES.DRAW_RESULT]: 'Hasil Undian Arisan',
    [WHATSAPP_TEMPLATES.VIOLATION_ALERT]: 'Peringatan Pelanggaran'
  }

  return titleMap[templateName] || 'Notifikasi Arisan'
}

function generateMessagePreview(templateName: string, variables: Record<string, any>): string {
  // Generate a readable message preview for logging
  switch (templateName) {
    case WHATSAPP_TEMPLATES.PAYMENT_REMINDER:
      return `Pengingatan pembayaran untuk periode ${variables.periode || 'n/a'}`
    case WHATSAPP_TEMPLATES.WINNER_ANNOUNCEMENT:
      return `Pemenang periode ${variables.periode || 'n/a'} telah ditentukan`
    case WHATSAPP_TEMPLATES.KYC_APPROVED:
      return `KYC telah disetujui untuk ${variables.userName || 'pengguna'}`
    default:
      return `Notifikasi dengan template ${templateName}`
  }
}