import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { arisanGroups, users, arisanMembers } from '@/lib/db/schema'
import { eq, and, count } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = (page - 1) * limit

  try {
    // Get user's arisan groups - simplified for now
    const userGroups = await db
      .select()
      .from(arisanGroups)
      .where(eq(arisanGroups.adminId, user.id)) // Only get groups where user is admin for now
      .limit(limit)
      .offset(offset)

    return NextResponse.json({ 
      data: userGroups,
      pagination: { page, limit, total: userGroups.length }
    })
  } catch (error) {
    console.error('Error fetching arisan groups:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { 
      name, 
      description, 
      maxParticipants = 10, 
      contributionAmount, 
      totalPeriods 
    } = body

    if (!name || !contributionAmount || !totalPeriods) {
      return NextResponse.json({ 
        error: 'Missing required fields: name, contributionAmount, totalPeriods' 
      }, { status: 400 })
    }

    // Generate unique invite code
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase()

    // Get user data to get tenantId
    const userData = await db.select().from(users).where(eq(users.id, user.id)).limit(1)
    const tenantId = userData[0]?.tenantId || 'default'

    // Create arisan group
    const newGroup = await db.insert(arisanGroups).values({
      id: crypto.randomUUID(),
      tenantId,
      adminId: user.id,
      name,
      description,
      maxParticipants,
      contributionAmount: contributionAmount.toString(),
      totalPeriods,
      currentPeriod: 0,
      isActive: true,
      inviteCode
    }).returning()

    // Add admin as member
    await db.insert(arisanMembers).values({
      id: crypto.randomUUID(),
      groupId: newGroup[0].id,
      userId: user.id,
      role: 'admin',
      isActive: true
    })

    return NextResponse.json({ 
      data: newGroup[0],
      message: 'Arisan group created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating arisan group:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}