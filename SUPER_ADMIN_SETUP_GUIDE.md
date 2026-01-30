# 🔐 Super Admin Setup Guide - Arisan KU

## Masalah: Tidak Bisa Login sebagai Super Admin

Ada beberapa cara untuk setup super admin. Ikuti langkah-langkah berikut:

---

## ✅ Solusi 1: Manual Setup via Supabase Dashboard (RECOMMENDED)

### Step 1: Buat User di Supabase Auth

1. Buka **Supabase Dashboard**: https://supabase.com/dashboard
2. Pilih project Anda
3. Klik **Authentication** di sidebar
4. Klik **Users** tab
5. Klik **Add User** button
6. Isi form:
   ```
   Email: bukdan101@gmail.com
   Password: Bukdan#bangku101
   Auto Confirm User: ✅ (centang)
   ```
7. Klik **Create User**
8. **Copy User ID** yang muncul (format: uuid)

### Step 2: Insert ke Database

1. Klik **SQL Editor** di sidebar Supabase
2. Klik **New Query**
3. Paste SQL berikut (ganti `USER_ID_DARI_STEP_1` dengan ID yang di-copy):

```sql
-- Insert super admin ke table users
INSERT INTO users (
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
  'USER_ID_DARI_STEP_1',  -- Ganti dengan User ID dari Step 1
  'bukdan101@gmail.com',
  'bukdan',
  'super_admin',
  NULL,
  NOW(),
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  role = 'super_admin',
  tenant_id = NULL,
  name = 'bukdan',
  email_verified = NOW(),
  is_active = true,
  updated_at = NOW();
```

4. Klik **Run** atau tekan `Ctrl+Enter`
5. Pastikan muncul "Success. No rows returned"

### Step 3: Verify

1. Jalankan query ini untuk verify:
```sql
SELECT id, email, name, role, is_active 
FROM users 
WHERE email = 'bukdan101@gmail.com';
```

2. Pastikan `role` = `super_admin`

### Step 4: Login

1. Buka: http://localhost:3001/platform/login
2. Login dengan:
   ```
   Email: bukdan101@gmail.com
   Password: Bukdan#bangku101
   ```
3. Anda akan redirect ke `/platform/dashboard`

---

## ✅ Solusi 2: Update User yang Sudah Ada

Jika Anda sudah punya user di sistem, tinggal update role-nya:

### Via SQL Editor:

```sql
-- Update user yang sudah ada menjadi super_admin
UPDATE users 
SET 
  role = 'super_admin',
  tenant_id = NULL,
  updated_at = NOW()
WHERE email = 'bukdan101@gmail.com';  -- Ganti dengan email Anda

-- Verify
SELECT id, email, name, role, is_active 
FROM users 
WHERE email = 'bukdan101@gmail.com';
```

---

## ✅ Solusi 3: Via Script (Jika Database Sudah Ready)

Jika table `users` sudah ada dan RLS sudah di-setup:

```bash
npm run create-super-admin
```

Jika error, cek:
1. Apakah table `users` sudah ada?
2. Apakah RLS policy mengizinkan insert?
3. Apakah environment variables sudah benar?

---

## 🔍 Troubleshooting

### Error: "Database error creating new user"

**Penyebab**: Table `users` belum ada atau RLS policy terlalu ketat

**Solusi**:
1. Cek apakah table users ada:
```sql
SELECT * FROM information_schema.tables 
WHERE table_name = 'users';
```

2. Jika tidak ada, run migration:
```bash
npm run db:push
```

3. Jika ada, cek RLS policy:
```sql
-- Disable RLS sementara untuk insert super admin
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Insert super admin (gunakan SQL dari Solusi 1)

-- Enable RLS kembali
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

### Error: "unauthorized" saat login

**Penyebab**: User ada di Auth tapi role bukan `super_admin`

**Solusi**: Update role via SQL (Solusi 2)

### Error: "invalid_credentials"

**Penyebab**: Email/password salah atau user belum confirmed

**Solusi**:
1. Reset password via Supabase Dashboard
2. Atau buat user baru dengan "Auto Confirm" dicentang

---

## 📋 Credentials Default

```
Email: bukdan101@gmail.com
Password: Bukdan#bangku101
Role: super_admin
```

**⚠️ PENTING**: Ganti password setelah login pertama kali!

---

## 🔐 Security Checklist

Setelah super admin berhasil login:

1. ✅ Ganti password default
2. ✅ Enable 2FA (jika tersedia)
3. ✅ Cek audit logs
4. ✅ Review RLS policies
5. ✅ Backup database

---

## 🚀 Login URLs

- **Super Admin**: http://localhost:3001/platform/login
- **Regular User**: http://localhost:3001/auth

---

## 📊 Verify Super Admin Access

Setelah login, Anda harus bisa akses:

- ✅ `/platform/dashboard` - Platform dashboard
- ✅ `/platform/users` - User management
- ✅ `/platform/kyc` - KYC verification
- ✅ `/platform/analytics` - Platform analytics
- ✅ `/platform/audit` - Audit logs
- ✅ `/platform/settings` - Platform settings
- ✅ `/platform/fraud` - Fraud detection
- ✅ `/platform/affiliate` - Affiliate management

Jika redirect ke `/platform/login?error=unauthorized`, berarti role belum `super_admin`.

---

## 🆘 Masih Bermasalah?

### Quick Fix: Manual Login Test

1. Buka browser console (F12)
2. Paste code ini:

```javascript
// Test super admin check
fetch('/api/user/role')
  .then(r => r.json())
  .then(data => console.log('Current role:', data))
```

3. Jika role bukan `super_admin`, jalankan SQL update (Solusi 2)

---

## 📝 Notes

- Super admin **tidak punya tenant_id** (NULL)
- Super admin bisa akses **semua tenant**
- Super admin login di `/platform/login` (bukan `/auth`)
- Middleware akan check role sebelum allow akses

---

**Status**: Setup guide lengkap
**Last Updated**: 30 Januari 2026

Jika masih ada masalah, cek:
1. Environment variables (.env.local)
2. Database connection
3. Supabase Auth settings
4. RLS policies

**Powered by Pak D Sinnay** ✨
