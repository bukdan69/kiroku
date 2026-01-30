import { Metadata } from "next";
import Link from "next/link";
import { 
  Shield, Users, CheckCircle, AlertTriangle, 
  TrendingUp, Activity, FileText, Settings,
  UserCheck, DollarSign, BarChart3, Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Platform Dashboard - Arisan KU Admin",
  description: "Super Admin dashboard untuk mengelola platform Arisan KU",
};

export default function PlatformDashboardPage() {
  // Mock data - nanti akan diganti dengan real data dari database
  const stats = {
    totalUsers: 10234,
    totalGroups: 456,
    totalTransactions: 125678,
    totalRevenue: 45678900,
    pendingKYC: 23,
    activeFraudCases: 5,
    newUsersToday: 45,
    activeGroups: 389
  };

  const quickActions = [
    {
      title: "KYC Approval",
      description: "Review dan approve verifikasi KYC",
      icon: UserCheck,
      href: "/platform/kyc",
      badge: stats.pendingKYC,
      badgeVariant: "default" as const,
      color: "text-blue-600"
    },
    {
      title: "User Management",
      description: "Kelola semua user platform",
      icon: Users,
      href: "/platform/users",
      badge: stats.totalUsers,
      badgeVariant: "secondary" as const,
      color: "text-green-600"
    },
    {
      title: "Affiliate Management",
      description: "Kelola komisi dan withdrawal affiliate",
      icon: DollarSign,
      href: "/platform/affiliate",
      badge: 12,
      badgeVariant: "default" as const,
      color: "text-emerald-600"
    },
    {
      title: "Fraud Detection",
      description: "Monitor aktivitas mencurigakan",
      icon: AlertTriangle,
      href: "/platform/fraud",
      badge: stats.activeFraudCases,
      badgeVariant: "destructive" as const,
      color: "text-red-600"
    },
    {
      title: "Analytics",
      description: "Lihat statistik dan laporan",
      icon: BarChart3,
      href: "/platform/analytics",
      color: "text-purple-600"
    },
    {
      title: "Audit Logs",
      description: "Tracking semua aktivitas",
      icon: FileText,
      href: "/platform/audit",
      color: "text-orange-600"
    },
    {
      title: "Platform Settings",
      description: "Konfigurasi platform",
      icon: Settings,
      href: "/platform/settings",
      color: "text-gray-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Platform Admin</h1>
                <p className="text-sm text-muted-foreground">Super Administrator Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/platform/notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifikasi
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/platform/profile">
                  Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+{stats.newUsersToday}</span> hari ini
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Groups
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeGroups.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                dari {stats.totalGroups} total grup
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(stats.totalRevenue / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+12.5%</span> vs bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Transactions
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTransactions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total transaksi berhasil
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {(stats.pendingKYC > 0 || stats.activeFraudCases > 0) && (
          <div className="mb-8 space-y-4">
            {stats.pendingKYC > 0 && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-900">
                        {stats.pendingKYC} KYC menunggu approval
                      </p>
                      <p className="text-sm text-blue-700">
                        Segera review untuk meningkatkan trust user
                      </p>
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/platform/kyc">
                      Review Sekarang
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {stats.activeFraudCases > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-900">
                        {stats.activeFraudCases} kasus fraud terdeteksi
                      </p>
                      <p className="text-sm text-red-700">
                        Perlu investigasi dan tindakan segera
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="destructive" asChild>
                    <Link href="/platform/fraud">
                      Lihat Detail
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${action.color}`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    {action.badge !== undefined && (
                      <Badge variant={action.badgeVariant}>
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={action.href}>
                      Buka
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Aktivitas terbaru di platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "Budi Santoso", action: "KYC approved", time: "5 menit lalu", type: "success" },
                  { user: "Siti Aminah", action: "Joined group Arisan RT 05", time: "12 menit lalu", type: "info" },
                  { user: "Ahmad Yani", action: "Fraud detected - Multiple devices", time: "25 menit lalu", type: "warning" },
                  { user: "Dewi Lestari", action: "Withdrawal Rp 5,000,000", time: "1 jam lalu", type: "info" },
                  { user: "Rudi Hartono", action: "Created new group", time: "2 jam lalu", type: "success" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`} />
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/platform/audit">
                  Lihat Semua Activity
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
