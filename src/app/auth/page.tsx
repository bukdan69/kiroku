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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Arisan KU</CardTitle>
          <CardDescription className="text-center">
            Platform arisan online terpercaya di Indonesia
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
              {message}
            </div>
          )}

          <Button 
            onClick={handleGoogleLogin}
            className="w-full mb-4" 
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
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-1.46 1.06-2.79 1.06-5.29-1.93-6.16-4.31-6.16-8.09z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62 1.8-2.59 1.8-4.21z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.98 1 5.91 1.54 4.31 2.67l2.85 2.22c1.15-1.08 1.8-2.59 1.8-4.21z"/>
                </svg>
                Masuk dengan Google
              </>
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">atau</span>
            </div>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Masuk</TabsTrigger>
              <TabsTrigger value="signup">Daftar</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              {showForgotPassword ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={forgotPasswordForm.email}
                      onChange={(e) => setForgotPasswordForm({ email: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
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
                    className="w-full"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Kembali ke Login
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="•••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
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
                    className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Lupa password?
                  </button>
                </form>
              )}
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nama Lengkap</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Budi Santoso"
                    value={signupForm.fullName}
                    onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="email@contoh.com"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="•••••"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Konfirmasi Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="•••••"
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
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

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Dengan mendaftar, Anda menyetujui{' '}
            <Link href="/terms" className="underline hover:text-primary">
              Syarat & Ketentuan
            </Link>{' '}
            dan{' '}
            <Link href="/privacy" className="underline hover:text-primary">
              Kebijakan Privasi
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}