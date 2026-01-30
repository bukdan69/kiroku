"use client"

import { useState, useMemo } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  FileCheck, 
  Settings, 
  Shield, 
  BarChart3, 
  ScrollText, 
  UserCheck, 
  Bell,
  Menu,
  X,
  LogOut,
  User,
  Database,
  FileDown,
  Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/AuthContext'
import { useNotifications } from '@/hooks/useNotifications'
import { useCurrentTenant } from '@/hooks/useCurrentTenant'
import { useUserRole } from '@/hooks/useUserRole'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItem {
  title: string
  href: string
  icon: any
  badge?: string
  show?: boolean
}

export function AppSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, signOut } = useAuth()
  const { unreadCount } = useNotifications()
  const { tenantName } = useCurrentTenant()
  const { isSuperAdmin, isAdmin } = useUserRole()
  const pathname = usePathname()

  const memberItems = useMemo<SidebarItem[]>(
    () => [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "My Groups", href: "/dashboard/groups", icon: Users },
      { title: "Create Group", href: "/dashboard/groups/create", icon: Users },
      { title: "Join Group", href: "/dashboard/groups/join", icon: Users },
      { title: "Wallet", href: "/dashboard/wallet", icon: Wallet },
      { title: "Transactions", href: "/dashboard/transactions", icon: BarChart3 },
      { title: "Profile", href: "/dashboard/profile", icon: User },
      { title: "KYC", href: "/dashboard/kyc", icon: FileCheck },
    ],
    [],
  )

  const adminItems = useMemo<SidebarItem[]>(
    () => [
      { title: "Admin Dashboard", href: "/admin", icon: Shield },
      { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { title: "KYC Users", href: "/admin/kyc-users", icon: Users },
      { title: "KYC Review", href: "/admin/kyc-review", icon: UserCheck },
      { title: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText },
      { title: "Security", href: "/admin/security", icon: Shield },
      { title: "User Management", href: "/admin/users", icon: Users },
      { title: "Settings", href: "/admin/settings", icon: Settings },
      { title: "Data Export", href: "/admin/export", icon: Database },
      { title: "Payments Export", href: "/admin/payments-export", icon: FileDown },
      { title: "Payment Reminders", href: "/admin/payment-reminders", icon: Bell },
    ],
    [isAdmin],
  )

  const superAdminItems = useMemo<SidebarItem[]>(
    () => [
      { title: "Tenant Management", href: "/admin/tenants", icon: Building2 },
    ],
    [],
  )

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname.startsWith(href)
    if (href === '/admin') return pathname.startsWith(href)
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <div className={cn(
      "pb-12 border-r bg-background",
      sidebarOpen ? "w-64" : "w-16"
    )}>
      {/* Mobile menu toggle */}
      <div className="flex h-16 items-center justify-between border-b px-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email} />
            <AvatarFallback>{user?.email?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Users className="h-4 w-4" />
        </div>
        {sidebarOpen && (
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">ArisanKU</div>
            {tenantName && (
              <div className="truncate text-xs text-muted-foreground">{tenantName}</div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {/* Member Menu */}
        <div className="px-3 pb-4">
          <h2 className={cn(
            "mb-2 px-2 text-xs font-semibold text-muted-foreground",
            !sidebarOpen && "opacity-0"
          )}>
            Menu
          </h2>
          <nav className="space-y-1">
            {memberItems
              .filter((item) => item.show !== false)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    isActive(item.href) && "bg-accent text-accent-foreground",
                    !sidebarOpen && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {sidebarOpen && (
                    <>
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              ))}
            </nav>
        </div>

        {/* Admin Menu */}
        {(isAdmin || isSuperAdmin) && (
          <div className="px-3 pb-4">
            <div className="flex items-center justify-between">
              <h2 className={cn(
                "mb-2 px-2 text-xs font-semibold text-muted-foreground flex items-center gap-2",
                !sidebarOpen && "opacity-0"
              )}>
                <Shield className="h-3 w-3" />
                {sidebarOpen && "Admin Panel"}
              </h2>
              {sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <nav className={cn(
              "space-y-1",
              !sidebarOpen && "flex flex-col items-center space-y-0"
            )}>
              {adminItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    isActive(item.href) && "bg-accent text-accent-foreground",
                    !sidebarOpen && "justify-center px-2 py-1.5 text-xs"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {sidebarOpen && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>

            {/* Super Admin Section */}
            {isSuperAdmin && (
              <div className={cn(
                "mt-4 pt-2 border-t",
                !sidebarOpen && "hidden"
              )}>
                <h3 className="px-2 text-xs font-semibold text-muted-foreground">Super Admin</h3>
                <nav className="space-y-1 mt-2">
                {superAdminItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                      isActive(item.href) && "bg-accent text-accent-foreground",
                      !sidebarOpen && "justify-center px-2 py-1.5 text-xs"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {sidebarOpen && <span>{item.title}</span>}
                  </Link>
                ))}
              </nav>
            </div>
            )}

        {/* Notifications */}
        {sidebarOpen && (
          <div className="border-t px-3 py-4">
            <Link
              href="/dashboard/notifications"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors relative",
                pathname.startsWith("/dashboard/notifications") && "bg-accent text-accent-foreground"
              )}
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Link>
          </div>
        )}

        {/* User Section */}
        <div className="border-t px-3 py-4">
          <div className={cn(
            "flex items-center gap-3",
            !sidebarOpen && "flex-col justify-center"
          )}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email} />
              <AvatarFallback>{user?.email?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{user?.email}</div>
                {isSuperAdmin && (
                  <Badge variant="secondary" className="mt-1">
                    SUPER ADMIN
                  </Badge>
                )}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut()}
            className={cn(
              "h-8 w-8",
              !sidebarOpen && "hidden"
            )}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      </div>

      {/* Mobile Backdrop */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}
    </div>
  )
}