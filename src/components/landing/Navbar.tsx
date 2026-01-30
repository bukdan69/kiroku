"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/#features", label: "Fitur" },
    { href: "/#how-it-works", label: "Cara Kerja" },
    { href: "/panduan-pengelola", label: "Panduan Pengelola" },
    { href: "/panduan-peserta", label: "Panduan Peserta" },
    { href: "/#testimonials", label: "Testimoni" },
    { href: "/#faq", label: "FAQ" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border-b border-primary/30 shadow-2xl shadow-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with gradient */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-xl shadow-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/60 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Arisan KU
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:via-cyan-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300 hover:scale-105 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              asChild 
              className="text-slate-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-primary/30 transition-all duration-300 font-medium"
            >
              <Link href="/auth">Masuk</Link>
            </Button>
            <Button 
              asChild 
              className="bg-gradient-to-r from-primary via-cyan-500 to-purple-500 hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 border-0 font-bold"
            >
              <Link href="/auth">Daftar Gratis</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary/20 transition-all duration-300 border border-primary/30"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-primary/20 bg-slate-900/95 backdrop-blur-xl animate-page-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-cyan-500/20 transition-all duration-300 px-4 py-3 rounded-lg border border-transparent hover:border-primary/30"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 px-4 border-t border-primary/20">
              <Button 
                variant="ghost" 
                asChild 
                className="w-full text-slate-300 hover:text-white hover:bg-primary/10 border border-primary/30 font-medium"
              >
                <Link href="/auth">Masuk</Link>
              </Button>
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-primary via-cyan-500 to-purple-500 hover:shadow-xl hover:shadow-primary/50 font-bold"
              >
                <Link href="/auth">Daftar Gratis</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
