import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { kycVerifications, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get user's KYC status
    const kycData = await db.select()
      .from(kycVerifications)
      .where(eq(kycVerifications.userId, user.id))
      .limit(1)

    if (kycData.length === 0) {
      return NextResponse.json({ 
        data: { status: 'not_submitted' },
        message: 'KYC not found'
      })
    }

    return NextResponse.json({ 
      data: kycData[0],
      message: 'KYC status retrieved successfully'
    })
  } catch (error) {
    console.error('Error fetching KYC status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { 
      ktpNumber, 
      ktpImageUrl, 
      selfieImageUrl, 
      ktpWithSelfieImageUrl, 
      addressProofImageUrl 
    } = body

    if (!ktpNumber || !ktpImageUrl || !selfieImageUrl) {
      return NextResponse.json({ 
        error: 'Missing required fields: ktpNumber, ktpImageUrl, selfieImageUrl' 
      }, { status: 400 })
    }

    // Check if KYC already exists
    const existingKyc = await db.select()
      .from(kycVerifications)
      .where(eq(kycVerifications.userId, user.id))
      .limit(1)

    const now = new Date()

    if (existingKyc.length > 0) {
      // Update existing KYC
      const updatedKyc = await db.update(kycVerifications)
        .set({
          ktpNumber,
          ktpImageUrl,
          selfieImageUrl,
          ktpWithSelfieImageUrl,
          addressProofImageUrl,
          status: 'pending',
          submittedAt: now
        })
        .where(eq(kycVerifications.userId, user.id))
        .returning()

      return NextResponse.json({ 
        data: updatedKyc[0],
        message: 'KYC updated successfully'
      })
    } else {
      // Create new KYC
      const newKyc = await db.insert(kycVerifications).values({
        id: crypto.randomUUID(),
        userId: user.id,
        ktpNumber,
        ktpImageUrl,
        selfieImageUrl,
        ktpWithSelfieImageUrl,
        addressProofImageUrl,
        status: 'pending',
        submittedAt: now,
        createdAt: now,
        updatedAt: now
      }).returning()

      return NextResponse.json({ 
        data: newKyc[0],
        message: 'KYC submitted successfully'
      })
    }
  } catch (error) {
    console.error('Error submitting KYC:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}