"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, User, Mail, Phone, MapPin, Calendar,
  CheckCircle, Clock, AlertTriangle, CreditCard,
  Users, Trophy, TrendingUp, Send, Ban
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MemberDetailPage() {
  const params = useParams();
  const memberId = params.id as string;

  // Mock data - akan diganti dengan database query
  const member = {
    id: memberId,
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "081234567890",
    address: "Jl. Merdeka No. 123, Jakarta Selatan",
    joinDate: "2025-06-15",
    kycStatus: "approved",
    kycApprovedAt: "2025-06-20",
    totalPaid: 4500000,
    totalGroups: 3,
    totalWins: 1,
    accountStatus: "active",
  };

  const groups = [
    { id: "1", name: "Arisan RT 05 Blok A", role: "participant", status: "active", contribution: 500000 },
    { id: "2", name: "Arisan Kantor Divisi IT", role: "participant", status: "active", contribution: 1000000 },
    { id: "3", name: "Arisan Keluarga Besar", role: "winner", status: "completed", contribution: 300000 },
  ];

  const paymentHistory = [
    { id: "1", group: "Arisan RT 05", amount: 500000, date: "2026-01-28", status: "completed" },
    { id: "2", group: "Arisan Kantor", amount: 1000000, date: "2026-01-25", status: "completed" },
    { id: "3", group: "Arisan Keluarga", amount: 300000, date: "2026-01-20", status: "completed" },
    { id: "4", group: "Arisan RT 05", amount: 500000, date: "2026-01-15", status: "completed" },
  ];

  const winHistory = [
    { id: "1", group: "Arisan Keluarga Besar", amount: 3300000, date: "2025-12-15", period: 5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/admin/dashboard?tab=members" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Members
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                {member.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{member.name}</h1>
                <p className="text-sm text-muted-foreground">Member ID: {member.id}</p>
              </div>
              <Badge 
                variant={member.accountStatus === "active" ? "default" : "destructive"}
                className={member.accountStatus === "active" ? "bg-green-100 text-green-800" : ""}
              >
                {member.accountStatus}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="destructive" size="sm">
                <Ban className="w-4 h-4 mr-2" />
                Suspend
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                Rp {(member.totalPaid / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Groups Joined
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{member.totalGroups}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Active groups
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Wins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{member.totalWins}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Arisan wins
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                KYC Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                {member.kycStatus}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                Approved: {member.kycApprovedAt}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{member.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{member.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Join Date</p>
                    <p className="font-medium">{member.joinDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Groups</CardTitle>
                <CardDescription>
                  {member.totalGroups} groups joined
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {groups.map((group) => (
                    <div key={group.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{group.name}</h4>
                        <Badge 
                          variant={group.status === "active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {group.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {group.role === "winner" ? "🏆 Winner" : "Participant"}
                        </span>
                        <span className="font-semibold">
                          Rp {(group.contribution / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity */}
          <div className="md:col-span-2">
            <Tabs defaultValue="payments" className="space-y-4">
              <TabsList>
                <TabsTrigger value="payments">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment History
                </TabsTrigger>
                <TabsTrigger value="wins">
                  <Trophy className="w-4 h-4 mr-2" />
                  Win History
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Activity Log
                </TabsTrigger>
              </TabsList>

              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>
                      All payment transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {paymentHistory.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-semibold">{payment.group}</p>
                              <p className="text-sm text-muted-foreground">{payment.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">
                              Rp {payment.amount.toLocaleString()}
                            </p>
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              {payment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wins">
                <Card>
                  <CardHeader>
                    <CardTitle>Win History</CardTitle>
                    <CardDescription>
                      Arisan wins and prizes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {winHistory.length > 0 ? (
                      <div className="space-y-3">
                        {winHistory.map((win) => (
                          <div key={win.id} className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                  <Trophy className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                  <p className="font-semibold text-purple-900">{win.group}</p>
                                  <p className="text-sm text-purple-700">Period {win.period}</p>
                                  <p className="text-xs text-purple-600">{win.date}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-purple-900">
                                  Rp {(win.amount / 1000000).toFixed(1)}M
                                </p>
                                <p className="text-xs text-purple-700">Prize Amount</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No wins yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Log</CardTitle>
                    <CardDescription>
                      Recent member activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 border-l-4 border-green-500 bg-green-50 rounded">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-sm">Payment Completed</p>
                          <p className="text-xs text-muted-foreground">Arisan RT 05 - Rp 500,000</p>
                          <p className="text-xs text-muted-foreground">2026-01-28 14:30</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                        <Users className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-semibold text-sm">Joined Group</p>
                          <p className="text-xs text-muted-foreground">Arisan Kantor Divisi IT</p>
                          <p className="text-xs text-muted-foreground">2026-01-20 10:15</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border-l-4 border-purple-500 bg-purple-50 rounded">
                        <Trophy className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-semibold text-sm">Won Arisan</p>
                          <p className="text-xs text-muted-foreground">Arisan Keluarga Besar - Rp 3.3M</p>
                          <p className="text-xs text-muted-foreground">2025-12-15 16:00</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
