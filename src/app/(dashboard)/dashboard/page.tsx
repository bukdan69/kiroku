"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useNotifications } from '@/hooks/useNotifications'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useUserRole } from '@/hooks/useUserRole'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Wallet, 
  FileCheck, 
  BarChart3, 
  Plus, 
  Eye,
  Bell,
  Settings,
  Shield,
  User
} from 'lucide-react'
import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'

export default function DashboardPage() {
  const { user } = useAuth()
  const { unreadCount } = useNotifications()
  const { profile } = useUserProfile()
  const { isSuperAdmin, isAdmin } = useUserRole()
  const router = useRouter()

  const [stats, setStats] = useState({
    totalGroups: 0,
    activeGroups: 0,
    totalEarnings: 'Rp 0',
    totalTransactions: 0,
    walletBalance: 'Rp 0'
  })

  const [kycStatus, setKycStatus] = useState<'not_submitted' | 'pending' | 'approved' | 'rejected'>('not_submitted')

  useEffect(() => {
    // Load dashboard stats
    const loadStats = async () => {
      // Mock data for now - will be fetched from API
      setStats({
        totalGroups: 3,
        activeGroups: 2,
        totalEarnings: 'Rp 2.500.000',
        totalTransactions: 15,
        walletBalance: 'Rp 500.000'
      })
    }

    // Load KYC status
    const loadKycStatus = async () => {
      // Mock KYC status - will be fetched from API
      setKycStatus('approved')
    }

    loadStats()
    loadKycStatus()
  }, [])

  const kycApproved = kycStatus === 'approved'

  if (!user) {
    router.push('/auth')
    return null
  }

  return (
    <AppShell>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Selamat datang kembali, {profile?.name || user.email}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Button>

            {/* User Actions */}
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </Button>

            {(isAdmin || isSuperAdmin) && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Panel
                </Link>
              </Button>
            )}

            <Button
              onClick={() => router.push('/dashboard/groups/create')}
              size="lg"
              disabled={!kycApproved}
              title={!kycApproved ? 'KYC harus disetujui untuk menggunakan fitur ini' : undefined}
            >
              <Plus className="mr-2 h-4 w-4" />
              Buat Grup Baru
            </Button>
          </div>
        </div>

        {/* KYC Status Banner */}
        {!kycApproved && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <FileCheck className="h-5 w-5" />
                Verifikasi KYC Diperlukan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700">
                Anda perlu menyelesaikan verifikasi KYC untuk dapat mengakses semua fitur platform.
              </p>
              <Button 
                className="mt-2" 
                variant="outline"
                onClick={() => router.push('/dashboard/kyc')}
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Verifikasi Sekarang
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Grup</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGroups}</div>
              <p className="text-xs text-muted-foreground">Arisan groups</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Grup Aktif</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeGroups}</div>
              <p className="text-xs text-muted-foreground">Sedang berjalan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Wallet</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.walletBalance}</div>
              <p className="text-xs text-muted-foreground">Tersedia</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTransactions}</div>
              <p className="text-xs text-muted-foreground">Semua transaksi</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="groups" className="space-y-4">
          <TabsList>
            <TabsTrigger value="groups">Grup Saya</TabsTrigger>
            <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Grup Arisan Saya</CardTitle>
                <CardDescription>
                  Kelola dan pantau semua grup arisan yang Anda ikuti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Belum ada grup</h3>
                  <p className="text-muted-foreground mb-4">
                    Anda belum bergabung dengan grup arisan mana pun
                  </p>
                  <div className="space-x-2">
                    <Button asChild>
                      <Link href="/dashboard/groups/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Buat Grup Baru
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/groups/browse">
                        <Eye className="mr-2 h-4 w-4" />
                        Jelajahi Grup
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Transaksi</CardTitle>
                <CardDescription>
                  Pantau semua transaksi masuk dan keluar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mb-4 mx-auto" />
                  <p className="text-muted-foreground">Belum ada transaksi</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Saya</CardTitle>
                <CardDescription>
                  Kelola saldo dan penarikan dana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Saldo Tersedia</p>
                      <p className="text-2xl font-bold">{stats.walletBalance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Penghasilan</p>
                      <p className="text-2xl font-bold">{stats.totalEarnings}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      <Wallet className="mr-2 h-4 w-4" />
                      Tarik Dana
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}