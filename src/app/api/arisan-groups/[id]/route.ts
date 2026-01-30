import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { arisanGroups, arisanPeriods, arisanMembers } from '@/lib/db/schema'
import { eq, and, count } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get group details with current period
    const groupDetails = await db
      .select({
        group: arisanGroups,
        currentPeriod: arisanPeriods,
        participantCount: count(arisanMembers.id)
      })
      .from(arisanGroups)
      .leftJoin(arisanPeriods, and(
        eq(arisanGroups.id, arisanPeriods.groupId),
        eq(arisanGroups.currentPeriod, arisanPeriods.periodNumber)
      ))
      .leftJoin(arisanMembers, eq(arisanGroups.id, arisanMembers.groupId))
      .where(eq(arisanGroups.id, params.id))
      .groupBy(arisanGroups.id, arisanPeriods.id)
      .limit(1)

    if (groupDetails.length === 0) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    // Get participants
    const participants = await db
      .select({
        participant: arisanMembers,
        user: {
          id: arisanMembers.userId,
          // Add user fields if needed
        }
      })
      .from(arisanMembers)
      .where(eq(arisanMembers.groupId, params.id))

    return NextResponse.json({ 
      data: {
        ...groupDetails[0],
        participants
      }
    })
  } catch (error) {
    console.error('Error fetching arisan group:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}