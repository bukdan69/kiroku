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
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Tentang <span className="text-primary">Arisan KU</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Platform arisan online terpercaya yang menghadirkan transparansi, keamanan, 
            dan kemudahan dalam mengelola arisan digital di Indonesia.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-2xl border bg-card">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Misi Kami</h2>
              <p className="text-muted-foreground">
                Menyediakan platform arisan digital yang aman, transparan, dan mudah digunakan 
                untuk membantu masyarakat Indonesia mengelola arisan dengan lebih baik.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl border bg-card">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Visi Kami</h2>
              <p className="text-muted-foreground">
                Menjadi platform arisan online #1 di Indonesia yang dipercaya oleh jutaan pengguna 
                dengan teknologi terdepan dan layanan terbaik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Nilai-Nilai <span className="text-primary">Kami</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prinsip yang kami pegang teguh dalam setiap layanan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Keamanan</h3>
              <p className="text-muted-foreground">
                Sistem keamanan berlapis dengan KYC verification dan fraud detection 
                untuk melindungi setiap transaksi.
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Transparansi</h3>
              <p className="text-muted-foreground">
                Semua transaksi tercatat dengan jelas dan dapat diakses oleh semua anggota 
                untuk membangun kepercayaan.
              </p>
            </div>
            <div className="text-center p-6">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Inovasi</h3>
              <p className="text-muted-foreground">
                Terus berinovasi dengan teknologi terbaru untuk memberikan pengalaman 
                terbaik bagi pengguna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">10,000+</p>
              <p className="text-muted-foreground">Pengguna Aktif</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">5,000+</p>
              <p className="text-muted-foreground">Grup Arisan</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">Rp 50M+</p>
              <p className="text-muted-foreground">Dana Dikelola</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">99.9%</p>
              <p className="text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Siap Bergabung dengan Kami?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Mulai kelola arisan Anda dengan lebih mudah dan transparan hari ini
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
