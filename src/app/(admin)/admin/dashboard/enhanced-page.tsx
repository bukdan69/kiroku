"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, Calendar, DollarSign, TrendingUp, Plus, Eye, Clock, 
  CheckCircle, AlertCircle, Trophy, Wallet, UserCheck, ArrowRight,
  BarChart3, Bell, Settings, Search, Send, Copy, AlertTriangle,
  Phone, Mail, MapPin, CreditCard, Award
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BandarDashboardEnhancedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("groups");

  // Mock data
  const stats = {
    totalGroups: 5,
    activeGroups: 3,
    totalMembers: 47,
    totalRevenue: 12500000,
    pendingPayments: 8,
    latePayments: 3,
    completedPayments: 39,
    affiliateCommission: 2340000,
    nextDrawDate: "2026-02-05",
  };

  const allMembers = [
    { 
      id: "1", name: "Budi Santoso", email: "budi@email.com", phone: "081234567890",
      groups: ["Arisan RT 05"], kycStatus: "approved", paymentStatus: "paid",
      totalPaid: 1500000, lastPayment: "2026-01-28"
    },
    { 
      id: "2", name: "Siti Aminah", email: "siti@email.com", phone: "081234567891",
      groups: ["Arisan RT 05", "Arisan Kantor"], kycStatus: "approved", paymentStatus: "pending",
      totalPaid: 2500000, lastPayment: "2026-01-20"
    },
    { 
      id: "3", name: "Ahmad Yani", email: "ahmad@email.com", phone: "081234567892",
      groups: ["Arisan Keluarga"], kycStatus: "pending", paymentStatus: "late",
      totalPaid: 900000, lastPayment: "2026-01-15"
    },
    { 
      id: "4", name: "Dewi Lestari", email: "dewi@email.com", phone: "081234567893",
      groups: ["Arisan RT 05"], kycStatus: "approved", paymentStatus: "late",
      totalPaid: 1000000, lastPayment: "2026-01-10"
    },
  ];

  const latePayments = [
    { id: "1", member: "Ahmad Yani", group: "Arisan Keluarga", amount: 300000, daysLate: 15, phone: "081234567892" },
    { id: "2", member: "Dewi Lestari", group: "Arisan RT 05", amount: 500000, daysLate: 20, phone: "081234567893" },
    { id: "3", member: "Rudi Hartono", group: "Arisan Kantor", amount: 1000000, daysLate: 5, phone: "081234567894" },
  ];

  const upcomingDraws = [
    { 
      id: "1", group: "Arisan RT 05 Blok A", date: "2026-02-05", 
      members: 10, prize: 4500000, status: "ready", eligibleMembers: 8 
    },
    { 
      id: "2", group: "Arisan Keluarga Besar", date: "2026-02-08", 
      members: 12, prize: 3300000, status: "waiting_payments", eligibleMembers: 9 
    },
    { 
      id: "3", group: "Arisan Kantor Divisi IT", date: "2026-02-10", 
      members: 8, prize: 7200000, status: "ready", eligibleMembers: 7 
    },
  ];

  const payoutHistory = [
    { id: "1", winner: "Budi Santoso", group: "Arisan RT 05", amount: 4500000, date: "2026-01-25", status: "completed" },
    { id: "2", winner: "Siti Aminah", group: "Arisan Kantor", amount: 7000000, date: "2026-01-20", status: "completed" },
    { id: "3", winner: "Ahmad Yani", group: "Arisan Keluarga", amount: 3000000, date: "2026-01-15", status: "pending" },
  ];

  const referralLinks = [
    { id: "1", code: "BANDAR-RT05", clicks: 45, conversions: 12, commission: 1200000 },
    { id: "2", code: "BANDAR-KANTOR", clicks: 38, conversions: 8, commission: 800000 },
    { id: "3", code: "BANDAR-KELUARGA", clicks: 22, conversions: 3, commission: 340000 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Dashboard Bandar</h1>
                <p className="text-sm text-muted-foreground">Kelola grup arisan Anda</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifikasi
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/dashboard/groups/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Grup
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards - 5 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Grup Saya
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGroups}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.activeGroups} aktif
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Members
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMembers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Semua grup
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                Rp {(stats.totalRevenue / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Dari grup saya
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Payments
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pendingPayments}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.latePayments} terlambat
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Affiliate Commission
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                Rp {(stats.affiliateCommission / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Komisi referral
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alert for Late Payments */}
        {stats.latePayments > 0 && (
          <Card className="border-red-200 bg-red-50 mb-8">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-semibold text-red-900">
                    {stats.latePayments} pembayaran terlambat
                  </p>
                  <p className="text-sm text-red-700">
                    Segera kirim reminder untuk menghindari masalah
                  </p>
                </div>
              </div>
              <Button size="sm" variant="destructive" onClick={() => setSelectedTab("late-payments")}>
                Lihat Detail
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="groups">
              <Calendar className="h-4 w-4 mr-2" />
              Grup
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="h-4 w-4 mr-2" />
              Members
            </TabsTrigger>
            <TabsTrigger value="payments">
              <DollarSign className="h-4 w-4 mr-2" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="late-payments">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Late
            </TabsTrigger>
            <TabsTrigger value="draws">
              <Trophy className="h-4 w-4 mr-2" />
              Undian
            </TabsTrigger>
            <TabsTrigger value="affiliate">
              <TrendingUp className="h-4 w-4 mr-2" />
              Affiliate
            </TabsTrigger>
          </TabsList>

          {/* Members Tab - NEW */}
          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Member Management</CardTitle>
                    <CardDescription>
                      Kelola semua member di grup Anda
                    </CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Cari member..." className="pl-10 w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allMembers.map((member) => (
                    <div key={member.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{member.name}</h4>
                            <Badge 
                              variant={member.kycStatus === "approved" ? "default" : "outline"}
                              className={member.kycStatus === "approved" ? "bg-green-100 text-green-800" : ""}
                            >
                              KYC: {member.kycStatus}
                            </Badge>
                            <Badge 
                              variant={
                                member.paymentStatus === "paid" ? "default" :
                                member.paymentStatus === "late" ? "destructive" : "outline"
                              }
                            >
                              {member.paymentStatus}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="w-4 h-4" />
                              {member.email}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-4 h-4" />
                              {member.phone}
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Total Paid</p>
                              <p className="font-semibold">Rp {member.totalPaid.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Last Payment</p>
                              <p className="font-semibold">{member.lastPayment}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Groups:</span>
                            {member.groups.map((group, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {group}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/members/${member.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Detail
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-2" />
                            Hubungi
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Late Payments Tab - NEW */}
          <TabsContent value="late-payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pembayaran Terlambat</CardTitle>
                <CardDescription>
                  Member yang belum membayar melewati deadline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {latePayments.map((payment) => (
                    <div key={payment.id} className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-900">{payment.member}</h4>
                            <p className="text-sm text-red-700">{payment.group}</p>
                            <p className="text-xs text-red-600 mt-1">
                              Terlambat {payment.daysLate} hari
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-red-900">
                            Rp {payment.amount.toLocaleString()}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">
                              <Phone className="w-4 h-4 mr-2" />
                              Call
                            </Button>
                            <Button size="sm">
                              <Send className="w-4 h-4 mr-2" />
                              Kirim Reminder
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Draws Tab - Enhanced */}
          <TabsContent value="draws" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Upcoming Draws */}
              <Card>
                <CardHeader>
                  <CardTitle>Undian Mendatang</CardTitle>
                  <CardDescription>
                    Jadwal undian untuk grup aktif
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingDraws.map((draw) => (
                      <div key={draw.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{draw.group}</h4>
                            <p className="text-sm text-muted-foreground">
                              {draw.eligibleMembers}/{draw.members} eligible
                            </p>
                          </div>
                          <Badge 
                            variant={draw.status === "ready" ? "default" : "outline"}
                            className={draw.status === "ready" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                          >
                            {draw.status === "ready" ? "Ready" : "Waiting"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Hadiah</p>
                            <p className="text-lg font-bold text-green-600">
                              Rp {(draw.prize / 1000000).toFixed(1)}M
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Tanggal</p>
                            <p className="font-semibold">{draw.date}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-3"
                          disabled={draw.status !== "ready"}
                          asChild={draw.status === "ready"}
                        >
                          {draw.status === "ready" ? (
                            <Link href={`/admin/draws/${draw.id}/select`}>
                              <Trophy className="w-4 h-4 mr-2" />
                              Pilih Pemenang
                            </Link>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 mr-2" />
                              Menunggu Pembayaran
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payout History */}
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Payout</CardTitle>
                  <CardDescription>
                    Tracking pembayaran ke pemenang
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payoutHistory.map((payout) => (
                      <div key={payout.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              payout.status === "completed" ? "bg-green-100" : "bg-yellow-100"
                            }`}>
                              {payout.status === "completed" ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <Clock className="w-5 h-5 text-yellow-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold">{payout.winner}</h4>
                              <p className="text-sm text-muted-foreground">{payout.group}</p>
                            </div>
                          </div>
                          <Badge variant={payout.status === "completed" ? "default" : "outline"}>
                            {payout.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="font-bold text-green-600">
                              Rp {payout.amount.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Date</p>
                            <p className="text-sm font-semibold">{payout.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Affiliate Tab - Enhanced */}
          <TabsContent value="affiliate" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Commission Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Komisi Affiliate</CardTitle>
                  <CardDescription>
                    Penghasilan dari referral
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Komisi</p>
                      <p className="text-3xl font-bold text-green-600">
                        Rp {(stats.affiliateCommission / 1000000).toFixed(2)}M
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Tersedia</p>
                        <p className="font-semibold">Rp 1.8M</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Ditarik</p>
                        <p className="font-semibold">Rp 540K</p>
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/admin/affiliate/withdraw">
                        <Wallet className="w-4 h-4 mr-2" />
                        Tarik Komisi
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Referral Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Referral Stats</CardTitle>
                  <CardDescription>
                    Performa referral Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Referral</p>
                        <p className="text-2xl font-bold">23</p>
                      </div>
                      <UserCheck className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                        <p className="text-2xl font-bold">68%</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Referral Links - NEW */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Referral Links</CardTitle>
                  <CardDescription>
                    Generate dan share link referral Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {referralLinks.map((link) => (
                      <div key={link.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                              <Award className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-mono font-semibold">{link.code}</p>
                              <p className="text-sm text-muted-foreground">
                                {link.clicks} clicks • {link.conversions} conversions
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Commission</p>
                            <p className="font-bold text-green-600">
                              Rp {(link.commission / 1000).toFixed(0)}K
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Input 
                            value={`https://arisanku.com/ref/${link.code}`} 
                            readOnly 
                            className="font-mono text-sm"
                          />
                          <Button size="sm" variant="outline">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button size="sm">
                            <Send className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Link Baru
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs remain the same... */}
          <TabsContent value="groups">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">
                  Tab Grup - Lihat file asli untuk implementasi lengkap
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">
                  Tab Payments - Lihat file asli untuk implementasi lengkap
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
