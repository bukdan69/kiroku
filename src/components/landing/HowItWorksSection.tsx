"use client"

import { UserPlus, Users, Wallet, Trophy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Cara Kerja{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Sangat Mudah
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Hanya 4 langkah sederhana untuk mulai mengelola arisan Anda secara digital
          </p>
        </div>

        {/* Steps Grid - More Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-cyan-500 to-purple-500 flex items-center justify-center shadow-xl shadow-primary/40 font-bold text-white text-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-cyan-500/0 to-purple-500/0 group-hover:from-primary/5 group-hover:via-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
              </div>

              {/* Connection Arrow - Desktop Only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-center shadow-lg shadow-primary/40">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary via-cyan-500 to-purple-500 hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 text-white font-bold px-8"
              asChild
            >
              <Link href="/auth">
                Mulai Sekarang Gratis
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary/30 text-slate-300 hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:via-cyan-400 hover:to-purple-400 hover:bg-clip-text hover:border-primary transition-all duration-300 font-medium px-8"
              asChild
            >
              <Link href="/panduan-pengelola">
                Panduan Pengelola
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary/30 text-slate-300 hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:via-cyan-400 hover:to-purple-400 hover:bg-clip-text hover:border-primary transition-all duration-300 font-medium px-8"
              asChild
            >
              <Link href="/panduan-peserta">
                Panduan Peserta
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
