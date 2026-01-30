"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Save, ArrowLeft, Mail, Phone, MapPin, Calendar } from "lucide-react"

interface UserProfile {
  id: string
  userId: string
  phoneNumber?: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
  dateOfBirth?: string
  bio?: string
  onboardingCompleted: boolean
  onboardingStep: string
  createdAt: string
  updatedAt: string
}

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    dateOfBirth: "",
    bio: ""
  })
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (user) {
      loadProfile()
    }
  }, [user])

  const loadProfile = async () => {
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const data = await response.json()
        if (data.profile) {
          setProfile(data.profile)
          setFormData({
            phoneNumber: data.profile.phoneNumber || "",
            address: data.profile.address || "",
            city: data.profile.city || "",
            province: data.profile.province || "",
            postalCode: data.profile.postalCode || "",
            dateOfBirth: data.profile.dateOfBirth?.split('T')[0] || "",
            bio: data.profile.bio || ""
          })
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setSuccess("")
    setError("")

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Gagal memperbarui profil')
      }

      setSuccess("Profil berhasil diperbarui!")
      await loadProfile() // Reload profile data
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Terjadi kesalahan saat memperbarui profil. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Anda harus login untuk melihat profil</p>
          <Button onClick={() => router.push('/auth')} className="mt-4">
            Login
          </Button>
        </div>
      </div>
    )
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">Profil Saya</h1>
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
        <div className="max-w-2xl mx-auto space-y-6">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informasi Akun
              </CardTitle>
              <CardDescription>
                Data akun dan informasi dasar Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email} />
                  <AvatarFallback className="text-lg">
                    {user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{user?.user_metadata?.full_name || user?.email}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {user?.email}
                  </div>
                  {profile?.onboardingCompleted && (
                    <Badge variant="default" className="mt-1">
                      Profil Lengkap
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
              <CardDescription>
                Lengkapi profil Anda untuk pengalaman yang lebih baik
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
                    {success}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber">Nomor Telepon</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="081234567890"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth">Tanggal Lahir</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Jl. Contoh No. 123, RT/RW 001/002"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">Kota</Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Jakarta"
                    />
                  </div>

                  <div>
                    <Label htmlFor="province">Provinsi</Label>
                    <Input
                      id="province"
                      name="province"
                      type="text"
                      value={formData.province}
                      onChange={handleChange}
                      placeholder="DKI Jakarta"
                    />
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Kode Pos</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Ceritakan sedikit tentang diri Anda..."
                    rows={4}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Menyimpan..." : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Profil
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}