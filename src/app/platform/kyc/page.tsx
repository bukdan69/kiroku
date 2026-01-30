import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, UserCheck, CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "KYC Approval - Platform Admin",
  description: "Review dan approve verifikasi KYC user",
};

export default function PlatformKYCPage() {
  // Mock data - nanti akan diganti dengan real data dari database
  const kycRequests = {
    pending: [
      {
        id: "1",
        userId: "user-1",
        name: "Budi Santoso",
        email: "budi@email.com",
        ktpNumber: "3201234567890123",
        submittedAt: "2026-01-29 10:30",
        status: "pending"
      },
      {
        id: "2",
        userId: "user-2",
        name: "Siti Aminah",
        email: "siti@email.com",
        ktpNumber: "3301234567890123",
        submittedAt: "2026-01-29 14:15",
        status: "pending"
      },
      {
        id: "3",
        userId: "user-3",
        name: "Ahmad Yani",
        email: "ahmad@email.com",
        ktpNumber: "3101234567890123",
        submittedAt: "2026-01-30 08:45",
        status: "pending"
      }
    ],
    approved: [
      {
        id: "4",
        userId: "user-4",
        name: "Dewi Lestari",
        email: "dewi@email.com",
        ktpNumber: "3401234567890123",
        approvedAt: "2026-01-28 16:20",
        approvedBy: "Super Admin",
        status: "approved"
      }
    ],
    rejected: [
      {
        id: "5",
        userId: "user-5",
        name: "Rudi Hartono",
        email: "rudi@email.com",
        ktpNumber: "3501234567890123",
        rejectedAt: "2026-01-27 11:30",
        rejectedBy: "Super Admin",
        rejectionReason: "Foto KTP tidak jelas",
        status: "rejected"
      }
    ]
  };

  const stats = {
    pending: kycRequests.pending.length,
    approved: kycRequests.approved.length,
    rejected: kycRequests.rejected.length,
    total: kycRequests.pending.length + kycRequests.approved.length + kycRequests.rejected.length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/platform/dashboard" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">KYC Verification</h1>
                <p className="text-sm text-muted-foreground">Review dan approve verifikasi identitas user</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              Pending ({stats.pending})
            </TabsTrigger>
            <TabsTrigger value="approved" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Approved ({stats.approved})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="gap-2">
              <XCircle className="h-4 w-4" />
              Rejected ({stats.rejected})
            </TabsTrigger>
          </TabsList>

          {/* Pending Tab */}
          <TabsContent value="pending" className="space-y-4">
            {kycRequests.pending.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <UserCheck className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Tidak ada KYC yang menunggu review</p>
                </CardContent>
              </Card>
            ) : (
              kycRequests.pending.map((kyc) => (
                <Card key={kyc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserCheck className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{kyc.name}</h3>
                            <p className="text-sm text-muted-foreground">{kyc.email}</p>
                          </div>
                          <Badge variant="outline" className="ml-auto">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Nomor KTP</p>
                            <p className="font-mono text-sm">{kyc.ktpNumber}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                            <p className="text-sm">{kyc.submittedAt}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" asChild>
                            <Link href={`/platform/kyc/${kyc.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Review Detail
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Approved Tab */}
          <TabsContent value="approved" className="space-y-4">
            {kycRequests.approved.map((kyc) => (
              <Card key={kyc.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{kyc.name}</h3>
                          <p className="text-sm text-muted-foreground">{kyc.email}</p>
                        </div>
                        <Badge className="ml-auto bg-green-600">
                          Approved
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Nomor KTP</p>
                          <p className="font-mono text-sm">{kyc.ktpNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Approved At</p>
                          <p className="text-sm">{kyc.approvedAt}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Approved By</p>
                          <p className="text-sm">{kyc.approvedBy}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Rejected Tab */}
          <TabsContent value="rejected" className="space-y-4">
            {kycRequests.rejected.map((kyc) => (
              <Card key={kyc.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                          <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{kyc.name}</h3>
                          <p className="text-sm text-muted-foreground">{kyc.email}</p>
                        </div>
                        <Badge variant="destructive" className="ml-auto">
                          Rejected
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Nomor KTP</p>
                          <p className="font-mono text-sm">{kyc.ktpNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Rejected At</p>
                          <p className="text-sm">{kyc.rejectedAt}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Rejected By</p>
                          <p className="text-sm">{kyc.rejectedBy}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Rejection Reason:</p>
                        <p className="text-sm text-red-900">{kyc.rejectionReason}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
