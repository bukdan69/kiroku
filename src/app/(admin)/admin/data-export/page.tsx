import { Metadata } from "next";
import { Download, Database, FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Data Export - Admin - Arisan KU",
  description: "Export system data",
};

const dataTypes = [
  { id: "users", label: "Users", description: "All user accounts and profiles" },
  { id: "groups", label: "Groups", description: "Arisan groups and members" },
  { id: "transactions", label: "Transactions", description: "Payment transactions" },
  { id: "kyc", label: "KYC Records", description: "Identity verifications" },
  { id: "audit", label: "Audit Logs", description: "System activity logs" },
  { id: "notifications", label: "Notifications", description: "Notification history" },
];

const exportHistory = [
  { id: 1, filename: "full_backup_2026_01_30.zip", date: "2026-01-30", size: "125 MB", type: "Full Backup" },
  { id: 2, filename: "users_export_2026_01_29.csv", date: "2026-01-29", size: "5.2 MB", type: "Users" },
  { id: 3, filename: "transactions_2026_01.xlsx", date: "2026-01-28", size: "8.7 MB", type: "Transactions" },
];

export default function AdminDataExportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-6xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Data Export</h1>
          <p className="text-muted-foreground">
            Export system data for backup and analysis
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Export Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Data to Export</CardTitle>
                <CardDescription>
                  Choose which data types to include in the export
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataTypes.map((type) => (
                    <div key={type.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Checkbox id={type.id} />
                      <div className="flex-1">
                        <label
                          htmlFor={type.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {type.label}
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Configure export settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="format">Export Format</Label>
                  <Select defaultValue="csv">
                    <SelectTrigger id="format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="sql">SQL Dump</SelectItem>
                      <SelectItem value="zip">Full Backup (ZIP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-deleted" />
                  <label
                    htmlFor="include-deleted"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Include deleted records
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="compress" defaultChecked />
                  <label
                    htmlFor="compress"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Compress export file
                  </label>
                </div>
                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & History */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Export</CardTitle>
                <CardDescription>
                  Pre-configured export options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Database className="mr-2 h-4 w-4" />
                  Full Database Backup
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  All Users Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  This Month's Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Compliance Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export History</CardTitle>
                <CardDescription>
                  Previously exported files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {exportHistory.map((export_) => (
                    <div key={export_.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{export_.filename}</p>
                          <p className="text-xs text-muted-foreground">
                            {export_.type} • {export_.size}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(export_.date).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
