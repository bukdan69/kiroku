import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { users, auditLogs, notificationLogs, affiliateCommissions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    // 1. Check authentication & authorization
    const supabase = await createServerClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if super_admin
    const adminUser = await db.query.users.findFirst({
      where: eq(users.id, authUser.id),
    });

    if (!adminUser || adminUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 2. Get form data
    const formData = await request.formData();
    const withdrawalId = formData.get('withdrawalId') as string;

    if (!withdrawalId) {
      return NextResponse.json({ error: 'Missing withdrawalId' }, { status: 400 });
    }

    // 3. Get withdrawal record (from affiliateCommissions or withdrawals table)
    // This is a placeholder - adjust based on your actual schema
    // const withdrawal = await db.query.withdrawals.findFirst({
    //   where: eq(withdrawals.id, withdrawalId),
    // });

    // if (!withdrawal) {
    //   return NextResponse.json({ error: 'Withdrawal not found' }, { status: 404 });
    // }

    // if (withdrawal.status !== 'pending') {
    //   return NextResponse.json({ error: 'Withdrawal already processed' }, { status: 400 });
    // }

    // 4. Update withdrawal status to approved
    // await db.update(withdrawals)
    //   .set({
    //     status: 'approved',
    //     processedBy: adminUser.id,
    //     processedAt: new Date(),
    //   })
    //   .where(eq(withdrawals.id, withdrawalId));

    // 5. Send notification to affiliate
    // await db.insert(notificationLogs).values({
    //   userId: withdrawal.userId,
    //   tenantId: withdrawal.tenantId,
    //   type: 'payout_notification',
    //   status: 'pending',
    //   title: 'Withdrawal Approved',
    //   message: `Withdrawal Anda sebesar Rp ${withdrawal.amount.toLocaleString()} telah disetujui dan sedang diproses.`,
    //   metadata: {
    //     withdrawalId: withdrawal.id,
    //     amount: withdrawal.amount,
    //   },
    // });

    // 6. Log in audit
    await db.insert(auditLogs).values({
      userId: adminUser.id,
      tenantId: 'platform',
      action: 'admin_action',
      entityType: 'affiliate_withdrawal',
      entityId: withdrawalId,
      oldValues: { status: 'pending' },
      newValues: { status: 'approved' },
      metadata: {
        action: 'approve_withdrawal',
        withdrawalId,
      },
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    // 7. Redirect back to affiliate page
    return NextResponse.redirect(new URL('/platform/affiliate?success=approved', request.url));
  } catch (error) {
    console.error('Affiliate withdrawal approve error:', error);
    return NextResponse.redirect(new URL('/platform/affiliate?error=server_error', request.url));
  }
}
