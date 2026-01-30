-- ============================================
-- SETUP SUPER ADMIN - Complete Solution
-- ============================================
-- User sudah dibuat di Supabase Auth dengan ID: 68657f26-d95a-492c-8bc7-0e0b61386d46
-- Sekarang kita insert ke public.users, public.profiles, dan create platform tenant

-- Step 1: Create Platform Tenant (untuk audit logs)
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
  '68657f26-d95a-492c-8bc7-0e0b61386d46',
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
  is_active = true,
  updated_at = NOW();

-- Step 3: Insert ke public.profiles
INSERT INTO public.profiles (
  id,
  user_id,
  onboarding_completed,
  onboarding_step,
  created_at,
  updated_at
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

-- Step 4: Verify
SELECT 
  u.id,
  u.email,
  u.name,
  u.role,
  u.is_active,
  u.tenant_id,
  p.user_id as profile_user_id,
  p.onboarding_step,
  t.name as platform_tenant
FROM public.users u
LEFT JOIN public.profiles p ON u.id = p.id
LEFT JOIN public.tenants t ON t.id = 'platform'
WHERE u.email = 'bukdan101@gmail.com';

-- ============================================
-- CREDENTIALS
-- ============================================
-- Email:    bukdan101@gmail.com
-- Password: Bukdan#bangku101
-- Role:     super_admin
-- Login:    http://localhost:3001/platform/login
-- ============================================
