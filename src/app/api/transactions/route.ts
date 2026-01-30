import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { users, arisanGroups, arisanPeriodParticipants, transactions } from '@/lib/db/schema'
import { eq, desc, asc, and, or, count } from 'drizzle-orm'
import { PaymentMethod, TransactionType } from '@/lib/payments/payment-service'
import { paymentService } from '@/lib/payments/payment-service'
import { paymentsService } from '@/lib/payments/midtrans-gateway'

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

export async function GET(request: NextRequest) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const status = searchParams.get('status') as string
  const offset = (page - 1) * limit

  try {
    // Build query conditions
    const conditions = [eq(transactions.userId, user.id)]
    
    if (status) {
      conditions.push(eq(transactions.status, status))
    }

    const userTransactions = await db
      .select()
      .from(transactions)
      .where(and(...conditions))
      .orderBy(desc(transactions.createdAt))
      .limit(limit)
      .offset(offset)

    // Get total count
    const [{ total }] = await db
      .select({ count: count() })
      .from(transactions)
      .where(and(...conditions))

    return NextResponse.json({
      data: userTransactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    
    // Handle payment processing
    if (body.action === 'process_payment') {
      const { orderId, transactionId, status } = body
      
      // Verify payment with gateway
      const paymentResult = await paymentService.checkTransactionStatus(transactionId!)
      
      if (paymentResult.success) {
        const paymentStatus = status === 'capture' || paymentResult.status === 'settlement' 
          ? 'success' 
          : 'failed'

        // Update transaction in database
        const [transaction] = await db
          .update(transactions)
          .set({ 
            status: paymentStatus,
            processedAt: new Date(),
            transactionId: paymentResult.payment?.transactionId,
            metadata: {
              ...paymentResult.payment?.metadata,
              paymentMethod: paymentResult.payment?.method,
              paymentGatewayStatus: paymentResult.status
            }
          })
          .where(and(
            eq(transactions.orderId, orderId),
            eq(transactions.userId, user.id)
          ))
          .returning()

        // Update participant payment status if successful
        if (paymentStatus === 'success' && transaction[0]) {
          await db
            .update(arisanPeriodParticipants)
            .set({
              hasPaid: true,
              paidAt: new Date()
            })
            .where(and(
              eq(arisanPeriodParticipants.periodId, transaction[0].periodId!),
              eq(arisanPeriodParticipants.userId, user.id)
            ))
        }

        // Send payment confirmation
        if (paymentStatus === 'success') {
          await paymentService.sendPaymentConfirmation(transaction[0])
        }

        return NextResponse.json({
          success: true,
          status: paymentStatus,
          data: transaction[0]
        })
      } else {
        // Handle payment failure
        const [transaction] = await db
          .update(transactions)
          .set({ 
            status: 'failed',
            processedAt: new Date(),
            metadata: {
              ...paymentResult.error
            }
          })
          .where(and(
            eq(transactions.orderId, orderId),
            eq(transactions.userId, user.id)
          ))
          .returning()

        return NextResponse.json({
          success: false,
          status: 'failed',
          error: paymentResult.error || 'Payment verification failed',
          data: transaction[0]
        })
      }
    }
    
    // Handle manual transaction creation
    if (body.action === 'create_transaction') {
      const { groupId, periodId, amount, method, type, description } = body
      
      const orderId = `TRX-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      
      const createData: CreateTransactionData = {
        userId: user.id,
        groupId,
        periodId,
        amount,
        method,
        type: type || 'contribution',
        description: description || `Pembayaran arisan ${type}`,
        orderId,
        status: 'pending',
        metadata: {
          createdVia: 'manual',
          paymentGateway: 'none'
        }
      }

      const [transaction] = await db.insert(transactions).values(createData).returning()

      return NextResponse.json({
        success: true,
        data: transaction[0]
      })
    }

    // Handle alternative payment methods
    if (body.action === 'generate_alternative_payment') {
      const { orderId, amount, method } = body
      
      const paymentResult = await paymentService.generateAlternativePayment(orderId, amount, method)
      
      if (paymentResult.success) {
        // Create transaction with alternative payment method
        const createData: CreateTransactionData = {
          userId: user.id,
          amount,
          method: method as PaymentMethod,
          type: 'contribution',
          description: `Pembayaran arisan via ${method}`,
          orderId,
          status: 'pending',
          metadata: paymentResult.payment?.metadata
        }

        const [transaction] = await db.insert(transactions).values(createData).returning()

        return NextResponse.json({
          success: true,
          data: transaction[0],
          payment: paymentResult.payment
        })
      } else {
        return NextResponse.json({
          success: false,
          error: paymentResult.error
        })
      }
    }

  } catch (error) {
    console.error('Transaction processing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}