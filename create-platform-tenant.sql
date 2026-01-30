-- Create Platform Tenant for Super Admin
-- This tenant is used for platform-level operations

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

-- Verify
SELECT id, name, slug, is_active FROM public.tenants WHERE id = 'platform';
