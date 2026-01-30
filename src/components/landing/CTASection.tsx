"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/lib/config/site"

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary via-cyan-500 to-purple-500 text-white relative overflow-hidden">
      {/* Background decoration with animated glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge with glow */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/25 backdrop-blur-md text-sm font-bold mb-8 shadow-2xl shadow-white/30 border-2 border-white/40 animate-pulse">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white">Gratis untuk 100 pengguna pertama bulan ini!</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 drop-shadow-2xl text-white">
            Siap{" "}
            <span className="bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent">
              Modernisasi
            </span>{" "}
            Arisan Anda?
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto drop-shadow-lg font-medium">
            Bergabunglah dengan ribuan pengguna yang sudah merasakan kemudahan mengelola arisan secara digital. Daftar sekarang dan mulai dalam hitungan menit!
          </p>

          {/* CTA Buttons with enhanced effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 text-lg px-10 h-14 shadow-2xl shadow-slate-900/50 font-bold border-2 border-slate-900 transition-all duration-300"
              asChild
            >
              <Link href="/auth">
                Mulai Gratis Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-3 border-white bg-white/10 text-white hover:bg-white hover:text-primary hover:scale-105 text-lg px-10 h-14 backdrop-blur-md shadow-2xl shadow-white/20 font-bold transition-all duration-300"
              asChild
            >
              <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                Konsultasi Gratis
              </a>
            </Button>
          </div>

          {/* Trust indicators with glow */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 shadow-xl">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-white">Tanpa kartu kredit</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 shadow-xl">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-white">Setup dalam 5 menit</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 shadow-xl">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-white">Support 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
