"use client"

import { Star } from "lucide-react"

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ibu Siti Rahayu",
      role: "Ketua RT 05",
      avatar: "SR",
      rating: 5,
      text: "Sangat membantu! Sekarang arisan RT kami lebih terorganisir dan transparan. Semua warga bisa lihat langsung status pembayaran."
    },
    {
      name: "Budi Santoso",
      role: "HRD Manager",
      avatar: "BS",
      rating: 5,
      text: "Platform yang sempurna untuk arisan kantor. Notifikasi WhatsApp otomatis sangat membantu mengingatkan karyawan untuk bayar."
    },
    {
      name: "Dewi Lestari",
      role: "Ibu Rumah Tangga",
      avatar: "DL",
      rating: 5,
      text: "Saya suka fitur KYC-nya, jadi lebih aman dan terpercaya. Pembayaran juga mudah pakai berbagai metode."
    },
    {
      name: "Ahmad Fauzi",
      role: "Pengusaha",
      avatar: "AF",
      rating: 5,
      text: "Sebagai bandar, program affiliate-nya menguntungkan. Saya bisa dapat komisi dari setiap referral yang bergabung."
    },
    {
      name: "Rina Wijaya",
      role: "Karyawan Swasta",
      avatar: "RW",
      rating: 5,
      text: "Dashboard-nya user friendly dan mudah dipahami. Saya bisa track semua arisan yang saya ikuti dalam satu tempat."
    },
    {
      name: "Hendra Gunawan",
      role: "Ketua Arisan Keluarga",
      avatar: "HG",
      rating: 5,
      text: "Sistem undian yang fair dan transparan. Semua anggota keluarga percaya karena prosesnya jelas dan tercatat."
    }
  ]

  return (
    <section id="testimonials" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Dipercaya oleh <span className="text-primary">Ribuan Pengguna</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lihat apa kata mereka yang sudah merasakan kemudahan Arisan KU
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-semibold text-primary">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t">
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
  )
}

export default TestimonialsSection
