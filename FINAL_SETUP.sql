-- ============================================
-- FINAL SETUP - Super Admin
-- ============================================
-- User sudah ada di Supabase Auth
-- ID: 68657f26-d95a-492c-8bc7-0e0b61386d46
-- Email: bukdan101@gmail.com

-- Step 1: Create Platform Tenant
INSERT INTO public.tenants (
  id, name, slug, is_active, created_at, updated_at
) VALUES (
  'platform', 'Platform Admin', 'platform', true, NOW(), NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = 'Platform Admin', is_active = true, updated_at = NOW();

-- Step 2: Reset Password & Confirm Email
UPDATE auth.users
SET 
  encrypted_password = crypt('Bukdan#bangku101', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'bukdan101@gmail.com';

-- Step 3: Insert User ke public.users
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

-- Step 4: Insert Profile
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

-- ============================================
-- VERIFY
-- ============================================
SELECT 'Tenant' as type, id, name as value FROM public.tenants WHERE id = 'platform'
UNION ALL
SELECT 'Auth User' as type, id, email as value FROM auth.users WHERE email = 'bukdan101@gmail.com'
UNION ALL
SELECT 'Public User' as type, id, role::text as value FROM public.users WHERE email = 'bukdan101@gmail.com'
UNION ALL
SELECT 'Profile' as type, id, user_id::text as value FROM public.profiles WHERE id = '68657f26-d95a-492c-8bc7-0e0b61386d46';

-- ============================================
-- CREDENTIALS
-- ============================================
-- Email: bukdan101@gmail.com
-- Password: Bukdan#bangku101
-- Login: http://localhost:3001/platform/login
-- ============================================
