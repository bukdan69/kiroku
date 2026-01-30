"use client"

import { Shield, Bell, CreditCard, Users, TrendingUp, Lock, Smartphone, BarChart } from "lucide-react"

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      description: "Sistem KYC verification dan fraud detection untuk melindungi setiap transaksi Anda."
    },
    {
      icon: Bell,
      title: "Notifikasi Real-time",
      description: "Dapatkan update otomatis via WhatsApp untuk setiap pembayaran dan undian."
    },
    {
      icon: CreditCard,
      title: "Pembayaran Mudah",
      description: "Integrasi dengan Midtrans untuk berbagai metode pembayaran yang aman."
    },
    {
      icon: Users,
      title: "Multi-tenant System",
      description: "Kelola banyak grup arisan dengan sistem yang terorganisir dan efisien."
    },
    {
      icon: TrendingUp,
      title: "Program Affiliate",
      description: "Dapatkan komisi hingga 2% dari setiap referral yang bergabung."
    },
    {
      icon: Lock,
      title: "Transparent & Fair",
      description: "Sistem undian dengan commit-reveal scheme yang adil dan transparan."
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Akses dari mana saja, kapan saja dengan tampilan yang responsif."
    },
    {
      icon: BarChart,
      title: "Laporan Lengkap",
      description: "Dashboard analytics dan audit logs untuk tracking semua aktivitas."
    }
  ]

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Fitur Lengkap untuk <span className="text-primary">Arisan Modern</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Platform all-in-one dengan teknologi terkini untuk pengalaman arisan yang lebih baik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
