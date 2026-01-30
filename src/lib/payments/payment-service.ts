import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { users, arisanGroups, arisanPeriodParticipants, transactions } from '@/lib/db/schema'
import { eq, and, desc, asc, count } from 'drizzle-orm'
import { paymentGateway } from '@/lib/payments/midtrans-gateway'
import { PaymentMethod, TransactionType, TransactionRecord } from '@/lib/payments/payment-service'

// Transaction Database Schema
interface CreateTransactionData {
  userId: string
  groupId?: string
  periodId?: string
  amount: number
  method: PaymentMethod
  type: TransactionType
  description: string
  orderId: string
  transactionId?: string
  status: 'pending' | 'processing' | 'success' | 'failed' | 'cancelled' | 'refunded'
  metadata?: Record<string, any>
}

// Payment Processing Service
export class PaymentService {
  // Create contribution payment
  async createContributionPayment(data: {
    userId: string
    groupId: string
    amount: number
    method: PaymentMethod
    periodId: string
  }) {
    const supabase = await createServerClient()
    const orderId = `TRX-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`

    try {
      // Get user details for customer info
      const { data: user } = await supabase
        .from('users')
        .select('name, email, phone')
        .eq('id', data.userId)
        .single()

      if (!user) {
        return {
          success: false,
          status: 'failed',
          error: 'User not found'
        }
      }

      // Create Midtrans transaction
      const result = await paymentGateway.createTransaction(
        data.amount,
        orderId,
        {
          name: user.name || 'User',
          email: user.email || '',
          phone: user.phone || ''
        },
        [{
          id: `CONTRIBUTION-${data.periodId}`,
          price: data.amount,
          quantity: 1,
          name: `Kontribusi Periode ${data.periodId}`
        }],
        `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback?orderId=${orderId}`
      )

      if (!result.success) {
        return {
          success: false,
          status: 'failed',
          error: result.error || 'Failed to create payment transaction'
        }
      }

      // Save transaction to database
      const transactionData: CreateTransactionData = {
        userId: data.userId,
        groupId: data.groupId,
        periodId: data.periodId,
        amount: data.amount,
        method: data.method,
        type: 'contribution',
        description: `Kontribusi arisan untuk periode ${data.periodId}`,
        orderId,
        transactionId: result.payment?.transactionId,
        status: 'pending',
        metadata: result.payment?.metadata
      }

      const [transaction] = await db.insert(transactions).values(transactionData).returning()

      return {
        success: true,
        status: 'pending',
        data: transaction,
        payment: result.payment
      }
    } catch (error) {
      console.error('Payment creation error:', error)
      return {
        success: false,
        status: 'failed',
        error: 'Failed to process payment'
      }
    }
  }

  // Process payment callback
  async processPaymentCallback(orderId: string, transactionId: string, status: string) {
    try {
      // Update transaction status
      const paymentStatus = status === 'capture' || status === 'settlement' ? 'success' : 'failed'
      
      const [transaction] = await db
        .update(transactions)
        .set({ 
          status: paymentStatus,
          processedAt: new Date()
        })
        .where(eq(transactions.orderId, orderId))
        .returning()

      if (transaction.length === 0) {
        return {
          success: false,
          error: 'Transaction not found'
        }
      }

      // If payment successful, update participant payment status
      if (paymentStatus === 'success') {
        await db
          .update(arisanPeriodParticipants)
          .set({ 
            hasPaid: true,
            paidAt: new Date()
          })
          .where(and(
            eq(arisanPeriodParticipants.periodId, transaction[0].periodId!),
            eq(arisanPeriodParticipants.userId, transaction[0].userId!)
          ))
      }

      // Send payment confirmation notification
      if (paymentStatus === 'success') {
        await this.sendPaymentConfirmation(transaction[0])
      }

      return {
        success: true,
        status: paymentStatus,
        data: transaction[0]
      }
    } catch (error) {
      console.error('Payment callback error:', error)
      return {
        success: false,
        error: 'Failed to process payment callback'
      }
    }
  }

  // Get user transactions
  async getUserTransactions(userId: string, limit = 10, offset = 0) {
    try {
      const userTransactions = await db
        .select()
        .from(transactions)
        .where(eq(transactions.userId, userId))
        .orderBy(desc(transactions.createdAt))
        .limit(limit)
        .offset(offset)

      return {
        success: true,
        data: userTransactions,
        pagination: { page: Math.floor(offset / limit) + 1, limit, total: userTransactions.length }
      }
    } catch (error) {
      console.error('Get transactions error:', error)
      return {
        success: false,
        error: 'Failed to get transactions'
      }
    }
  }

  // Get transaction by ID
  async getTransactionById(transactionId: string) {
    try {
      const [transaction] = await db
        .select()
        .from(transactions)
        .where(eq(transactions.id, transactionId))
        .limit(1)

      return {
        success: true,
        data: transaction[0] || null
      }
    } catch (error) {
      console.error('Get transaction error:', error)
      return {
        success: false,
        error: 'Failed to get transaction'
      }
    }
  }

  // Generate alternative payment methods
  async generateAlternativePayment(orderId: string, amount: number, method: 'bank_transfer' | 'ewallet' | 'qris') {
    if (method === 'bank_transfer') {
      return paymentGateway.generateBankTransferInstructions(orderId, amount)
    } else if (method === 'ewallet') {
      const provider = 'gopay' // Default to GoPay
      return paymentGateway.generateEWalletInstructions(orderId, amount, provider)
    } else if (method === 'qris') {
      return paymentGateway.generateQrisCode(orderId, amount)
    }

    return {
      success: false,
      error: 'Unsupported payment method'
    }
  }

  // Send payment confirmation notification
  private async sendPaymentConfirmation(transaction: TransactionRecord) {
    try {
      // Get group and participant details for notification
      const [transactionWithDetails] = await db
        .select({
          id: transactions.id,
          userId: transactions.userId,
          groupId: transactions.groupId,
          periodId: transactions.periodId,
          amount: transactions.amount,
          type: transactions.type,
          metadata: transactions.metadata
        })
        .from(transactions)
        .where(eq(transactions.id, transaction.id))
        .limit(1)

      if (!transactionWithDetails || !transactionWithDetails.groupId) {
        return
      }

  // WhatsApp notification would be sent here
      console.log('Payment confirmation notification:', {
        userId: transactionWithDetails.userId,
        groupId: transactionWithDetails.groupId,
        amount: transactionWithDetails.amount,
        type: transactionWithDetails.type,
        metadata: transactionWithDetails.metadata
      })

      // TODO: Implement WhatsApp notification
      // await whatsappService.sendMessage({
      //   to: transactionWithDetails.userId,
      //   message: `✅ Pembayaran berhasil diterima!\n\n💰 Jumlah: Rp ${transactionWithDetails.amount.toLocaleString('id-ID')}\n💳 Metode: ${transactionWithDetails.method}\n📋 Order ID: ${transactionWithDetails.orderId}`,
      //   type: 'payment_confirmation'
      // })

      // TODO: Implement WhatsApp notification
      // await whatsappService.sendMessage({
      //   to: transactionWithDetails.userId,
      //   message: `✅ Pembayaran berhasil diterima!\n\nJumlah: Rp ${transactionWithDetails.amount.toLocaleString('id-ID')}\nMetode: ${transactionWithDetails.method}\nOrder ID: ${transactionWithDetails.orderId}`,
      //   type: 'transaction_confirmation'
      // })

      return true
    } catch (error) {
      console.error('Failed to send payment confirmation:', error)
      return false
    }
  }
}