"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, CheckCircle, XCircle, Loader2, UserCog } from "lucide-react"
import Link from "next/link"

export default function UpdateRolePage() {
  const [email, setEmail] = useState("bukdan101@gmail.com")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    data?: any
  } | null>(null)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/setup/update-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: 'super_admin' })
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
          message: data.error || 'Failed to update role'
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
            <UserCog className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Update User Role
          </h1>
          <p className="text-slate-400">
            Update existing user to super admin
          </p>
        </div>

        {/* Warning */}
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertDescription className="text-yellow-200">
            ⚠️ This page is only available in development mode. Make sure user already exists in Supabase Auth.
          </AlertDescription>
        </Alert>

        {/* Instructions */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <div className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              <p>First, signup at <Link href="/setup/simple-signup" className="text-primary hover:underline">/setup/simple-signup</Link> with your email</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              <p>Then come back here and enter your email below</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              <p>Click "Update to Super Admin" button</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary">4.</span>
              <p>Login at <Link href="/platform/login" className="text-primary hover:underline">/platform/login</Link></p>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Update Role</CardTitle>
            <CardDescription className="text-slate-400">
              Enter email of existing user to make super admin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800 border-primary/30 text-white"
                  placeholder="user@example.com"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Update to Super Admin
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
                    <p className="text-sm text-slate-300 mb-2">Updated User:</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-slate-400">
                        Email: <span className="text-white font-mono">{result.data.email}</span>
                      </p>
                      <p className="text-slate-400">
                        Role: <span className="text-primary font-mono">{result.data.role}</span>
                      </p>
                      <p className="text-slate-400">
                        Status: <span className="text-green-400 font-mono">Active</span>
                      </p>
                    </div>
                    
                    <Button asChild className="w-full mt-4">
                      <Link href="/platform/login">
                        Go to Login Page
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Alert>
        )}

        {/* Links */}
        <div className="text-center space-y-2">
          <Link
            href="/setup/simple-signup"
            className="block text-sm text-primary hover:text-primary/80 hover:underline"
          >
            ← Signup First
          </Link>
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
