"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, ExternalLink, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ManualGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Super Admin Setup - Manual Guide
          </h1>
          <p className="text-slate-400">
            Panduan lengkap untuk setup super admin via Supabase Dashboard
          </p>
        </div>

        {/* Error Info */}
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <AlertDescription className="text-yellow-200">
            <strong>Kenapa manual?</strong> Supabase Auth API mengalami error "Database error creating new user". 
            Solusi terbaik adalah create user langsung via Supabase Dashboard.
          </AlertDescription>
        </Alert>

        {/* Method 1: Via Supabase Dashboard */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Metode 1: Via Supabase Dashboard (RECOMMENDED)
            </CardTitle>
            <CardDescription className="text-slate-400">
              Cara paling aman dan reliable
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <h3 className="text-white font-semibold">Buka Supabase Dashboard</h3>
              </div>
              <div className="ml-11 space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <a 
                    href="https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Open Supabase Dashboard
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <h3 className="text-white font-semibold">Create User di Authentication</h3>
              </div>
              <div className="ml-11 space-y-2 text-sm text-slate-300">
                <ol className="list-decimal list-inside space-y-1">
                  <li>Klik <strong className="text-primary">"Authentication"</strong> di sidebar</li>
                  <li>Klik <strong className="text-primary">"Users"</strong></li>
                  <li>Klik <strong className="text-primary">"Add user"</strong> → <strong className="text-primary">"Create new user"</strong></li>
                  <li>Isi form:
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>Email: <code className="bg-slate-800 px-2 py-0.5 rounded text-primary">bukdan101@gmail.com</code></li>
                      <li>Password: <code className="bg-slate-800 px-2 py-0.5 rounded text-primary">Bukdan#bangku101</code></li>
                      <li>✅ <strong className="text-green-400">Auto Confirm User</strong> (CENTANG INI!)</li>
                    </ul>
                  </li>
                  <li>Klik <strong className="text-primary">"Create user"</strong></li>
                  <li><strong className="text-yellow-400">COPY USER ID</strong> yang muncul</li>
                </ol>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <h3 className="text-white font-semibold">Insert ke Database</h3>
              </div>
              <div className="ml-11 space-y-2 text-sm text-slate-300">
                <ol className="list-decimal list-inside space-y-1">
                  <li>Klik <strong className="text-primary">"SQL Editor"</strong> di sidebar</li>
                  <li>Paste query ini (ganti USER_ID):</li>
                </ol>
                <div className="bg-slate-800 p-3 rounded-lg overflow-x-auto">
                  <pre className="text-xs text-slate-300">
{`INSERT INTO users (
  id, 
  email, 
  name, 
  role, 
  tenant_id,
  email_verified, 
  is_active, 
  created_at, 
  updated_at
) VALUES (
  'USER_ID_DARI_STEP_2',  -- GANTI INI!
  'bukdan101@gmail.com',
  'bukdan',
  'super_admin',
  NULL,
  NOW(),
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  role = 'super_admin',
  tenant_id = NULL,
  updated_at = NOW();`}
                  </pre>
                </div>
                <ol start={3} className="list-decimal list-inside space-y-1">
                  <li>Klik <strong className="text-primary">"Run"</strong></li>
                  <li>Pastikan muncul: <strong className="text-green-400">"Success. 1 row affected"</strong></li>
                </ol>
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <h3 className="text-white font-semibold">Login</h3>
              </div>
              <div className="ml-11 space-y-2">
                <Button asChild className="w-full">
                  <Link href="/platform/login">
                    Go to Platform Login →
                  </Link>
                </Button>
                <div className="text-sm text-slate-400">
                  <p>Login dengan:</p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Email: <code className="text-primary">bukdan101@gmail.com</code></li>
                    <li>Password: <code className="text-primary">Bukdan#bangku101</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Method 2: Update Existing User */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400" />
              Metode 2: Update User yang Sudah Ada
            </CardTitle>
            <CardDescription className="text-slate-400">
              Jika Anda sudah pernah signup sebelumnya
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-slate-300">
              <p>Jika Anda sudah pernah signup dengan email apapun:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Buka <Link href="/setup/update-role" className="text-primary hover:underline">Update Role page</Link></li>
                <li>Masukkan email yang pernah digunakan</li>
                <li>Klik "Update to Super Admin"</li>
                <li>Login di <Link href="/platform/login" className="text-primary hover:underline">Platform Login</Link></li>
              </ol>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/setup/update-role">
                Go to Update Role Page
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Verification */}
        <Card className="border-2 border-green-500/20 bg-green-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Verifikasi Berhasil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <p>Setelah login, cek apakah bisa akses halaman-halaman ini:</p>
            <div className="grid grid-cols-2 gap-2">
              <a href="http://localhost:3001/platform/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                Dashboard <ExternalLink className="w-3 h-3" />
              </a>
              <a href="http://localhost:3001/platform/users" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                Users <ExternalLink className="w-3 h-3" />
              </a>
              <a href="http://localhost:3001/platform/kyc" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                KYC <ExternalLink className="w-3 h-3" />
              </a>
              <a href="http://localhost:3001/platform/analytics" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                Analytics <ExternalLink className="w-3 h-3" />
              </a>
              <a href="http://localhost:3001/platform/audit" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                Audit <ExternalLink className="w-3 h-3" />
              </a>
              <a href="http://localhost:3001/platform/settings" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                Settings <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-green-400 font-medium mt-4">
              Jika semua bisa diakses = BERHASIL! ✅
            </p>
          </CardContent>
        </Card>

        {/* Links */}
        <div className="text-center space-y-2">
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
