"use client"

import { UserPlus, Users, Wallet, Trophy } from "lucide-react"

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      number: "01",
      title: "Daftar & Verifikasi",
      description: "Buat akun dengan Google dan lengkapi verifikasi KYC untuk keamanan maksimal."
    },
    {
      icon: Users,
      number: "02",
      title: "Buat atau Gabung Grup",
      description: "Buat grup arisan baru atau bergabung dengan grup yang sudah ada menggunakan kode undangan."
    },
    {
      icon: Wallet,
      number: "03",
      title: "Bayar Kontribusi",
      description: "Lakukan pembayaran setiap periode dengan berbagai metode pembayaran yang tersedia."
    },
    {
      icon: Trophy,
      number: "04",
      title: "Menangkan Undian",
      description: "Sistem akan melakukan undian otomatis dan pemenang mendapat dana arisan langsung ke wallet."
    }
  ]

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Cara Kerja <span className="text-primary">Sangat Mudah</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hanya 4 langkah sederhana untuk mulai mengelola arisan Anda secara digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 shadow-lg">
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                {/* Step Number */}
                <div className="text-6xl font-bold text-primary/10 absolute top-0 -z-10">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              Mulai Sekarang Gratis
            </a>
            <a
              href="/panduan-pengelola"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
            >
              Panduan Pengelola
            </a>
            <a
              href="/panduan-peserta"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
            >
              Panduan Peserta
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
