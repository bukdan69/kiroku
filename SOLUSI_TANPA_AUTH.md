# 🎯 SOLUSI TANPA SUPABASE AUTH

## ⚠️ MASALAH
Supabase Auth error bahkan di Dashboard: "Database error creating new user"

## ✅ SOLUSI: Direct Database Insert (Tanpa Auth)

Kita akan:
1. Generate UUID untuk user ID
2. Hash password manual
3. Insert langsung ke database
4. Bypass Supabase Auth sepenuhnya

---

## 🚀 CARA PALING MUDAH

### Step 1: Buka Supabase SQL Editor
```
https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr/sql
```

### Step 2: Run Query Ini

**OPSI A: Jika Belum Ada User dengan Email Ini**

```sql
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
WHERE u.email = 'bukdan101@gmail.com';
```

**OPSI B: Jika User Sudah Ada (Error "duplicate key")**

```sql
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
WHERE email = 'bukdan101@gmail.com';
```

### Step 3: Login
```
http://localhost:3001/platform/login
```
- Email: `bukdan101@gmail.com`
- Password: `Bukdan#bangku101`

**SELESAI!** ✅

---

## 🔄 Alternatif: Jika Query Di Atas Gagal

### Opsi 1: Insert Tanpa Auth Table

```sql
-- Hanya insert ke public.users (tanpa auth)
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
  gen_random_uuid(),
  'bukdan101@gmail.com',
  'bukdan',
  'super_admin',
  NULL,
  NOW(),
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  role = 'super_admin',
  tenant_id = NULL,
  is_active = true;

-- Verify
SELECT * FROM public.users WHERE email = 'bukdan101@gmail.com';
```

**Catatan:** Dengan cara ini, Anda tidak bisa login via Supabase Auth. 
Perlu custom login endpoint.

### Opsi 2: Update User yang Sudah Ada

Jika ada user lain yang sudah pernah signup:

```sql
-- Lihat semua users
SELECT id, email, name, role FROM public.users;

-- Update salah satu jadi super_admin
UPDATE public.users 
SET role = 'super_admin',
    tenant_id = NULL,
    name = 'bukdan',
    is_active = true
WHERE email = 'EMAIL_YANG_ADA@example.com';
```

Lalu login dengan email dan password user tersebut.

---

## 🔍 Troubleshooting

### Error: "null value in column "user_id" of relation "profiles" violates not-null constraint"

Ada trigger Supabase yang otomatis create profile saat user dibuat, tapi gagal karena `user_id` NULL.

**Solusi:** Query sudah diperbaiki untuk insert ke `profiles` table dengan `user_id` yang benar.

### Error: "function crypt does not exist"

Install extension pgcrypto:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

Lalu run query utama lagi.

### Error: "permission denied for table auth.users"

Gunakan Opsi 1 (insert tanpa auth table), lalu buat custom login.

### Error: "duplicate key value violates unique constraint"

User sudah ada! Update saja:

```sql
UPDATE public.users 
SET role = 'super_admin', tenant_id = NULL 
WHERE email = 'bukdan101@gmail.com';
```

---

## 🎯 Custom Login (Jika Tidak Pakai Auth Table)

Jika Anda insert tanpa auth table, perlu custom login:

```typescript
// src/app/api/auth/custom-login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  
  // Check user exists
  const user = await db.query.users.findFirst({
    where: eq(users.email, email)
  });
  
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  // For demo: accept any password (TIDAK AMAN!)
  // TODO: Implement proper password verification
  
  // Create session (simplified)
  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
}
```

---

## 📋 Checklist

- [ ] Buka Supabase SQL Editor
- [ ] Install pgcrypto extension (jika perlu)
- [ ] Run query insert user
- [ ] Verify user created
- [ ] Login di /platform/login
- [ ] Test akses dashboard

---

## 💡 Rekomendasi

**Terbaik:** Gunakan query utama (insert ke auth.users + public.users)

**Alternatif:** Update user yang sudah ada

**Last Resort:** Insert tanpa auth + custom login

---

**Last Updated:** 2026-01-30  
**Status:** ✅ Tested  
**Method:** Direct Database Insert
