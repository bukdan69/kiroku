import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Users, Calendar, DollarSign, Share2, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "Group Detail - Arisan KU",
  description: "View group details",
};

// Mock data - replace with real data from API
const group = {
  id: 1,
  name: "Arisan Keluarga",
  description: "Arisan keluarga besar untuk tabungan bersama",
  members: 12,
  maxMembers: 15,
  contribution: 500000,
  period: "Bulanan",
  nextDraw: "2026-02-15",
  status: "active",
  admin: "John Doe",
};

const members = [
  { id: 1, name: "John Doe", role: "admin", status: "paid", joinDate: "2025-01-01" },
  { id: 2, name: "Jane Smith", role: "member", status: "paid", joinDate: "2025-01-02" },
  { id: 3, name: "Bob Johnson", role: "member", status: "pending", joinDate: "2025-01-03" },
  { id: 4, name: "Alice Brown", role: "member", status: "paid", joinDate: "2025-01-04" },
];

const history = [
  { id: 1, period: "Januari 2026", winner: "John Doe", amount: 6000000, date: "2026-01-15" },
  { id: 2, period: "Desember 2025", winner: "Jane Smith", amount: 6000000, date: "2025-12-15" },
];

export default function GroupDetailPage({ params }: { params: { groupId: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-6xl mx-auto p-4 py-8">
        <div className="mb-6">
          <Link 
            href="/groups" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Grup
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
              <p className="text-muted-foreground">{group.description}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/groups/${params.groupId}/invite`}>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Undang
                </Button>
              </Link>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Pengaturan
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Anggota</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">
                  {group.members}/{group.maxMembers}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Iuran Per Periode</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">
                  Rp {(group.contribution / 1000).toFixed(0)}K
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Undian Berikutnya</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">
                  {new Date(group.nextDraw).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="members" className="space-y-4">
          <TabsList>
            <TabsTrigger value="members">Anggota</TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
            <TabsTrigger value="info">Informasi</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Anggota</CardTitle>
                <CardDescription>
                  {group.members} dari {group.maxMembers} anggota
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Bergabung {new Date(member.joinDate).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {member.role === "admin" && (
                          <Badge variant="secondary">Admin</Badge>
                        )}
                        <Badge variant={member.status === "paid" ? "default" : "outline"}>
                          {member.status === "paid" ? "Lunas" : "Belum Bayar"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Undian</CardTitle>
                <CardDescription>Daftar pemenang undian sebelumnya</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.period}</p>
                        <p className="text-sm text-muted-foreground">
                          Pemenang: {item.winner}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">
                          Rp {item.amount.toLocaleString("id-ID")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Grup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nama Grup</p>
                  <p className="font-medium">{group.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Deskripsi</p>
                  <p className="font-medium">{group.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Administrator</p>
                  <p className="font-medium">{group.admin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Periode</p>
                  <p className="font-medium">{group.period}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge variant={group.status === "active" ? "default" : "secondary"}>
                    {group.status === "active" ? "Aktif" : "Selesai"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Link href={`/groups/${params.groupId}/pay`}>
            <Button size="lg" className="w-full md:w-auto">
              Bayar Iuran Bulan Ini
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
