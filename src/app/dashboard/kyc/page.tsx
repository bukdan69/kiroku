"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, FileCheck, AlertCircle, ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react"

interface KycVerification {
  id: string
  userId: string
  ktpNumber?: string
  ktpImageUrl?: string
  selfieImageUrl?: string
  ktpWithSelfieImageUrl?: string
  addressProofImageUrl?: string
  status: 'not_submitted' | 'pending' | 'approved' | 'rejected'
  rejectionReason?: string
  submittedAt?: string
  approvedAt?: string
  createdAt: string
  updatedAt: string
}

export default function KycPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [kycData, setKycData] = useState<KycVerification | null>(null)
  const [formData, setFormData] = useState({
    ktpNumber: "",
    ktpImage: null as File | null,
    selfieImage: null as File | null,
    ktpWithSelfieImage: null as File | null,
    addressProofImage: null as File | null
  })
  const [previews, setPreviews] = useState({
    ktpImage: "",
    selfieImage: "",
    ktpWithSelfieImage: "",
    addressProofImage: ""
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (user) {
      loadKycStatus()
    }
  }, [user])

  const loadKycStatus = async () => {
    try {
      const response = await fetch('/api/kyc')
      if (response.ok) {
        const data = await response.json()
        setKycData(data.kyc)
      }
    } catch (error) {
      console.error('Error loading KYC status:', error)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file maksimal 5MB")
        return
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Hanya file gambar yang diperbolehkan")
        return
      }

      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }))

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews(prev => ({
          ...prev,
          [fieldName]: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('Failed to upload file')
    }
    
    const result = await response.json()
    return result.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError("")
    setMessage("")

    try {
      // Validate all required files
      const requiredFiles = ['ktpImage', 'selfieImage', 'ktpWithSelfieImage', 'addressProofImage']
      const missingFiles = requiredFiles.filter(key => !formData[key as keyof typeof formData])
      
      if (missingFiles.length > 0) {
        setError("Mohon upload semua dokumen yang diperlukan")
        return
      }

      // Upload all files
      const [ktpImageUrl, selfieImageUrl, ktpWithSelfieImageUrl, addressProofImageUrl] = await Promise.all([
        uploadFile(formData.ktpImage!),
        uploadFile(formData.selfieImage!),
        uploadFile(formData.ktpWithSelfieImage!),
        uploadFile(formData.addressProofImage!)
      ])

      const response = await fetch('/api/kyc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ktpNumber: formData.ktpNumber,
          ktpImageUrl,
          selfieImageUrl,
          ktpWithSelfieImageUrl,
          addressProofImageUrl
        }),
      })

      if (!response.ok) {
        throw new Error('Gagal mengirim verifikasi KYC')
      }

      setMessage("Verifikasi KYC berhasil dikirim! Kami akan memproses dalam 1-3 hari kerja.")
      await loadKycStatus() // Reload KYC status
    } catch (error) {
      console.error('Error submitting KYC:', error)
      setError('Terjadi kesalahan saat mengirim verifikasi KYC. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Anda harus login untuk mengakses halaman ini</p>
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      approved: 'default',
      pending: 'secondary',
      rejected: 'destructive',
      not_submitted: 'outline'
    }
    
    const labels: Record<string, string> = {
      approved: 'Disetujui',
      pending: 'Menunggu Verifikasi',
      rejected: 'Ditolak',
      not_submitted: 'Belum Mengajukan'
    }

    return (
      <Badge variant={variants[status] || 'outline'}>
        {labels[status] || status}
      </Badge>
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
            <h1 className="text-xl font-semibold">Verifikasi KYC</h1>
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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Status Verifikasi KYC
              </CardTitle>
              <CardDescription>
                Verifikasi identitas Anda untuk mengakses semua fitur platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {kycData ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(kycData.status)}
                      <div>
                        <p className="font-medium">Status Saat Ini</p>
                        <p className="text-sm text-muted-foreground">
                          {kycData.status === 'approved' && 'Identitas Anda telah diverifikasi'}
                          {kycData.status === 'pending' && 'Verifikasi Anda sedang diproses'}
                          {kycData.status === 'rejected' && `Verifikasi ditolak: ${kycData.rejectionReason || 'Tidak ada alasan'}`}
                          {kycData.status === 'not_submitted' && 'Anda belum mengajukan verifikasi'}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(kycData.status)}
                  </div>
                  
                  {kycData.submittedAt && (
                    <div className="text-sm text-muted-foreground">
                      Diajukan pada: {new Date(kycData.submittedAt).toLocaleString('id-ID')}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Belum ada data verifikasi</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* KYC Form - Show if not approved */}
          {kycData?.status !== 'approved' && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Dokumen Verifikasi</CardTitle>
                <CardDescription>
                  Mohon siapkan dokumen-dokumen berikut untuk verifikasi identitas
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
                  
                  {message && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
                      {message}
                    </div>
                  )}

                  {/* KTP Number */}
                  <div>
                    <Label htmlFor="ktpNumber">Nomor KTP *</Label>
                    <Input
                      id="ktpNumber"
                      name="ktpNumber"
                      type="text"
                      value={formData.ktpNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, ktpNumber: e.target.value }))}
                      placeholder="1234567890123456"
                      maxLength={16}
                      required
                    />
                  </div>

                  {/* File Uploads */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* KTP Image */}
                    <div>
                      <Label>Foto KTP *</Label>
                      <div className="mt-2">
                        {previews.ktpImage ? (
                          <div className="relative">
                            <img
                              src={previews.ktpImage}
                              alt="KTP"
                              className="w-full h-48 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, ktpImage: null }))
                                setPreviews(prev => ({ ...prev, ktpImage: "" }))
                              }}
                            >
                              Hapus
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <Label htmlFor="ktpImage" className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                              Klik untuk upload foto KTP
                              <Input
                                id="ktpImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'ktpImage')}
                                className="hidden"
                                required
                              />
                            </Label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Selfie Image */}
                    <div>
                      <Label>Foto Selfie *</Label>
                      <div className="mt-2">
                        {previews.selfieImage ? (
                          <div className="relative">
                            <img
                              src={previews.selfieImage}
                              alt="Selfie"
                              className="w-full h-48 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, selfieImage: null }))
                                setPreviews(prev => ({ ...prev, selfieImage: "" }))
                              }}
                            >
                              Hapus
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <Label htmlFor="selfieImage" className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                              Klik untuk upload foto selfie
                              <Input
                                id="selfieImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'selfieImage')}
                                className="hidden"
                                required
                              />
                            </Label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* KTP with Selfie */}
                    <div>
                      <Label>Foto KTP + Selfie *</Label>
                      <div className="mt-2">
                        {previews.ktpWithSelfieImage ? (
                          <div className="relative">
                            <img
                              src={previews.ktpWithSelfieImage}
                              alt="KTP dengan Selfie"
                              className="w-full h-48 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, ktpWithSelfieImage: null }))
                                setPreviews(prev => ({ ...prev, ktpWithSelfieImage: "" }))
                              }}
                            >
                              Hapus
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <Label htmlFor="ktpWithSelfieImage" className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                              Klik untuk upload foto KTP dengan selfie
                              <Input
                                id="ktpWithSelfieImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'ktpWithSelfieImage')}
                                className="hidden"
                                required
                              />
                            </Label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Address Proof */}
                    <div>
                      <Label>Bukti Alamat *</Label>
                      <div className="mt-2">
                        {previews.addressProofImage ? (
                          <div className="relative">
                            <img
                              src={previews.addressProofImage}
                              alt="Bukti Alamat"
                              className="w-full h-48 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, addressProofImage: null }))
                                setPreviews(prev => ({ ...prev, addressProofImage: "" }))
                              }}
                            >
                              Hapus
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <Label htmlFor="addressProofImage" className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                              Klik untuk upload bukti alamat (Rekening Listrik/PAM/Akta Kelahiran)
                              <Input
                                id="addressProofImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'addressProofImage')}
                                className="hidden"
                                required
                              />
                            </Label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Persyaratan Dokumen:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Foto KTP jelas dan tidak buram</li>
                      <li>• Selfie terbaru dengan wajah jelas</li>
                      <li>• Foto KTP ditangan dengan selfie (memegang KTP)</li>
                      <li>• Bukti alamat masih berlaku (max 3 bulan)</li>
                      <li>• Format file: JPG, PNG, atau PDF</li>
                      <li>• Ukuran maksimal: 5MB per file</li>
                    </ul>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Mengirim..." : "Kirim Verifikasi"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}