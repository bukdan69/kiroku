import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { 
  users, arisanPeriods, arisanPeriodParticipants, arisanWinners, 
  arisanGroups, wallets, transactions, notificationLogs, auditLogs 
} from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import crypto from 'crypto';

// Commit-Reveal Winner Selection
export async function POST(
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

    const periodId = params.id;
    const body = await request.json();
    const { action, commitHash, revealSeed } = body;

    // 2. Get period with group
    const period = await db.query.arisanPeriods.findFirst({
      where: eq(arisanPeriods.id, periodId),
      with: {
        group: true,
      },
    });

    if (!period) {
      return NextResponse.json({ error: 'Period not found' }, { status: 404 });
    }

    // 3. Verify bandar owns the group
    if (period.group.adminId !== authUser.id) {
      return NextResponse.json({ error: 'Forbidden - Not your group' }, { status: 403 });
    }

    // 4. Check if winner already selected
    if (period.winnerId) {
      return NextResponse.json({ error: 'Winner already selected' }, { status: 400 });
    }

    // 5. Handle different actions
    if (action === 'commit') {
      // COMMIT PHASE: Generate and store commit hash
      const seed = crypto.randomBytes(32).toString('hex');
      const hash = crypto.createHash('sha256').update(seed).digest('hex');

      // Store commit hash in period
      await db.update(arisanPeriods)
        .set({
          drawCommit: hash,
          updatedAt: new Date(),
        })
        .where(eq(arisanPeriods.id, periodId));

      // Log commit action
      await db.insert(auditLogs).values({
        userId: authUser.id,
        tenantId: period.group.tenantId,
        action: 'draw',
        entityType: 'arisan_period',
        entityId: periodId,
        metadata: {
          action: 'commit',
          hash,
        },
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      });

      return NextResponse.json({
        success: true,
        commitHash: hash,
        seed, // Return seed to client (will be used in reveal)
      });
    }

    if (action === 'reveal') {
      // REVEAL PHASE: Verify hash and select winner
      
      // Verify commit hash
      const expectedHash = crypto.createHash('sha256').update(revealSeed).digest('hex');
      if (expectedHash !== period.drawCommit) {
        return NextResponse.json({ error: 'Invalid reveal seed' }, { status: 400 });
      }

      // Get eligible participants
      const eligibleParticipants = await db.query.arisanPeriodParticipants.findMany({
        where: and(
          eq(arisanPeriodParticipants.periodId, periodId),
          eq(arisanPeriodParticipants.hasPaid, true),
          eq(arisanPeriodParticipants.hasLoggedIn, true)
        ),
        with: {
          user: true,
        },
      });

      if (eligibleParticipants.length === 0) {
        return NextResponse.json({ error: 'No eligible participants' }, { status: 400 });
      }

      // Use seed to generate deterministic random selection
      const seedNumber = parseInt(revealSeed.substring(0, 8), 16);
      const winnerIndex = seedNumber % eligibleParticipants.length;
      const winner = eligibleParticipants[winnerIndex];

      // Calculate amounts
      const prizeAmount = Number(period.prizeAmount);
      const platformFee = Number(period.platformFee);
      const adminFee = Number(period.adminFee);
      const affiliateFee = Number(period.affiliateFee) || 0;
      const winnerAmount = prizeAmount - platformFee - adminFee - affiliateFee;

      // Update period with winner
      await db.update(arisanPeriods)
        .set({
          winnerId: winner.userId,
          drawReveal: revealSeed,
          drawDate: new Date(),
          winnerAmount: winnerAmount.toString(),
          updatedAt: new Date(),
        })
        .where(eq(arisanPeriods.id, periodId));

      // Create winner record
      await db.insert(arisanWinners).values({
        id: crypto.randomUUID(),
        groupId: period.groupId,
        periodId: period.id,
        userId: winner.userId,
        periodNumber: period.periodNumber,
        prizeAmount: prizeAmount.toString(),
        winnerAmount: winnerAmount.toString(),
        platformFee: platformFee.toString(),
        adminFee: adminFee.toString(),
        affiliateFee: affiliateFee.toString(),
        paidOut: false,
        winnerSelectedAt: new Date(),
      });

      // Send notification to winner
      await db.insert(notificationLogs).values({
        userId: winner.userId,
        tenantId: period.group.tenantId,
        type: 'winner_notification',
        status: 'pending',
        title: 'Selamat! Anda Menang Arisan!',
        message: `Selamat! Anda terpilih sebagai pemenang ${period.group.name} periode ${period.periodNumber}. Hadiah Rp ${winnerAmount.toLocaleString()} akan segera ditransfer.`,
        metadata: {
          groupId: period.groupId,
          periodId: period.id,
          winnerAmount,
        },
      });

      // Log reveal action
      await db.insert(auditLogs).values({
        userId: authUser.id,
        tenantId: period.group.tenantId,
        action: 'draw',
        entityType: 'arisan_period',
        entityId: periodId,
        metadata: {
          action: 'reveal',
          winnerId: winner.userId,
          winnerName: winner.user.name,
          winnerAmount,
        },
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      });

      return NextResponse.json({
        success: true,
        winner: {
          id: winner.userId,
          name: winner.user.name,
          email: winner.user.email,
        },
        amounts: {
          prizeAmount,
          platformFee,
          adminFee,
          affiliateFee,
          winnerAmount,
        },
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Winner selection error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Get draw information
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const periodId = params.id;

    // Get period with group and participants
    const period = await db.query.arisanPeriods.findFirst({
      where: eq(arisanPeriods.id, periodId),
      with: {
        group: true,
      },
    });

    if (!period) {
      return NextResponse.json({ error: 'Period not found' }, { status: 404 });
    }

    // Verify ownership
    if (period.group.adminId !== authUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get eligible participants
    const eligibleParticipants = await db.query.arisanPeriodParticipants.findMany({
      where: and(
        eq(arisanPeriodParticipants.periodId, periodId),
        eq(arisanPeriodParticipants.hasPaid, true),
        eq(arisanPeriodParticipants.hasLoggedIn, true)
      ),
      with: {
        user: true,
      },
    });

    return NextResponse.json({
      period: {
        id: period.id,
        groupName: period.group.name,
        periodNumber: period.periodNumber,
        prizeAmount: period.prizeAmount,
        platformFee: period.platformFee,
        adminFee: period.adminFee,
        affiliateFee: period.affiliateFee,
        winnerAmount: period.winnerAmount,
        drawDate: period.drawDate,
        winnerId: period.winnerId,
        drawCommit: period.drawCommit,
      },
      eligibleParticipants: eligibleParticipants.map(p => ({
        id: p.userId,
        name: p.user.name,
        email: p.user.email,
        hasPaid: p.hasPaid,
        hasLoggedIn: p.hasLoggedIn,
      })),
    });
  } catch (error) {
    console.error('Get draw info error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
