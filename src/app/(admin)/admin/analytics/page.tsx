import { Metadata } from "next";
import { TrendingUp, Users, DollarSign, Activity, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Analytics - Admin - Arisan KU",
  description: "Analytics and reports",
};

// Mock data
const metrics = {
  revenue: {
    current: 125000000,
    previous: 110000000,
    growth: 13.6,
  },
  users: {
    current: 1247,
    previous: 1105,
    growth: 12.9,
  },
  groups: {
    current: 45,
    previous: 38,
    growth: 18.4,
  },
  transactions: {
    current: 892,
    previous: 756,
    growth: 18.0,
  },
};

const monthlyData = [
  { month: "Jan", revenue: 85000000, users: 950, groups: 32 },
  { month: "Feb", revenue: 92000000, users: 1020, groups: 35 },
  { month: "Mar", revenue: 98000000, users: 1105, groups: 38 },
  { month: "Apr", revenue: 110000000, users: 1180, groups: 42 },
  { month: "May", revenue: 125000000, users: 1247, groups: 45 },
];

const topGroups = [
  { id: 1, name: "Arisan Keluarga Besar", members: 50, revenue: 25000000 },
  { id: 2, name: "Arisan Kantor", members: 45, revenue: 22500000 },
  { id: 3, name: "Arisan RT 05", members: 40, revenue: 20000000 },
  { id: 4, name: "Arisan Ibu-ibu PKK", members: 35, revenue: 17500000 },
  { id: 5, name: "Arisan Komunitas", members: 30, revenue: 15000000 },
];

function MetricCard({ 
  title, 
  value, 
  growth, 
  icon: Icon, 
  format = "number" 
}: { 
  title: string; 
  value: number; 
  growth: number; 
  icon: any; 
  format?: "number" | "currency";
}) {
  const isPositive = growth > 0;
  const formattedValue = format === "currency" 
    ? `Rp ${(value / 1000000).toFixed(1)}M`
    : value.toLocaleString();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        <div className="flex items-center text-xs mt-1">
          {isPositive ? (
            <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {Math.abs(growth).toFixed(1)}%
          </span>
          <span className="text-muted-foreground ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-7xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and performance metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard
            title="Total Revenue"
            value={metrics.revenue.current}
            growth={metrics.revenue.growth}
            icon={DollarSign}
            format="currency"
          />
          <MetricCard
            title="Total Users"
            value={metrics.users.current}
            growth={metrics.users.growth}
            icon={Users}
          />
          <MetricCard
            title="Active Groups"
            value={metrics.groups.current}
            growth={metrics.groups.growth}
            icon={TrendingUp}
          />
          <MetricCard
            title="Transactions"
            value={metrics.transactions.current}
            growth={metrics.transactions.growth}
            icon={Activity}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Monthly Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trend</CardTitle>
                  <CardDescription>Revenue, users, and groups over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="font-medium">{data.month}</div>
                        <div className="flex gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Rp {(data.revenue / 1000000).toFixed(0)}M
                          </span>
                          <span className="text-muted-foreground">
                            {data.users} users
                          </span>
                          <span className="text-muted-foreground">
                            {data.groups} groups
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Groups */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Groups</CardTitle>
                  <CardDescription>Groups by revenue contribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topGroups.map((group, index) => (
                      <div key={group.id} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{group.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {group.members} members
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            Rp {(group.revenue / 1000000).toFixed(1)}M
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Detailed revenue breakdown and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Revenue analytics chart will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <CardDescription>User growth and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User analytics chart will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups">
            <Card>
              <CardHeader>
                <CardTitle>Group Analytics</CardTitle>
                <CardDescription>Group performance and activity metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Group analytics chart will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
