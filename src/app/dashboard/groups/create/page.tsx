"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Users, ArrowLeft } from "lucide-react"

export default function CreateGroupPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxParticipants: 10,
    contributionAmount: "",
    totalPeriods: 12
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch('/api/arisan-groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Gagal membuat grup')
      }

      const result = await response.json()
      router.push('/dashboard/groups')
    } catch (error) {
      console.error('Error creating group:', error)
      setError('Terjadi kesalahan saat membuat grup. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxParticipants' || name === 'totalPeriods' ? parseInt(value) || 0 : value
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Anda harus login untuk membuat grup arisan</p>
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
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">Buat Grup Arisan Baru</h1>
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
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Informasi Grup Arisan
              </CardTitle>
              <CardDescription>
                Buat grup arisan baru untuk mulai menabung bersama teman-teman Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive">{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nama Grup *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Contoh: Arisan Keluarga Bahagia"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="maxParticipants">Jumlah Peserta *</Label>
                      <select
                        id="maxParticipants"
                        name="maxParticipants"
                        value={formData.maxParticipants}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        {[5, 10, 15, 20, 25, 30].map(num => (
                          <option key={num} value={num}>{num} orang</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contributionAmount">Jumlah Iuran per Periode *</Label>
                      <Input
                        id="contributionAmount"
                        name="contributionAmount"
                        type="number"
                        value={formData.contributionAmount}
                        onChange={handleChange}
                        placeholder="Contoh: 500000"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="totalPeriods">Jumlah Periode *</Label>
                      <select
                        id="totalPeriods"
                        name="totalPeriods"
                        value={formData.totalPeriods}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        {[6, 12, 18, 24, 36].map(num => (
                          <option key={num} value={num}>{num} periode ({num} bulan)</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Deskripsi Grup</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Deskripsikan grup arisan Anda..."
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={loading}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Membuat Grup..." : "Buat Grup"}
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