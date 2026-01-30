import { Metadata } from "next";
import { Download, FileText, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Payments Export - Admin - Arisan KU",
  description: "Export payment data",
};

const exportHistory = [
  { id: 1, filename: "payments_2026_01.csv", date: "2026-01-30", size: "2.5 MB", records: 892 },
  { id: 2, filename: "payments_2025_12.csv", date: "2026-01-01", size: "2.3 MB", records: 756 },
  { id: 3, filename: "payments_2025_11.csv", date: "2025-12-01", size: "2.1 MB", records: 698 },
];

export default function AdminPaymentsExportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-5xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payments Export</h1>
          <p className="text-muted-foreground">
            Export payment data for reporting and analysis
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Export Form */}
          <Card>
            <CardHeader>
              <CardTitle>Export Payment Data</CardTitle>
              <CardDescription>
                Select date range and format to export
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="format">Export Format</Label>
                <Select defaultValue="csv">
                  <SelectTrigger id="format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Payment Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="success">Success Only</SelectItem>
                    <SelectItem value="pending">Pending Only</SelectItem>
                    <SelectItem value="failed">Failed Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </CardContent>
          </Card>

          {/* Quick Export Options */}
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
                  <Calendar className="mr-2 h-4 w-4" />
                  Export This Month
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Export Last Month
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Export This Year
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Export All Data
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
                    <div key={export_.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{export_.filename}</p>
                        <p className="text-xs text-muted-foreground">
                          {export_.records} records • {export_.size}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
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
