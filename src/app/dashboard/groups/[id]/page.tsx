"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  DollarSign, 
  Trophy, 
  Settings, 
  Eye,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  Share2,
  Crown,
  UserCheck
} from "lucide-react"
import Link from "next/link"

interface ArisanGroup {
  id: string
  tenantId: string
  adminId: string
  name: string
  description?: string
  imageUrl?: string
  maxParticipants: number
  contributionAmount: string
  totalPeriods: number
  currentPeriod: number
  isActive: boolean
  inviteCode: string
  settings?: any
  createdAt: string
  updatedAt: string
  _count?: {
    members: number
  }
}

interface ArisanMember {
  id: string
  groupId: string
  userId: string
  role: 'participant' | 'admin' | 'winner'
  joinedAt: string
  isActive: boolean
  user?: {
    id: string
    name?: string
    email: string
    avatar?: string
  }
}

interface ArisanPeriod {
  id: string
  groupId: string
  periodNumber: number
  status: 'active' | 'completed' | 'cancelled'
  startDate: string
  drawDate?: string
  paymentDeadline?: string
  allPaidAt?: string
  allLoggedInAt?: string
  readyToDrawAt?: string
  winnerId?: string
  prizeAmount?: string
  winnerAmount?: string
  platformFee?: string
  adminFee?: string
  affiliateFee?: string
  winner?: {
    id: string
    name?: string
    email: string
    avatar?: string
  }
}

