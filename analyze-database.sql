-- ============================================
-- ANALISA DATABASE - Check Super Admin
-- ============================================

-- 1. Check semua tables yang ada
SELECT 
  'TABLES' as category,
  schemaname as schema,
  tablename as name,
  NULL as detail
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Check user di Supabase Auth
SELECT 
  'AUTH USER' as category,
  id::text as schema,
  email as name,
  CASE 
    WHEN email_confirmed_at IS NOT NULL THEN 'Email Confirmed'
    ELSE 'Email NOT Confirmed'
  END as detail
FROM auth.users
WHERE email = 'bukdan101@gmail.com';

-- 3. Check user di public.users
SELECT 
  'PUBLIC USER' as category,
  id::text as schema,
  email as name,
  CONCAT('Role: ', role::text, ', Active: ', is_active::text) as detail
FROM public.users
WHERE email = 'bukdan101@gmail.com';

-- 4. Check profile
SELECT 
  'PROFILE' as category,
  id::text as schema,
  user_id::text as name,
  CONCAT('Step: ', onboarding_step::text, ', Completed: ', onboarding_completed::text) as detail
FROM public.profiles
WHERE user_id = (SELECT id FROM public.users WHERE email = 'bukdan101@gmail.com' LIMIT 1);

-- 5. Check platform tenant
SELECT 
  'TENANT' as category,
  id as schema,
  name,
  CONCAT('Slug: ', slug, ', Active: ', is_active::text) as detail
FROM public.tenants
WHERE id = 'platform';

-- 6. Count total users
SELECT 
  'STATS' as category,
  'Total Users' as schema,
  COUNT(*)::text as name,
  'in public.users' as detail
FROM public.users;

-- 7. Count super admins
SELECT 
  'STATS' as category,
  'Super Admins' as schema,
  COUNT(*)::text as name,
  'with role super_admin' as detail
FROM public.users
WHERE role = 'super_admin';

-- ============================================
-- SUMMARY
-- ============================================
-- Jika hasil menunjukkan:
-- ✅ AUTH USER ada dengan Email Confirmed
-- ✅ PUBLIC USER ada dengan Role: super_admin, Active: true
-- ✅ PROFILE ada dengan user_id yang match
-- ✅ TENANT platform ada
-- = SUPER ADMIN SUDAH READY!
--
-- Jika ada yang missing, run FINAL_SETUP.sql
-- ============================================
