import { Metadata } from "next";
import Link from "next/link";
import { 
  UserCheck, Search, CreditCard, Gift, 
  CheckCircle, Shield, Bell, Smartphone, Zap,
  ArrowRight, Play, Download, MessageCircle, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Panduan Peserta Arisan - Arisan KU",
  description: "Panduan lengkap untuk bergabung dan berpartisipasi dalam arisan digital dengan mudah dan aman",
};

export default function PanduanPesertaPage() {
  const steps = [
    {
      number: "01",
      icon: UserCheck,
      title: "Daftar Akun",
      duration: "5 menit",
      description: "Buat akun dengan mudah menggunakan Google Account atau email",
      details: [
        "Daftar dengan Google Account (instant)",
        "Atau gunakan email dan password",
        "Verifikasi email otomatis",
        "Langsung bisa bergabung grup"
      ],
      tips: "Gunakan Google Account untuk proses lebih cepat dan tidak perlu ingat password",
      illustration: "register"
    },
    {
      number: "02",
      icon: Search,
      title: "Cari & Gabung Grup",
      duration: "2 menit",
      description: "Temukan grup arisan yang sesuai atau gunakan kode undangan",
      details: [
        "Terima link undangan dari pengelola",
        "Atau cari grup publik di marketplace",
        "Lihat detail: nominal, periode, anggota",
        "Klik 'Gabung' untuk join grup"
      ],
      tips: "Pastikan nominal dan periode sesuai dengan kemampuan finansial Anda",
      illustration: "search"
    },
    {
      number: "03",
      icon: CreditCard,
      title: "Bayar Kontribusi",
      duration: "3 menit",
      description: "Bayar kontribusi setiap periode dengan berbagai metode pembayaran",
      details: [
        "Terima reminder otomatis via WhatsApp",
        "Pilih metode: Transfer Bank, E-Wallet, QRIS",
        "Bayar sebelum deadline periode",
        "Konfirmasi otomatis setelah pembayaran"
      ],
      tips: "Set reminder pribadi 2 hari sebelum deadline untuk menghindari telat bayar",
      illustration: "payment"
    },
    {
      number: "04",
      icon: Gift,
      title: "Ikuti Undian",
      duration: "Otomatis",
      description: "Sistem melakukan undian fair dan transparan setiap periode",
      details: [
        "Undian otomatis setelah semua bayar",
        "Notifikasi hasil via WhatsApp & Email",
        "Sistem fair dengan teknologi blockchain",
        "Riwayat undian dapat dilihat kapan saja"
      ],
      tips: "Semakin rajin bayar tepat waktu, semakin besar peluang menang di periode berikutnya",
      illustration: "draw"
    },
    {
      number: "05",
      icon: Smartphone,
      title: "Terima Dana",
      duration: "Instant",
      description: "Dana arisan langsung masuk ke wallet atau rekening Anda",
      details: [
        "Dana masuk otomatis setelah menang",
        "Bisa withdraw ke rekening bank",
        "Atau gunakan untuk bayar periode berikutnya",
        "Riwayat transaksi tersimpan lengkap"
      ],
      tips: "Gunakan dana arisan untuk kebutuhan produktif atau investasi",
      illustration: "receive"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Aman & Terpercaya",
      description: "Dana dijamin aman dengan sistem escrow dan KYC verification"
    },
    {
      icon: Bell,
      title: "Reminder Otomatis",
      description: "Tidak akan lupa bayar dengan notifikasi WhatsApp otomatis"
    },
    {
      icon: Zap,
      title: "Proses Cepat",
      description: "Daftar 5 menit, langsung bisa join grup dan bayar"
    },
    {
      icon: Users,
      title: "Komunitas Solid",
      description: "Bergabung dengan ribuan peserta arisan di seluruh Indonesia"
    }
  ];

  const faqs = [
    {
      q: "Apakah ada biaya untuk peserta?",
      a: "Tidak ada biaya tambahan. Platform fee 2% sudah termasuk dalam perhitungan kontribusi."
    },
    {
      q: "Bagaimana jika saya telat bayar?",
      a: "Anda akan dapat 3x reminder. Jika tetap telat, tidak ikut undian periode itu dan dapat denda sesuai aturan grup."
    },
    {
      q: "Apakah bisa keluar dari grup?",
      a: "Bisa, tapi harus selesaikan kewajiban periode berjalan. Dana yang sudah dibayar tidak bisa dikembalikan."
    },
    {
      q: "Bagaimana cara withdraw dana?",
      a: "Masuk ke Wallet, pilih Withdraw, masukkan nominal dan rekening tujuan. Dana masuk 1x24 jam."
    },
    {
      q: "Apakah sistem undian benar-benar fair?",
      a: "Ya! Kami gunakan teknologi commit-reveal yang transparan dan tidak bisa dimanipulasi."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-sm px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Panduan Peserta
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Ikut Arisan <span className="text-primary">Jadi Mudah</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Bergabung dengan arisan digital hanya 5 langkah. Aman, mudah, dan transparan!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth">
                  Daftar Gratis Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#langkah-1">
                  <Play className="mr-2 h-5 w-5" />
                  Lihat Panduan
                </a>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-card border">
              <p className="text-3xl font-bold text-primary mb-2">5</p>
              <p className="text-sm text-muted-foreground">Langkah Mudah</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border">
              <p className="text-3xl font-bold text-primary mb-2">10</p>
              <p className="text-sm text-muted-foreground">Menit Setup</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border">
              <p className="text-3xl font-bold text-primary mb-2">100%</p>
              <p className="text-sm text-muted-foreground">Aman</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border">
              <p className="text-3xl font-bold text-primary mb-2">0</p>
              <p className="text-sm text-muted-foreground">Biaya Tersembunyi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              5 Langkah{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Ikut Arisan
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dari daftar hingga terima dana, semua bisa dilakukan dengan mudah dari smartphone
            </p>
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <div 
                key={index} 
                id={`langkah-${index + 1}`}
                className="scroll-mt-20"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">
                          Langkah {step.number}
                        </Badge>
                        <h3 className="text-3xl font-bold">{step.title}</h3>
                      </div>
                    </div>

                    <p className="text-lg text-muted-foreground mb-6">
                      {step.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-muted-foreground">{detail}</p>
                        </div>
                      ))}
                    </div>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold mb-1">Tips:</p>
                            <p className="text-sm text-muted-foreground">{step.tips}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="mt-6 flex items-center gap-4">
                      <Badge variant="secondary" className="text-sm">
                        ⏱️ {step.duration}
                      </Badge>
                      {index === 0 && (
                        <Button asChild>
                          <Link href="/auth">
                            Mulai Daftar
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Illustration */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="relative">
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
                      
                      {/* Main Illustration Card */}
                      <Card className="relative overflow-hidden border-2">
                        <CardContent className="p-8">
                          {/* Step 1: Register Illustration */}
                          {step.illustration === "register" && (
                            <div className="space-y-6">
                              <div className="text-center p-6 bg-primary/10 rounded-xl">
                                <UserCheck className="w-16 h-16 text-primary mx-auto mb-4" />
                                <p className="font-semibold text-lg mb-2">Buat Akun Baru</p>
                                <p className="text-sm text-muted-foreground">Gratis & Cepat</p>
                              </div>
                              <div className="space-y-3">
                                <Button className="w-full" size="lg" variant="outline">
                                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                  </svg>
                                  Daftar dengan Google
                                </Button>
                                <div className="relative">
                                  <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t"></div>
                                  </div>
                                  <div className="relative flex justify-center text-xs">
                                    <span className="bg-card px-2 text-muted-foreground">atau</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="p-3 bg-muted rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                                    <p className="text-sm">nama@email.com</p>
                                  </div>
                                  <div className="p-3 bg-muted rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Password</p>
                                    <p className="text-sm">••••••••</p>
                                  </div>
                                </div>
                                <Button className="w-full" size="lg">
                                  Daftar Sekarang
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Step 2: Search Illustration */}
                          {step.illustration === "search" && (
                            <div className="space-y-4">
                              <div className="p-3 bg-muted rounded-lg flex items-center gap-2">
                                <Search className="w-5 h-5 text-muted-foreground" />
                                <input 
                                  type="text" 
                                  placeholder="Cari grup arisan..." 
                                  className="bg-transparent flex-1 outline-none text-sm"
                                  disabled
                                />
                              </div>
                              <div className="space-y-3">
                                {[
                                  { name: "Arisan RT 05", members: "12/15", amount: "500K", period: "Bulanan" },
                                  { name: "Arisan Kantor", members: "8/10", amount: "1JT", period: "Bulanan" },
                                  { name: "Arisan Keluarga", members: "15/20", amount: "300K", period: "Mingguan" }
                                ].map((group, i) => (
                                  <Card key={i} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                      <div className="flex items-start justify-between mb-3">
                                        <div>
                                          <p className="font-semibold mb-1">{group.name}</p>
                                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Users className="w-3 h-3" />
                                            <span>{group.members} anggota</span>
                                          </div>
                                        </div>
                                        <Badge variant={i === 0 ? "default" : "secondary"}>
                                          {i === 0 ? "Direkomendasikan" : "Tersedia"}
                                        </Badge>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div className="p-2 bg-muted rounded text-center">
                                          <p className="text-xs text-muted-foreground">Kontribusi</p>
                                          <p className="font-semibold text-sm">{group.amount}</p>
                                        </div>
                                        <div className="p-2 bg-muted rounded text-center">
                                          <p className="text-xs text-muted-foreground">Periode</p>
                                          <p className="font-semibold text-sm">{group.period}</p>
                                        </div>
                                      </div>
                                      <Button size="sm" className="w-full" variant={i === 0 ? "default" : "outline"}>
                                        {i === 0 ? "Gabung Sekarang" : "Lihat Detail"}
                                      </Button>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Step 3: Payment Illustration */}
                          {step.illustration === "payment" && (
                            <div className="space-y-4">
                              <div className="p-4 bg-primary/10 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-sm text-muted-foreground">Tagihan Periode Ini</p>
                                  <Badge variant="outline">Jatuh Tempo: 3 hari</Badge>
                                </div>
                                <p className="text-3xl font-bold text-primary mb-1">Rp 500,000</p>
                                <p className="text-xs text-muted-foreground">Arisan RT 05 - Januari 2026</p>
                              </div>
                              
                              <div className="space-y-2">
                                <p className="text-sm font-semibold mb-3">Pilih Metode Pembayaran:</p>
                                {[
                                  { name: "Transfer Bank", icon: "🏦", popular: true },
                                  { name: "GoPay / OVO", icon: "💳", popular: false },
                                  { name: "QRIS", icon: "📱", popular: false }
                                ].map((method, i) => (
                                  <div 
                                    key={i}
                                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                      i === 0 ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <span className="text-2xl">{method.icon}</span>
                                        <span className="font-medium text-sm">{method.name}</span>
                                      </div>
                                      {method.popular && (
                                        <Badge variant="secondary" className="text-xs">Populer</Badge>
                                      )}
                                      {i === 0 && (
                                        <CheckCircle className="w-5 h-5 text-primary" />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <Button className="w-full" size="lg">
                                <CreditCard className="mr-2 h-5 w-5" />
                                Bayar Sekarang
                              </Button>

                              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                                <p className="text-xs text-green-600">
                                  ✓ Pembayaran aman dengan enkripsi SSL
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Step 4: Draw Illustration */}
                          {step.illustration === "draw" && (
                            <div className="space-y-4">
                              <div className="text-center p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl">
                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                                  <Gift className="w-8 h-8 text-primary animate-pulse" />
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Undian Periode Januari</p>
                                <p className="text-2xl font-bold mb-1">Sedang Berlangsung...</p>
                                <div className="flex items-center justify-center gap-2 mt-4">
                                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                                </div>
                              </div>

                              <div className="p-4 bg-muted rounded-xl">
                                <p className="text-xs text-muted-foreground mb-3">Peserta Undian:</p>
                                <div className="grid grid-cols-5 gap-2">
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <div 
                                      key={num}
                                      className="aspect-square rounded-lg bg-background flex items-center justify-center text-sm font-semibold"
                                    >
                                      {num}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                  <span className="text-sm">Total Dana</span>
                                  <span className="font-bold">Rp 7,500,000</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                  <span className="text-sm">Peserta</span>
                                  <span className="font-bold">15 orang</span>
                                </div>
                              </div>

                              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <p className="text-xs text-blue-600 text-center">
                                  🔒 Sistem undian menggunakan teknologi blockchain yang fair dan transparan
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Step 5: Receive Illustration */}
                          {step.illustration === "receive" && (
                            <div className="space-y-4">
                              <div className="text-center p-8 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl border-2 border-green-500/20">
                                <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                  <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Selamat! Anda Menang</p>
                                <p className="text-4xl font-bold text-green-600 mb-1">Rp 7,500,000</p>
                                <p className="text-xs text-muted-foreground">Dana telah masuk ke wallet Anda</p>
                              </div>

                              <div className="p-4 bg-muted rounded-xl">
                                <p className="text-xs text-muted-foreground mb-3">Riwayat Transaksi:</p>
                                <div className="space-y-2">
                                  {[
                                    { type: "Menang Undian", amount: "+7,500,000", date: "30 Jan 2026", status: "success" },
                                    { type: "Bayar Kontribusi", amount: "-500,000", date: "28 Jan 2026", status: "paid" },
                                    { type: "Bayar Kontribusi", amount: "-500,000", date: "28 Des 2025", status: "paid" }
                                  ].map((tx, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-background rounded-lg">
                                      <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${
                                          tx.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                        }`}></div>
                                        <div>
                                          <p className="text-sm font-medium">{tx.type}</p>
                                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                                        </div>
                                      </div>
                                      <p className={`font-bold text-sm ${
                                        tx.status === 'success' ? 'text-green-600' : 'text-muted-foreground'
                                      }`}>
                                        Rp {tx.amount}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="w-full">
                                  <Download className="mr-2 h-4 w-4" />
                                  Withdraw
                                </Button>
                                <Button className="w-full">
                                  <Smartphone className="mr-2 h-4 w-4" />
                                  Lihat Wallet
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kenapa Ikut Arisan{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                di Arisan KU?
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pengalaman arisan digital terbaik dengan teknologi modern
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pertanyaan{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Umum
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Jawaban untuk pertanyaan yang sering ditanyakan peserta
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-start gap-2">
                    <span className="text-primary">Q:</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    <span className="text-primary font-semibold">A:</span> {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Masih ada pertanyaan?</p>
            <Button variant="outline" asChild>
              <Link href="/about">
                <MessageCircle className="mr-2 h-4 w-4" />
                Hubungi Kami
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container max-w-5xl mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Mulai{" "}
            <span className="bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent">
              Ikut Arisan
            </span>{" "}
            Sekarang!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Daftar gratis dan bergabung dengan ribuan peserta arisan di seluruh Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/auth">
                Daftar Gratis Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/panduan-pengelola">
                <Users className="mr-2 h-5 w-5" />
                Panduan Pengelola
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <p className="text-3xl font-bold mb-2">10K+</p>
              <p className="text-sm text-white/80">Peserta Aktif</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-2">500+</p>
              <p className="text-sm text-white/80">Grup Arisan</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-2">99%</p>
              <p className="text-sm text-white/80">Kepuasan</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
