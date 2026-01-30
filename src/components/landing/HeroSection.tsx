"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const HeroSection = () => {
  const router = useRouter()

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Badge */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-muted/50 text-sm font-medium">
              <Zap className="w-4 h-4 text-primary" />
              Platform Arisan Digital #1 Indonesia
            </div>
          </div>

          {/* Main Headline */}
          <div className="lg:col-span-2 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Kelola Arisan
              <span className="text-primary"> Lebih Mudah </span>
              & Transparan
            </h1>
          </div>

          {/* Subheadline */}
          <div className="lg:col-span-2 text-center">
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Sistem terpercaya dengan keamanan terbaik dan fitur lengkap untuk kelola arisan Anda. 
              Semua tercatat rapi & aman.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={() => router.push('/auth')}>
              Buat Arisan Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="#features">
                Lihat Fitur
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="lg:col-span-2 flex flex-wrap justify-center gap-8 pt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-5 h-5 text-primary" />
              KYC Verified
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-5 h-5 text-primary" />
              Pembayaran Instan
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              10,000+ Pengguna
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative">
          <div className="relative mx-auto max-w-5xl">
            {/* Dashboard Preview Card */}
            <div className="rounded-2xl border bg-card shadow-2xl overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Stats Cards */}
                  <div className="p-6 rounded-xl border bg-background">
                    <p className="text-sm text-muted-foreground mb-2">Total Grup Aktif</p>
                    <p className="text-3xl font-bold">24</p>
                  </div>
                  <div className="p-6 rounded-xl border bg-background">
                    <p className="text-sm text-muted-foreground mb-2">Dana Terkumpul</p>
                    <p className="text-3xl font-bold">Rp 156 Jt</p>
                  </div>
                  <div className="p-6 rounded-xl border bg-background">
                    <p className="text-sm text-muted-foreground mb-2">Anggota Aktif</p>
                    <p className="text-3xl font-bold">342</p>
                  </div>
                </div>

                {/* Sample Group List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Arisan RT 05</p>
                        <p className="text-sm text-muted-foreground">12/15 anggota</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      Aktif
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Arisan Kantor HRD</p>
                        <p className="text-sm text-muted-foreground">20/20 anggota</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Periode 5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating notification */}
          <div className="absolute -bottom-6 -right-6 p-4 rounded-xl border bg-card shadow-xl max-w-xs hidden lg:block">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Baru saja</p>
                <p className="text-sm font-medium mb-1">Pembayaran diterima dari Budi</p>
                <p className="text-sm font-bold text-success">+Rp 500.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection