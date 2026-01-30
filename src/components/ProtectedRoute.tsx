"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Public routes that don't require authentication
  const publicRoutes = ['/auth', '/auth/callback', '/', '/api']

  const isPublicRoute = publicRoutes.some(route => 
    typeof window !== 'undefined' && window.location.pathname.startsWith(route)
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user && !isPublicRoute) {
    router.push('/auth')
    return null
  }

  return <>{children}</>
}

interface AdminRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AdminRoute({ children, redirectTo = "/dashboard" }: AdminRouteProps) {
  const { isSuperAdmin, isAdmin, loading } = useAuth()
  const pathname = useRouter()

  // Admin routes that require admin or super admin role
  const adminRoutes = ['/admin']

  const isAdminRoute = adminRoutes.some(route => pathname.pathname.startsWith(route))

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Check if user has admin or super admin role
  const hasAdminRole = isAdmin || isSuperAdmin

  if (isAdminRoute && !hasAdminRole) {
    if (typeof window !== 'undefined') {
      window.location.href = redirectTo
    }
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

interface SuperAdminRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function SuperAdminRoute({ children, redirectTo = "/dashboard" }: SuperAdminRouteProps) {
  const { isSuperAdmin, loading } = useAuth()
  const pathname = useRouter()

  // Super admin routes that require super admin role
  const superAdminRoutes = ['/admin/tenants', '/admin/system']

  const isSuperAdminRoute = superAdminRoutes.some(route => pathname.pathname.startsWith(route))

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (isSuperAdminRoute && !isSuperAdmin) {
    if (typeof window !== 'undefined') {
      window.location.href = redirectTo
    }
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have super admin permission to access this page.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}