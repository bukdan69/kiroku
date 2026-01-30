import { Metadata } from "next";
import { Search, Filter, Activity, User, Shield, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Audit Logs - Admin - Arisan KU",
  description: "View system audit logs",
};

// Mock data
const auditLogs = [
  { 
    id: 1, 
    action: "user.login",
    user: "john@example.com",
    description: "User logged in successfully",
    ipAddress: "192.168.1.100",
    timestamp: "2026-01-30T10:30:00",
    category: "auth"
  },
  { 
    id: 2, 
    action: "kyc.approved",
    user: "admin@example.com",
    description: "KYC verification approved for Jane Smith",
    ipAddress: "192.168.1.101",
    timestamp: "2026-01-30T10:25:00",
    category: "kyc"
  },
  { 
    id: 3, 
    action: "payment.received",
    user: "system",
    description: "Payment received: Rp 500,000 from Bob Johnson",
    ipAddress: "192.168.1.102",
    timestamp: "2026-01-30T10:20:00",
    category: "payment"
  },
  { 
    id: 4, 
    action: "group.created",
    user: "alice@example.com",
    description: "New arisan group created: Arisan Keluarga",
    ipAddress: "192.168.1.103",
    timestamp: "2026-01-30T10:15:00",
    category: "group"
  },
  { 
    id: 5, 
    action: "user.suspended",
    user: "admin@example.com",
    description: "User account suspended: charlie@example.com",
    ipAddress: "192.168.1.101",
    timestamp: "2026-01-30T10:10:00",
    category: "admin"
  },
];

function getCategoryIcon(category: string) {
  switch (category) {
    case "auth": return <Shield className="h-4 w-4" />;
    case "kyc": return <User className="h-4 w-4" />;
    case "payment": return <DollarSign className="h-4 w-4" />;
    case "group": return <Users className="h-4 w-4" />;
    case "admin": return <Shield className="h-4 w-4" />;
    default: return <Activity className="h-4 w-4" />;
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case "auth": return "default";
    case "kyc": return "secondary";
    case "payment": return "default";
    case "group": return "secondary";
    case "admin": return "destructive";
    default: return "outline";
  }
}

export default function AdminAuditLogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-7xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Audit Logs</h1>
          <p className="text-muted-foreground">
            Complete system activity and security audit trail
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>System Activity Logs</CardTitle>
            <CardDescription>Chronological record of all system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {new Date(log.timestamp).toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getCategoryColor(log.category) as any}>
                        {getCategoryIcon(log.category)}
                        <span className="ml-1">{log.category}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.action}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
