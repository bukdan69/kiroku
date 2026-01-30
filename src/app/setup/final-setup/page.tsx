"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function FinalSetupPage() {
  const [copied, setCopied] = useState(false)

  const setupQuery = `-- ✅ USER SUDAH DIBUAT DI SUPABASE AUTH!
-- User ID: 68657f26-d95a-492c-8bc7-0e0b61386d46
-- Sekarang tinggal insert ke public.users, public.profiles, dan create platform tenant

-- Step 1: Create Platform Tenant (untuk audit logs)
INSERT INTO public.tenants (
  id,
  name,
  slug,
  domain,
  settings,
  is_active,
  created_at,
  updated_at
) VALUES (
  'platform',
  'Platform Admin',
  'platform',
  NULL,
  '{"type": "platform", "description": "Platform-level administration"}',
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = 'Platform Admin',
  is_active = true,
  updated_at = NOW();

-- Step 2: Insert ke public.users
INSERT INTO public.users (
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
  '68657f26-d95a-492c-8bc7-0e0b61386d46',
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
  is_active = true,
  updated_at = NOW();

-- Step 3: Insert ke public.profiles
INSERT INTO public.profiles (
  id,
  user_id,
  onboarding_completed,
  onboarding_step,
  created_at,
  updated_at
) VALUES (
  '68657f26-d95a-492c-8bc7-0e0b61386d46',
  '68657f26-d95a-492c-8bc7-0e0b61386d46',
  false,
  'profile_setup',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  user_id = '68657f26-d95a-492c-8bc7-0e0b61386d46',
  updated_at = NOW();

-- Step 4: Verify
SELECT 
  u.id,
  u.email,
  u.name,
  u.role,
  u.is_active,
  u.tenant_id,
  p.user_id as profile_user_id,
  p.onboarding_step,
  t.name as platform_tenant
FROM public.users u
LEFT JOIN public.profiles p ON u.id = p.id
LEFT JOIN public.tenants t ON t.id = 'platform'
WHERE u.email = 'bukdan101@gmail.com';`

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
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/40 mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Final Setup - Super Admin
          </h1>
          <p className="text-slate-400">
            User sudah dibuat di Supabase Auth! Tinggal 2 langkah lagi.
          </p>
        </div>

        {/* Success Info */}
        <Alert className="border-green-500/50 bg-green-500/10">
          <CheckCircle className="h-5 w-5 text-green-400" />
          <AlertDescription className="text-green-200">
            <strong>✅ User berhasil dibuat di Supabase Auth!</strong><br/>
            User ID: 68657f26-d95a-492c-8bc7-0e0b61386d46<br/>
            Sekarang tinggal insert ke database tables.
          </AlertDescription>
        </Alert>

        {/* Step 1: Open SQL Editor */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              Buka Supabase SQL Editor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
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
          </CardContent>
        </Card>

        {/* Step 2: Run Query */}
        <Card className="border-2 border-green-500/20 bg-green-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              Run Query Ini
            </CardTitle>
            <CardDescription className="text-slate-400">
              Copy dan paste query ini ke SQL Editor, lalu klik RUN
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto relative max-h-96 overflow-y-auto">
              <pre className="text-xs text-slate-300">{setupQuery}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(setupQuery)}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <Alert className="border-blue-500/50 bg-blue-500/10">
              <AlertDescription className="text-blue-200 text-sm">
                Query ini akan:<br/>
                • Create platform tenant (untuk audit logs)<br/>
                • Insert user ke public.users dengan role super_admin<br/>
                • Insert profile ke public.profiles<br/>
                • Verify hasilnya
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 3: Login */}
        <Card className="border-2 border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/platform/login">
                Go to Platform Login →
              </Link>
            </Button>
            <div className="text-sm text-slate-400 text-center space-y-1">
              <p className="font-semibold text-white">Credentials:</p>
              <p className="text-primary font-mono">bukdan101@gmail.com</p>
              <p className="text-primary font-mono">Bukdan#bangku101</p>
            </div>
          </CardContent>
        </Card>

        {/* Expected Result */}
        <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-sm">Expected Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            <p>Setelah run query, kamu harus lihat hasil seperti ini:</p>
            <div className="bg-slate-900 p-3 rounded text-xs font-mono">
              id: 68657f26-d95a-492c-8bc7-0e0b61386d46<br/>
              email: bukdan101@gmail.com<br/>
              name: bukdan<br/>
              role: super_admin<br/>
              is_active: true<br/>
              tenant_id: null<br/>
              profile_user_id: 68657f26-d95a-492c-8bc7-0e0b61386d46<br/>
              onboarding_step: profile_setup<br/>
              platform_tenant: Platform Admin
            </div>
            <p className="text-green-400">✅ Jika muncul seperti ini, setup berhasil!</p>
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
