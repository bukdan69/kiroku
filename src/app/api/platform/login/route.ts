import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { users, auditLogs } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return NextResponse.redirect(
        new URL('/platform/login?error=missing_credentials', request.url)
      );
    }

    // 1. Authenticate dengan Supabase
    const supabase = await createServerClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      // Log failed login attempt
      await db.insert(auditLogs).values({
        tenantId: 'platform', // Special tenant for platform admin
        action: 'login',
        entityType: 'platform_admin',
        metadata: {
          email,
          success: false,
          reason: authError?.message || 'Invalid credentials',
        },
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      });

      return NextResponse.redirect(
        new URL('/platform/login?error=invalid_credentials', request.url)
      );
    }

    // 2. Check if user is super_admin
    const user = await db.query.users.findFirst({
      where: and(
        eq(users.id, authData.user.id),
        eq(users.role, 'super_admin')
      ),
    });

    if (!user) {
      // Not a super admin - sign out
      await supabase.auth.signOut();

      // Log unauthorized attempt
      await db.insert(auditLogs).values({
        userId: authData.user.id,
        tenantId: 'platform',
        action: 'login',
        entityType: 'platform_admin',
        metadata: {
          email,
          success: false,
          reason: 'Not a super admin',
        },
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      });

      return NextResponse.redirect(
        new URL('/platform/login?error=unauthorized', request.url)
      );
    }

    // 3. Update last login
    await db.update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id));

    // 4. Log successful login
    await db.insert(auditLogs).values({
      userId: user.id,
      tenantId: 'platform',
      action: 'login',
      entityType: 'platform_admin',
      metadata: {
        email,
        success: true,
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    // 5. Redirect to platform dashboard
    return NextResponse.redirect(new URL('/platform/dashboard', request.url));
  } catch (error) {
    console.error('Platform login error:', error);
    return NextResponse.redirect(
      new URL('/platform/login?error=server_error', request.url)
    );
  }
}
