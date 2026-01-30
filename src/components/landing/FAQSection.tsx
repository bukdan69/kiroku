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
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Pertanyaan yang <span className="text-primary">Sering Ditanyakan</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang Arisan KU
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openIndex === index}
              onOpenChange={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="border rounded-lg bg-card overflow-hidden">
                <CollapsibleTrigger className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6 text-muted-foreground">
                    {faq.answer}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Masih ada pertanyaan lain?
          </p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
