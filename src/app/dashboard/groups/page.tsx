"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Calendar, DollarSign, ArrowRight, UserPlus } from "lucide-react"

interface ArisanGroup {
  id: string
  name: string
  description?: string
  maxParticipants: number
  contributionAmount: string
  totalPeriods: number
  currentPeriod: number
  isActive: boolean
  inviteCode: string
  createdAt: string
  _count?: {
    participants: number
  }
}

export default function GroupsPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState<ArisanGroup[]>([])

  useEffect(() => {
    if (user) {
      loadGroups()
    }
  }, [user])

  const loadGroups = async () => {
    try {
      const response = await fetch('/api/arisan-groups')
      if (response.ok) {
        const data = await response.json()
        setGroups(data.data || [])
      }
    } catch (error) {
      console.error('Error loading groups:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGroup = () => {
    router.push('/dashboard/groups/create')
  }

  const handleJoinGroup = () => {
    router.push('/dashboard/groups/join')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Anda harus login untuk melihat grup</p>
          <Button onClick={() => router.push('/auth')} className="mt-4">
            Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
            <h1 className="text-xl font-semibold">Grup Arisan Saya</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Grup Arisan</h2>
            <p className="text-muted-foreground">Kelola dan lihat semua grup arisan Anda</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleJoinGroup}>
              <UserPlus className="mr-2 h-4 w-4" />
              Gabung Grup
            </Button>
            <Button onClick={handleCreateGroup}>
              <Plus className="mr-2 h-4 w-4" />
              Buat Grup Baru
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : groups.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Belum Ada Grup</h3>
            <p className="text-muted-foreground mb-4">
              Anda belum bergabung dengan grup arisan mana pun. Buat grup baru atau gabung dengan grup yang sudah ada.
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={handleJoinGroup}>
                Gabung Grup
              </Button>
              <Button onClick={handleCreateGroup}>
                Buat Grup Baru
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      {group.description && (
                        <CardDescription className="mt-1">
                          {group.description}
                        </CardDescription>
                      )}
                    </div>
                    <Badge variant={group.isActive ? "default" : "secondary"}>
                      {group.isActive ? "Aktif" : "Tidak Aktif"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Peserta</span>
                      </div>
                      <span className="font-medium">
                        {group._count?.participants || 0}/{group.maxParticipants}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Iuran</span>
                      </div>
                      <span className="font-medium">
                        Rp {parseInt(group.contributionAmount).toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Periode</span>
                      </div>
                      <span className="font-medium">
                        {group.currentPeriod}/{group.totalPeriods}
                      </span>
                    </div>

                    <div className="pt-2">
                      <Button 
                        className="w-full" 
                        onClick={() => router.push(`/dashboard/groups/${group.id}`)}
                      >
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}