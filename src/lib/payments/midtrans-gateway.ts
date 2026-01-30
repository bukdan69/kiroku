import { PaymentResult, TransactionRecord } from './types'
import crypto from 'crypto'

// Midtrans Payment Gateway Integration
export class MidtransGateway {
  private serverKey: string
  private clientKey: string
  private baseUrl: string

  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY || ''
    this.clientKey = process.env.MIDTRANS_CLIENT_KEY || ''
    this.baseUrl = process.env.MIDTRANS_SERVER_URL || 'https://app.sandbox.midtrans.com/snap/v1'
  }

  async createTransaction(amount: number, customerDetails: {
    name: string
    email: string
    phone: string
  }, items: Array<{
    id: string
    price: number
    quantity: number
    name: string
  }>, callback?: string): Promise<PaymentResult> {
    try {
      const payload = {
        transaction_details: {
          order_id: crypto.randomUUID(),
          gross_amount: amount,
          currency: 'IDR',
          payment_type: 'bank_transfer',
          first_name: customerDetails.name.split(' ')[0],
          last_name: customerDetails.name.split(' ').slice(1).join(' '),
          email: customerDetails.email,
          phone: customerDetails.phone,
          billing_address: {
            first_name: customerDetails.name.split(' ')[0],
            last_name: customerDetails.name.split(' ').slice(1).join(' '),
            email: customerDetails.email,
            phone: customerDetails.phone,
            address: 'Jakarta',
            city: 'Jakarta',
            postal_code: '12345',
            country_code: 'IDN'
          },
          shipping_address: {
            first_name: customerDetails.name.split(' ')[0],
            last_name: customerDetails.name.split(' ').slice(1).join(' '),
            email: customerDetails.email,
            phone: customerDetails.phone,
            address: 'Jakarta',
            city: 'Jakarta',
            postal_code: '12345',
            country_code: 'IDN'
          }
        },
        credit_card: {
          secure: false
        },
        item_details: items,
        customer_details: {
          first_name: customerDetails.name.split(' ')[0],
          last_name: customerDetails.name.split(' ').slice(1).join(' '),
          email: customerDetails.email,
          phone: customerDetails.phone
        },
        callbacks: {
          finish: callback || `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/callback`
        }
      }

      const response = await fetch(`${this.baseUrl}/transaction`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${this.serverKey}:`).toString('base64')}`
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (response.ok && result.status_code === 201) {
        return {
          success: true,
          status: 'pending',
          payment: {
            method: 'midtrans',
            status: 'pending',
            amount,
            orderId: result.order_id,
            transactionId: result.transaction_id,
            paymentUrl: result.redirect_url,
            expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
          }
        }
      } else {
        return {
          success: false,
          status: 'failed',
          error: result.status_message || 'Failed to create transaction'
        }
      }
    } catch (error) {
      console.error('Midtrans transaction creation error:', error)
      return {
        success: false,
        status: 'failed',
        error: 'Failed to create transaction'
      }
    }
  }

  async checkTransactionStatus(transactionId: string): Promise<PaymentResult> {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/${transactionId}/status`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${this.serverKey}:`).toString('base64')}`
        }
      })

      const result = await response.json()

      if (response.ok) {
        type MidtransStatus = 'pending' | 'capture' | 'settlement' | 'deny' | 'cancel' | 'expire' | 'refund'
        
        const statusMap: Record<MidtransStatus, 'pending' | 'success' | 'failed' | 'cancelled' | 'refunded'> = {
          pending: 'pending',
          capture: 'success',
          settlement: 'success',
          deny: 'failed',
          cancel: 'cancelled',
          expire: 'failed',
          refund: 'refunded'
        }

        return {
          success: true,
          status: statusMap[result.transaction_status] || 'pending',
          payment: {
            method: 'midtrans',
            status: statusMap[result.transaction_status] || 'pending',
            amount: result.gross_amount,
            orderId: result.order_id,
            transactionId: result.transaction_id
          }
        }
      } else {
        return {
          success: false,
          status: 'failed',
          error: 'Failed to check transaction status'
        }
      }
    } catch (error) {
      console.error('Midtrans status check error:', error)
      return {
        success: false,
        status: 'failed',
        error: 'Failed to check transaction status'
      }
    }
  }

  // Bank Transfer Alternative
  async generateBankTransferInstructions(orderId: string, amount: number): Promise<PaymentResult> {
    try {
      const virtualAccount = {
        bank: 'Bank Central Asia',
        account_name: 'PT. Arisan KU Indonesia',
        account_number: '1234567890',
        account_holder: 'PT. Arisan KU Indonesia',
        branch: 'Jakarta Pusat',
        transfer_note: `Pembayaran Arisan - Order ${orderId}`
      }

      return {
        success: true,
        status: 'pending',
        payment: {
          method: 'bank_transfer',
          status: 'pending',
          amount,
          orderId,
          metadata: virtualAccount
        }
      }
    } catch (error) {
      console.error('Bank transfer instructions error:', error)
      return {
        success: false,
        status: 'failed',
        error: 'Failed to generate bank transfer instructions'
      }
    }
  }

  // E-Wallet Alternative
  async generateEWalletInstructions(orderId: string, amount: number, provider: 'gopay' | 'ovo' | 'dana'): Promise<PaymentResult> {
    try {
      const instructions = {
        gopay: {
          payment_code: crypto.randomBytes(8).toString('hex').toUpperCase(),
          amount,
          message: `Pembayaran Arisan - Order ${orderId}`
        },
        ovo: {
          payment_code: crypto.randomBytes(8).toString('hex').toUpperCase(),
          amount,
          message: `Pembayaran Arisan - Order ${orderId}`
        },
        dana: {
          account_number: '08123456789',
          amount,
          message: `Pembayaran Arisan - Order ${orderId}`
        }
      }

      return {
        success: true,
        status: 'pending',
        payment: {
          method: 'ewallet',
          status: 'pending',
          amount,
          orderId,
          metadata: instructions[provider]
        }
      }
    } catch (error) {
      console.error('E-wallet instructions error:', error)
      return {
        success: false,
        status: 'failed',
        error: 'Failed to generate e-wallet instructions'
      }
    }
  }

  // Qris Alternative
  async generateQrisCode(orderId: string, amount: number): Promise<PaymentResult> {
    try {
      const qrisData = {
        qr_code: crypto.randomBytes(16).toString('hex').toUpperCase(),
        amount,
        merchant_name: 'Arisan KU',
        description: `Pembayaran Arisan - Order ${orderId}`,
        expiry_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }

      return {
        success: true,
        status: 'pending',
        payment: {
          method: 'qris',
          status: 'pending',
          amount,
          orderId,
          metadata: qrisData
        }
      }
    } catch (error) {
      console.error('Qris generation error:', error)
      return {
        success: false,
        status: 'failed',
        error: 'Failed to generate QRIS code'
      }
    }
  }
}

// Export singleton instance
export const paymentGateway = new MidtransGateway()