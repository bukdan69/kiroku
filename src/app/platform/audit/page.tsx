import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, FileText, Search, Filter, Download,
  Activity, Shield, User, CreditCard, Users, Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Audit Logs - Platform Admin",
  description: "Complete activity tracking dan audit trail",
};

export default function AuditLogsPage() {
  const stats = {
    today: 1234,
    week: 8765,
    month: 34567,
    total: 456789,
  };

  const logs = [
    {
      id: "1",
      action: "login",
      user: "Super Admin",
      userId: "admin-1",
      entityType: "platform_admin",
      description: "Login to platform admin",
      ipAddress: "103.123.45.67",
      userAgent: "Mozilla/5.0 (Windows NT 10.0)",
      timestamp: "2026-01-30 10:15:30",
      metadata: { success: true },
    },
    {
      id: "2",
      action: "kyc_review",
      user: "Super Admin",
      userId: "admin-1",
      entityType: "kyc_verification",
      entityId: "kyc-123",
      description: "Approved KYC for Budi Santoso",
      ipAddress: "103.123.45.67",
      timestamp: "2026-01-30 10:10:15",
      metadata: { reviewedUserId: "user-123", action: "approve" },
    },
    {
      id: "3",
      action: "admin_action",
      user: "Super Admin",
      userId: "admin-1",
      entityType: "user",
      entityId: "user-456",
      description: "Banned user Ahmad Yani",
      ipAddress: "103.123.45.67",
      timestamp: "2026-01-30 09:45:20",
      metadata: { reason: "Fraud detected", duration: "permanent" },
    },
    {
      id: "4",
      action: "login",
      user: "Budi Santoso",
      userId: "user-123",
      entityType: "user",
      description: "User login",
      ipAddress: "103.123.45.68",
      userAgent: "Mozilla/5.0 (Android 12)",
      timestamp: "2026-01-30 09:30:45",
      metadata: { success: true, device: "mobile" },
    },
    {
      id: "5",
      action: "payment",
      user: "Siti Aminah",
      userId: "user-456",
      entityType: "transaction",
      entityId: "tx-789",
      description: "Payment completed Rp 500,000",
      ipAddress: "103.123.45.69",
      timestamp: "2026-01-30 09:15:10",
      metadata: { amount: 500000, status: "completed", groupId: "group-1" },
    },
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login': return Activity;
      case 'kyc_review': return Shield;
      case 'admin_action': return User;
      case 'payment': return CreditCard;
      case 'create': return Users;
      default: return FileText;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'login': return 'text-blue-600 bg-blue-100';
      case 'kyc_review': return 'text-purple-600 bg-purple-100';
      case 'admin_action': return 'text-red-600 bg-red-100';
      case 'payment': return 'text-green-600 bg-green-100';
      case 'create': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Audit Logs</h1>
                <p className="text-sm text-muted-foreground">Complete activity tracking dan audit trail</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.week.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.month.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user, action, IP address..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs List */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
            <CardDescription>Real-time activity tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs.map((log) => {
                const Icon = getActionIcon(log.action);
                return (
                  <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActionColor(log.action)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{log.description}</p>
                            <Badge variant="outline" className="text-xs">
                              {log.action}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            by <span className="font-medium">{log.user}</span>
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground mb-1">User ID</p>
                          <p className="font-mono">{log.userId}</p>
                        </div>
                        {log.entityId && (
                          <div>
                            <p className="text-muted-foreground mb-1">Entity ID</p>
                            <p className="font-mono">{log.entityId}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-muted-foreground mb-1">IP Address</p>
                          <p className="font-mono">{log.ipAddress}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Entity Type</p>
                          <p>{log.entityType}</p>
                        </div>
                      </div>

                      {log.metadata && Object.keys(log.metadata).length > 0 && (
                        <details className="mt-3">
                          <summary className="text-xs text-primary cursor-pointer hover:underline">
                            View metadata
                          </summary>
                          <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-x-auto">
                            {JSON.stringify(log.metadata, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>

                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Showing 1-5 of {stats.total.toLocaleString()} logs
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
