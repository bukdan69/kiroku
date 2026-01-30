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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <Card className="border-2">
          <CardHeader className="space-y-4 text-center">
            {/* Logo/Icon */}
            <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold">Platform Admin</CardTitle>
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
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    href="/platform/forgot-password" 
                    className="text-sm text-primary hover:underline"
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
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                <Shield className="mr-2 h-5 w-5" />
                Login sebagai Admin
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
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
            Bukan admin? <Link href="/auth" className="text-primary hover:underline">Login sebagai user</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
