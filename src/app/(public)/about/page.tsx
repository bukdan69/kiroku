import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Users, Target, Award } from "lucide-react"
import { siteConfig } from "@/lib/config/site"

export const metadata: Metadata = {
  title: "Tentang Kami - Arisan KU",
  description: "Pelajari lebih lanjut tentang Arisan KU, platform arisan online terpercaya di Indonesia dengan sistem keamanan terbaik.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <div className="border-b border-primary/20 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-all">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero with gradient */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-page-in">
            Tentang{' '}
            <span className="bg-gradient-to-r from-primary via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Arisan KU
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-page-in">
            Platform arisan online terpercaya yang menghadirkan transparansi, keamanan, 
            dan kemudahan dalam mengelola arisan digital di Indonesia.
          </p>
        </div>
      </section>

      {/* Mission & Vision with gradient cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="group text-center p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                Misi Kami
              </h2>
              <p className="text-muted-foreground">
                Menyediakan platform arisan digital yang aman, transparan, dan mudah digunakan 
                untuk membantu masyarakat Indonesia mengelola arisan dengan lebih baik.
              </p>
            </div>
            <div className="group text-center p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card to-cyan-500/5 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Visi Kami
              </h2>
              <p className="text-muted-foreground">
                Menjadi platform arisan online #1 di Indonesia yang dipercaya oleh jutaan pengguna 
                dengan teknologi terdepan dan layanan terbaik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values with colorful icons */}
      <section className="py-20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(42, 176, 158, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(42, 176, 158, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Nilai-Nilai{' '}
              <span className="bg-gradient-to-r from-primary via-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Kami
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prinsip yang kami pegang teguh dalam setiap layanan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group text-center p-6 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-cyan-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-110 transition-all">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Keamanan</h3>
              <p className="text-muted-foreground">
                Sistem keamanan berlapis dengan KYC verification dan fraud detection 
                untuk melindungi setiap transaksi.
              </p>
            </div>
            <div className="group text-center p-6 rounded-xl border border-cyan-500/20 bg-card/50 backdrop-blur-sm hover:bg-cyan-500/5 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-primary rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-cyan-500/30 group-hover:scale-110 transition-all">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-500">Transparansi</h3>
              <p className="text-muted-foreground">
                Semua transaksi tercatat dengan jelas dan dapat diakses oleh semua anggota 
                untuk membangun kepercayaan.
              </p>
            </div>
            <div className="group text-center p-6 rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm hover:bg-purple-500/5 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-purple-500/30 group-hover:scale-110 transition-all">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-500">Inovasi</h3>
              <p className="text-muted-foreground">
                Terus berinovasi dengan teknologi terbaru untuk memberikan pengalaman 
                terbaik bagi pengguna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats with gradient numbers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg hover:shadow-primary/20 transition-all">
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent mb-2">
                10,000+
              </p>
              <p className="text-muted-foreground font-medium">Pengguna Aktif</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-card to-cyan-500/5 hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-primary bg-clip-text text-transparent mb-2">
                5,000+
              </p>
              <p className="text-muted-foreground font-medium">Grup Arisan</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-card to-purple-500/5 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                Rp 50M+
              </p>
              <p className="text-muted-foreground font-medium">Dana Dikelola</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg hover:shadow-primary/20 transition-all">
              <p className="text-4xl font-bold bg-gradient-to-r from-primary via-cyan-500 to-purple-500 bg-clip-text text-transparent mb-2">
                99.9%
              </p>
              <p className="text-muted-foreground font-medium">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA with dramatic gradient */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-cyan-500 to-purple-500">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Siap Bergabung dengan Kami?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Mulai kelola arisan Anda dengan lebih mudah dan transparan hari ini
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:scale-110 text-lg px-8 shadow-2xl shadow-white/30 font-bold transition-all">
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer with gradient */}
      <div className="border-t border-primary/20 py-8 bg-gradient-to-r from-background via-primary/5 to-background">
        <div className="container mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Powered by</span>
            <span className="font-bold bg-gradient-to-r from-primary via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Pak D Sinnay
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
