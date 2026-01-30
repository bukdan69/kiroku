import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userData = await db.select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1)

    const userRole = userData[0]?.role || 'user'
    
    return NextResponse.json({ 
      role: userRole,
      roles: [userRole],
      isAdmin: userRole === 'admin',
      isSuperAdmin: userRole === 'admin',
      isModerator: userRole === 'admin'
    })
  } catch (error) {
    console.error('Error checking role:', error)
    return NextResponse.json({ error: 'Failed to check role' }, { status: 500 })
  }
}