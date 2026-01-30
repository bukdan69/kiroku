# 👑 Super Admin Users

## Active Super Admin Accounts

### 1. bukdan101@gmail.com
- **User ID:** `68657f26-d95a-492c-8bc7-0e0b61386d46`
- **Name:** bukdan
- **Password:** Bukdan#bangku101
- **Status:** ✅ Active & Configured
- **Email Confirmed:** YES
- **Created:** 2026-01-30

### 2. bukdan321@gmail.com
- **User ID:** `dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af`
- **Name:** bukdan101
- **Password:** (set saat signup)
- **Status:** ⏳ Pending Setup
- **Email Confirmed:** NO (perlu confirm)
- **Created:** 2026-01-30

---

## Setup New Super Admin (bukdan321@gmail.com)

### Quick Setup:

1. **Buka SQL Editor:**
   ```
   https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr/sql/new
   ```

2. **Run Query:**
   Copy dari file: `make-super-admin-bukdan321.sql`

3. **Login:**
   ```
   http://localhost:3001/platform/login
   Email: bukdan321@gmail.com
   Password: (password yang kamu set)
   ```

---

## SQL Query untuk bukdan321@gmail.com

```sql
-- Confirm email (hanya update email_confirmed_at, confirmed_at adalah generated column)
UPDATE auth.users
SET email_confirmed_at = NOW(), updated_at = NOW()
WHERE id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af';

-- Insert ke public.users
INSERT INTO public.users (
  id, email, name, role, tenant_id,
  email_verified, is_active, created_at, updated_at
) VALUES (
  'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af',
  'bukdan321@gmail.com',
  'bukdan101',
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
  email_verified = NOW(),
  updated_at = NOW();

-- Insert profile
INSERT INTO public.profiles (
  id, user_id, onboarding_completed,
  onboarding_step, created_at, updated_at
) VALUES (
  'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af',
  'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af',
  false,
  'profile_setup',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  user_id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af',
  updated_at = NOW();
```

---

## Add More Super Admins

Untuk menambah super admin baru:

1. **Signup via normal flow** atau create user di Supabase Dashboard
2. **Get User ID** dari auth.users
3. **Run query** seperti di atas dengan User ID yang baru
4. **Update** file ini dengan credentials

---

## Security Notes

- Super admin tidak terikat ke tenant (tenant_id = NULL)
- Bisa akses semua tenant dan data
- Bisa manage users, KYC, fraud detection, dll
- Password harus strong (min 8 char, uppercase, lowercase, number, symbol)
- Enable 2FA untuk production (future enhancement)

---

## Platform Admin URLs

- **Login:** http://localhost:3001/platform/login
- **Dashboard:** http://localhost:3001/platform/dashboard
- **Users:** http://localhost:3001/platform/users
- **KYC:** http://localhost:3001/platform/kyc
- **Analytics:** http://localhost:3001/platform/analytics
- **Audit:** http://localhost:3001/platform/audit
- **Settings:** http://localhost:3001/platform/settings

---

**Last Updated:** 2026-01-30
