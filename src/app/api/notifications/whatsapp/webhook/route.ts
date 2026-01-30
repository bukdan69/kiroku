// WhatsApp Business Webhook Handler
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { WHATSAPP_CONFIG } from '@/lib/services/whatsapp/config'
import { notificationLogs, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-hub-signature-256')
    const hubMode = request.headers.get('x-hub-mode')

    // Verify webhook signature
    if (!signature || !hubMode) {
      return NextResponse.json({ error: 'Missing required headers' }, { status: 400 })
    }

    if (hubMode === 'verify') {
      // Return challenge for webhook verification
      const challenge = request.headers.get('x-hub-challenge')
      if (challenge) {
        const hashed = crypto
          .createHmac('sha256', challenge)
          .update(WHATSAPP_CONFIG.WEBHOOK_SECRET)
          .digest('hex')
        
        return new NextResponse(hashed, { status: 200 })
      }
      
      return NextResponse.json({ error: 'No challenge found' }, { status: 400 })
    }

    if (hubMode !== 'notifications') {
      return NextResponse.json({ error: 'Invalid hub mode' }, { status: 400 })
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', body)
      .update(WHATSAPP_CONFIG.WEBHOOK_SECRET)
      .digest('hex')

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Process webhook payload
    const payload = JSON.parse(body)
    
    // Check if this is a WhatsApp message
    if (payload.object === 'whatsapp_business_account' && payload.entry) {
      const entry = payload.entry[0]
      
      if (entry.changes && entry.changes[0]) {
        const change = entry.changes[0]
        
        if (change.field === 'messages' && change.value?.messages) {
          const message = change.value.messages[0]
          
          // Handle message status updates
          if (message.statuses) {
            const messageId = message.id
            const status = message.statuses[0].status
            
            if (message.statuses[0].status === 'sent') {
              await updateNotificationStatus(messageId, 'delivered', status?.timestamp)
            } else if (message.statuses[0].status === 'failed') {
              const errorMessage = message.statuses[0]?.error?.message || 'Unknown error'
              await updateNotificationStatus(messageId, 'failed', status?.timestamp, errorMessage)
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function updateNotificationStatus(
  messageId: string,
  status: string,
  timestamp?: string,
  errorMessage?: string
): Promise<void> {
  try {
    // Import at runtime to avoid circular dependencies
    const { db } = await import('@/lib/db')
    const { notificationLogs } = await import('@/lib/db/schema')

    await db.update(notificationLogs)
      .set({
        status: status === 'delivered' ? 'delivered' : 'failed',
        deliveredAt: status === 'delivered' ? new Date(timestamp || Date.now()).toISOString() : undefined,
        failedAt: status === 'failed' ? new Date(timestamp || Date.now()).toISOString() : undefined,
        errorMessage: errorMessage,
        updatedAt: new Date().toISOString()
      })
      .where(eq(notificationLogs.messageId, messageId))
  } catch (error) {
    console.error('Error updating notification status:', error)
  }
}