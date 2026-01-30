"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, Copy, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function DirectInsertPage() {
  const [copied, setCopied] = useState(false)

  const mainQuery = `-- OPSI A: Jika belum ada user dengan email ini
-- Generate UUID dan insert user langsung
DO $$
DECLARE
  new_user_id UUID;
  hashed_password TEXT;
BEGIN
  -- Generate UUID baru
  new_user_id := gen_random_uuid();
  
  -- Hash password menggunakan crypt (bcrypt)
  -- Password: Bukdan#bangku101
  hashed_password := crypt('Bukdan#bangku101', gen_salt('bf'));
  
  -- Insert ke auth.users (Supabase Auth table)
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role,
    aud,
    confirmation_token,
    email_change_token_new,
    recovery_token
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'bukdan101@gmail.com',
    hashed_password,
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"bukdan","role":"super_admin"}',
    false,
    'authenticated',
    'authenticated',
    '',
    '',
    ''
  );
  
  -- Insert ke public.users (Application table - tanpa tenant_id)
  INSERT INTO public.users (
    id,
    email,
    name,
    role,
    email_verified,
    is_active,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    'bukdan101@gmail.com',
    'bukdan',
    'super_admin',
    NOW(),
    true,
    NOW(),
    NOW()
  );
  
  -- Insert ke public.profiles (Fix trigger error)
  INSERT INTO public.profiles (
    id,
    user_id,
    onboarding_completed,
    onboarding_step,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    new_user_id,
    false,
    'profile_setup',
    NOW(),
    NOW()
  ) ON CONFLICT (id) DO NOTHING;
  
  -- Output user ID
  RAISE NOTICE 'User created with ID: %', new_user_id;
END $$;

-- Verify
SELECT u.id, u.email, u.name, u.role, u.is_active, p.user_id as profile_user_id
FROM public.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'bukdan101@gmail.com';`

  const extensionQuery = `CREATE EXTENSION IF NOT EXISTS pgcrypto;`

  const simpleQuery = `-- OPSI B: Jika user sudah ada (error "duplicate key")
-- Cek user yang ada
SELECT id, email FROM auth.users WHERE email = 'bukdan101@gmail.com';

-- Update public.users saja (tanpa tenant_id)
UPDATE public.users 
SET role = 'super_admin',
    is_active = true,
    updated_at = NOW()
WHERE email = 'bukdan101@gmail.com';

-- Verify
SELECT id, email, name, role, is_active 
FROM public.users 
WHERE email = 'bukdan101@gmail.com';`

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
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Direct Database Insert
          </h1>
          <p className="text-slate-400">
            Solusi terakhir: Insert user langsung ke database (bypass Supabase Auth)
          </p>
        </div>

        {/* Error Info */}
        <Alert className="border-red-500/50 bg-red-500/10">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <AlertDescription className="text-red-200">
            <strong>Kenapa sampai sini?</strong> Supabase Auth API error bahkan di Dashboard. 
            Solusi: Insert langsung ke database tanpa melalui Auth API.
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

        {/* Step 2: Install Extension (Optional) */}
        <Card className="border-2 border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              Install Extension (Jika Perlu)
            </CardTitle>
            <CardDescription className="text-slate-400">
              Run query ini dulu jika ada error "function crypt does not exist"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto relative">
              <pre className="text-xs text-slate-300">{extensionQuery}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(extensionQuery)}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Main Query */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              Run Query Utama (Opsi A)
            </CardTitle>
            <CardDescription className="text-slate-400">
              Gunakan ini jika belum ada user dengan email bukdan101@gmail.com
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto relative max-h-96 overflow-y-auto">
              <pre className="text-xs text-slate-300">{mainQuery}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(mainQuery)}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <Alert className="border-blue-500/50 bg-blue-500/10">
              <AlertDescription className="text-blue-200 text-sm">
                <strong>Credentials:</strong><br/>
                Email: bukdan101@gmail.com<br/>
                Password: Bukdan#bangku101
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Alternative: Simple Query */}
        <Card className="border-2 border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400" />
              Alternatif: Opsi B (Jika User Sudah Ada)
            </CardTitle>
            <CardDescription className="text-slate-400">
              Gunakan ini jika ada error "duplicate key" atau user sudah ada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto relative">
              <pre className="text-xs text-slate-300">{simpleQuery}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(simpleQuery)}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-sm text-slate-400">
              Ganti email dengan email user yang sudah ada di database
            </p>
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
            <div className="text-sm text-slate-400 text-center">
              <p>Login dengan:</p>
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
              <strong className="text-yellow-400">Error: "null value in column user_id"</strong>
              <p className="text-xs text-slate-400">Query sudah diperbaiki! Sekarang insert ke profiles table dengan user_id.</p>
            </div>
            <div>
              <strong className="text-yellow-400">Error: "function crypt does not exist"</strong>
              <p className="text-xs text-slate-400">Run query di Step 2 (install pgcrypto extension)</p>
            </div>
            <div>
              <strong className="text-yellow-400">Error: "duplicate key"</strong>
              <p className="text-xs text-slate-400">User sudah ada! Gunakan Opsi B (update role)</p>
            </div>
            <div>
              <strong className="text-yellow-400">Error: "ON CONFLICT specification"</strong>
              <p className="text-xs text-slate-400">Gunakan query yang sudah diperbaiki (tanpa ON CONFLICT)</p>
            </div>
            <div>
              <strong className="text-yellow-400">Error: "permission denied"</strong>
              <p className="text-xs text-slate-400">Gunakan Opsi B atau contact Supabase support</p>
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <div className="text-center space-y-2">
          <Link
            href="/setup/update-role"
            className="block text-sm text-primary hover:text-primary/80 hover:underline"
          >
            Try Update Role Instead
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
