import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, TrendingUp, Users, DollarSign, Activity,
  Download, Calendar, BarChart3, PieChart, LineChart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Analytics - Platform Admin",
  description: "Platform analytics dan reports",
};

export default function AnalyticsPage() {
  const stats = {
    revenue: {
      today: 2500000,
      week: 15000000,
      month: 45000000,
      growth: 12.5,
    },
    users: {
      today: 45,
      week: 234,
      month: 1023,
      total: 10234,
      growth: 8.3,
    },
    transactions: {
      today: 156,
      week: 892,
      month: 3456,
      total: 125678,
      successRate: 98.5,
    },
    groups: {
      active: 389,
      total: 456,
      avgMembers: 12.5,
      growth: 5.2,
    },
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
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">Platform statistics dan reports</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                Revenue
                <DollarSign className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp {(stats.revenue.month / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+{stats.revenue.growth}%</span> vs last month
              </p>
              <div className="mt-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Today:</span>
                  <span className="font-medium">Rp {(stats.revenue.today / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Week:</span>
                  <span className="font-medium">Rp {(stats.revenue.week / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                Users
                <Users className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+{stats.users.growth}%</span> vs last month
              </p>
              <div className="mt-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Today:</span>
                  <span className="font-medium">+{stats.users.today}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Week:</span>
                  <span className="font-medium">+{stats.users.week}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                Transactions
                <Activity className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.transactions.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">{stats.transactions.successRate}%</span> success rate
              </p>
              <div className="mt-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Today:</span>
                  <span className="font-medium">{stats.transactions.today}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Week:</span>
                  <span className="font-medium">{stats.transactions.week}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                Active Groups
                <TrendingUp className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.groups.active}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+{stats.groups.growth}%</span> vs last month
              </p>
              <div className="mt-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Groups:</span>
                  <span className="font-medium">{stats.groups.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Members:</span>
                  <span className="font-medium">{stats.groups.avgMembers}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList>
            <TabsTrigger value="revenue">
              <DollarSign className="w-4 h-4 mr-2" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <Activity className="w-4 h-4 mr-2" />
              Transactions
            </TabsTrigger>
          </TabsList>

          {/* Revenue Chart */}
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue for the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold">Revenue Chart</p>
                    <p className="text-sm">Chart will be rendered here using Chart.js or Recharts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Chart */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New users registration trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold">User Growth Chart</p>
                    <p className="text-sm">Chart will be rendered here using Chart.js or Recharts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Chart */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>Daily transaction volume and success rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold">Transaction Chart</p>
                    <p className="text-sm">Chart will be rendered here using Chart.js or Recharts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Top Performers */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Bandar by Revenue</CardTitle>
              <CardDescription>Highest earning group organizers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Budi Santoso", revenue: 5600000, groups: 8, rank: 1 },
                  { name: "Siti Aminah", revenue: 4200000, groups: 6, rank: 2 },
                  { name: "Ahmad Yani", revenue: 3800000, groups: 5, rank: 3 },
                  { name: "Dewi Lestari", revenue: 3200000, groups: 4, rank: 4 },
                  { name: "Rudi Hartono", revenue: 2900000, groups: 3, rank: 5 },
                ].map((bandar) => (
                  <div key={bandar.rank} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {bandar.rank}
                      </div>
                      <div>
                        <p className="font-semibold">{bandar.name}</p>
                        <p className="text-xs text-muted-foreground">{bandar.groups} groups</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        Rp {(bandar.revenue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Groups by Members</CardTitle>
              <CardDescription>Most popular arisan groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Arisan RT 05", members: 50, bandar: "Budi Santoso", rank: 1 },
                  { name: "Arisan Kantor", members: 45, bandar: "Siti Aminah", rank: 2 },
                  { name: "Arisan Keluarga Besar", members: 40, bandar: "Ahmad Yani", rank: 3 },
                  { name: "Arisan Ibu-ibu PKK", members: 35, bandar: "Dewi Lestari", rank: 4 },
                  { name: "Arisan Komunitas", members: 30, bandar: "Rudi Hartono", rank: 5 },
                ].map((group) => (
                  <div key={group.rank} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                        {group.rank}
                      </div>
                      <div>
                        <p className="font-semibold">{group.name}</p>
                        <p className="text-xs text-muted-foreground">by {group.bandar}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{group.members} members</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
