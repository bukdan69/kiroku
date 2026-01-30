-- Check semua tables yang ada di database
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check auth.users table
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email = 'bukdan101@gmail.com';

-- Check public.users table
SELECT 
  id,
  email,
  name,
  role,
  is_active
FROM public.users
WHERE email = 'bukdan101@gmail.com';

-- Check tenants table
SELECT id, name, slug FROM public.tenants;
