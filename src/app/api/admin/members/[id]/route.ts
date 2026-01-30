import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { users, profiles, arisanMembers, paymentIntents, arisanWinners, kycVerifications } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Authentication
    const supabase = await createServerClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get member ID from params
    const memberId = params.id;

    // 3. Get member with all relations
    const member = await db.query.users.findFirst({
      where: eq(users.id, memberId),
      with: {
        profile: true,
        kycVerification: true,
      },
    });

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // 4. Get member's groups
    const memberGroups = await db.query.arisanMembers.findMany({
      where: eq(arisanMembers.userId, memberId),
      with: {
        group: true,
      },
    });

    // 5. Verify bandar owns at least one of the groups
    const bandarGroups = memberGroups.filter(mg => mg.group.adminId === authUser.id);
    if (bandarGroups.length === 0) {
      return NextResponse.json({ error: 'Forbidden - Not your member' }, { status: 403 });
    }

    // 6. Get payment history
    const payments = await db.query.paymentIntents.findMany({
      where: eq(paymentIntents.userId, memberId),
      orderBy: [desc(paymentIntents.createdAt)],
      limit: 20,
    });

    // 7. Get win history
    const wins = await db.query.arisanWinners.findMany({
      where: eq(arisanWinners.userId, memberId),
      with: {
        group: true,
        period: true,
      },
    });

    // 8. Calculate stats
    const totalPaid = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + Number(p.amount), 0);

    // 9. Return member data
    return NextResponse.json({
      member: {
        id: member.id,
        name: member.name,
        email: member.email,
        avatar: member.avatar,
        role: member.role,
        isActive: member.isActive,
        createdAt: member.createdAt,
        lastLoginAt: member.lastLoginAt,
      },
      profile: member.profile,
      kyc: member.kycVerification,
      groups: memberGroups.map(mg => ({
        id: mg.group.id,
        name: mg.group.name,
        role: mg.role,
        isActive: mg.isActive,
        contributionAmount: mg.group.contributionAmount,
        joinedAt: mg.joinedAt,
      })),
      payments: payments.map(p => ({
        id: p.id,
        amount: p.amount,
        status: p.status,
        createdAt: p.createdAt,
        completedAt: p.completedAt,
      })),
      wins: wins.map(w => ({
        id: w.id,
        groupName: w.group.name,
        periodNumber: w.periodNumber,
        prizeAmount: w.prizeAmount,
        winnerAmount: w.winnerAmount,
        winnerSelectedAt: w.winnerSelectedAt,
      })),
      stats: {
        totalPaid,
        totalGroups: memberGroups.length,
        totalWins: wins.length,
        kycStatus: member.kycVerification?.status || 'not_submitted',
      },
    });
  } catch (error) {
    console.error('Get member error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
