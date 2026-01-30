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
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-slate-400">
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
          <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <FileCheck className="h-5 w-5" />
                Verifikasi KYC Diperlukan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Anda perlu menyelesaikan verifikasi KYC untuk dapat mengakses semua fitur platform.
              </p>
              <Button 
                className="mt-4" 
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
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Grup</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">{stats.totalGroups}</div>
              <p className="text-xs text-slate-400">Arisan groups</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Grup Aktif</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">{stats.activeGroups}</div>
              <p className="text-xs text-slate-400">Sedang berjalan</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Saldo Wallet</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">{stats.walletBalance}</div>
              <p className="text-xs text-slate-400">Tersedia</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Transaksi</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">{stats.totalTransactions}</div>
              <p className="text-xs text-slate-400">Semua transaksi</p>
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
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Grup Arisan Saya</CardTitle>
                <CardDescription className="text-slate-400">
                  Kelola dan pantau semua grup arisan yang Anda ikuti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Belum ada grup</h3>
                  <p className="text-slate-400 mb-6">
                    Anda belum bergabung dengan grup arisan mana pun
                  </p>
                  <div className="flex gap-3">
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
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Riwayat Transaksi</CardTitle>
                <CardDescription className="text-slate-400">
                  Pantau semua transaksi masuk dan keluar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center mb-4 mx-auto">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-slate-400">Belum ada transaksi</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Wallet Saya</CardTitle>
                <CardDescription className="text-slate-400">
                  Kelola saldo dan penarikan dana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Saldo Tersedia</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">{stats.walletBalance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Total Penghasilan</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">{stats.totalEarnings}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-primary/20">
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