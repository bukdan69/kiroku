/**
 * SMS Service Configuration
 * Supports Twilio and AWS SNS
 */

export const smsConfig = {
  provider: process.env.SMS_PROVIDER || 'twilio', // 'twilio' or 'sns'
  
  // Twilio
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    fromNumber: process.env.TWILIO_FROM_NUMBER || '',
  },
  
  // AWS SNS
  sns: {
    region: process.env.AWS_REGION || 'ap-southeast-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    senderId: process.env.AWS_SNS_SENDER_ID || 'Kiroku',
  },
  
  // SMS templates
  templates: {
    otp: 'Kode OTP Kiroku Anda: {code}. Berlaku 5 menit.',
    payment_reminder: 'Pengingat: Pembayaran arisan {groupName} jatuh tempo {dueDate}. Jumlah: Rp {amount}',
    payment_received: 'Pembayaran arisan {groupName} sebesar Rp {amount} telah diterima. Terima kasih!',
    winner_selected: 'Selamat! Anda terpilih sebagai pemenang arisan {groupName}. Dana Rp {amount} akan segera ditransfer.',
    payout_processed: 'Dana kemenangan Rp {amount} telah ditransfer ke rekening Anda. Silakan cek.',
    kyc_approved: 'KYC Anda disetujui! Anda sekarang dapat menggunakan semua fitur Kiroku.',
    kyc_rejected: 'KYC Anda ditolak. Alasan: {reason}. Silakan submit ulang.',
  },
};

export type SMSTemplate = keyof typeof smsConfig.templates;
