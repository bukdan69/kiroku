"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { siteConfig } from "@/lib/config/site"

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Apa itu Arisan KU?",
      answer: "Arisan KU adalah platform digital untuk mengelola arisan secara online dengan sistem yang aman, transparan, dan mudah digunakan. Kami menyediakan fitur lengkap mulai dari manajemen grup, pembayaran otomatis, hingga sistem undian yang fair."
    },
    {
      question: "Apakah Arisan KU aman?",
      answer: "Sangat aman! Kami menggunakan sistem KYC verification, fraud detection, dan enkripsi data untuk melindungi setiap transaksi. Semua aktivitas tercatat dalam audit logs dan sistem kami memiliki Row Level Security (RLS) untuk isolasi data."
    },
    {
      question: "Bagaimana cara pembayaran?",
      answer: "Kami terintegrasi dengan Midtrans payment gateway yang mendukung berbagai metode pembayaran seperti transfer bank, e-wallet (GoPay, OVO, Dana), kartu kredit, dan QRIS. Semua pembayaran diproses secara aman dan real-time."
    },
    {
      question: "Apakah ada biaya untuk menggunakan platform ini?",
      answer: "Pendaftaran dan penggunaan dasar gratis! Kami hanya mengambil fee kecil dari setiap transaksi arisan (platform fee) untuk maintenance dan pengembangan sistem. Fee ini sudah termasuk dalam perhitungan otomatis."
    },
    {
      question: "Bagaimana sistem undian bekerja?",
      answer: "Kami menggunakan commit-reveal scheme yang fair dan transparan. Sistem akan otomatis melakukan undian ketika semua anggota sudah membayar dan login. Hasil undian tidak bisa dimanipulasi dan tercatat permanent di sistem."
    },
    {
      question: "Apakah bisa mengelola banyak grup arisan?",
      answer: "Ya! Anda bisa membuat atau bergabung dengan banyak grup arisan sekaligus. Sistem multi-tenant kami memungkinkan Anda mengelola semua grup dalam satu dashboard yang terorganisir."
    },
    {
      question: "Bagaimana cara mendapat notifikasi?",
      answer: "Kami mengirim notifikasi otomatis via WhatsApp untuk berbagai event seperti reminder pembayaran (7 hari, 3 hari, 1 hari sebelum deadline), pengumuman pemenang, dan konfirmasi pembayaran. Anda juga bisa mengatur preferensi notifikasi."
    },
    {
      question: "Apa itu program affiliate?",
      answer: "Program affiliate memungkinkan Anda mendapat komisi hingga 2% dari setiap transaksi user yang Anda referensikan. Setelah verifikasi KYC, Anda akan mendapat kode referral unik dan bisa mulai mengajak orang lain bergabung."
    }
  ]

  return (
    <section id="faq" className="py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Pertanyaan yang{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Sering Ditanyakan
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang Arisan KU
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openIndex === index}
              onOpenChange={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="border-2 border-primary/20 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-all duration-300">
                <CollapsibleTrigger className="w-full p-5 text-left flex items-center justify-between hover:bg-primary/5 transition-colors">
                  <span className="font-semibold text-lg pr-4 text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-5 pb-5 text-slate-400">
                    {faq.answer}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-10">
          <p className="text-slate-400 mb-4">
            Masih ada pertanyaan lain?
          </p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-300 border-2 border-primary/30 rounded-lg hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:via-cyan-400 hover:to-purple-400 hover:bg-clip-text hover:border-primary transition-all duration-300"
          >
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
