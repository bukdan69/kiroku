import { NextRequest, NextResponse } from 'next/server'
import { WhatsAppService } from '@/lib/services/whatsapp/service'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const templateName = searchParams.get('template')
  
  if (!templateName) {
    return NextResponse.json({ 
      error: 'Template name is required' 
    }, { status: 400 })
  }

  try {
    const whatsappService = new WhatsAppService()

    // Return template preview with sample data
    const preview = generateTemplatePreview(templateName)
    
    return NextResponse.json({ 
      templateName,
      preview,
      description: getTemplateDescription(templateName)
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateTemplatePreview(templateName: string): any {
  const whatsappService = new WhatsAppService()
  
  const previews: Record<string, any> = {
    'payment_reminder_7_days': {
      userName: 'John Doe',
      groupName: 'Arisan Family',
      periode: '3',
      amount: 'Rp 500.000',
      deadline: '2024-02-15'
    },
    'payment_due_soon': {
      userName: 'Jane Smith',
      groupName: 'Arisan Bisnis',
      periode: '2',
      amount: 'Rp 1.000.000',
      deadline: '2024-02-20'
    },
    'payment_overdue': {
      userName: 'Bob Johnson',
      groupName: 'Arisan Karyawan',
      periode: '1',
      amount: 'Rp 750.000',
      deadline: '2024-02-10',
      daysOverdue: '5'
    },
    'payment_success': {
      userName: 'Alice Brown',
      groupName: 'Arisan Teman',
      periode: '2',
      amount: 'Rp 1.000.000'
    },
    'payment_failed': {
      userName: 'Charlie Davis',
      groupName: 'Arisan Komunitas',
      amount: 'Rp 500.000',
      error: 'Payment gateway timeout'
    },
    'winner_announcement': {
      userName: 'Diana Prince',
      groupName: 'Arisan Kampung',
      periode: '4',
      prizeAmount: 'Rp 4.000.000',
      groupName2: 'Arisan Sejahtera',
    },
    'kyc_approved': {
      userName: 'Eve Wilson'
    },
    'kyc_rejected': {
      userName: 'Frank Miller',
      reason: 'Photo KTP tidak jelas'
    },
    'group_invitation': {
      userName: 'Grace Lee',
      groupName: 'Arisan Keluarga',
      inviteCode: 'ABC123',
      inviterName: 'Henry Chen',
      maxParticipants: '10',
      contributionAmount: 'Rp 250.000'
    },
    'arisan_starting': {
      groupName: 'Arisan Sahabat',
      startDate: '2024-02-01',
      contributionAmount: 'Rp 300.000'
    },
    'draw_result': {
      userName: 'Ivy Johnson',
      groupName: 'Arisan RT',
      periode: '2',
      result: 'menang',
      prize: 'Rp 3.500.000'
    },
    'violation_alert': {
      userName: 'Jack Brown',
      violationType: 'Late Payment',
      groupName: 'Arisan Office',
      description: 'Pembayaran periode 1 terlambat 5 hari'
    },
    'system_announcement': {
      message: '🚀 Sistem akan down untuk maintenance pada 1 Februari 2024 pukul 22:00 - 23:00 WIB'
    }
  }

  return previews[templateName] || { templateName, preview: 'Template not found', description: 'No description available' }
}

function getTemplateDescription(templateName: string): string {
  const descriptions: Record<string, string> = {
    'payment_reminder_7_days': 'Pengingatan pembayaran 7 hari sebelum deadline',
    'payment_due_soon': 'Pengingatan pembayaran akan jatuh tempo',
    'payment_overdue': 'Pengingatan pembayaran terlambat',
    'payment_success': 'Konfirmasi pembayaran berhasil',
    'payment_failed': 'Pemberitahuan pembayaran gagal',
    'winner_announcement': 'Pengumuman pemenang arisan',
    'kyc_approved': 'Konfirmasi KYC disetujui',
    'kyc_rejected': 'Pemberitahuan KYC ditolak',
    'group_invitation': 'Undangan bergabung grup arisan',
    'arisan_starting': 'Pengumuman dimulainya grup arisan',
    'draw_result': 'Hasil undian arisan',
    'violation_alert': 'Peringatan pelanggaran arisan',
    'system_announcement': 'Pengumuman sistem'
  }

  return descriptions[templateName] || 'Template description not available'
}