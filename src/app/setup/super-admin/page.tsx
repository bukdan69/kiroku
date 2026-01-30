"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function SuperAdminSetupPage() {
  const [email, setEmail] = useState("bukdan101@gmail.com")
  const [password, setPassword] = useState("Bukdan#bangku101")
  const [name, setName] = useState("bukdan")
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
      const response = await fetch('/api/setup/super-admin', {
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
          message: data.error || 'Failed to create super admin'
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

  const checkExisting = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/setup/super-admin')
      const data = await response.json()
      
      if (response.ok) {
        setResult({
          success: true,
          message: `Found ${data.count} super admin(s)`,
          data: data.superAdmins
        })
      } else {
        setResult({
          success: false,
          message: data.error
        })
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message
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
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Super Admin Setup
          </h1>
          <p className="text-slate-400">
            Create or update super admin account
          </p>
        </div>

        {/* Warning */}
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertDescription className="text-yellow-200">
            ⚠️ This page is only available in development mode. It will be disabled in production.
          </AlertDescription>
        </Alert>

        {/* Form */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Create Super Admin</CardTitle>
            <CardDescription className="text-slate-400">
              Enter credentials for the super admin account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800 border-primary/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-800 border-primary/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-slate-800 border-primary/30 text-white"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Create Super Admin
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={checkExisting}
                  disabled={loading}
                >
                  Check Existing
                </Button>
              </div>
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
                    <p className="text-sm text-slate-300 mb-2">Login Credentials:</p>
                    <div className="space-y-1 text-sm">
                      {result.data.email && (
                        <p className="text-slate-400">
                          Email: <span className="text-white font-mono">{result.data.email}</span>
                        </p>
                      )}
                      {result.data.role && (
                        <p className="text-slate-400">
                          Role: <span className="text-primary font-mono">{result.data.role}</span>
                        </p>
                      )}
                      {result.data.loginUrl && (
                        <p className="text-slate-400">
                          Login URL: <Link href={result.data.loginUrl} className="text-primary hover:underline font-mono">{result.data.loginUrl}</Link>
                        </p>
                      )}
                    </div>
                    
                    {result.data.loginUrl && (
                      <Button asChild className="w-full mt-4">
                        <Link href={result.data.loginUrl}>
                          Go to Login Page
                        </Link>
                      </Button>
                    )}
                  </div>
                )}

                {result.success && Array.isArray(result.data) && (
                  <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-sm text-slate-300 mb-2">Existing Super Admins:</p>
                    <div className="space-y-2">
                      {result.data.map((admin: any) => (
                        <div key={admin.id} className="p-2 bg-slate-700/50 rounded text-sm">
                          <p className="text-white font-mono">{admin.email}</p>
                          <p className="text-slate-400 text-xs">
                            {admin.name} • {admin.isActive ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                      ))}
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
            href="/platform/login"
            className="block text-sm text-primary hover:text-primary/80 hover:underline"
          >
            Go to Platform Login →
          </Link>
          <Link
            href="/"
            className="block text-sm text-slate-400 hover:text-slate-300 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
