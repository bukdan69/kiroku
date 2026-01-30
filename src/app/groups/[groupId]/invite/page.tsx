import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Copy, Mail, MessageCircle, Share2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Invite Members - Arisan KU",
  description: "Invite members to your arisan group",
};

// Mock data
const group = {
  id: 1,
  name: "Arisan Keluarga",
  members: 12,
  maxMembers: 15,
  inviteLink: "https://arisanku.com/invite/abc123xyz",
};

export default function GroupInvitePage({ params }: { params: { groupId: string } }) {
  const availableSlots = group.maxMembers - group.members;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-4xl mx-auto p-4 py-8">
        <div className="mb-6">
          <Link 
            href={`/groups/${params.groupId}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Detail Grup
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Undang Anggota</h1>
              <p className="text-muted-foreground">
                {availableSlots} slot tersedia untuk {group.name}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Link Undangan</CardTitle>
              <CardDescription>
                Bagikan link ini kepada orang yang ingin Anda undang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invite-link">Link Undangan</Label>
                <div className="flex gap-2">
                  <Input
                    id="invite-link"
                    value={group.inviteLink}
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Link ini dapat digunakan oleh siapa saja yang memilikinya
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Undang via Email</CardTitle>
              <CardDescription>
                Kirim undangan langsung ke email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Pesan (Opsional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan pribadi untuk undangan..."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Kirim Undangan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informasi Undangan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Link Tidak Kadaluarsa</p>
                <p className="text-sm text-muted-foreground">
                  Link undangan dapat digunakan kapan saja selama grup masih aktif
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Verifikasi Otomatis</p>
                <p className="text-sm text-muted-foreground">
                  Anggota baru akan diminta melakukan verifikasi KYC sebelum bergabung
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Batas Anggota</p>
                <p className="text-sm text-muted-foreground">
                  Link akan otomatis nonaktif setelah grup mencapai {group.maxMembers} anggota
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Notifikasi Real-time</p>
                <p className="text-sm text-muted-foreground">
                  Anda akan menerima notifikasi setiap ada anggota baru yang bergabung
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
