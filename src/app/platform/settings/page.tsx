import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, Settings, DollarSign, Mail, MessageCircle,
  Shield, Bell, Globe, Save
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Platform Settings - Platform Admin",
  description: "Global platform configuration",
};

export default function PlatformSettingsPage() {
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
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Platform Settings</h1>
                <p className="text-sm text-muted-foreground">Global platform configuration</p>
              </div>
            </div>

            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="fees" className="space-y-6">
          <TabsList>
            <TabsTrigger value="fees">
              <DollarSign className="w-4 h-4 mr-2" />
              Fees
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="whatsapp">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="general">
              <Globe className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
          </TabsList>

          {/* Fees Tab */}
          <TabsContent value="fees">
            <Card>
              <CardHeader>
                <CardTitle>Fee Configuration</CardTitle>
                <CardDescription>Configure platform, admin, and affiliate fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platform-fee">Platform Fee (%)</Label>
                    <Input id="platform-fee" type="number" defaultValue="2" step="0.1" />
                    <p className="text-xs text-muted-foreground">
                      Fee yang diambil platform dari setiap transaksi
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-fee">Admin Fee (%)</Label>
                    <Input id="admin-fee" type="number" defaultValue="0" step="0.1" />
                    <p className="text-xs text-muted-foreground">
                      Fee untuk pengelola grup (bandar)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="affiliate-fee">Affiliate Commission (%)</Label>
                    <Input id="affiliate-fee" type="number" defaultValue="2" step="0.1" />
                    <p className="text-xs text-muted-foreground">
                      Komisi untuk affiliate referral
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawal-fee">Withdrawal Fee (Rp)</Label>
                    <Input id="withdrawal-fee" type="number" defaultValue="2500" />
                    <p className="text-xs text-muted-foreground">
                      Biaya admin untuk setiap withdrawal
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="min-withdrawal">Minimum Withdrawal (Rp)</Label>
                    <Input id="min-withdrawal" type="number" defaultValue="50000" />
                    <p className="text-xs text-muted-foreground">
                      Minimal amount untuk withdrawal
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Tab */}
          <TabsContent value="email">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Configuration</CardTitle>
                  <CardDescription>SMTP settings dan email templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-host">SMTP Host</Label>
                      <Input id="smtp-host" placeholder="smtp.gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input id="smtp-port" type="number" placeholder="587" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-user">SMTP Username</Label>
                      <Input id="smtp-user" type="email" placeholder="noreply@arisanku.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-pass">SMTP Password</Label>
                      <Input id="smtp-pass" type="password" placeholder="••••••••" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from-email">From Email</Label>
                    <Input id="from-email" type="email" defaultValue="noreply@arisanku.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from-name">From Name</Label>
                    <Input id="from-name" defaultValue="Arisan KU" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Customize email templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="welcome-email">Welcome Email Template</Label>
                    <Textarea 
                      id="welcome-email" 
                      rows={4}
                      placeholder="Hi {{name}}, Welcome to Arisan KU..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kyc-approved">KYC Approved Template</Label>
                    <Textarea 
                      id="kyc-approved" 
                      rows={4}
                      placeholder="Selamat {{name}}, KYC Anda telah disetujui..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-reminder">Payment Reminder Template</Label>
                    <Textarea 
                      id="payment-reminder" 
                      rows={4}
                      placeholder="Halo {{name}}, Reminder pembayaran arisan..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* WhatsApp Tab */}
          <TabsContent value="whatsapp">
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Configuration</CardTitle>
                <CardDescription>WhatsApp Business API settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wa-api-key">API Key</Label>
                  <Input id="wa-api-key" type="password" placeholder="••••••••••••••••" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wa-phone">WhatsApp Business Number</Label>
                  <Input id="wa-phone" placeholder="+62 812-3456-7890" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wa-webhook">Webhook URL</Label>
                  <Input id="wa-webhook" placeholder="https://arisanku.com/api/whatsapp/webhook" />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Enable WhatsApp Notifications</p>
                    <p className="text-sm text-muted-foreground">Send notifications via WhatsApp</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wa-template">Payment Reminder Template</Label>
                  <Textarea 
                    id="wa-template" 
                    rows={4}
                    placeholder="Halo *{{name}}*, reminder pembayaran arisan {{group_name}}..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Platform security configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-muted-foreground">Require two-factor authentication for admins</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Auto-ban Fraud</p>
                      <p className="text-sm text-muted-foreground">Automatically ban users with high fraud score</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">KYC Required</p>
                      <p className="text-sm text-muted-foreground">Require KYC verification for all users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                    <Input id="max-login-attempts" type="number" defaultValue="5" />
                    <p className="text-xs text-muted-foreground">
                      Maximum failed login attempts before account lock
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="60" />
                    <p className="text-xs text-muted-foreground">
                      Auto logout after inactivity
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fraud Detection Rules</CardTitle>
                  <CardDescription>Configure fraud detection thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fraud-threshold">Fraud Score Threshold</Label>
                    <Input id="fraud-threshold" type="number" defaultValue="80" />
                    <p className="text-xs text-muted-foreground">
                      Auto-ban if fraud score exceeds this value
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-devices">Max Devices per User</Label>
                    <Input id="max-devices" type="number" defaultValue="3" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location-jump">Location Jump Distance (km)</Label>
                    <Input id="location-jump" type="number" defaultValue="500" />
                    <p className="text-xs text-muted-foreground">
                      Flag if user moves more than this distance in 2 hours
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* General Tab */}
          <TabsContent value="general">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Platform general configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="Arisan KU" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platform-url">Platform URL</Label>
                    <Input id="platform-url" defaultValue="https://arisanku.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input id="support-email" type="email" defaultValue="support@arisanku.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="support-phone">Support Phone</Label>
                    <Input id="support-phone" defaultValue="+62 812-3456-7890" />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">Put platform in maintenance mode</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Allow New Registrations</p>
                      <p className="text-sm text-muted-foreground">Allow new users to register</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-groups-no-kyc">Max Groups without KYC</Label>
                    <Input id="max-groups-no-kyc" type="number" defaultValue="3" />
                    <p className="text-xs text-muted-foreground">
                      Maximum groups a user can create without KYC verification
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Flags</CardTitle>
                  <CardDescription>Enable or disable platform features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Affiliate Program</p>
                      <p className="text-sm text-muted-foreground">Enable affiliate referral program</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">WhatsApp Notifications</p>
                      <p className="text-sm text-muted-foreground">Send notifications via WhatsApp</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Send notifications via Email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Auto Draw</p>
                      <p className="text-sm text-muted-foreground">Automatically conduct draws when all paid</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
