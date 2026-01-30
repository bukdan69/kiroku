import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Verify Email - Arisan KU",
  description: "Verify your email address",
};

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Verifikasi Email Anda</CardTitle>
          <CardDescription>
            Kami telah mengirimkan email verifikasi ke alamat email Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3 text-left">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p>Cek inbox atau folder spam email Anda</p>
            </div>
            <div className="flex items-start gap-3 text-left">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p>Klik link verifikasi yang kami kirimkan</p>
            </div>
            <div className="flex items-start gap-3 text-left">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p>Setelah verifikasi, Anda bisa login ke dashboard</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Tidak menerima email?
            </p>
            <Button variant="outline" className="w-full">
              Kirim Ulang Email Verifikasi
            </Button>
          </div>

          <div className="pt-2">
            <Link href="/auth">
              <Button className="w-full">
                Kembali ke Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
