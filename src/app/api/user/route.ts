import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get user from database
    const userData = await db.select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1)

    if (userData.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update last login
    await db.update(users)
      .set({ 
        lastLoginAt: new Date()
      })
      .where(eq(users.id, user.id))

    return NextResponse.json({ 
      data: userData[0],
      message: 'User data retrieved successfully'
    })
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, phoneNumber, address, city, province, postalCode } = body

    // Update user data
    const updatedUser = await db.update(users)
      .set({ 
        name: name || undefined
      })
      .where(eq(users.id, user.id))
      .returning()

    // If updating profile related fields, update profile table
    if (phoneNumber || address || city || province || postalCode) {
      // This would update the profiles table
      // Implementation depends on your schema structure
    }

    return NextResponse.json({ 
      data: updatedUser[0],
      message: 'User updated successfully'
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}