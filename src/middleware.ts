import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = ['/dashboard', '/api/protected']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Public routes
  const publicRoutes = ['/', '/auth', '/api/auth']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (!isProtectedRoute && !isPublicRoute) {
    return NextResponse.next()
  }

  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/auth', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  if (user && pathname === '/auth') {
    const redirectUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Update user last login time for authenticated requests
  if (user && isProtectedRoute) {
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