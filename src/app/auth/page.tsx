"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"

const forgotPasswordSchema = z.object({
  email: z.string().email("Email tidak valid"),
})

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
})

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, "Nama minimal 2 karakter"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
})

export default function AuthPage() {
  const { signIn, signUp } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [message, setMessage] = useState("")
  
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [forgotPasswordForm, setForgotPasswordForm] = useState({ email: "" })
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    
    try {
      loginSchema.parse(loginForm)
      setLoading(true)
      
      const { error } = await signIn(loginForm.email, loginForm.password)
      
      if (error) {
        setMessage(error.message)
      } else {
        // Redirect to dashboard or intended URL
        const redirectTo = searchParams.get('redirectTo') || '/dashboard'
        router.push(redirectTo)
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setMessage(err.issues[0].message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    
    try {
      signupSchema.parse(signupForm)
      setLoading(true)
      
      const { error } = await signUp(
        signupForm.email,
        signupForm.password,
        signupForm.fullName
      )
      
      if (error) {
        setMessage(error.message)
      } else {
        setMessage("Akun berhasil dibuat! Silakan login dengan kredensial Anda.")
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setMessage(err.issues[0].message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    
    try {
      forgotPasswordSchema.parse(forgotPasswordForm)
      setLoading(true)
      
      const { error } = await supabase.auth.resetPasswordForEmail(
        forgotPasswordForm.email,
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      )
      
      if (error) {
        setMessage(error.message)
      } else {
        setMessage("Link reset password telah dikirim ke email Anda!")
        setShowForgotPassword(false)
        setForgotPasswordForm({ email: "" })
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setMessage(err.issues[0].message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    })
    
    if (error) {
      setMessage(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Dramatic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-primary/20 to-slate-950">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/50 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(42, 176, 158, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(42, 176, 158, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Main Card with Animated Border */}
      <div className="relative w-full max-w-md z-10 animate-page-in">
        {/* Animated border lighting effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-cyan-500 to-purple-500 rounded-2xl blur-lg opacity-75 animate-border-spin" />
        
        {/* Inner glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-cyan-500 to-purple-500 rounded-2xl opacity-50 animate-border-spin" style={{ animationDelay: '0.5s' }} />
        
        <Card className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-primary/30 shadow-2xl shadow-primary/50">
          <CardHeader className="text-center space-y-4">
            {/* Logo with gradient */}
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary via-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/50 animate-pulse">
              <span className="text-3xl font-bold text-white">A</span>
            </div>
            
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Arisan KU
            </CardTitle>
            <CardDescription className="text-slate-300">
              Platform arisan online terpercaya di Indonesia
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {message && (
              <div className={`mb-4 p-3 rounded-lg border-2 text-sm font-medium animate-page-in ${
                message.includes('berhasil') 
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-300' 
                  : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-500/50 text-red-300'
              }`}>
                {message}
              </div>
            )}

            <Button 
              onClick={handleGoogleLogin}
              className="w-full mb-4 bg-white hover:bg-slate-100 text-slate-900 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" 
              variant="outline"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Masuk dengan Google
                </>
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-3 text-slate-400 font-medium">atau</span>
              </div>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 p-1">
                <TabsTrigger 
                  value="login"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/50 transition-all duration-300"
                >
                  Masuk
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/50 transition-all duration-300"
                >
                  Daftar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                {showForgotPassword ? (
                  <form onSubmit={handleForgotPassword} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email" className="text-slate-200">Email</Label>
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="email@contoh.com"
                        value={forgotPasswordForm.email}
                        onChange={(e) => setForgotPasswordForm({ email: e.target.value })}
                        className="bg-slate-800/50 border-primary/30 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary/50"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full shadow-xl shadow-primary/30" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        "Kirim Link Reset"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-slate-300 hover:text-white hover:bg-slate-800/50"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      Kembali ke Login
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-slate-200">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="email@contoh.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="bg-slate-800/50 border-primary/30 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-slate-200">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="bg-slate-800/50 border-primary/30 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary/50"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full shadow-xl shadow-primary/30" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Masuk...
                        </>
                      ) : (
                        "Masuk"
                      )}
                    </Button>
                    <button
                      type="button"
                      className="w-full text-sm text-slate-400 hover:text-primary transition-colors font-medium"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Lupa password?
                    </button>
                  </form>
                )}
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-slate-200">Nama Lengkap</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Budi Santoso"
                      value={signupForm.fullName}
                      onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                      className="bg-slate-800/50 border-primary/30 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-slate-200">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      className="bg-slate-800/50 border-primary/30 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-slate-200">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      className="bg-slate-800/50 border-primary/30 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-slate-200">Konfirmasi Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      className="bg-slate-800/50 border-primary/30 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary/50"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full shadow-xl shadow-primary/30" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Membuat akun...
                      </>
                    ) : (
                      "Buat Akun"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-slate-400">
              Dengan mendaftar, Anda menyetujui{' '}
              <Link href="/terms" className="text-primary hover:text-cyan-400 underline transition-colors font-medium">
                Syarat & Ketentuan
              </Link>{' '}
              dan{' '}
              <Link href="/privacy" className="text-primary hover:text-cyan-400 underline transition-colors font-medium">
                Kebijakan Privasi
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}