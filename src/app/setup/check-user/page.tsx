"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Copy, CheckCircle, ExternalLink, Key } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function CheckUserPage() {
  const [copied, setCopied] = useState(false)

  const checkQuery = `-- Check user di Supabase Auth
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  last_sign_in_at,
  raw_user_meta_data
FROM auth.users
WHERE email = 'bukdan101@gmail.com';`

  const resetPasswordQuery = `-- Reset password untuk user
UPDATE auth.users
SET 
  encrypted_password = crypt('Bukdan#bangku101', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'bukdan101@gmail.com';

-- Verify
SELECT id, email, email_confirmed_at FROM auth.users WHERE email = 'bukdan101@gmail.com';`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/40 mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Check User & Reset Password
          </h1>
          <p className="text-slate-400">
            Invalid credentials error - mari kita check dan fix
          </p>
        </div>

        {/* Error Info */}
        <Alert className="border-red-500/50 bg-red-500/10">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <AlertDescription className="text-red-200">
            <strong>Error: Invalid Credentials</strong><br/>
            Supabase Auth tidak bisa authenticate. Kemungkinan:<br/>
            • Password tidak match<br/>
            • Email belum confirmed<br/>
            • User tidak ada di auth.users
          </AlertDescription>
        </Alert>

        {/* Step 1: Check User */}
        <Card className="border-2 border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              Check User di Supabase Auth
            </CardTitle>
            <CardDescription className="text-slate-400">
              Cek apakah user ada dan email sudah confirmed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto relative">
              <pre className="text-xs text-slate-300">{checkQuery}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(checkQuery)}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <Button asChild className="w-full" variant="outline">
              <a 
                href="https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr/sql" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Open SQL Editor
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Alert className="border-blue-500/50 bg-blue-500/10">
              <AlertDescription className="text-blue-200 text-sm">
                <strong>Yang harus dicek:</strong><br/>
                • User ada (ada 1 row)<br/>
                • email_confirmed_at tidak NULL<br/>
                • id = 68657f26-d95a-492c-8bc7-0e0b61386d46
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 2: Reset Password */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              Reset Password (Jika Perlu)
            </CardTitle>
            <CardDescription className="text-slate-400">
              Jika user ada tapi password tidak match, reset password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto relative max-h-64 overflow-y-auto">
              <pre className="text-xs text-slate-300">{resetPasswordQuery}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(resetPasswordQuery)}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <Alert className="border-green-500/50 bg-green-500/10">
              <Key className="h-5 w-5 text-green-400" />
              <AlertDescription className="text-green-200 text-sm">
                Query ini akan:<br/>
                • Reset password ke: Bukdan#bangku101<br/>
                • Confirm email (set email_confirmed_at)<br/>
                • Update timestamp
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Alternative: Check Supabase Dashboard */}
        <Card className="border-2 border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-sm">Alternative: Check via Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-slate-300">
              Kamu juga bisa check user via Supabase Dashboard:
            </p>
            <ol className="text-sm text-slate-300 space-y-2 list-decimal list-inside">
              <li>Buka: <a href="https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr/auth/users" target="_blank" className="text-primary hover:underline">Authentication → Users</a></li>
              <li>Cari user: bukdan101@gmail.com</li>
              <li>Check status: Email Confirmed?</li>
              <li>Jika perlu, klik "..." → "Reset Password"</li>
            </ol>
            <Button asChild className="w-full" variant="outline">
              <a 
                href="https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr/auth/users" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Open Auth Users
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Step 3: Try Login */}
        <Card className="border-2 border-green-500/20 bg-green-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              Try Login Again
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/platform/login">
                Go to Platform Login →
              </Link>
            </Button>
            <div className="text-sm text-slate-400 text-center">
              <p>Setelah reset password, login dengan:</p>
              <p className="text-primary font-mono">bukdan101@gmail.com</p>
              <p className="text-primary font-mono">Bukdan#bangku101</p>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-sm">Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            <div>
              <strong className="text-yellow-400">User tidak ada di auth.users?</strong>
              <p className="text-xs text-slate-400">Run script create-super-admin lagi atau create manual via Dashboard</p>
            </div>
            <div>
              <strong className="text-yellow-400">Email belum confirmed?</strong>
              <p className="text-xs text-slate-400">Run reset password query (akan set email_confirmed_at)</p>
            </div>
            <div>
              <strong className="text-yellow-400">Password tidak match?</strong>
              <p className="text-xs text-slate-400">Run reset password query untuk hash ulang password</p>
            </div>
            <div>
              <strong className="text-yellow-400">Masih error setelah reset?</strong>
              <p className="text-xs text-slate-400">Clear browser cache atau try incognito mode</p>
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <div className="text-center space-y-2">
          <Link
            href="/setup/final-setup"
            className="block text-sm text-primary hover:text-primary/80 hover:underline"
          >
            Back to Setup
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