export default function GroupDetailPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const params = useParams()
  const groupId = params.id as string

  const [loading, setLoading] = useState(true)
  const [group, setGroup] = useState<ArisanGroup | null>(null)
  const [members, setMembers] = useState<ArisanMember[]>([])
  const [periods, setPeriods] = useState<ArisanPeriod[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    if (user && groupId) {
      loadGroupData()
    }
  }, [user, groupId])

  const loadGroupData = async () => {
    try {
      const [groupRes, membersRes, periodsRes] = await Promise.all([
        fetch(`/api/arisan-groups/${groupId}`),
        fetch(`/api/arisan-groups/${groupId}/members`),
        fetch(`/api/arisan-groups/${groupId}/periods`)
      ])

      if (groupRes.ok) {
        const groupData = await groupRes.json()
        setGroup(groupData.data)
      }

      if (membersRes.ok) {
        const membersData = await membersRes.json()
        setMembers(membersData.data || [])
      }

      if (periodsRes.ok) {
        const periodsData = await periodsRes.json()
        setPeriods(periodsData.data || [])
      }
    } catch (error) {
      console.error('Error loading group data:', error)
      setError('Gagal memuat data grup')
    } finally {
      setLoading(false)
    }
  }

  const handlePayContribution = async (periodId: string) => {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          periodId,
          amount: group?.contributionAmount,
          type: 'contribution'
        })
      })

      if (response.ok) {
        // Refresh data
        loadGroupData()
      }
    } catch (error) {
      console.error('Error processing payment:', error)
      setError('Gagal memproses pembayaran')
    }
  }

  const handleLeaveGroup = async () => {
    if (!confirm('Apakah Anda yakin ingin keluar dari grup ini?')) {
      return
    }

    try {
      const response = await fetch(`/api/arisan-groups/${groupId}/leave`, {
        method: 'POST'
      })

      if (response.ok) {
        router.push('/dashboard/groups')
      }
    } catch (error) {
      console.error('Error leaving group:', error)
      setError('Gagal keluar dari grup')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      active: 'default',
      completed: 'secondary',
      cancelled: 'destructive'
    }
    
    const labels: Record<string, string> = {
      active: 'Aktif',
      completed: 'Selesai',
      cancelled: 'Dibatalkan'
    }

    return (
      <Badge variant={variants[status] || 'outline'}>
        {labels[status] || status}
      </Badge>
    )
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-600" />
      case 'winner':
        return <Trophy className="h-4 w-4 text-green-600" />
      default:
        return <UserCheck className="h-4 w-4 text-blue-600" />
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Anda harus login untuk melihat detail grup</p>
          <Button onClick={() => router.push('/auth')} className="mt-4">
            Login
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500">{error || 'Grup tidak ditemukan'}</p>
          <Button onClick={() => router.back()} className="mt-4">
            Kembali
          </Button>
        </div>
      </div>
    )
  }

  const isAdmin = group.adminId === user.id
  const currentUserMember = members.find(m => m.userId === user.id)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">{group.name}</h1>
            {getStatusBadge(group.isActive ? 'active' : 'cancelled')}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(group.inviteCode)}>
              <Share2 className="mr-2 h-4 w-4" />
              Kode: {group.inviteCode}
            </Button>
            {isAdmin && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/groups/${groupId}/settings`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Pengaturan
                </Link>
              </Button>
            )}
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Group Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Informasi Grup
              </CardTitle>
              <CardDescription>
                Detail dan statistik grup arisan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    {members.length}/{group.maxParticipants}
                  </div>
                  <div className="text-sm text-blue-700">Total Peserta</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    Rp {parseInt(group.contributionAmount).toLocaleString('id-ID')}
                  </div>
                  <div className="text-sm text-green-700">Iuran Per Periode</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {group.currentPeriod}/{group.totalPeriods}
                  </div>
                  <div className="text-sm text-purple-700">Periode Saat Ini</div>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">
                    {periods.filter(p => p.status === 'completed').length}
                  </div>
                  <div className="text-sm text-orange-700">Periode Selesai</div>
                </div>
              </div>

              {group.description && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Deskripsi Grup</h4>
                  <p className="text-muted-foreground">{group.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="members" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="members">Anggota</TabsTrigger>
              <TabsTrigger value="periods">Periode</TabsTrigger>
              <TabsTrigger value="activity">Aktivitas</TabsTrigger>
              <TabsTrigger value="payments">Pembayaran</TabsTrigger>
            </TabsList>

            {/* Members Tab */}
            <TabsContent value="members" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daftar Anggota</CardTitle>
                  <CardDescription>
                    Semua anggota yang tergabung dalam grup ini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {member.user?.avatar ? (
                              <img
                                src={member.user.avatar}
                                alt={member.user.name || member.user.email}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-medium">
                                {(member.user?.name || member.user.email).charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">
                                {member.user?.name || member.user.email}
                              </h4>
                              <div className="flex items-center gap-1">
                                {getRoleIcon(member.role)}
                                <span className="text-xs text-muted-foreground capitalize">
                                  {member.role}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Bergabung {new Date(member.joinedAt).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {member.isActive ? (
                            <Badge variant="default">Aktif</Badge>
                          ) : (
                            <Badge variant="secondary">Tidak Aktif</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Periods Tab */}
            <TabsContent value="periods" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Periode</CardTitle>
                  <CardDescription>
                    Status dan pemenang setiap periode arisan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {periods.map((period) => (
                      <div key={period.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">Periode {period.periodNumber}</h4>
                            {getStatusBadge(period.status)}
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(period.status)}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Mulai:</span>
                            <span className="ml-2 font-medium">
                              {new Date(period.startDate).toLocaleDateString('id-ID')}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Deadline Pembayaran:</span>
                            <span className="ml-2 font-medium">
                              {period.paymentDeadline 
                                ? new Date(period.paymentDeadline).toLocaleDateString('id-ID')
                                : '-'
                              }
                            </span>
                          </div>
                          {period.drawDate && (
                            <div>
                              <span className="text-muted-foreground">Tanggal Undian:</span>
                              <span className="ml-2 font-medium">
                                {new Date(period.drawDate).toLocaleDateString('id-ID')}
                              </span>
                            </div>
                          )}
                          {period.winner && (
                            <div>
                              <span className="text-muted-foreground">Pemenang:</span>
                              <span className="ml-2 font-medium">
                                {period.winner.name || period.winner.email}
                              </span>
                            </div>
                          )}
                        </div>

                        {period.status === 'active' && currentUserMember && (
                          <div className="mt-4 pt-4 border-t">
                            <Button 
                              className="w-full"
                              onClick={() => handlePayContribution(period.id)}
                              disabled={false} // Add payment status check
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Bayar Iuran
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terkini</CardTitle>
                  <CardDescription>
                    Log aktivitas dalam grup ini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Belum ada aktivitas</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Pembayaran</CardTitle>
                  <CardDescription>
                    Status pembayaran iuran Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Belum ada pembayaran</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          {currentUserMember && !isAdmin && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleLeaveGroup}
                    className="text-destructive hover:text-destructive"
                  >
                    Keluar dari Grup
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}