"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Copy, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function VerifyUserPage() {
  const [copied, setCopied] = useState(false)

  const checkQuery = `-- Cek user di auth.users
SELECT id, email, encrypted_password, email_confirmed_at, created_at
FROM auth.users
WHERE email = 'bukdan101@gmail.com';

-- Cek user di public.users
SELECT id, email, name, role, is_active
FROM public.users
WHERE email = 'bukdan101@gmail.com';

-- Cek profile
SELECT id, user_id, onboarding_step
FROM public.profiles
WHERE user_id IN (
  SELECT id FROM public.users WHERE email = 'bukdan101@gmail.com'
);`

  const fixQuery = `-- QUICK FIX: Update password dan role
DO $$
DECLARE
  user_exists BOOLEAN;
  user_id_var UUID;
BEGIN
  -- Check if user exists in auth.users
  SELECT EXISTS(SELECT 1 FROM auth.users WHERE email = 'bukdan101@gmail.com') INTO user_exists;
  
  IF user_exists THEN
    RAISE NOTICE 'User exists, updating...';
    
    -- Get user ID
    SELECT id INTO user_id_var FROM auth.users WHERE email = 'bukdan101@gmail.com';
    
    -- Update password in auth.users
    UPDATE auth.users
    SET encrypted_password = crypt('Bukdan#bangku101', gen_salt('bf')),
        email_confirmed_at = NOW(),
        updated_at = NOW()
    WHERE email = 'bukdan101@gmail.com';
    
    -- Update role in public.users
    UPDATE public.users
    SET role = 'super_admin',
        is_active = true,
        updated_at = NOW()
    WHERE email = 'bukdan101@gmail.com';
    
    -- Ensure profile exists
    INSERT INTO public.profiles (id, user_id, onboarding_completed, onboarding_step, created_at, updated_at)
    VALUES (user_id_var, user_id_var, false, 'profile_setup', NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET user_id = user_id_var;
    
    RAISE NOTICE 'User updated successfully!';
  ELSE
    RAISE NOTICE 'User does not exist. Please run Opsi A query first.';
  END IF;
END $$;

-- Verify
SELECT 
  u.id, 
  u.email, 
  u.role, 
  u.is_active,
  au.email_confirmed_at,
  p.user_id as profile_user_id
FROM public.users u
JOIN auth.users au ON u.id = au.id
LEFT JOIN public.profiles p ON u.id = p.id
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
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Verify User & Fix Login
          </h1>
          <p className="text-slate-400">
            Troubleshooting "Invalid Credentials" error
          </p>
        </div>

        {/* Error Info */}
        <Alert className="border-red-500/50 bg-red-500/10">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <AlertDescription className="text-red-200">
            <strong>Error: Invalid Credentials</strong><br/>
            User mungkin belum dibuat dengan benar atau password tidak match.
          </AlertDescription>
        </Alert>

        {/* Step 1: Check User */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              Cek User di Database
            </CardTitle>
            <CardDescription className="text-slate-400">
              Verify apakah user sudah dibuat dengan benar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto relative max-h-64 overflow-y-auto">
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
            <Alert className="border-blue-500/50 bg-blue-500/10">
              <AlertDescription className="text-blue-200 text-sm">
                <strong>Yang harus ada:</strong><br/>
                ✅ User di auth.users dengan encrypted_password<br/>
                ✅ User di public.users dengan role = 'super_admin'<br/>
                ✅ Profile dengan user_id tidak NULL
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 2: Fix User */}
        <Card className="border-2 border-green-500/20 bg-green-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              Quick Fix (All-in-One)
            </CardTitle>
            <CardDescription className="text-slate-400">
              Query ini akan fix password, role, dan profile sekaligus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto relative max-h-96 overflow-y-auto">
              <pre className="text-xs text-slate-300">{fixQuery}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(fixQuery)}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <Alert className="border-green-500/50 bg-green-500/10">
              <AlertDescription className="text-green-200 text-sm">
                <strong>Query ini akan:</strong><br/>
                ✅ Update password ke: Bukdan#bangku101<br/>
                ✅ Set role = 'super_admin'<br/>
                ✅ Set is_active = true<br/>
                ✅ Fix profile dengan user_id yang benar
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 3: SQL Editor */}
        <Card className="border-2 border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              Run di SQL Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
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
            <div className="text-sm text-slate-400 space-y-1">
              <p>1. Copy query dari Step 2</p>
              <p>2. Paste di SQL Editor</p>
              <p>3. Klik "Run"</p>
              <p>4. Cek result: harus ada "User updated successfully!"</p>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Try Login */}
        <Card className="border-2 border-primary/20 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                4
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
              <p>Login dengan:</p>
              <p className="text-primary font-mono">bukdan101@gmail.com</p>
              <p className="text-primary font-mono">Bukdan#bangku101</p>
            </div>
          </CardContent>
        </Card>

        {/* Alternative */}
        <Card className="border-2 border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-sm">Jika Masih Gagal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            <p>Jika setelah run query masih "Invalid Credentials":</p>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/setup/direct-insert">
                  Create User Baru (Opsi A)
                </Link>
              </Button>
              <p className="text-xs text-slate-400 text-center">
                Gunakan email berbeda atau hapus user lama dulu
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <div className="text-center space-y-2">
          <Link
            href="/setup/direct-insert"
            className="block text-sm text-primary hover:text-primary/80 hover:underline"
          >
            ← Back to Direct Insert
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
