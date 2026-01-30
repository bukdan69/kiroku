"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, Copy, CheckCircle, ExternalLink, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function CompleteSetupPage() {
  const [copied, setCopied] = useState(false)

  const completeSetupQuery = `-- ============================================
-- COMPLETE SETUP - All in One
-- ============================================
-- Run semua query ini sekaligus untuk setup lengkap

-- 1. Check tables exist
SELECT 
  schemaname,
  tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Create Platform Tenant
INSERT INTO public.tenants (
  id, name, slug, domain, settings, is_active, created_at, updated_at
) VALUES (
  'platform', 'Platform Admin', 'platform', NULL,
  '{"type": "platform", "description": "Platform-level administration"}',
  true, NOW(), NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = 'Platform Admin', is_active = true, updated_at = NOW();

-- 3. Check if user exists in auth.users
SELECT id, email, email_confirmed_at 
FROM auth.users 
WHERE email = 'bukdan101@gmail.com';

-- 4. If user exists, reset password and confirm email
UPDATE auth.users
SET 
  encrypted_password = crypt('Bukdan#bangku101', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'bukdan101@gmail.com';

-- 5. Insert/Update user in public.users
INSERT INTO public.users (
  id, email, name, role, tenant_id,
  email_verified, is_active, created_at, updated_at
) VALUES (
  '68657f26-d95a-492c-8bc7-0e0b61386d46',
  'bukdan101@gmail.com', 'bukdan', 'super_admin', NULL,
  NOW(), true, NOW(), NOW()
) ON CONFLICT (id) DO UPDATE SET
  role = 'super_admin',
  tenant_id = NULL,
  is_active = true,
  updated_at = NOW();

-- 6. Insert/Update profile
INSERT INTO public.profiles (
  id, user_id, onboarding_completed,
  onboarding_step, created_at, updated_at
) VALUES (
  '68657f26-d95a-492c-8bc7-0e0b61386d46',
  '68657f26-d95a-492c-8bc7-0e0b61386d46',
  false, 'profile_setup', NOW(), NOW()
) ON CONFLICT (id) DO UPDATE SET
  user_id = '68657f26-d95a-492c-8bc7-0e0b61386d46',
  updated_at = NOW();

-- 7. FINAL VERIFICATION
SELECT 
  'AUTH USER' as source,
  au.id,
  au.email,
  au.email_confirmed_at,
  NULL as role,
  NULL as is_active
FROM auth.users au
WHERE au.email = 'bukdan101@gmail.com'

UNION ALL

SELECT 
  'PUBLIC USER' as source,
  u.id,
  u.email,
  u.email_verified as email_confirmed_at,
  u.role::text,
  u.is_active::text
FROM public.users u
WHERE u.email = 'bukdan101@gmail.com'

UNION ALL

SELECT 
  'PROFILE' as source,
  p.id,
  NULL as email,
  NULL as email_confirmed_at,
  p.onboarding_step::text as role,
  (p.user_id IS NOT NULL)::text as is_active
FROM public.profiles p
WHERE p.id = '68657f26-d95a-492c-8bc7-0e0b61386d46'

UNION ALL

SELECT 
  'TENANT' as source,
  t.id,
  t.name as email,
  NULL as email_confirmed_at,
  t.slug as role,
  t.is_active::text
FROM public.tenants t
WHERE t.id = 'platform';`

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
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/40 mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Complete Setup - All in One
          </h1>
          <p className="text-slate-400">
            Run satu query ini untuk setup semuanya sekaligus
          </p>
        </div>

        {/* Important Info */}
        <Alert className="border-purple-500/50 bg-purple-500/10">
          <AlertTriangle className="h-5 w-5 text-purple-400" />
          <AlertDescription className="text-purple-200">
            <strong>Query ini akan:</strong><br/>
            • Check tables exist<br/>
            • Create platform tenant<br/>
            • Reset password user di auth.users<br/>
            • Insert/update user di public.users<br/>
            • Insert/update profile<br/>
            • Verify semua data
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
            <CardDescription className="text-slate-400">
              Gunakan SQL Editor, bukan Table Editor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a 
                href="https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr/sql/new" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Open SQL Editor (New Query)
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Step 2: Run Complete Query */}
        <Card className="border-2 border-purple-500/20 bg-purple-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              Copy & Run Query Lengkap
            </CardTitle>
            <CardDescription className="text-slate-400">
              Satu query untuk setup semuanya
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto relative max-h-96 overflow-y-auto">
              <pre className="text-xs text-slate-300">{completeSetupQuery}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(completeSetupQuery)}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Check Results */}
        <Card className="border-2 border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              Check Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-slate-300">
              Setelah run query, scroll ke bawah untuk lihat FINAL VERIFICATION.
              Harus ada 4 rows:
            </p>
            <div className="bg-slate-900 p-3 rounded text-xs font-mono space-y-1">
              <div className="text-green-400">✓ AUTH USER - email confirmed</div>
              <div className="text-green-400">✓ PUBLIC USER - role: super_admin, active: true</div>
              <div className="text-green-400">✓ PROFILE - user_id linked, step: profile_setup</div>
              <div className="text-green-400">✓ TENANT - platform tenant exists</div>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Login */}
        <Card className="border-2 border-green-500/20 bg-green-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                4
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

        {/* Troubleshooting */}
        <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-sm">Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            <div>
              <strong className="text-yellow-400">Error: "table does not exist"</strong>
              <p className="text-xs text-slate-400">Tables belum di-push. Run: npm run db:push</p>
            </div>
            <div>
              <strong className="text-yellow-400">Error: "function crypt does not exist"</strong>
              <p className="text-xs text-slate-400">Run: CREATE EXTENSION IF NOT EXISTS pgcrypto;</p>
            </div>
            <div>
              <strong className="text-yellow-400">User tidak ada di auth.users</strong>
              <p className="text-xs text-slate-400">User ID 68657f26-d95a-492c-8bc7-0e0b61386d46 sudah dibuat sebelumnya. Check dengan SELECT dari auth.users</p>
            </div>
            <div>
              <strong className="text-yellow-400">Login masih error</strong>
              <p className="text-xs text-slate-400">Clear browser cache atau try incognito mode</p>
            </div>
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
