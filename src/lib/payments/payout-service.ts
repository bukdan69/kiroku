/**
 * Payout Service
 * Bank transfer integration for winner payouts and affiliate withdrawals
 * Supports Midtrans Iris and Xendit Disbursement
 */

import { db } from '@/lib/db';
import { transactions, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface PayoutParams {
  userId: string;
  amount: number;
  bankAccount: BankAccount;
  type: 'winner_payout' | 'affiliate_withdrawal';
  referenceId: string; // drawId or withdrawalId
  description: string;
}

interface PayoutResult {
  success: boolean;
  payoutId?: string;
  status?: 'pending' | 'processing' | 'success' | 'failed';
  error?: string;
  estimatedArrival?: string;
}

class PayoutService {
  private provider: string;

  constructor() {
    this.provider = process.env.PAYOUT_PROVIDER || 'midtrans'; // 'midtrans' or 'xendit'
  }

  /**
   * Process payout using configured provider
   */
  async processPayout(params: PayoutParams): Promise<PayoutResult> {
    try {
      // Validate amount
      if (params.amount < 10000) {
        throw new Error('Minimum payout amount is Rp 10,000');
      }

      // Validate bank account
      if (!this.isValidBankAccount(params.bankAccount)) {
        throw new Error('Invalid bank account details');
      }

      let result: PayoutResult;

      if (this.provider === 'midtrans') {
        result = await this.payoutWithMidtrans(params);
      } else if (this.provider === 'xendit') {
        result = await this.payoutWithXendit(params);
      } else {
        throw new Error(`Unsupported payout provider: ${this.provider}`);
      }

      // Save transaction record
      if (result.success) {
        await this.savePayoutTransaction(params, result);
      }

      return result;
    } catch (error) {
      console.error('Payout error:', error);
      return {
        success: false,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Process payout using Midtrans Iris
   */
  private async payoutWithMidtrans(params: PayoutParams): Promise<PayoutResult> {
    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
    const baseUrl = isProduction
      ? 'https://app.midtrans.com/iris/api/v1'
      : 'https://app.sandbox.midtrans.com/iris/api/v1';

    const auth = Buffer.from(serverKey + ':').toString('base64');
    const referenceNo = `PAYOUT-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    const payload = {
      payouts: [
        {
          beneficiary_name: params.bankAccount.accountName,
          beneficiary_account: params.bankAccount.accountNumber,
          beneficiary_bank: this.getBankCode(params.bankAccount.bankName),
          beneficiary_email: '', // Optional
          amount: params.amount.toString(),
          notes: params.description,
        },
      ],
    };

    const response = await fetch(`${baseUrl}/payouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
        'X-Idempotency-Key': referenceNo,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 'queued') {
      throw new Error(data.errors?.[0]?.message || 'Payout failed');
    }

    return {
      success: true,
      payoutId: data.payouts[0].reference_no,
      status: 'processing',
      estimatedArrival: '1-3 hari kerja',
    };
  }

  /**
   * Process payout using Xendit Disbursement
   */
  private async payoutWithXendit(params: PayoutParams): Promise<PayoutResult> {
    const apiKey = process.env.XENDIT_SECRET_KEY || '';
    const baseUrl = 'https://api.xendit.co';

    const auth = Buffer.from(apiKey + ':').toString('base64');
    const externalId = `PAYOUT-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    const payload = {
      external_id: externalId,
      bank_code: this.getBankCode(params.bankAccount.bankName),
      account_holder_name: params.bankAccount.accountName,
      account_number: params.bankAccount.accountNumber,
      description: params.description,
      amount: params.amount,
    };

    const response = await fetch(`${baseUrl}/disbursements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || data.status === 'FAILED') {
      throw new Error(data.failure_reason || 'Payout failed');
    }

    return {
      success: true,
      payoutId: data.id,
      status: data.status === 'COMPLETED' ? 'success' : 'processing',
      estimatedArrival: '1-3 hari kerja',
    };
  }

  /**
   * Get bank code for provider
   */
  private getBankCode(bankName: string): string {
    const bankCodes: Record<string, string> = {
      'BCA': 'bca',
      'BNI': 'bni',
      'BRI': 'bri',
      'Mandiri': 'mandiri',
      'CIMB Niaga': 'cimb',
      'Permata': 'permata',
      'BNI Syariah': 'bni_syariah',
      'BSI': 'bsi',
      'Danamon': 'danamon',
      'Maybank': 'maybank',
      'OCBC NISP': 'ocbc',
      'Panin': 'panin',
      'BTN': 'btn',
      'Jenius': 'btpn',
      'Seabank': 'seabank',
    };

    return bankCodes[bankName] || bankName.toLowerCase();
  }

  /**
   * Validate bank account details
   */
  private isValidBankAccount(account: BankAccount): boolean {
    if (!account.bankName || !account.accountNumber || !account.accountName) {
      return false;
    }

    // Account number should be numeric and 10-16 digits
    const accountNumberRegex = /^\d{10,16}$/;
    if (!accountNumberRegex.test(account.accountNumber)) {
      return false;
    }

    // Account name should be at least 3 characters
    if (account.accountName.length < 3) {
      return false;
    }

    return true;
  }

  /**
   * Save payout transaction to database
   */
  private async savePayoutTransaction(
    params: PayoutParams,
    result: PayoutResult
  ): Promise<void> {
    const orderId = `PAYOUT-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    await db.insert(transactions).values({
      userId: params.userId,
      amount: params.amount,
      method: 'bank_transfer',
      type: params.type === 'winner_payout' ? 'payout' : 'withdrawal',
      description: params.description,
      orderId,
      transactionId: result.payoutId,
      status: result.status || 'processing',
      metadata: {
        bankAccount: params.bankAccount,
        referenceId: params.referenceId,
        provider: this.provider,
        estimatedArrival: result.estimatedArrival,
      },
    });
  }

  /**
   * Check payout status
   */
  async checkPayoutStatus(payoutId: string): Promise<PayoutResult> {
    try {
      if (this.provider === 'midtrans') {
        return await this.checkMidtransStatus(payoutId);
      } else if (this.provider === 'xendit') {
        return await this.checkXenditStatus(payoutId);
      } else {
        throw new Error(`Unsupported payout provider: ${this.provider}`);
      }
    } catch (error) {
      console.error('Check payout status error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Check Midtrans payout status
   */
  private async checkMidtransStatus(payoutId: string): Promise<PayoutResult> {
    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
    const baseUrl = isProduction
      ? 'https://app.midtrans.com/iris/api/v1'
      : 'https://app.sandbox.midtrans.com/iris/api/v1';

    const auth = Buffer.from(serverKey + ':').toString('base64');

    const response = await fetch(`${baseUrl}/payouts/${payoutId}`, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to check payout status');
    }

    const statusMap: Record<string, 'pending' | 'processing' | 'success' | 'failed'> = {
      'queued': 'pending',
      'processing': 'processing',
      'completed': 'success',
      'failed': 'failed',
    };

    return {
      success: true,
      payoutId: data.reference_no,
      status: statusMap[data.status] || 'processing',
    };
  }

  /**
   * Check Xendit payout status
   */
  private async checkXenditStatus(payoutId: string): Promise<PayoutResult> {
    const apiKey = process.env.XENDIT_SECRET_KEY || '';
    const baseUrl = 'https://api.xendit.co';

    const auth = Buffer.from(apiKey + ':').toString('base64');

    const response = await fetch(`${baseUrl}/disbursements/${payoutId}`, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to check payout status');
    }

    const statusMap: Record<string, 'pending' | 'processing' | 'success' | 'failed'> = {
      'PENDING': 'pending',
      'PROCESSING': 'processing',
      'COMPLETED': 'success',
      'FAILED': 'failed',
    };

    return {
      success: true,
      payoutId: data.id,
      status: statusMap[data.status] || 'processing',
    };
  }

  /**
   * Get supported banks
   */
  getSupportedBanks(): string[] {
    return [
      'BCA',
      'BNI',
      'BRI',
      'Mandiri',
      'CIMB Niaga',
      'Permata',
      'BNI Syariah',
      'BSI',
      'Danamon',
      'Maybank',
      'OCBC NISP',
      'Panin',
      'BTN',
      'Jenius',
      'Seabank',
    ];
  }
}

// Export singleton instance
export const payoutService = new PayoutService();
