import { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Platform Admin Login - Arisan KU",
  description: "Super Admin login untuk mengelola platform Arisan KU",
};

export default function PlatformLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects with glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md animate-page-in">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300 mb-6 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Beranda
        </Link>

        <Card className="border-2 border-primary/20 shadow-2xl shadow-primary/20 backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center">
            {/* Logo/Icon with gradient */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 animate-pulse">
              <Shield className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                Platform Admin
              </CardTitle>
              <CardDescription className="mt-2">
                Login khusus untuk Super Administrator
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form action="/api/platform/login" method="POST" className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@arisanku.com"
                  required
                  autoComplete="email"
                  className="border-primary/30 focus:border-primary focus:ring-primary/20"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    href="/platform/forgot-password" 
                    className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                  >
                    Lupa password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="border-primary/30 focus:border-primary focus:ring-primary/20"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full shadow-xl shadow-primary/30" size="lg">
                <Shield className="mr-2 h-5 w-5" />
                Login sebagai Admin
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-cyan-500/5 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground text-center">
                🔒 Halaman ini hanya untuk Super Administrator platform.
                <br />
                Semua aktivitas login akan dicatat dalam audit log.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Bukan admin? <Link href="/auth" className="text-primary hover:text-primary/80 hover:underline font-medium">Login sebagai user</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
