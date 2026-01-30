"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  BarChart3, 
  UserCheck, 
  ScrollText, 
  Shield, 
  Settings,
  Users2,
  Activity,
  CreditCard,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGroups: 0,
    totalTransactions: 0,
    totalKycPending: 0,
    totalRevenue: 'Rp 0',
    activeUsers: 0,
    systemHealth: 'operational',
    paymentGatewayStatus: 'connected'
  })

  useEffect(() => {
    // Load admin dashboard stats
    const loadStats = async () => {
      // Mock data for now - will be fetched from API
      setStats({
        totalUsers: 1247,
        totalGroups: 89,
        totalTransactions: 3421,
        totalKycPending: 23,
        totalRevenue: 'Rp 45.678.900',
        activeUsers: 456,
        systemHealth: 'operational',
        paymentGatewayStatus: 'connected'
      })
    }

    loadStats()
  }, [])

  if (!user) {
    router.push('/auth')
    return null
  }

  return (
    <AppShell>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Kelola platform dan monitor aktivitas</p>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Shield className="mr-1 h-3 w-3" />
            Admin Panel
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
              <Users2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGroups}</div>
              <p className="text-xs text-muted-foreground">Active arisan groups</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTransactions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">KYC Pending</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.totalKycPending}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.totalRevenue}</div>
              <p className="text-xs text-muted-foreground">Platform revenue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">Currently online</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage platform features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  User Management
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/kyc">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Review KYC
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/groups">
                  <Users2 className="mr-2 h-4 w-4" />
                  Manage Groups
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/audit">
                  <ScrollText className="mr-2 h-4 w-4" />
                  Audit Logs
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Platform Settings
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Platform operational status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Platform Status</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  {stats.systemHealth}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Payment Gateway</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  {stats.paymentGatewayStatus}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Healthy
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">New user registration</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 menit lalu</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Payment processed</span>
                  </div>
                  <span className="text-xs text-muted-foreground">15 menit lalu</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">KYC pending review</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 jam lalu</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/admin/activity">
                  <Activity className="mr-2 h-4 w-4" />
                  View All Activity
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Admin Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Tools</CardTitle>
            <CardDescription>Advanced administrative functions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="kyc">KYC</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="search-users">Search Users</Label>
                    <Input id="search-users" placeholder="Cari user..." />
                  </div>
                  <div>
                    <Label htmlFor="filter-role">Filter by Role</Label>
                    <select id="filter-role" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">All Roles</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/admin/users/manage">
                    Manage All Users
                  </Link>
                </Button>
              </TabsContent>

              <TabsContent value="kyc" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Pending KYC Reviews</h4>
                      <p className="text-sm text-muted-foreground">{stats.totalKycPending} users awaiting review</p>
                    </div>
                    <Button asChild>
                      <Link href="/admin/kyc/pending">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Review Now
                      </Link>
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/kyc/all">
                      <UserCheck className="mr-2 h-4 w-4" />
                      All KYC Status
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/security/violations">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      View Violations
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/security/fraud">
                      <Shield className="mr-2 h-4 w-4" />
                      Fraud Detection
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/security/audit">
                      <ScrollText className="mr-2 h-4 w-4" />
                      Audit Trails
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}