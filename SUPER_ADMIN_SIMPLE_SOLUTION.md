# 🎯 Super Admin - Solusi Sederhana

## ❌ Masalah
Error saat membuat super admin: "Database error creating new user"

## ✅ Solusi Alternatif

### Metode 1: Signup Normal + Update Role (RECOMMENDED)

#### Step 1: Signup sebagai user biasa
1. Buka: http://localhost:3001/auth
2. Signup dengan:
   - Email: bukdan101@gmail.com
   - Password: Bukdan#bangku101
   - Name: bukdan

#### Step 2: Update role menjadi super_admin
Jalankan script SQL ini di Supabase Dashboard:

```sql
-- Update user role menjadi super_admin
UPDATE users 
SET role = 'super_admin', 
    tenant_id = NULL,
    updated_at = NOW()
WHERE email = 'bukdan101@gmail.com';

-- Verify
SELECT id, email, name, role, is_active 
FROM users 
WHERE email = 'bukdan101@gmail.com';
```

#### Step 3: Login sebagai super admin
1. Buka: http://localhost:3001/platform/login
2. Login dengan credentials yang sama
3. Akan redirect ke: http://localhost:3001/platform/dashboard

---

### Metode 2: Direct Database Insert

Jika user belum ada sama sekali, jalankan SQL ini:

```sql
-- Insert super admin langsung ke database
-- GANTI 'your-user-id-from-supabase-auth' dengan ID dari Supabase Auth
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
  'your-user-id-from-supabase-auth',  -- Ganti dengan ID dari Supabase Auth
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
  updated_at = NOW();
```

---

### Metode 3: Menggunakan Supabase Dashboard

#### Step 1: Buka Supabase Dashboard
1. Login ke: https://supabase.com/dashboard
2. Pilih project: rxvwwspxusuttfopomrr
3. Klik "Authentication" di sidebar
4. Klik "Users"

#### Step 2: Create User di Auth
1. Klik "Add user" → "Create new user"
2. Isi:
   - Email: bukdan101@gmail.com
   - Password: Bukdan#bangku101
   - Auto Confirm User: ✅ (centang)
3. Klik "Create user"
4. Copy User ID yang muncul

#### Step 3: Update Database
1. Klik "SQL Editor" di sidebar
2. Paste dan run:

```sql
-- Ganti USER_ID_DARI_STEP_2 dengan ID yang di-copy
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
  'USER_ID_DARI_STEP_2',
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
  updated_at = NOW();
```

---

## 🔍 Troubleshooting

### Error: "User already exists"
**Solusi:** User sudah ada, tinggal update role saja:

```sql
UPDATE users 
SET role = 'super_admin', 
    tenant_id = NULL 
WHERE email = 'bukdan101@gmail.com';
```

### Error: "Invalid credentials" saat login
**Kemungkinan:**
1. Password salah
2. User belum di-create di Supabase Auth
3. Email belum verified

**Solusi:**
1. Reset password di Supabase Dashboard
2. Atau create user baru dengan email berbeda

### Error: "Unauthorized" setelah login
**Penyebab:** Role bukan 'super_admin'

**Solusi:**
```sql
-- Cek role saat ini
SELECT email, role FROM users WHERE email = 'bukdan101@gmail.com';

-- Update ke super_admin
UPDATE users SET role = 'super_admin' WHERE email = 'bukdan101@gmail.com';
```

---

## 📋 Checklist

- [ ] User sudah signup/dibuat di Supabase Auth
- [ ] User ID sudah di-copy
- [ ] Role sudah di-update ke 'super_admin' di database
- [ ] tenant_id sudah di-set NULL
- [ ] is_active = true
- [ ] Bisa login di /platform/login
- [ ] Redirect ke /platform/dashboard berhasil

---

## 🎯 Quick Commands

### Cek user di database:
```sql
SELECT id, email, name, role, tenant_id, is_active 
FROM users 
WHERE email = 'bukdan101@gmail.com';
```

### Update role:
```sql
UPDATE users 
SET role = 'super_admin', tenant_id = NULL 
WHERE email = 'bukdan101@gmail.com';
```

### Cek semua super admins:
```sql
SELECT id, email, name, role, is_active, created_at 
FROM users 
WHERE role = 'super_admin';
```

---

## 📞 Akses Supabase Dashboard

**URL:** https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr

**Sections:**
- Authentication → Users (untuk manage users)
- SQL Editor (untuk run SQL commands)
- Table Editor → users (untuk edit langsung)

---

## ✅ Testing Flow

1. **Create/Signup User**
   - Via /auth page ATAU
   - Via Supabase Dashboard

2. **Update Role**
   - Run SQL di Supabase Dashboard
   - Set role = 'super_admin'

3. **Login**
   - http://localhost:3001/platform/login
   - Gunakan credentials

4. **Verify Access**
   - Should redirect to /platform/dashboard
   - Test akses ke /platform/users, /platform/kyc, dll

---

**Last Updated:** 2026-01-30
**Status:** ✅ Tested & Working
