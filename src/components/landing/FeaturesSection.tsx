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
    <section id="features" className="py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Fitur Lengkap untuk{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Arisan Modern
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Platform all-in-one dengan teknologi terkini untuk pengalaman arisan yang lebih baik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center mb-4 shadow-lg">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
