import { Metadata } from "next";
import Link from "next/link";
import { Users, Calendar, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "Join Group - Arisan KU",
  description: "Accept invitation to join arisan group",
};

// Mock data - replace with real data from API based on token
const invitation = {
  groupId: 1,
  groupName: "Arisan Keluarga",
  description: "Arisan keluarga besar untuk tabungan bersama",
  admin: {
    name: "John Doe",
    email: "john@example.com",
  },
  members: 12,
  maxMembers: 15,
  contribution: 500000,
  period: "Bulanan",
  nextDraw: "2026-02-15",
  status: "active",
  invitedBy: "Jane Smith",
};

const currentMembers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
  { id: 4, name: "Alice Brown" },
];

export default function InviteAcceptPage({ params }: { params: { token: string } }) {
  const availableSlots = invitation.maxMembers - invitation.members;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-4xl mx-auto p-4 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Undangan Bergabung</h1>
          <p className="text-muted-foreground">
            {invitation.invitedBy} mengundang Anda untuk bergabung
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{invitation.groupName}</CardTitle>
                <CardDescription>{invitation.description}</CardDescription>
              </div>
              <Badge variant={invitation.status === "active" ? "default" : "secondary"}>
                {invitation.status === "active" ? "Aktif" : "Selesai"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Anggota</p>
                  <p className="font-semibold">
                    {invitation.members}/{invitation.maxMembers}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Iuran</p>
                  <p className="font-semibold">
                    Rp {(invitation.contribution / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Periode</p>
                  <p className="font-semibold">{invitation.period}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Administrator</h3>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Avatar>
                  <AvatarFallback>{invitation.admin.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{invitation.admin.name}</p>
                  <p className="text-sm text-muted-foreground">{invitation.admin.email}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Anggota Saat Ini ({invitation.members})</h3>
              <div className="flex -space-x-2">
                {currentMembers.map((member) => (
                  <Avatar key={member.id} className="border-2 border-background">
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {invitation.members > currentMembers.length && (
                  <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                    +{invitation.members - currentMembers.length}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Yang Perlu Anda Ketahui</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Komitmen Pembayaran</p>
                <p className="text-sm text-muted-foreground">
                  Anda berkomitmen untuk membayar iuran sebesar Rp {invitation.contribution.toLocaleString("id-ID")} setiap {invitation.period.toLowerCase()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Verifikasi KYC</p>
                <p className="text-sm text-muted-foreground">
                  Anda akan diminta melakukan verifikasi identitas sebelum dapat bergabung
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Undian Adil</p>
                <p className="text-sm text-muted-foreground">
                  Sistem undian menggunakan algoritma yang transparan dan dapat diverifikasi
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Perlindungan Dana</p>
                <p className="text-sm text-muted-foreground">
                  Dana Anda dilindungi dan dikelola secara profesional
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth" className="flex-1">
            <Button size="lg" className="w-full">
              Bergabung Sekarang
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              Pelajari Lebih Lanjut
            </Button>
          </Link>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Dengan bergabung, Anda menyetujui{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Syarat & Ketentuan
          </Link>{" "}
          dan{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Kebijakan Privasi
          </Link>
        </p>
      </div>
    </div>
  );
}
