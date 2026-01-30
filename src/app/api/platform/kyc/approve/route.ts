import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { kycVerifications, users, auditLogs, notificationLogs } from '@/lib/db/schema';
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
    const kycId = formData.get('kycId') as string;

    if (!kycId) {
      return NextResponse.json({ error: 'Missing kycId' }, { status: 400 });
    }

    // 3. Get KYC record
    const kyc = await db.query.kycVerifications.findFirst({
      where: eq(kycVerifications.id, kycId),
    });

    if (!kyc) {
      return NextResponse.json({ error: 'KYC not found' }, { status: 404 });
    }

    if (kyc.status !== 'pending') {
      return NextResponse.json({ error: 'KYC already reviewed' }, { status: 400 });
    }

    // 4. Update KYC status to approved
    await db.update(kycVerifications)
      .set({
        status: 'approved',
        reviewedBy: adminUser.id,
        reviewedAt: new Date(),
        approvedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(kycVerifications.id, kycId));

    // 5. Send notification to user
    await db.insert(notificationLogs).values({
      userId: kyc.userId,
      tenantId: kyc.tenantId,
      type: 'kyc_status',
      status: 'pending',
      title: 'KYC Approved',
      message: 'Selamat! Verifikasi KYC Anda telah disetujui. Anda sekarang dapat mengakses semua fitur premium.',
      metadata: {
        kycId: kyc.id,
        status: 'approved',
      },
    });

    // 6. Log in audit
    await db.insert(auditLogs).values({
      userId: adminUser.id,
      tenantId: 'platform',
      action: 'kyc_review',
      entityType: 'kyc_verification',
      entityId: kycId,
      oldValues: { status: 'pending' },
      newValues: { status: 'approved' },
      metadata: {
        reviewedUserId: kyc.userId,
        action: 'approve',
      },
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    // 7. Redirect back to KYC list
    return NextResponse.redirect(new URL('/platform/kyc?success=approved', request.url));
  } catch (error) {
    console.error('KYC approve error:', error);
    return NextResponse.redirect(new URL('/platform/kyc?error=server_error', request.url));
  }
}
