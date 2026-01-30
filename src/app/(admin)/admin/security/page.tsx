import { Metadata } from "next";
import { Shield, AlertTriangle, CheckCircle, XCircle, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Security Overview - Admin - Arisan KU",
  description: "System security monitoring",
};

// Mock data
const securityMetrics = {
  threatLevel: "low",
  activeThreats: 0,
  blockedAttempts: 15,
  lastScan: "2026-01-30T10:00:00",
  vulnerabilities: 2,
};

const securityEvents = [
  { 
    id: 1, 
    type: "blocked_login",
    severity: "medium",
    description: "Multiple failed login attempts from IP 192.168.1.100",
    timestamp: "2026-01-30T09:45:00",
    status: "blocked"
  },
  { 
    id: 2, 
    type: "suspicious_activity",
    severity: "low",
    description: "Unusual API request pattern detected",
    timestamp: "2026-01-30T09:30:00",
    status: "monitoring"
  },
  { 
    id: 3, 
    type: "password_reset",
    severity: "low",
    description: "Password reset requested for admin account",
    timestamp: "2026-01-30T09:15:00",
    status: "completed"
  },
];

const vulnerabilities = [
  { 
    id: 1, 
    title: "Outdated npm packages",
    severity: "medium",
    description: "7 npm packages have known vulnerabilities",
    recommendation: "Run npm audit fix to update packages",
    status: "open"
  },
  { 
    id: 2, 
    title: "Weak password policy",
    severity: "low",
    description: "Some users have weak passwords",
    recommendation: "Enforce stronger password requirements",
    status: "open"
  },
];

const accessLogs = [
  { id: 1, user: "admin@example.com", action: "Login", ip: "192.168.1.101", timestamp: "2026-01-30T10:30:00", status: "success" },
  { id: 2, user: "john@example.com", action: "Login", ip: "192.168.1.102", timestamp: "2026-01-30T10:25:00", status: "success" },
  { id: 3, user: "unknown", action: "Login", ip: "192.168.1.100", timestamp: "2026-01-30T10:20:00", status: "failed" },
];

function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical": return "destructive";
    case "high": return "destructive";
    case "medium": return "default";
    case "low": return "secondary";
    default: return "outline";
  }
}

export default function AdminSecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-7xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Security Overview</h1>
          <p className="text-muted-foreground">
            Monitor system security and threats
          </p>
        </div>

        {/* Security Status */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Threat Level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold text-green-500 capitalize">
                  {securityMetrics.threatLevel}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Threats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{securityMetrics.activeThreats}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Blocked Attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{securityMetrics.blockedAttempts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Vulnerabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{securityMetrics.vulnerabilities}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">Security Events</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="access">Access Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            {securityEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <CardTitle className="text-lg">{event.description}</CardTitle>
                        <CardDescription>
                          {new Date(event.timestamp).toLocaleString("id-ID")}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={getSeverityColor(event.severity) as any}>
                      {event.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    <Badge variant={event.status === "blocked" ? "destructive" : "secondary"}>
                      {event.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-4">
            {vulnerabilities.map((vuln) => (
              <Card key={vuln.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{vuln.title}</CardTitle>
                      <CardDescription>{vuln.description}</CardDescription>
                    </div>
                    <Badge variant={getSeverityColor(vuln.severity) as any}>
                      {vuln.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-accent/50 rounded-lg mb-4">
                    <p className="text-sm font-medium mb-1">Recommendation</p>
                    <p className="text-sm text-muted-foreground">{vuln.recommendation}</p>
                  </div>
                  <Button>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Resolved
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="access">
            <Card>
              <CardHeader>
                <CardTitle>Recent Access Logs</CardTitle>
                <CardDescription>User authentication and access history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {accessLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {log.status === "success" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <div>
                          <p className="font-medium">{log.user}</p>
                          <p className="text-sm text-muted-foreground">
                            {log.action} from {log.ip}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={log.status === "success" ? "default" : "destructive"}>
                          {log.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(log.timestamp).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Security Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                Run Security Scan
              </Button>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Update Firewall Rules
              </Button>
              <Button variant="outline">
                <CheckCircle className="mr-2 h-4 w-4" />
                Review Permissions
              </Button>
              <Button variant="outline">
                <AlertTriangle className="mr-2 h-4 w-4" />
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
