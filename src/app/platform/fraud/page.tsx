import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, AlertTriangle, Shield, Eye, Ban, 
  CheckCircle, XCircle, MapPin, Smartphone, Activity
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Fraud Detection - Platform Admin",
  description: "Monitor dan investigasi aktivitas mencurigakan",
};

export default function FraudDetectionPage() {
  const stats = {
    activeCases: 5,
    resolved: 23,
    autoBanned: 3,
    underReview: 2,
  };

  const fraudCases = {
    active: [
      {
        id: "1",
        userId: "user-123",
        userName: "Ahmad Yani",
        email: "ahmad@email.com",
        riskLevel: "high",
        riskScore: 85,
        reasons: [
          "Multiple devices detected (5 devices)",
          "Location jump: Jakarta → Surabaya (2 hours)",
          "IP change detected (3 different IPs)",
        ],
        detectedAt: "2026-01-30 08:30",
        lastActivity: "2026-01-30 10:15",
        status: "under_review",
      },
      {
        id: "2",
        userId: "user-456",
        userName: "Siti Aminah",
        email: "siti@email.com",
        riskLevel: "critical",
        riskScore: 95,
        reasons: [
          "Suspicious activity: 10 failed login attempts",
          "Multiple accounts from same device",
          "Unusual transaction pattern",
        ],
        detectedAt: "2026-01-29 15:20",
        lastActivity: "2026-01-29 16:45",
        status: "auto_banned",
      },
    ],
    resolved: [
      {
        id: "3",
        userId: "user-789",
        userName: "Budi Santoso",
        email: "budi@email.com",
        riskLevel: "medium",
        riskScore: 65,
        reasons: ["Location jump detected"],
        resolvedAt: "2026-01-28 14:30",
        resolvedBy: "Super Admin",
        resolution: "False positive - User traveling for work",
        status: "resolved",
      },
    ],
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-600';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-600';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-600';
      default: return 'text-blue-600 bg-blue-100 border-blue-600';
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
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Fraud Detection</h1>
                <p className="text-sm text-muted-foreground">Monitor aktivitas mencurigakan dan fraud</p>
              </div>
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
                Active Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.activeCases}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Under Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.underReview}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Auto Banned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.autoBanned}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Active Cases ({stats.activeCases})
            </TabsTrigger>
            <TabsTrigger value="resolved" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Resolved ({stats.resolved})
            </TabsTrigger>
          </TabsList>

          {/* Active Cases Tab */}
          <TabsContent value="active" className="space-y-4">
            {fraudCases.active.map((fraud) => (
              <Card key={fraud.id} className="border-2 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{fraud.userName}</h3>
                          <Badge className={getRiskColor(fraud.riskLevel)}>
                            {fraud.riskLevel.toUpperCase()}
                          </Badge>
                          <Badge variant={fraud.status === 'auto_banned' ? 'destructive' : 'outline'}>
                            {fraud.status === 'auto_banned' ? 'Auto Banned' : 'Under Review'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{fraud.email}</p>

                        {/* Risk Score */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Risk Score</span>
                            <span className="text-sm font-bold text-red-600">{fraud.riskScore}/100</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div 
                              className="bg-red-600 h-3 rounded-full transition-all" 
                              style={{ width: `${fraud.riskScore}%` }}
                            />
                          </div>
                        </div>

                        {/* Reasons */}
                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-semibold">Detected Issues:</p>
                          {fraud.reasons.map((reason, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>

                        {/* Timestamps */}
                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                          <div>
                            <p className="mb-1">Detected At</p>
                            <p className="font-medium text-foreground">{fraud.detectedAt}</p>
                          </div>
                          <div>
                            <p className="mb-1">Last Activity</p>
                            <p className="font-medium text-foreground">{fraud.lastActivity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button size="sm" asChild>
                      <Link href={`/platform/fraud/${fraud.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Investigate
                      </Link>
                    </Button>
                    {fraud.status !== 'auto_banned' && (
                      <>
                        <Button size="sm" variant="destructive">
                          <Ban className="w-4 h-4 mr-2" />
                          Ban User
                        </Button>
                        <Button size="sm" variant="outline" className="text-green-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Safe
                        </Button>
                      </>
                    )}
                    {fraud.status === 'auto_banned' && (
                      <Button size="sm" variant="outline" className="text-blue-600">
                        <Shield className="w-4 h-4 mr-2" />
                        Unban User
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Resolved Tab */}
          <TabsContent value="resolved" className="space-y-4">
            {fraudCases.resolved.map((fraud) => (
              <Card key={fraud.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{fraud.userName}</h3>
                        <Badge className={getRiskColor(fraud.riskLevel)}>
                          {fraud.riskLevel.toUpperCase()}
                        </Badge>
                        <Badge className="bg-green-600">Resolved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{fraud.email}</p>

                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-semibold">Original Issues:</p>
                        {fraud.reasons.map((reason, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span>• {reason}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                        <p className="text-sm font-semibold text-green-900 mb-1">Resolution:</p>
                        <p className="text-sm text-green-800">{fraud.resolution}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                        <div>
                          <p className="mb-1">Resolved At</p>
                          <p className="font-medium text-foreground">{fraud.resolvedAt}</p>
                        </div>
                        <div>
                          <p className="mb-1">Resolved By</p>
                          <p className="font-medium text-foreground">{fraud.resolvedBy}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Detection Rules */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Fraud Detection Rules</CardTitle>
            <CardDescription>Automated rules untuk mendeteksi aktivitas mencurigakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: Smartphone, title: "Multiple Devices", description: "Deteksi lebih dari 3 device dalam 24 jam", enabled: true },
                { icon: MapPin, title: "Location Jump", description: "Perpindahan lokasi tidak wajar (>500km dalam 2 jam)", enabled: true },
                { icon: Activity, title: "IP Change", description: "Perubahan IP address yang mencurigakan", enabled: true },
                { icon: AlertTriangle, title: "Failed Login", description: "Lebih dari 5 failed login attempts", enabled: true },
                { icon: Shield, title: "Multiple Accounts", description: "Deteksi multiple accounts dari device yang sama", enabled: true },
                { icon: Activity, title: "Unusual Pattern", description: "Pola transaksi yang tidak biasa", enabled: false },
              ].map((rule, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <rule.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">{rule.title}</p>
                      <Badge variant={rule.enabled ? 'default' : 'outline'}>
                        {rule.enabled ? 'Active' : 'Disabled'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
