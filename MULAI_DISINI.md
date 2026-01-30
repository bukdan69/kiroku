# 🚀 MULAI DISINI - Super Admin Setup

## ✅ STATUS: Schema Ready, User Created!

Database schema sudah di-push ✅  
User sudah dibuat di Supabase Auth ✅  
Tinggal insert ke public tables ⏳

---

## ⚡ SETUP CEPAT (2 MENIT)

### 1. Buka SQL Editor
```
https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr/sql/new
```

### 2. Copy & Run Query
Buka file: **FINAL_SETUP.sql** (di root folder)  
Atau copy dari halaman: http://localhost:3001/setup/complete

### 3. Login
```
http://localhost:3001/platform/login
```
- Email: `bukdan101@gmail.com`
- Password: `Bukdan#bangku101`

**SELESAI!** ✅

---

## 📋 Query Lengkap

```sql
-- 1. Create Platform Tenant
INSERT INTO public.tenants (
  id, name, slug, is_active, created_at, updated_at
) VALUES (
  'platform', 'Platform Admin', 'platform', true, NOW(), NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = 'Platform Admin', is_active = true, updated_at = NOW();

-- 2. Reset Password & Confirm Email
UPDATE auth.users
SET 
  encrypted_password = crypt('Bukdan#bangku101', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'bukdan101@gmail.com';

-- 3. Insert User ke public.users
INSERT INTO public.users (
  id, email, name, role, is_active, created_at, updated_at
) VALUES (
  '68657f26-d95a-492c-8bc7-0e0b61386d46',
  'bukdan101@gmail.com',
  'bukdan',
  'super_admin',
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  role = 'super_admin',
  is_active = true,
  updated_at = NOW();

-- 4. Insert Profile
INSERT INTO public.profiles (
  id, user_id, onboarding_completed, onboarding_step, created_at, updated_at
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

-- 5. Verify
SELECT 'Tenant' as type, id, name as value FROM public.tenants WHERE id = 'platform'
UNION ALL
SELECT 'Auth User' as type, id, email as value FROM auth.users WHERE email = 'bukdan101@gmail.com'
UNION ALL
SELECT 'Public User' as type, id, role::text as value FROM public.users WHERE email = 'bukdan101@gmail.com'
UNION ALL
SELECT 'Profile' as type, id, user_id::text as value FROM public.profiles WHERE id = '68657f26-d95a-492c-8bc7-0e0b61386d46';
```

---

## 🔗 Link Penting

| Halaman | URL |
|---------|-----|
| **Setup Complete** | http://localhost:3001/setup/complete |
| **SQL Editor** | https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr/sql/new |
| **Platform Login** | http://localhost:3001/platform/login |

---

## ❓ FAQ

### Q: Database kosong?
**A:** Run `npm run db:push` untuk push schema

### Q: User sudah ada?
**A:** Bagus! Tinggal run query di atas untuk insert ke public tables

### Q: Error "function crypt does not exist"?
**A:** Run: `CREATE EXTENSION IF NOT EXISTS pgcrypto;`

### Q: Login masih error?
**A:** 
1. Verify query berhasil (ada 4 rows di hasil verify)
2. Clear browser cache
3. Try incognito mode

---

## ✅ Expected Result

Setelah run query, verify harus menunjukkan:
```
Tenant      | platform | Platform Admin
Auth User   | 68657... | bukdan101@gmail.com
Public User | 68657... | super_admin
Profile     | 68657... | 68657f26-d95a-492c-8bc7-0e0b61386d46
```

Jika semua ada = **SETUP BERHASIL!** 🎉

---

**File:** FINAL_SETUP.sql  
**Web:** http://localhost:3001/setup/complete  
**Time:** ~2 minutes
