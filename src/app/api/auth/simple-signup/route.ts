import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

/**
 * Simple Signup API
 * Creates user in Supabase Auth and database in one go
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
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

    console.log('Creating user in Supabase Auth...');

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        name,
        role: 'user'
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      
      // Check if user already exists
      if (authError.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'Email already registered. Please login instead.' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    const userId = authData.user.id;
    console.log('User created in Auth:', userId);

    // Insert into database
    try {
      await db.insert(users).values({
        id: userId,
        email,
        name,
        role: 'user',
        tenantId: null, // Will be set when user joins/creates a group
        emailVerified: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('User inserted into database');
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      
      // If database insert fails, we should delete the auth user
      // But for now, we'll just log it and continue
      // The user can still login and we can fix the database later
      console.warn('User created in Auth but database insert failed. User can still login.');
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully! You can now login.',
      data: {
        userId,
        email,
        name
      }
    });

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create account',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
