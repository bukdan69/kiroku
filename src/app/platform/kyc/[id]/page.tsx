import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Download, Eye, User, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "KYC Detail Review - Platform Admin",
  description: "Review detail verifikasi KYC user",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function KYCDetailPage({ params }: PageProps) {
  // Mock data - nanti akan diganti dengan real data dari database
  const kyc = {
    id: params.id,
    userId: "user-1",
    status: "pending",
    user: {
      name: "Budi Santoso",
      email: "budi@email.com",
      phone: "+62 812-3456-7890",
      joinedAt: "2026-01-15 10:30",
    },
    ktp: {
      number: "3201234567890123",
      name: "BUDI SANTOSO",
      birthDate: "1990-05-15",
      birthPlace: "Jakarta",
      address: "Jl. Merdeka No. 123, RT 05/RW 03",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      religion: "Islam",
      maritalStatus: "Kawin",
      occupation: "Karyawan Swasta",
    },
    images: {
      ktp: "/uploads/ktp-user-1.jpg",
      selfie: "/uploads/selfie-user-1.jpg",
      ktpWithSelfie: "/uploads/ktp-selfie-user-1.jpg",
    },
    submittedAt: "2026-01-29 10:30:45",
    metadata: {
      ipAddress: "103.123.45.67",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      location: "Jakarta, Indonesia",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/platform/kyc" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke KYC List
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">KYC Verification Detail</h1>
              <p className="text-sm text-muted-foreground">Review dan verifikasi identitas user</p>
            </div>
            
            <Badge variant={
              kyc.status === 'pending' ? 'outline' :
              kyc.status === 'approved' ? 'default' :
              'destructive'
            }>
              {kyc.status === 'pending' ? 'Pending Review' :
               kyc.status === 'approved' ? 'Approved' :
               'Rejected'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Info & KTP Data */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  User Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Nama Lengkap</Label>
                  <p className="font-semibold">{kyc.user.name}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <p className="text-sm">{kyc.user.email}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">No. Telepon</Label>
                  <p className="text-sm">{kyc.user.phone}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Bergabung</Label>
                  <p className="text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {kyc.user.joinedAt}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* KTP Data */}
            <Card>
              <CardHeader>
                <CardTitle>Data KTP</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">NIK</Label>
                  <p className="font-mono text-sm font-semibold">{kyc.ktp.number}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Nama (sesuai KTP)</Label>
                  <p className="text-sm">{kyc.ktp.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Tempat Lahir</Label>
                    <p className="text-sm">{kyc.ktp.birthPlace}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Tanggal Lahir</Label>
                    <p className="text-sm">{kyc.ktp.birthDate}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Alamat</Label>
                  <p className="text-sm">{kyc.ktp.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Kota</Label>
                    <p className="text-sm">{kyc.ktp.city}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Provinsi</Label>
                    <p className="text-sm">{kyc.ktp.province}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Agama</Label>
                    <p className="text-sm">{kyc.ktp.religion}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Status</Label>
                    <p className="text-sm">{kyc.ktp.maritalStatus}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Pekerjaan</Label>
                  <p className="text-sm">{kyc.ktp.occupation}</p>
                </div>
              </CardContent>
            </Card>

            {/* Submission Info */}
            <Card>
              <CardHeader>
                <CardTitle>Submission Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Submitted At</Label>
                  <p className="text-sm">{kyc.submittedAt}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">IP Address</Label>
                  <p className="text-sm font-mono">{kyc.metadata.ipAddress}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Location</Label>
                  <p className="text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {kyc.metadata.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Images & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Dokumen Verifikasi</CardTitle>
                <CardDescription>Review foto KTP dan selfie user</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* KTP Image */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="font-semibold">Foto KTP</Label>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="border-2 rounded-lg overflow-hidden bg-muted aspect-[16/10]">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">KTP Image Preview</p>
                        <p className="text-xs">Click "View Full" to see image</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selfie Image */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="font-semibold">Foto Selfie</Label>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="border-2 rounded-lg overflow-hidden bg-muted aspect-[16/10]">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Selfie Image Preview</p>
                        <p className="text-xs">Click "View Full" to see image</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* KTP with Selfie */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="font-semibold">Foto KTP dengan Selfie</Label>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="border-2 rounded-lg overflow-hidden bg-muted aspect-[16/10]">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">KTP + Selfie Image Preview</p>
                        <p className="text-xs">Click "View Full" to see image</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Checklist</CardTitle>
                <CardDescription>Pastikan semua kriteria terpenuhi sebelum approve</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Foto KTP jelas dan tidak blur",
                    "Data KTP dapat dibaca dengan jelas",
                    "Foto selfie sesuai dengan foto di KTP",
                    "Foto KTP + Selfie menunjukkan wajah yang sama",
                    "NIK valid (16 digit)",
                    "Tidak ada tanda-tanda pemalsuan dokumen",
                    "Alamat lengkap dan jelas",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <input 
                        type="checkbox" 
                        id={`check-${index}`}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <label htmlFor={`check-${index}`} className="text-sm cursor-pointer flex-1">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {kyc.status === 'pending' && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Review Decision</CardTitle>
                  <CardDescription>Approve atau reject verifikasi KYC ini</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Rejection Reason (conditional) */}
                  <div>
                    <Label htmlFor="rejection-reason">Alasan Penolakan (jika reject)</Label>
                    <Textarea
                      id="rejection-reason"
                      placeholder="Contoh: Foto KTP tidak jelas, data tidak sesuai, dll."
                      rows={3}
                      className="mt-2"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      size="lg" 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      asChild
                    >
                      <form action="/api/platform/kyc/approve" method="POST">
                        <input type="hidden" name="kycId" value={kyc.id} />
                        <button type="submit" className="w-full flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Approve KYC
                        </button>
                      </form>
                    </Button>

                    <Button 
                      size="lg" 
                      variant="destructive"
                      className="flex-1"
                      asChild
                    >
                      <form action="/api/platform/kyc/reject" method="POST">
                        <input type="hidden" name="kycId" value={kyc.id} />
                        <button type="submit" className="w-full flex items-center justify-center gap-2">
                          <XCircle className="w-5 h-5" />
                          Reject KYC
                        </button>
                      </form>
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Keputusan ini akan dicatat dalam audit log dan user akan menerima notifikasi
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
