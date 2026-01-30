import { Metadata } from "next";
import { Search, Filter, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "KYC Users - Admin - Arisan KU",
  description: "View all KYC users",
};

// Mock data
const kycUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", idType: "KTP", idNumber: "3201234567890001", status: "verified", verifiedAt: "2026-01-15", verifiedBy: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", idType: "KTP", idNumber: "3201234567890002", status: "pending", submittedAt: "2026-01-29" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", idType: "Passport", idNumber: "A12345678", status: "verified", verifiedAt: "2026-01-20", verifiedBy: "Admin" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", idType: "KTP", idNumber: "3201234567890003", status: "rejected", rejectedAt: "2026-01-25", rejectedBy: "Admin", reason: "Document unclear" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", idType: "KTP", idNumber: "3201234567890004", status: "pending", submittedAt: "2026-01-28" },
];

export default function AdminKycUsersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-7xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">KYC Users</h1>
          <p className="text-muted-foreground">
            View all users with KYC submissions
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name, email, or ID number..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All KYC Submissions</CardTitle>
            <CardDescription>Complete list of KYC verifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>ID Type</TableHead>
                  <TableHead>ID Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Verified By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kycUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.idType}</TableCell>
                    <TableCell className="font-mono text-sm">{user.idNumber}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          user.status === "verified" ? "default" :
                          user.status === "pending" ? "outline" : "destructive"
                        }
                      >
                        {user.status === "verified" && <CheckCircle className="mr-1 h-3 w-3" />}
                        {user.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                        {user.status === "rejected" && <XCircle className="mr-1 h-3 w-3" />}
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.status === "verified" && user.verifiedAt && 
                        new Date(user.verifiedAt).toLocaleDateString("id-ID")}
                      {user.status === "pending" && user.submittedAt && 
                        new Date(user.submittedAt).toLocaleDateString("id-ID")}
                      {user.status === "rejected" && user.rejectedAt && 
                        new Date(user.rejectedAt).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>
                      {user.status === "verified" && user.verifiedBy}
                      {user.status === "rejected" && user.rejectedBy}
                      {user.status === "pending" && "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
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
