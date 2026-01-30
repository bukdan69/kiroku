import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, UserPlus, Users, Wallet, Trophy, 
  CheckCircle, Shield, Bell, TrendingUp, Zap,
  ArrowRight, Play, Download, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Panduan Pengelola Arisan - Arisan KU",
  description: "Panduan lengkap step-by-step untuk mengelola arisan secara digital dengan mudah dan profesional",
};

export default function PanduanPengelolaPage() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Daftar & Verifikasi",
      duration: "10 menit",
      description: "Buat akun dan lengkapi verifikasi KYC untuk keamanan maksimal",
      details: [
        "Daftar dengan Google Account (lebih cepat)",
        "Upload foto KTP dan selfie dengan KTP",
        "Isi data diri sesuai KTP",
        "Tunggu approval 1-3 hari kerja"
      ],
      tips: "Pastikan foto KTP jelas dan tidak blur untuk proses verifikasi lebih cepat",
      illustration: "register"
    },
    {
      number: "02",
      icon: Users,
      title: "Buat Grup Arisan",
      duration: "5 menit",
      description: "Setup grup arisan dengan pengaturan yang sesuai kebutuhan Anda",
      details: [
        "Tentukan nama grup yang mudah diingat",
        "Set jumlah anggota (5-50 orang)",
        "Tentukan nominal kontribusi per periode",
        "Pilih periode: mingguan atau bulanan"
      ],
      tips: "Mulai dengan jumlah anggota kecil (10-15) untuk grup pertama Anda",
      illustration: "create-group"
    },
    {
      number: "03",
      icon: MessageCircle,
      title: "Undang Anggota",
      duration: "2 menit",
      description: "Bagikan link undangan ke calon anggota arisan Anda",
      details: [
        "Copy link undangan dari dashboard",
        "Bagikan via WhatsApp, Facebook, atau Email",
        "Atau berikan kode grup untuk join manual",
        "Track status undangan di dashboard"
      ],
      tips: "Buat pesan undangan yang menarik dengan detail lengkap grup arisan",
      illustration: "invite"
    },
    {
      number: "04",
      icon: Wallet,
      title: "Monitor Pembayaran",
      duration: "Otomatis",
      description: "Sistem otomatis mengirim reminder dan tracking pembayaran real-time",
      details: [
        "Auto-reminder 7, 3, 1 hari sebelum deadline",
        "Dashboard real-time status pembayaran",
        "Notifikasi WhatsApp untuk setiap pembayaran",
        "Export laporan keuangan kapan saja"
      ],
      tips: "Aktifkan notifikasi WhatsApp untuk update real-time",
      illustration: "payment"
    },
    {
      number: "05",
      icon: Trophy,
      title: "Undian Otomatis",
      duration: "30 detik",
      description: "Sistem melakukan undian fair dan transparan secara otomatis",
      details: [
        "Undian otomatis setelah semua anggota bayar",
        "Sistem commit-reveal yang fair",
        "Pemenang diumumkan via WhatsApp & Email",
        "Dana langsung masuk ke wallet pemenang"
      ],
      tips: "Hasil undian tercatat permanent dan dapat diverifikasi kapan saja",
      illustration: "draw"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      description: "KYC verification & fraud detection untuk setiap transaksi"
    },
    {
      icon: Bell,
      title: "Notifikasi Otomatis",
      description: "Reminder pembayaran otomatis via WhatsApp"
    },
    {
      icon: Zap,
      title: "Proses Cepat",
      description: "Setup grup hanya 5 menit, langsung bisa digunakan"
    },
    {
      icon: TrendingUp,
      title: "Passive Income",
      description: "Dapatkan komisi 2% dari program affiliate"
    }
  ];

  const faqs = [
    {
      q: "Berapa biaya untuk pengelola?",
      a: "Gratis! Platform fee 2% sudah termasuk dalam perhitungan otomatis."
    },
    {
      q: "Berapa lama proses verifikasi?",
      a: "1-3 hari kerja. Anda akan dapat notifikasi via email & WhatsApp."
    },
    {
      q: "Bisa kelola berapa grup?",
      a: "Sebelum KYC: max 3 grup. Setelah KYC: unlimited grup."
    },
    {
      q: "Bagaimana jika anggota tidak bayar?",
      a: "Sistem auto-reminder 3x. Jika tetap tidak bayar, tidak ikut undian periode itu."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Panduan Lengkap
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Panduan Pengelola <span className="text-primary">Arisan Digital</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ikuti 5 langkah mudah untuk mengelola arisan secara profesional dengan teknologi modern
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth">
                  Mulai Sekarang Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#langkah-1">
                  <Play className="mr-2 h-5 w-5" />
                  Lihat Tutorial
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
              <p className="text-3xl font-bold text-primary mb-2">15</p>
              <p className="text-sm text-muted-foreground">Menit Setup</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border">
              <p className="text-3xl font-bold text-primary mb-2">100%</p>
              <p className="text-sm text-muted-foreground">Otomatis</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border">
              <p className="text-3xl font-bold text-primary mb-2">24/7</p>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              5 Langkah <span className="text-primary">Mengelola Arisan</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dari pendaftaran hingga undian, semua bisa dilakukan dengan mudah dan cepat
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
                            <p className="font-semibold mb-1">Tips Pro:</p>
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
                            Mulai Langkah Ini
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
                              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <UserPlus className="w-6 h-6 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-semibold">Daftar Akun</p>
                                    <p className="text-sm text-muted-foreground">Google Account</p>
                                  </div>
                                </div>
                                <CheckCircle className="w-6 h-6 text-green-500" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border-2 border-dashed rounded-xl text-center">
                                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                                  <p className="text-sm font-medium">Upload KTP</p>
                                </div>
                                <div className="p-4 border-2 border-dashed rounded-xl text-center">
                                  <UserPlus className="w-8 h-8 text-primary mx-auto mb-2" />
                                  <p className="text-sm font-medium">Foto Selfie</p>
                                </div>
                              </div>
                              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <p className="font-semibold text-green-600">Verifikasi Berhasil!</p>
                              </div>
                            </div>
                          )}

                          {/* Step 2: Create Group Illustration */}
                          {step.illustration === "create-group" && (
                            <div className="space-y-4">
                              <div className="p-4 bg-primary/10 rounded-xl">
                                <p className="text-sm text-muted-foreground mb-2">Nama Grup</p>
                                <p className="font-semibold text-lg">Arisan RT 05</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-muted rounded-xl">
                                  <p className="text-sm text-muted-foreground mb-1">Anggota</p>
                                  <p className="text-2xl font-bold text-primary">15</p>
                                </div>
                                <div className="p-4 bg-muted rounded-xl">
                                  <p className="text-sm text-muted-foreground mb-1">Kontribusi</p>
                                  <p className="text-2xl font-bold text-primary">500K</p>
                                </div>
                              </div>
                              <div className="p-4 bg-muted rounded-xl">
                                <p className="text-sm text-muted-foreground mb-1">Periode</p>
                                <p className="font-semibold">Bulanan</p>
                              </div>
                              <Button className="w-full" size="lg">
                                <CheckCircle className="mr-2 h-5 w-5" />
                                Buat Grup
                              </Button>
                            </div>
                          )}

                          {/* Step 3: Invite Illustration */}
                          {step.illustration === "invite" && (
                            <div className="space-y-4">
                              <div className="p-4 bg-primary/10 rounded-xl">
                                <p className="text-sm text-muted-foreground mb-2">Link Undangan</p>
                                <div className="flex items-center gap-2">
                                  <code className="flex-1 p-2 bg-background rounded text-sm">
                                    arisanku.com/invite/ABC123
                                  </code>
                                  <Button size="sm">Copy</Button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="w-full">
                                  <MessageCircle className="mr-2 h-4 w-4" />
                                  WhatsApp
                                </Button>
                                <Button variant="outline" className="w-full">
                                  <MessageCircle className="mr-2 h-4 w-4" />
                                  Email
                                </Button>
                              </div>
                              <div className="space-y-2">
                                {[1, 2, 3].map((i) => (
                                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-full bg-primary/20" />
                                      <span className="text-sm">Anggota {i}</span>
                                    </div>
                                    <Badge variant="secondary">Bergabung</Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Step 4: Payment Illustration */}
                          {step.illustration === "payment" && (
                            <div className="space-y-4">
                              <div className="p-4 bg-primary/10 rounded-xl">
                                <p className="text-sm text-muted-foreground mb-2">Status Pembayaran</p>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm">Progress</span>
                                  <span className="font-semibold">12/15 (80%)</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-3">
                                  <div className="bg-primary h-3 rounded-full" style={{ width: '80%' }} />
                                </div>
                              </div>
                              <div className="space-y-2">
                                {[
                                  { name: "Budi", status: "paid", time: "2 jam lalu" },
                                  { name: "Siti", status: "paid", time: "5 jam lalu" },
                                  { name: "Ahmad", status: "pending", time: "Belum bayar" }
                                ].map((member, i) => (
                                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-full bg-primary/20" />
                                      <div>
                                        <p className="text-sm font-medium">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.time}</p>
                                      </div>
                                    </div>
                                    <Badge variant={member.status === "paid" ? "default" : "outline"}>
                                      {member.status === "paid" ? "✓ Lunas" : "Pending"}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Step 5: Draw Illustration */}
                          {step.illustration === "draw" && (
                            <div className="space-y-4">
                              <div className="text-center p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl">
                                <Trophy className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
                                <p className="text-sm text-muted-foreground mb-2">Pemenang Undian</p>
                                <p className="text-3xl font-bold mb-2">Budi Santoso</p>
                                <p className="text-2xl font-bold text-primary">Rp 7,500,000</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                  <div key={i} className={`p-3 rounded-lg text-center ${i === 3 ? 'bg-primary text-white' : 'bg-muted'}`}>
                                    <p className="text-sm font-medium">#{i}</p>
                                  </div>
                                ))}
                              </div>
                              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                                <CheckCircle className="w-5 h-5 text-green-500 inline mr-2" />
                                <span className="text-sm text-green-600 font-medium">Dana telah ditransfer</span>
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

      {/* Features Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Kenapa Pilih <span className="text-primary">Arisan KU?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Platform terlengkap dengan fitur otomasi dan keamanan terbaik
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Pertanyaan <span className="text-primary">Umum</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Jawaban untuk pertanyaan yang sering ditanyakan
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Siap Mulai Mengelola Arisan?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Daftar sekarang dan kelola arisan Anda dengan lebih mudah, aman, dan profesional
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/auth">
                Daftar Gratis Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/panduan-bandar.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Panduan PDF
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
