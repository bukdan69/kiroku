import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, User, Mail, Phone, Calendar, MapPin, 
  Shield, Ban, CheckCircle, AlertTriangle, Activity,
  CreditCard, Users, Trophy, FileText, Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "User Detail - Platform Admin",
  description: "Detail lengkap user dan activity history",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function UserDetailPage({ params }: PageProps) {
  // Mock data
  const user = {
    id: params.id,
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "+62 812-3456-7890",
    role: "bandar",
    kycStatus: "approved",
    isActive: true,
    joinedAt: "2026-01-15 10:30",
    lastLoginAt: "2026-01-30 08:30",
    avatar: null,
    profile: {
      address: "Jl. Merdeka No. 123, RT 05/RW 03",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12345",
      dateOfBirth: "1990-05-15",
    },
    stats: {
      totalGroups: 3,
      totalMembers: 45,
      totalTransactions: 156,
      totalRevenue: 15600000,
      successRate: 98.5,
    },
    wallet: {
      balance: 2500000,
      frozenBalance: 0,
      escrowBalance: 500000,
    },
  };

  const activities = [
    { type: "login", description: "Login from Jakarta", time: "2026-01-30 08:30", ip: "103.123.45.67" },
    { type: "transaction", description: "Payment received Rp 500,000", time: "2026-01-29 15:20", status: "success" },
    { type: "group", description: "Created new group 'Arisan RT 05'", time: "2026-01-28 10:15", status: "success" },
    { type: "kyc", description: "KYC approved by Super Admin", time: "2026-01-27 14:30", status: "success" },
    { type: "login", description: "Login from Bandung", time: "2026-01-26 09:45", ip: "103.123.45.68", warning: true },
  ];

  const transactions = [
    { id: "1", type: "payment", amount: 500000, status: "completed", date: "2026-01-29 15:20", description: "Arisan RT 05 - Periode 1" },
    { id: "2", type: "withdrawal", amount: -1000000, status: "completed", date: "2026-01-28 10:30", description: "Withdraw to BCA" },
    { id: "3", type: "commission", amount: 50000, status: "completed", date: "2026-01-27 16:45", description: "Affiliate commission" },
  ];

  const groups = [
    { id: "1", name: "Arisan RT 05", members: 15, status: "active", created: "2026-01-20" },
    { id: "2", name: "Arisan Kantor", members: 20, status: "active", created: "2026-01-18" },
    { id: "3", name: "Arisan Keluarga", members: 10, status: "completed", created: "2026-01-10" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/platform/users" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke User List
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <Badge variant={user.role === 'admin' ? 'default' : user.role === 'bandar' ? 'secondary' : 'outline'}>
                    {user.role}
                  </Badge>
                  {user.kycStatus === 'approved' && (
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {!user.isActive && (
                    <Badge variant="destructive">Inactive</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {user.isActive ? (
                <Button variant="outline" size="sm" className="text-red-600">
                  <Ban className="w-4 h-4 mr-2" />
                  Ban User
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Activate
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Reset Password
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Date of Birth</p>
                    <p className="text-sm">{user.profile.dateOfBirth}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm">{user.profile.address}</p>
                    <p className="text-sm">{user.profile.city}, {user.profile.province}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">User ID</p>
                  <p className="text-sm font-mono">{user.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Joined</p>
                  <p className="text-sm">{user.joinedAt}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Last Login</p>
                  <p className="text-sm">{user.lastLoginAt}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">KYC Status</p>
                  <Badge variant={user.kycStatus === 'approved' ? 'default' : 'outline'}>
                    {user.kycStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Wallet */}
            <Card>
              <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Available</p>
                  <p className="text-2xl font-bold text-green-600">
                    Rp {user.wallet.balance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Frozen</p>
                  <p className="text-lg font-semibold">
                    Rp {user.wallet.frozenBalance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Escrow</p>
                  <p className="text-lg font-semibold">
                    Rp {user.wallet.escrowBalance.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{user.stats.totalGroups}</p>
                      <p className="text-xs text-muted-foreground">Groups</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <User className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{user.stats.totalMembers}</p>
                      <p className="text-xs text-muted-foreground">Members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{user.stats.totalTransactions}</p>
                      <p className="text-xs text-muted-foreground">Transactions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold">{user.stats.successRate}%</p>
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="activity" className="space-y-4">
              <TabsList>
                <TabsTrigger value="activity">
                  <Activity className="w-4 h-4 mr-2" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="transactions">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Transactions
                </TabsTrigger>
                <TabsTrigger value="groups">
                  <Users className="w-4 h-4 mr-2" />
                  Groups
                </TabsTrigger>
              </TabsList>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>User activity history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.warning ? 'bg-yellow-100' : 'bg-primary/10'
                          }`}>
                            {activity.type === 'login' && <Activity className="w-5 h-5 text-primary" />}
                            {activity.type === 'transaction' && <CreditCard className="w-5 h-5 text-green-600" />}
                            {activity.type === 'group' && <Users className="w-5 h-5 text-blue-600" />}
                            {activity.type === 'kyc' && <Shield className="w-5 h-5 text-purple-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium">{activity.description}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {activity.time}
                                  {activity.ip && ` • IP: ${activity.ip}`}
                                </p>
                              </div>
                              {activity.warning && (
                                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Suspicious
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>All financial transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tx.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              <CreditCard className={`w-5 h-5 ${
                                tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                              }`} />
                            </div>
                            <div>
                              <p className="font-medium">{tx.description}</p>
                              <p className="text-sm text-muted-foreground">{tx.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${
                              tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {tx.amount > 0 ? '+' : ''}Rp {Math.abs(tx.amount).toLocaleString()}
                            </p>
                            <Badge variant={tx.status === 'completed' ? 'default' : 'outline'}>
                              {tx.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Groups Tab */}
              <TabsContent value="groups">
                <Card>
                  <CardHeader>
                    <CardTitle>Groups</CardTitle>
                    <CardDescription>Groups managed by this user</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {groups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{group.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {group.members} members • Created {group.created}
                              </p>
                            </div>
                          </div>
                          <Badge variant={group.status === 'active' ? 'default' : 'outline'}>
                            {group.status}
                          </Badge>
                        </div>
                      ))}
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
