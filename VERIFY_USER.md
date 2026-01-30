# 🔍 VERIFY USER - Troubleshooting Login

## ❌ Error: Invalid Credentials

Ini berarti salah satu dari:
1. User belum dibuat di `auth.users`
2. Password salah atau tidak ter-hash dengan benar
3. User ada tapi email tidak match

---

## 🔍 LANGKAH VERIFIKASI

### Step 1: Cek User di Auth Table

Buka SQL Editor dan run:

```sql
-- Cek user di auth.users
SELECT id, email, encrypted_password, email_confirmed_at, created_at
FROM auth.users
WHERE email = 'bukdan101@gmail.com';
```

**Hasil yang diharapkan:**
- ✅ Ada 1 row
- ✅ `email` = 'bukdan101@gmail.com'
- ✅ `encrypted_password` ada (bukan NULL)
- ✅ `email_confirmed_at` ada (bukan NULL)

**Jika TIDAK ADA:**
- User belum dibuat di auth.users
- Run query Opsi A lagi di: http://localhost:3001/setup/direct-insert

---

### Step 2: Cek User di Public Users Table

```sql
-- Cek user di public.users
SELECT id, email, name, role, is_active
FROM public.users
WHERE email = 'bukdan101@gmail.com';
```

**Hasil yang diharapkan:**
- ✅ Ada 1 row
- ✅ `role` = 'super_admin'
- ✅ `is_active` = true

**Jika role BUKAN super_admin:**
```sql
UPDATE public.users 
SET role = 'super_admin', is_active = true 
WHERE email = 'bukdan101@gmail.com';
```

---

### Step 3: Cek Profile

```sql
-- Cek profile
SELECT id, user_id, onboarding_step
FROM public.profiles
WHERE user_id IN (
  SELECT id FROM public.users WHERE email = 'bukdan101@gmail.com'
);
```

**Hasil yang diharapkan:**
- ✅ Ada 1 row
- ✅ `user_id` tidak NULL

---

### Step 4: Test Login via SQL

```sql
-- Test apakah password bisa di-verify
-- Ganti USER_ID dengan id dari Step 1
SELECT 
  id, 
  email,
  encrypted_password = crypt('Bukdan#bangku101', encrypted_password) as password_match
FROM auth.users
WHERE email = 'bukdan101@gmail.com';
```

**Hasil yang diharapkan:**
- ✅ `password_match` = true

**Jika password_match = false:**
Password tidak match! Perlu reset password atau create user baru.

---

## 🔧 SOLUSI BERDASARKAN HASIL

### Solusi 1: User Tidak Ada di auth.users

Run query Opsi A lagi:
```
http://localhost:3001/setup/direct-insert
```

Copy query dan run di SQL Editor.

---

### Solusi 2: Password Tidak Match

**Opsi A: Reset Password di Supabase Dashboard**
1. Buka: https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr
2. Authentication → Users
3. Cari user bukdan101@gmail.com
4. Klik "..." → "Reset Password"
5. Set password baru: `Bukdan#bangku101`

**Opsi B: Update Password via SQL**
```sql
-- Update password
UPDATE auth.users
SET encrypted_password = crypt('Bukdan#bangku101', gen_salt('bf')),
    updated_at = NOW()
WHERE email = 'bukdan101@gmail.com';
```

---

### Solusi 3: Role Bukan super_admin

```sql
UPDATE public.users 
SET role = 'super_admin', 
    is_active = true,
    updated_at = NOW()
WHERE email = 'bukdan101@gmail.com';
```

---

### Solusi 4: Email Tidak Match

Cek typo di email. Pastikan:
- Tidak ada spasi
- Huruf kecil semua
- Format: `bukdan101@gmail.com`

---

## 🎯 QUICK FIX (All-in-One)

Jika bingung, run query ini untuk fix semua:

```sql
-- 1. Cek user exists
DO $$
DECLARE
  user_exists BOOLEAN;
  user_id_var UUID;
BEGIN
  -- Check if user exists in auth.users
  SELECT EXISTS(SELECT 1 FROM auth.users WHERE email = 'bukdan101@gmail.com') INTO user_exists;
  
  IF user_exists THEN
    -- User exists, update password and role
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
WHERE u.email = 'bukdan101@gmail.com';
```

---

## 📋 Checklist

Setelah run query di atas, verify:

- [ ] User ada di `auth.users`
- [ ] Password ter-hash dengan benar
- [ ] `email_confirmed_at` tidak NULL
- [ ] User ada di `public.users`
- [ ] `role` = 'super_admin'
- [ ] `is_active` = true
- [ ] Profile ada dengan `user_id` tidak NULL

Jika semua ✅, coba login lagi!

---

**SQL Editor:** https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr/sql
