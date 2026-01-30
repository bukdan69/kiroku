-- ============================================
-- Make bukdan321@gmail.com Super Admin
-- ============================================
-- User ID: dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af
-- Email: bukdan321@gmail.com

-- Step 1: Confirm email di auth.users
-- Note: confirmed_at adalah generated column, hanya update email_confirmed_at
UPDATE auth.users
SET 
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af';

-- Step 2: Insert ke public.users dengan role super_admin
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

-- Step 3: Insert profile
INSERT INTO public.profiles (
  id,
  user_id,
  onboarding_completed,
  onboarding_step,
  created_at,
  updated_at
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

-- Step 4: Verify
SELECT 
  'Auth User' as type,
  id,
  email,
  email_confirmed_at::text as confirmed_at,
  created_at::text as email_confirmed_at
FROM auth.users
WHERE id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af'

UNION ALL

SELECT 
  'Public User' as type,
  id,
  email,
  email_verified::text as confirmed_at,
  role::text as email_confirmed_at
FROM public.users
WHERE id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af'

UNION ALL

SELECT 
  'Profile' as type,
  id,
  user_id::text as email,
  onboarding_step::text as confirmed_at,
  onboarding_completed::text as email_confirmed_at
FROM public.profiles
WHERE id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af';

-- ============================================
-- CREDENTIALS
-- ============================================
-- Email: bukdan321@gmail.com
-- Password: (password yang kamu set saat signup)
-- Login: http://localhost:3001/platform/login
-- ============================================
