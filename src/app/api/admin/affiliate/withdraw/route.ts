import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { 
  users, withdrawals, affiliateReferrals, wallets, 
  notificationLogs, auditLogs 
} from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // 1. Authentication
    const supabase = await createServerClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get request body
    const body = await request.json();
    const { amount, bankName, accountNumber, accountName } = body;

    // 3. Validation
    if (!amount || !bankName || !accountNumber || !accountName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const withdrawAmount = Number(amount);
    const minWithdrawal = 100000;
    const withdrawalFee = 2500;

    if (withdrawAmount < minWithdrawal) {
      return NextResponse.json({ 
        error: `Minimum withdrawal is Rp ${minWithdrawal.toLocaleString()}` 
      }, { status: 400 });
    }

    // 4. Get user's affiliate info
    const affiliate = await db.query.affiliateReferrals.findFirst({
      where: eq(affiliateReferrals.affiliateUserId, authUser.id),
    });

    if (!affiliate) {
      return NextResponse.json({ error: 'Affiliate account not found' }, { status: 404 });
    }

    // 5. Check available balance
    const availableBalance = Number(affiliate.totalCommissionEarned) - Number(affiliate.totalCommissionWithdrawn);
    
    if (withdrawAmount > availableBalance) {
      return NextResponse.json({ 
        error: 'Insufficient balance',
        available: availableBalance 
      }, { status: 400 });
    }

    // 6. Get or create wallet
    let wallet = await db.query.wallets.findFirst({
      where: eq(wallets.userId, authUser.id),
    });

    if (!wallet) {
      // Create wallet if doesn't exist
      const walletId = crypto.randomUUID();
      await db.insert(wallets).values({
        id: walletId,
        userId: authUser.id,
        tenantId: affiliate.tenantId,
        balance: '0',
        frozenBalance: '0',
        escrowBalance: '0',
        status: 'active',
      });
      
      wallet = await db.query.wallets.findFirst({
        where: eq(wallets.userId, authUser.id),
      });
    }

    // 7. Create withdrawal request
    const withdrawalId = crypto.randomUUID();
    await db.insert(withdrawals).values({
      id: withdrawalId,
      userId: authUser.id,
      tenantId: affiliate.tenantId,
      walletId: wallet!.id,
      amount: withdrawAmount.toString(),
      status: 'pending',
      bankName,
      bankAccountNumber: accountNumber,
      bankAccountName: accountName,
    });

    // 8. Update affiliate commission withdrawn (mark as pending)
    await db.update(affiliateReferrals)
      .set({
        totalCommissionWithdrawn: sql`${affiliateReferrals.totalCommissionWithdrawn} + ${withdrawAmount}`,
        updatedAt: new Date(),
      })
      .where(eq(affiliateReferrals.id, affiliate.id));

    // 9. Send notification
    await db.insert(notificationLogs).values({
      userId: authUser.id,
      tenantId: affiliate.tenantId,
      type: 'payout_notification',
      status: 'pending',
      title: 'Withdrawal Request Submitted',
      message: `Permintaan penarikan komisi sebesar Rp ${withdrawAmount.toLocaleString()} telah diterima dan sedang diproses. Estimasi 1-3 hari kerja.`,
      metadata: {
        withdrawalId,
        amount: withdrawAmount,
        bankName,
        accountNumber,
      },
    });

    // 10. Log in audit
    await db.insert(auditLogs).values({
      userId: authUser.id,
      tenantId: affiliate.tenantId,
      action: 'payment',
      entityType: 'withdrawal',
      entityId: withdrawalId,
      metadata: {
        action: 'create_withdrawal',
        amount: withdrawAmount,
        bankName,
        accountNumber,
      },
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.json({
      success: true,
      withdrawal: {
        id: withdrawalId,
        amount: withdrawAmount,
        fee: withdrawalFee,
        netAmount: withdrawAmount - withdrawalFee,
        status: 'pending',
        bankName,
        accountNumber,
        accountName,
      },
    });
  } catch (error) {
    console.error('Withdrawal request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Get withdrawal history
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's withdrawals
    const userWithdrawals = await db.query.withdrawals.findMany({
      where: eq(withdrawals.userId, authUser.id),
      orderBy: (withdrawals, { desc }) => [desc(withdrawals.createdAt)],
      limit: 20,
    });

    // Get affiliate balance
    const affiliate = await db.query.affiliateReferrals.findFirst({
      where: eq(affiliateReferrals.affiliateUserId, authUser.id),
    });

    const totalEarned = Number(affiliate?.totalCommissionEarned || 0);
    const totalWithdrawn = Number(affiliate?.totalCommissionWithdrawn || 0);
    const available = totalEarned - totalWithdrawn;

    return NextResponse.json({
      balance: {
        available,
        pending: totalWithdrawn,
        total: totalEarned,
        minWithdrawal: 100000,
        withdrawalFee: 2500,
      },
      withdrawals: userWithdrawals.map(w => ({
        id: w.id,
        amount: Number(w.amount),
        status: w.status,
        bankName: w.bankName,
        accountNumber: w.bankAccountNumber,
        createdAt: w.createdAt,
        processedAt: w.processedAt,
      })),
    });
  } catch (error) {
    console.error('Get withdrawals error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
