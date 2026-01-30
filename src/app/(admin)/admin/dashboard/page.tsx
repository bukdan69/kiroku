"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, Calendar, DollarSign, TrendingUp, 
  Plus, Eye, Clock, CheckCircle, AlertCircle,
  Trophy, Wallet, UserCheck, ArrowRight,
  BarChart3, Bell, Settings, Search
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BandarDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - akan diganti dengan data dari API
  const stats = {
    totalGroups: 5,
    activeGroups: 3,
    totalMembers: 47,
    totalRevenue: 12500000,
    pendingPayments: 8,
    completedPayments: 39,
    affiliateCommission: 2340000,
    nextDrawDate: "2026-02-05",
  };

  const myGroups = [
    {
      id: "1",
      name: "Arisan RT 05 Blok A",
      status: "active",
      members: 10,
      maxMembers: 10,
      currentPeriod: 3,
      totalPeriods: 10,
      contributionAmount: 500000,
      nextDrawDate: "2026-02-05",
      pendingPayments: 2,
      revenue: 4500000,
    },
    {
      id: "2",
      name: "Arisan Kantor Divisi IT",
      status: "active",
      members: 8,
      maxMembers: 10,
      currentPeriod: 2,
      totalPeriods: 8,
      contributionAmount: 1000000,
      nextDrawDate: "2026-02-10",
      pendingPayments: 1,
      revenue: 7000000,
    },
    {
      id: "3",
      name: "Arisan Keluarga Besar",
      status: "active",
      members: 12,
      maxMembers: 12,
      currentPeriod: 5,
      totalPeriods: 12,
      contributionAmount: 300000,
      nextDrawDate: "2026-02-08",
      pendingPayments: 3,
      revenue: 1800000,
    },
    {
      id: "4",
      name: "Arisan Ibu-ibu PKK",
      status: "completed",
      members: 10,
      maxMembers: 10,
      currentPeriod: 10,
      totalPeriods: 10,
      contributionAmount: 200000,
      nextDrawDate: null,
      pendingPayments: 0,
      revenue: 2000000,
    },
    {
      id: "5",
      name: "Arisan Komunitas Hobi",
      status: "recruiting",
      members: 7,
      maxMembers: 15,
      currentPeriod: 0,
      totalPeriods: 15,
      contributionAmount: 750000,
      nextDrawDate: null,
      pendingPayments: 0,
      revenue: 0,
    },
  ];

  const recentPayments = [
    { id: "1", member: "Budi Santoso", group: "Arisan RT 05", amount: 500000, status: "completed", time: "2 jam lalu" },
    { id: "2", member: "Siti Aminah", group: "Arisan Kantor", amount: 1000000, status: "completed", time: "5 jam lalu" },
    { id: "3", member: "Ahmad Yani", group: "Arisan Keluarga", amount: 300000, status: "pending", time: "1 hari lalu" },
    { id: "4", member: "Dewi Lestari", group: "Arisan RT 05", amount: 500000, status: "pending", time: "2 hari lalu" },
  ];

  const upcomingDraws = [
    { id: "1", group: "Arisan RT 05 Blok A", date: "2026-02-05", members: 10, prize: 4500000 },
    { id: "2", group: "Arisan Keluarga Besar", date: "2026-02-08", members: 12, prize: 3300000 },
    { id: "3", group: "Arisan Kantor Divisi IT", date: "2026-02-10", members: 8, prize: 7200000 },
  ];

  const filteredGroups = myGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Pengaturan
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/dashboard/groups/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Event
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards - 3 Cards dengan warna berbeda */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Events - Hijau */}
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {stats.activeGroups} aktif
                </Badge>
              </div>
              <div className="text-4xl font-bold mb-1">{stats.totalGroups}</div>
              <p className="text-emerald-100 text-sm">Total Events</p>
            </CardContent>
          </Card>

          {/* Total Peserta - Biru */}
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  Izin peserta event
                </Badge>
              </div>
              <div className="text-4xl font-bold mb-1">{stats.totalMembers}</div>
              <p className="text-blue-100 text-sm">Total Peserta</p>
            </CardContent>
          </Card>

          {/* Hadiah Terkumpul - Orange */}
          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  Hadiah terkumpul
                </Badge>
              </div>
              <div className="text-4xl font-bold mb-1">0</div>
              <p className="text-orange-100 text-sm">Hadiah Terkumpul</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <div className="text-2xl font-bold">
                Rp {(stats.totalRevenue / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Dari semua grup
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
                Menunggu pembayaran
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completed Payments
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.completedPayments}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Pembayaran selesai
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

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="groups" className="space-y-6">
          <TabsList>
            <TabsTrigger value="groups">
              <Calendar className="h-4 w-4 mr-2" />
              Grup Saya ({stats.totalGroups})
            </TabsTrigger>
            <TabsTrigger value="payments">
              <DollarSign className="h-4 w-4 mr-2" />
              Pembayaran
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

          {/* Groups Tab */}
          <TabsContent value="groups" className="space-y-4">
            {filteredGroups.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchQuery ? "Tidak ada hasil" : "Belum ada grup"}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-center">
                    {searchQuery 
                      ? `Tidak ditemukan grup dengan kata kunci "${searchQuery}"`
                      : "Mulai dengan membuat grup arisan pertama Anda"
                    }
                  </p>
                  {!searchQuery && (
                    <Button asChild>
                      <Link href="/dashboard/groups/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Buat Grup Baru
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{group.name}</h3>
                            <Badge 
                              variant={
                                group.status === "active" ? "default" :
                                group.status === "completed" ? "secondary" :
                                "outline"
                              }
                              className={
                                group.status === "active" ? "bg-green-100 text-green-800" :
                                group.status === "completed" ? "bg-gray-100 text-gray-800" :
                                "bg-blue-100 text-blue-800"
                              }
                            >
                              {group.status === "active" ? "Aktif" :
                               group.status === "completed" ? "Selesai" :
                               "Rekrutmen"}
                            </Badge>
                            {group.pendingPayments > 0 && (
                              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                <Clock className="w-3 h-3 mr-1" />
                                {group.pendingPayments} pending
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Members</p>
                              <p className="font-semibold">
                                {group.members}/{group.maxMembers}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Period</p>
                              <p className="font-semibold">
                                {group.currentPeriod}/{group.totalPeriods}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Iuran</p>
                              <p className="font-semibold">
                                Rp {(group.contributionAmount / 1000).toFixed(0)}K
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                              <p className="font-semibold text-green-600">
                                Rp {(group.revenue / 1000000).toFixed(1)}M
                              </p>
                            </div>
                          </div>

                          {group.nextDrawDate && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-sm text-blue-900">
                                <Trophy className="w-4 h-4 inline mr-2" />
                                Undian berikutnya: <strong>{group.nextDrawDate}</strong>
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm" asChild>
                            <Link href={`/dashboard/groups/${group.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Detail
                            </Link>
                          </Button>
                          {group.status === "active" && (
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/admin/groups/${group.id}/manage`}>
                                <Settings className="w-4 h-4 mr-2" />
                                Kelola
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pembayaran Terbaru</CardTitle>
                <CardDescription>
                  Monitor pembayaran dari semua grup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          payment.status === "completed" ? "bg-green-100" : "bg-yellow-100"
                        }`}>
                          {payment.status === "completed" ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{payment.member}</p>
                          <p className="text-sm text-muted-foreground">{payment.group}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">Rp {payment.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{payment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/admin/payments">
                    Lihat Semua Pembayaran
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Draws Tab */}
          <TabsContent value="draws" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Undian Mendatang</CardTitle>
                <CardDescription>
                  Jadwal undian untuk semua grup aktif
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDraws.map((draw) => (
                    <div key={draw.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{draw.group}</h4>
                          <p className="text-sm text-muted-foreground">
                            {draw.members} peserta
                          </p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">
                          <Calendar className="w-3 h-3 mr-1" />
                          {draw.date}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Hadiah</p>
                          <p className="text-lg font-bold text-green-600">
                            Rp {(draw.prize / 1000000).toFixed(1)}M
                          </p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/admin/draws/${draw.id}`}>
                            <Trophy className="w-4 h-4 mr-2" />
                            Kelola Undian
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Affiliate Tab */}
          <TabsContent value="affiliate" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
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
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/admin/affiliate">
                        Lihat Detail Affiliate
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
