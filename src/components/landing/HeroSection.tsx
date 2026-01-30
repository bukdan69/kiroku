"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const HeroSection = () => {
  const router = useRouter()

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background decoration with glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Badge with gradient */}
          <div className="lg:col-span-2 flex justify-center animate-page-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-cyan-500/10 backdrop-blur-sm text-sm font-medium shadow-lg shadow-primary/20">
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent font-bold">
                Platform Arisan Digital #1 Indonesia
              </span>
            </div>
          </div>

          {/* Main Headline with gradient text */}
          <div className="lg:col-span-2 text-center animate-page-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Kelola Arisan
              <span className="bg-gradient-to-r from-primary via-cyan-500 to-primary bg-clip-text text-transparent"> Lebih Mudah </span>
              & Transparan
            </h1>
          </div>

          {/* Subheadline */}
          <div className="lg:col-span-2 text-center animate-page-in">
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Sistem terpercaya dengan keamanan terbaik dan fitur lengkap untuk kelola arisan Anda. 
              Semua tercatat rapi & aman.
            </p>
          </div>

          {/* CTA Buttons with enhanced effects */}
          <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 justify-center animate-page-in">
            <Button size="lg" className="text-lg px-8 shadow-2xl shadow-primary/40" onClick={() => router.push('/auth')}>
              Buat Arisan Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="#features">
                Lihat Fitur
              </Link>
            </Button>
          </div>

          {/* Trust Indicators with glow */}
          <div className="lg:col-span-2 flex flex-wrap justify-center gap-8 pt-8 animate-page-in">
            <div className="flex items-center gap-2 text-sm text-muted-foreground px-4 py-2 rounded-full bg-primary/5 border border-primary/20">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-medium">KYC Verified</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground px-4 py-2 rounded-full bg-primary/5 border border-primary/20">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-medium">Pembayaran Instan</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground px-4 py-2 rounded-full bg-primary/5 border border-primary/20">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-medium">10,000+ Pengguna</span>
            </div>
          </div>
        </div>

        {/* Hero Visual with enhanced shadow */}
        <div className="mt-20 relative animate-page-in">
          <div className="relative mx-auto max-w-5xl">
            {/* Dashboard Preview Card with gradient border */}
            <div className="rounded-2xl border-2 border-primary/20 bg-card shadow-2xl shadow-primary/20 overflow-hidden backdrop-blur-sm">
              <div className="bg-gradient-to-r from-muted/50 to-primary/5 px-6 py-4 border-b border-primary/10 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive shadow-lg shadow-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-warning shadow-lg shadow-warning/50" />
                <div className="w-3 h-3 rounded-full bg-success shadow-lg shadow-success/50" />
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Stats Cards with gradient */}
                  <div className="p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                    <p className="text-sm text-muted-foreground mb-2">Total Grup Aktif</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">24</p>
                  </div>
                  <div className="p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                    <p className="text-sm text-muted-foreground mb-2">Dana Terkumpul</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Rp 156 Jt</p>
                  </div>
                  <div className="p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                    <p className="text-sm text-muted-foreground mb-2">Anggota Aktif</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">342</p>
                  </div>
                </div>

                {/* Sample Group List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-primary/10 bg-background hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center shadow-md">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Arisan RT 05</p>
                        <p className="text-sm text-muted-foreground">12/15 anggota</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-success/20 to-success/10 text-success border border-success/30 shadow-sm">
                      Aktif
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-primary/10 bg-background hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center shadow-md">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Arisan Kantor HRD</p>
                        <p className="text-sm text-muted-foreground">20/20 anggota</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary/20 to-cyan-500/10 text-primary border border-primary/30 shadow-sm">
                      Periode 5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating notification with glow */}
          <div className="absolute -bottom-6 -right-6 p-4 rounded-xl border-2 border-success/30 bg-card shadow-2xl shadow-success/20 max-w-xs hidden lg:block backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center flex-shrink-0 shadow-lg shadow-success/30">
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