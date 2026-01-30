"use client"

import { ReactNode } from 'react'
import { AppSidebar } from './AppSidebar'
import { useAuth } from '@/contexts/AuthContext'
import { useUserRole } from '@/hooks/useUserRole'
import { useCurrentTenant } from '@/hooks/useCurrentTenant'
import { useNotifications } from '@/hooks/useNotifications'
import { useUserProfile } from '@/hooks/useUserProfile'
import { Badge } from '@/components/ui/badge'
import { Bell, Building2, LogOut, Shield, User2, BadgeCheck, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { user, loading, signOut } = useAuth()
  const { isSuperAdmin } = useUserRole()
  const { tenantName } = useCurrentTenant()
  const { unreadCount } = useNotifications()
  const { profile } = useUserProfile()
  const router = useRouter()

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

  const displayName = profile?.fullName || user?.user_metadata?.full_name || user?.email || "User"
  const displayEmail = profile?.email || user?.email || null
  const initials = (displayName || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p: string) => p[0]?.toUpperCase())
    .join("")

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 lg:pl-64">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex-1 flex items-center gap-3">
            {isSuperAdmin && (
              <Badge variant="secondary" className="gap-1.5">
                <Shield className="h-3 w-3" />
                SUPER ADMIN
              </Badge>
            )}
            
            {tenantName && (
              <Badge variant="outline" className="gap-1.5">
                <Building2 className="h-3 w-3" />
                {tenantName}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => router.push('/dashboard/notifications')}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatarUrl ?? undefined} alt={displayName} />
                    <AvatarFallback>{initials || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="p-0">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.avatarUrl ?? undefined} alt={displayName} />
                      <AvatarFallback>{initials || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-none truncate">{displayName}</p>
                      {displayEmail && (
                        <p className="mt-1 text-xs text-muted-foreground truncate">{displayEmail}</p>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}> 
                  <User2 className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/kyc')}> 
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  KYC
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}