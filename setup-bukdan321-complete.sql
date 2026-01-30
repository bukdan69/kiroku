-- ============================================
-- Complete Setup for bukdan321@gmail.com
-- ============================================

-- Step 1: Confirm email di auth.users
UPDATE auth.users
SET 
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af';

-- Check result
SELECT 'Step 1: Auth User Updated' as step, 
       email, 
       email_confirmed_at 
FROM auth.users 
WHERE id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af';

-- Step 2: Insert ke public.users
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

-- Check result
SELECT 'Step 2: Public User Created' as step,
       id,
       email,
       role,
       is_active
FROM public.users
WHERE id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af';

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

-- Check result
SELECT 'Step 3: Profile Created' as step,
       id,
       user_id,
       onboarding_step
FROM public.profiles
WHERE id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af';

-- ============================================
-- FINAL VERIFICATION
-- ============================================
SELECT 
  'FINAL CHECK' as verification,
  'Auth User' as component,
  au.email,
  CASE WHEN au.email_confirmed_at IS NOT NULL THEN 'Confirmed' ELSE 'Not Confirmed' END as status
FROM auth.users au
WHERE au.id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af'

UNION ALL

SELECT 
  'FINAL CHECK' as verification,
  'Public User' as component,
  u.email,
  CONCAT('Role: ', u.role::text, ', Active: ', u.is_active::text) as status
FROM public.users u
WHERE u.id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af'

UNION ALL

SELECT 
  'FINAL CHECK' as verification,
  'Profile' as component,
  p.user_id::text as email,
  CONCAT('Step: ', p.onboarding_step::text) as status
FROM public.profiles p
WHERE p.id = 'dcf0bed7-a703-4a58-bfb7-5cc5ff4ea3af';

-- ============================================
-- Expected Result:
-- 3 rows dengan:
-- 1. Auth User - Confirmed
-- 2. Public User - Role: super_admin, Active: true
-- 3. Profile - Step: profile_setup
-- ============================================
