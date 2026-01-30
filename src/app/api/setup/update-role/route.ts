import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Update User Role API
 * 
 * SECURITY: This endpoint should be disabled in production!
 * Only use for initial setup in development.
 */
export async function POST(request: NextRequest) {
  try {
    // SECURITY CHECK: Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'This endpoint is disabled in production' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, role = 'super_admin' } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log(`Updating role for ${email} to ${role}...`);

    // Find user by email
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return NextResponse.json(
        { 
          error: 'User not found',
          hint: 'Please signup first at /auth before updating role'
        },
        { status: 404 }
      );
    }

    // Update user role
    const [updatedUser] = await db.update(users)
      .set({
        role: role as any,
        tenantId: null, // Super admin has no tenant
        isActive: true,
        updatedAt: new Date()
      })
      .where(eq(users.id, existingUser.id))
      .returning();

    console.log('Role updated successfully:', updatedUser);

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${email} to ${role}`,
      data: {
        userId: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        isActive: updatedUser.isActive
      }
    });

  } catch (error: any) {
    console.error('Error updating role:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update role',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check user role
export async function GET(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'This endpoint is disabled in production' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        tenantId: true,
        createdAt: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user
    });

  } catch (error: any) {
    console.error('Error checking user:', error);
    return NextResponse.json(
      { error: 'Failed to check user', details: error.message },
      { status: 500 }
    );
  }
}
