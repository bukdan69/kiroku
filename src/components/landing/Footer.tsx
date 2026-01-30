import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { label: "Fitur", href: "/#features" },
      { label: "Cara Kerja", href: "/#how-it-works" },
      { label: "Harga", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
    ],
    panduan: [
      { label: "Panduan Pengelola", href: "/panduan-pengelola" },
      { label: "Panduan Peserta", href: "/panduan-peserta" },
      { label: "Tentang Kami", href: "/about" },
    ],
    legal: [
      { label: "Syarat & Ketentuan", href: "/terms" },
      { label: "Kebijakan Privasi", href: "/privacy" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ]

  return (
    <footer className="border-t border-primary/20 bg-slate-950/95 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-xl shadow-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/60 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Arisan KU
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-4 max-w-sm leading-relaxed">
              Platform arisan online terpercaya di Indonesia. Kelola arisan dengan mudah, aman, dan transparan.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-primary/10 hover:bg-gradient-to-br hover:from-primary hover:via-cyan-500 hover:to-purple-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/40 border border-primary/20 hover:border-transparent"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-sm mb-4 bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Produk
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:via-cyan-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Panduan Links */}
          <div>
            <h3 className="font-bold text-sm mb-4 bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Panduan
            </h3>
            <ul className="space-y-3">
              {footerLinks.panduan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:via-cyan-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-bold text-sm mb-4 bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Legal & Kontak
            </h3>
            <ul className="space-y-3 mb-4">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:via-cyan-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="space-y-2.5">
              <a 
                href="mailto:support@arisanku.com" 
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-primary transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>support@arisanku.com</span>
              </a>
              <a 
                href="tel:+6281234567890" 
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-primary transition-all duration-300 group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>+62 812-3456-7890</span>
              </a>
              <div className="flex items-start gap-2 text-xs text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-slate-400">
                © {currentYear} <span className="font-semibold text-white">Arisan KU</span>. All rights reserved.
              </p>
            </div>

            {/* Powered By */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">Powered by</span>
              <span className="font-bold bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Pak D Sinnay
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
