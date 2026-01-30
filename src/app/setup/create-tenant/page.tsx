"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, Copy, CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function CreateTenantPage() {
  const [copied, setCopied] = useState(false)

  const tenantQuery = `-- Create Platform Tenant (diperlukan untuk audit logs)
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

-- Verify
SELECT id, name, slug, is_active FROM public.tenants WHERE id = 'platform';`

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
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/40 mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Create Platform Tenant
          </h1>
          <p className="text-slate-400">
            Fix login error dengan create platform tenant untuk audit logs
          </p>
        </div>

        {/* Info */}
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertDescription className="text-yellow-200">
            <strong>Kenapa perlu ini?</strong><br/>
            Login API mencoba insert audit logs dengan tenantId: 'platform', tapi tenant ini belum ada.
            Query ini akan create tenant 'platform' yang diperlukan.
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
        <Card className="border-2 border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              Run Query Ini
            </CardTitle>
            <CardDescription className="text-slate-400">
              Copy dan paste query ini ke SQL Editor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto relative">
              <pre className="text-xs text-slate-300">{tenantQuery}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(tenantQuery)}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Try Login Again */}
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
              <p>Setelah run query, coba login lagi dengan:</p>
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
            <p>Setelah run query, verify result harus menunjukkan:</p>
            <div className="bg-slate-900 p-3 rounded text-xs font-mono">
              id: platform<br/>
              name: Platform Admin<br/>
              slug: platform<br/>
              is_active: true
            </div>
            <p className="text-green-400">✅ Jika muncul seperti ini, tenant berhasil dibuat!</p>
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
