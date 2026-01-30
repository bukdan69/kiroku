import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { arisanGroups, arisanMembers, users } from '@/lib/db/schema'
import { eq, and, count } from 'drizzle-orm'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const groupId = params.id

    // Check if group exists and user can join
    const group = await db.select()
      .from(arisanGroups)
      .where(eq(arisanGroups.id, groupId))
      .limit(1)

    if (group.length === 0) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    if (!group[0].isActive) {
      return NextResponse.json({ error: 'Group is not active' }, { status: 400 })
    }

    // Check if user is already a member
    const existingMember = await db.select()
      .from(arisanMembers)
      .where(and(
        eq(arisanMembers.groupId, groupId),
        eq(arisanMembers.userId, user.id)
      ))
      .limit(1)

    if (existingMember.length > 0) {
      return NextResponse.json({ error: 'Already a member of this group' }, { status: 400 })
    }

    // Check max participants
    const memberCount = await db.select({ count: count() })
      .from(arisanMembers)
      .where(eq(arisanMembers.groupId, groupId))

    if (memberCount[0].count! >= group[0]!.maxParticipants) {
      return NextResponse.json({ error: 'Group is full' }, { status: 400 })
    }

    // Add user to group
    const newMember = await db.insert(arisanMembers).values({
      id: crypto.randomUUID(),
      groupId: groupId,
      userId: user.id,
      role: 'participant'
    }).returning()

    return NextResponse.json({ 
      data: newMember[0],
      message: 'Successfully joined arisan group'
    })
  } catch (error) {
    console.error('Error joining arisan group:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}