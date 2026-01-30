import { Metadata } from "next";
import { CheckCircle, XCircle, Calendar, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "KYC Decisions - Admin - Arisan KU",
  description: "View KYC decision history",
};

// Mock data
const decisions = [
  { 
    id: 1, 
    user: { name: "John Doe", email: "john@example.com" },
    decision: "approved",
    decidedBy: "Admin User",
    decidedAt: "2026-01-29T14:30:00",
    reason: "All documents verified successfully",
    idType: "KTP",
    idNumber: "3201234567890001"
  },
  { 
    id: 2, 
    user: { name: "Alice Brown", email: "alice@example.com" },
    decision: "rejected",
    decidedBy: "Admin User",
    decidedAt: "2026-01-29T13:15:00",
    reason: "Document image is unclear and unreadable",
    idType: "KTP",
    idNumber: "3201234567890003"
  },
  { 
    id: 3, 
    user: { name: "Bob Johnson", email: "bob@example.com" },
    decision: "approved",
    decidedBy: "Admin User",
    decidedAt: "2026-01-29T10:45:00",
    reason: "Passport verified successfully",
    idType: "Passport",
    idNumber: "A12345678"
  },
  { 
    id: 4, 
    user: { name: "Charlie Wilson", email: "charlie@example.com" },
    decision: "rejected",
    decidedBy: "Admin User",
    decidedAt: "2026-01-28T16:20:00",
    reason: "Selfie does not match ID photo",
    idType: "KTP",
    idNumber: "3201234567890004"
  },
];

const stats = {
  totalDecisions: 1147,
  approved: 1105,
  rejected: 42,
  approvalRate: 96.3,
};

export default function AdminKycDecisionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-7xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">KYC Decisions</h1>
          <p className="text-muted-foreground">
            History of all KYC approval and rejection decisions
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Decisions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDecisions.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Approved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.approved.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Rejected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Approval Rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.approvalRate}%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Decisions</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {decisions.map((decision) => (
              <Card key={decision.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{decision.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{decision.user.name}</CardTitle>
                        <CardDescription>{decision.user.email}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={decision.decision === "approved" ? "default" : "destructive"}>
                      {decision.decision === "approved" ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {decision.decision}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">ID Type</p>
                      <p className="font-medium">{decision.idType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">ID Number</p>
                      <p className="font-medium font-mono">{decision.idNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Decided By</p>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{decision.decidedBy}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Decision Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">
                          {new Date(decision.decidedAt).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Reason</p>
                    <p className="text-sm">{decision.reason}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {decisions.filter(d => d.decision === "approved").map((decision) => (
              <Card key={decision.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{decision.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{decision.user.name}</CardTitle>
                        <CardDescription>{decision.user.email}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Approved
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Decided by {decision.decidedBy} on {new Date(decision.decidedAt).toLocaleString("id-ID")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {decisions.filter(d => d.decision === "rejected").map((decision) => (
              <Card key={decision.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{decision.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{decision.user.name}</CardTitle>
                        <CardDescription>{decision.user.email}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="destructive">
                      <XCircle className="mr-1 h-3 w-3" />
                      Rejected
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Rejection Reason</p>
                    <p className="text-sm">{decision.reason}</p>
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
