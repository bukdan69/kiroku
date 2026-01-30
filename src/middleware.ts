import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Platform Admin routes (Super Admin only)
  const platformRoutes = ['/platform/dashboard', '/platform/kyc', '/platform/users', '/platform/fraud', '/platform/analytics', '/platform/audit', '/platform/settings', '/platform/affiliate']
  const isPlatformRoute = platformRoutes.some(route => pathname.startsWith(route))

  // Protected routes (Regular users)
  const protectedRoutes = ['/dashboard', '/admin', '/api/protected']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Public routes
  const publicRoutes = ['/', '/auth', '/api/auth', '/platform/login', '/panduan-pengelola', '/panduan-peserta', '/about', '/privacy', '/terms']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Allow public routes
  if (isPublicRoute && !isPlatformRoute && !isProtectedRoute) {
    return NextResponse.next()
  }

  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Platform Admin Protection
  if (isPlatformRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/platform/login', request.url))
    }

    // Check if user is super_admin
    try {
      const dbUser = await db.query.users.findFirst({
        where: eq(users.id, user.id),
      })

      if (!dbUser || dbUser.role !== 'super_admin') {
        // Not a super admin - redirect to platform login with error
        return NextResponse.redirect(new URL('/platform/login?error=unauthorized', request.url))
      }
    } catch (error) {
      console.error('Error checking super admin:', error)
      return NextResponse.redirect(new URL('/platform/login?error=server_error', request.url))
    }
  }

  // Regular Protected Routes
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Redirect authenticated users from auth page
  if (user && pathname === '/auth') {
    // Check role to redirect appropriately
    try {
      const dbUser = await db.query.users.findFirst({
        where: eq(users.id, user.id),
      })

      if (dbUser?.role === 'super_admin') {
        return NextResponse.redirect(new URL('/platform/dashboard', request.url))
      } else if (dbUser?.role === 'admin' || dbUser?.role === 'bandar') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      } else {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch (error) {
      console.error('Error checking user role:', error)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Update user last login time for authenticated requests
  if (user && (isProtectedRoute || isPlatformRoute)) {
    try {
      await db.update(users)
        .set({ 
          lastLoginAt: new Date()
        })
        .where(eq(users.id, user.id))
    } catch (error) {
      console.error('Error updating last login:', error)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}