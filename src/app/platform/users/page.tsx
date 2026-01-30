import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, Users, Search, Filter, Download, 
  UserCheck, UserX, Shield, Eye, Ban, Mail
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "User Management - Platform Admin",
  description: "Kelola semua user platform Arisan KU",
};

export default function PlatformUsersPage() {
  // Mock data - nanti akan diganti dengan real data dari database
  const stats = {
    total: 10234,
    active: 9876,
    inactive: 358,
    verified: 7543,
    banned: 12,
  };

  const users = {
    all: [
      {
        id: "1",
        name: "Budi Santoso",
        email: "budi@email.com",
        role: "bandar",
        kycStatus: "approved",
        isActive: true,
        joinedAt: "2026-01-15",
        lastLoginAt: "2026-01-30 08:30",
        groups: 3,
        totalTransactions: 45,
      },
      {
        id: "2",
        name: "Siti Aminah",
        email: "siti@email.com",
        role: "user",
        kycStatus: "pending",
        isActive: true,
        joinedAt: "2026-01-20",
        lastLoginAt: "2026-01-29 15:20",
        groups: 2,
        totalTransactions: 12,
      },
      {
        id: "3",
        name: "Ahmad Yani",
        email: "ahmad@email.com",
        role: "user",
        kycStatus: "approved",
        isActive: true,
        joinedAt: "2026-01-10",
        lastLoginAt: "2026-01-30 10:15",
        groups: 5,
        totalTransactions: 78,
      },
      {
        id: "4",
        name: "Dewi Lestari",
        email: "dewi@email.com",
        role: "admin",
        kycStatus: "approved",
        isActive: true,
        joinedAt: "2026-01-05",
        lastLoginAt: "2026-01-30 09:45",
        groups: 8,
        totalTransactions: 156,
      },
      {
        id: "5",
        name: "Rudi Hartono",
        email: "rudi@email.com",
        role: "user",
        kycStatus: "rejected",
        isActive: false,
        joinedAt: "2026-01-25",
        lastLoginAt: "2026-01-28 14:30",
        groups: 0,
        totalTransactions: 0,
      },
    ],
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
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">User Management</h1>
                <p className="text-sm text-muted-foreground">Kelola semua user platform</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Inactive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.inactive.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                KYC Verified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.verified.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Banned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.banned}</div>
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
                  placeholder="Cari user by name, email, atau ID..."
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

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Daftar semua user terdaftar di platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.all.map((user) => (
                <div 
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant={
                          user.role === 'admin' ? 'default' :
                          user.role === 'bandar' ? 'secondary' :
                          'outline'
                        }>
                          {user.role}
                        </Badge>
                        {user.kycStatus === 'approved' && (
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            <UserCheck className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {!user.isActive && (
                          <Badge variant="destructive">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Joined: {user.joinedAt}</span>
                        <span>•</span>
                        <span>Last login: {user.lastLoginAt}</span>
                        <span>•</span>
                        <span>{user.groups} groups</span>
                        <span>•</span>
                        <span>{user.totalTransactions} transactions</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/platform/users/${user.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Detail
                      </Link>
                    </Button>
                    
                    {user.isActive ? (
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Ban className="w-4 h-4 mr-2" />
                        Ban
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                        <UserCheck className="w-4 h-4 mr-2" />
                        Activate
                      </Button>
                    )}

                    <Button size="sm" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Showing 1-5 of {stats.total.toLocaleString()} users
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
