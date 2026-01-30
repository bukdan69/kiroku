import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { WhatsAppService } from '@/lib/services/whatsapp/service'
import { db } from '@/lib/db'
import { users, paymentIntents, arisanPeriods } from '@/lib/db/schema'
import { eq, lt, and } from 'drizzle-orm'
import { addDays, startOfDay } from 'date-fns'

// Automated notification scheduling
const NOTIFICATION_SCHEDULES = {
  PAYMENT_REMINDER_7DAYS: { daysBeforeDeadline: 7, time: '09:00' },
  PAYMENT_REMINDER_3DAYS: { daysBeforeDeadline: 3, time: '09:00' },
  PAYMENT_REMINDER_1DAY: { daysBeforeDeadline: 1, time: '09:00' },
  PAYMENT_OVERDUE: { daysAfterDeadline: 1, time: '09:00' },
  DRAW_REMINDER: { hoursBeforeDeadline: 24, time: '14:00' }
}

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { type, groupId, periodId, force } = await request.json()

    if (!type || !groupId) {
      return NextResponse.json({ 
        error: 'Missing required fields: type, groupId' 
      }, { status: 400 })
    }

    // Get group and period details
    const [group] = await db.select()
      .from(arisanGroups)
      .where(eq(arisanGroups.id, groupId))
      .limit(1)

    const [period] = await db.select()
      .from(arisanPeriods)
      .where(eq(arisanPeriods.id, periodId))
      .limit(1)

    if (group.length === 0 || period.length === 0) {
      return NextResponse.json({ error: 'Group or period not found' }, { status: 404 })
    }

    const whatsappService = new WhatsAppService()

    switch (type) {
      case 'payment_reminder':
        await handlePaymentReminder(user.id, group[0], period[0], whatsappService)
        break

      case 'payment_due':
        await handlePaymentDue(user.id, group[0], period[0], whatsappService)
        break

      case 'payment_overdue':
        await handlePaymentOverdue(user.id, group[0], period[0], whatsappService)
        break

      case 'draw_reminder':
        await handleDrawReminder(user.id, group[0], period[0], whatsappService)
        break

      default:
        return NextResponse.json({ error: 'Invalid notification type' }, { status: 400 })
    }

    return NextResponse.json({ 
      message: 'Notification scheduled successfully',
      type
    })
  } catch (error) {
    console.error('Scheduling error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handlePaymentReminder(
  userId: string,
  group: any,
  period: any,
  whatsappService: WhatsAppService
) {
  if (!period.paymentDeadline) {
    return
  }

  // Check if reminder has already been sent
  const [notificationLog] = await db.select()
    .from(notificationLogs)
    .where(and(
      eq(notificationLogs.userId, userId),
      eq(notificationLogs.type, 'payment_reminder'),
      eq(notificationLogs.templateName, getTemplateName(period.paymentDeadline, '7_days'))
    ))
    .limit(1)

  if (notificationLog.length > 0) {
    return
  }

  await whatsappService.sendPaymentReminder(
    userId,
    getPhoneNumber(userId),
    period.paymentDeadline,
    period.periodNumber.toString(),
    group.contributionAmount,
    group.name
  )
}

async function handlePaymentDue(
  userId: string,
  group: any,
  period: any,
  whatsappService: WhatsAppService
) {
  if (!period.paymentDeadline) {
    return
  }

  await whatsappService.sendPaymentDueSoon(
    userId,
    getPhoneNumber(userId),
    period.paymentDeadline,
    period.periodNumber.toString(),
    group.contributionAmount,
    group.name
  )
}

async function handlePaymentOverdue(
  userId: string,
  group: any,
  period: any,
  whatsappService: WhatsAppService
) {
  if (!period.paymentDeadline) {
    return
  }

  await whatsappService.sendPaymentOverdue(
    userId,
    getPhoneNumber(userId),
    period.paymentDeadline,
    period.periodNumber.toString(),
    group.contributionAmount,
    group.name
  )
}

async function handleDrawReminder(
  userId: string,
  group: any,
  period: any,
  whatsappService: WhatsAppService
) {
  await whatsappService.sendSystemAnnouncement(
    userId,
    getPhoneNumber(userId),
    `📢 PENGINGATAN: Undian arisan ${group.name} periode ${period.periodNumber} akan dilakukan besok pukul ${startOfDay(addDays(period.drawDate || new Date(), 1)).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}. Pastikan semua anggota telah membayar dan login 24 jam sebelum undian.`
  )
}

function getTemplateName(deadline: Date, days: number): string {
  if (days === 7) return 'payment_reminder_7_days'
  if (days === 3) return 'payment_reminder_3_days'
  if (days === 1) return 'payment_reminder_1_day'
  if (days === -1) return 'payment_overdue' // past due
  return 'payment_reminder_7_days'
}

function getPhoneNumber(userId: string): string {
  // This would get the user's phone number from the users table
  // For now, return a placeholder
  return '62812345678'
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const type = searchParams.get('type')

  if (!userId || !type) {
    return NextResponse.json({ error: 'Missing userId or type parameter' }, { status: 400 })
  }

  try {
    // Get user's notification preferences
    // This would check user preferences table
    const preferences = {
      paymentReminders: true,
      winnerNotifications: true,
      kycUpdates: true,
      arisanNotifications: true
    }

    return NextResponse.json({ preferences })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}