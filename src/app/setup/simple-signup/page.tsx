"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, CheckCircle, XCircle, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function SimpleSignupPage() {
  const [email, setEmail] = useState("bukdan101@gmail.com")
  const [password, setPassword] = useState("Bukdan#bangku101")
  const [name, setName] = useState("bukdan")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    data?: any
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/auth/simple-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      })

      const data = await response.json()
      
      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          data: data.data
        })
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to create account'
        })
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'Network error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Simple Signup
          </h1>
          <p className="text-slate-400">
            Create your account (Step 1 of 3)
          </p>
        </div>

        {/* Info */}
        <Alert className="border-blue-500/50 bg-blue-500/10">
          <AlertDescription className="text-blue-200">
            ℹ️ This is a simplified signup for super admin setup. After creating account, go to Update Role page.
          </AlertDescription>
        </Alert>

        {/* Form */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Create Account</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-slate-800 border-primary/30 text-white"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800 border-primary/30 text-white"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-800 border-primary/30 text-white pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  Minimum 6 characters
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Alert className={result.success ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}>
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
              )}
              <div className="flex-1">
                <AlertDescription className={result.success ? "text-green-200" : "text-red-200"}>
                  {result.message}
                </AlertDescription>
                
                {result.success && result.data && (
                  <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-sm text-slate-300 mb-2">Account Created:</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-slate-400">
                        Name: <span className="text-white font-mono">{result.data.name}</span>
                      </p>
                      <p className="text-slate-400">
                        Email: <span className="text-white font-mono">{result.data.email}</span>
                      </p>
                      <p className="text-slate-400">
                        User ID: <span className="text-white font-mono text-xs">{result.data.userId}</span>
                      </p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                      <p className="text-sm text-blue-200 font-medium mb-2">Next Step:</p>
                      <p className="text-xs text-blue-300 mb-3">
                        Go to Update Role page to make this account a super admin
                      </p>
                      <Button asChild className="w-full">
                        <Link href="/setup/update-role">
                          Go to Update Role →
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {!result.success && result.message.includes('already registered') && (
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                    <p className="text-sm text-yellow-200 mb-2">
                      Account already exists. You can:
                    </p>
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/setup/update-role">
                          Update Role to Super Admin
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/platform/login">
                          Login Directly
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Alert>
        )}

        {/* Links */}
        <div className="text-center space-y-2">
          <Link
            href="/setup/update-role"
            className="block text-sm text-primary hover:text-primary/80 hover:underline"
          >
            Already have account? Update Role →
          </Link>
          <Link
            href="/platform/login"
            className="block text-sm text-primary hover:text-primary/80 hover:underline"
          >
            Go to Platform Login
          </Link>
          <Link
            href="/"
            className="block text-sm text-slate-400 hover:text-slate-300 hover:underline"
          >
            Back to Home
          </Link>
        </div>

        {/* Progress */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-sm">Setup Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Create Account</p>
                  <p className="text-xs text-slate-400">You are here</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Update Role</p>
                  <p className="text-xs text-slate-400">Next step</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Login</p>
                  <p className="text-xs text-slate-400">Final step</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
