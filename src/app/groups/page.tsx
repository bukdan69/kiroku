import { Metadata } from "next";
import Link from "next/link";
import { Plus, Users, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Groups - Arisan KU",
  description: "Manage your arisan groups",
};

// Mock data - replace with real data from API
const groups = [
  {
    id: 1,
    name: "Arisan Keluarga",
    members: 12,
    maxMembers: 15,
    contribution: 500000,
    period: "Bulanan",
    nextDraw: "2026-02-15",
    status: "active",
  },
  {
    id: 2,
    name: "Arisan Kantor",
    members: 20,
    maxMembers: 20,
    contribution: 1000000,
    period: "Bulanan",
    nextDraw: "2026-02-20",
    status: "active",
  },
  {
    id: 3,
    name: "Arisan RT",
    members: 8,
    maxMembers: 10,
    contribution: 300000,
    period: "Bulanan",
    nextDraw: "2026-02-10",
    status: "active",
  },
];

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-6xl mx-auto p-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Grup Arisan Saya</h1>
            <p className="text-muted-foreground">
              Kelola semua grup arisan Anda di satu tempat
            </p>
          </div>
          <Link href="/dashboard/groups/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Buat Grup Baru
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{group.name}</CardTitle>
                    <Badge variant={group.status === "active" ? "default" : "secondary"}>
                      {group.status === "active" ? "Aktif" : "Selesai"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {group.members}/{group.maxMembers} Anggota
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Rp {group.contribution.toLocaleString("id-ID")} / {group.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Undian: {new Date(group.nextDraw).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Link href={`/groups/${group.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Detail
                    </Button>
                  </Link>
                  <Link href={`/groups/${group.id}/pay`} className="flex-1">
                    <Button className="w-full">
                      Bayar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {groups.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum Ada Grup</h3>
              <p className="text-muted-foreground mb-6">
                Mulai dengan membuat grup arisan pertama Anda
              </p>
              <Link href="/dashboard/groups/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Buat Grup Baru
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
