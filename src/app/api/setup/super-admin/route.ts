import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Setup Super Admin API
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
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Initialize Supabase Admin Client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase credentials' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    console.log('Creating super admin user...');

    // Try to create user in Supabase Auth
    let userId: string;
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name: name || 'Super Admin',
        role: 'super_admin'
      }
    });

    if (authError) {
      // Check if user already exists
      if (authError.message.includes('already registered')) {
        console.log('User already exists, finding existing user...');
        
        const { data: { users: existingUsers }, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) throw listError;
        
        const existingUser = existingUsers.find(u => u.email === email);
        if (!existingUser) {
          return NextResponse.json(
            { error: 'User exists but could not be found' },
            { status: 500 }
          );
        }
        
        userId = existingUser.id;
        console.log('Found existing user:', userId);
        
        // Update user metadata
        await supabase.auth.admin.updateUserById(userId, {
          user_metadata: {
            name: name || 'Super Admin',
            role: 'super_admin'
          }
        });
      } else {
        throw authError;
      }
    } else {
      userId = authData.user.id;
      console.log('Created new user:', userId);
    }

    // Insert or update in database
    try {
      // Try insert first
      await db.insert(users).values({
        id: userId,
        email,
        name: name || 'Super Admin',
        role: 'super_admin',
        tenantId: null,
        emailVerified: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Inserted into database');
    } catch (dbError: any) {
      // If insert fails, try update
      if (dbError.code === '23505') { // Unique violation
        await db.update(users)
          .set({
            role: 'super_admin',
            tenantId: null,
            name: name || 'Super Admin',
            emailVerified: new Date(),
            isActive: true,
            updatedAt: new Date()
          })
          .where(eq(users.id, userId));
        console.log('Updated database record');
      } else {
        throw dbError;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Super admin created successfully',
      data: {
        userId,
        email,
        role: 'super_admin',
        loginUrl: '/platform/login'
      }
    });

  } catch (error: any) {
    console.error('Error creating super admin:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create super admin',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check if super admin exists
export async function GET() {
  try {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'This endpoint is disabled in production' },
        { status: 403 }
      );
    }

    const superAdmins = await db.query.users.findMany({
      where: eq(users.role, 'super_admin'),
      columns: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      count: superAdmins.length,
      superAdmins
    });

  } catch (error: any) {
    console.error('Error checking super admins:', error);
    return NextResponse.json(
      { error: 'Failed to check super admins', details: error.message },
      { status: 500 }
    );
  }
}
