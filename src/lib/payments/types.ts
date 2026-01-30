// Payment Gateway Types
export type PaymentMethod = 'midtrans' | 'bank_transfer' | 'ewallet' | 'qris'
export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed' | 'cancelled' | 'refunded'
export type TransactionType = 'contribution' | 'fee' | 'payout' | 'refund'

export interface PaymentGateway {
  method: PaymentMethod
  status: PaymentStatus
  amount: number
  orderId: string
  transactionId?: string
  paymentUrl?: string
  vaNumber?: string
  expiryTime?: Date
  metadata?: Record<string, any>
}

export interface PaymentResult {
  success: boolean
  status: PaymentStatus
  payment?: PaymentGateway
  error?: string
  redirectUrl?: string
}

export interface TransactionRecord {
  id: string
  userId: string
  groupId?: string
  periodId?: string
  type: TransactionType
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  orderId: string
  transactionId?: string
  description: string
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
  processedAt?: Date
}