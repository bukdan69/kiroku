# 🔄 CONVERSION PLAN: React Router → Next.js

## 📋 Analisis dari App.tsx (React Router)

Berdasarkan kode React Router yang Anda berikan sebelumnya, berikut adalah **semua halaman** yang perlu dikonversi:

### 1. **Public Pages** (4 halaman)
```typescript
<Route path="/" element={<Index />} />
<Route path="/auth" element={<Auth />} />
<Route path="/reset-password" element={<ResetPassword />} />
<Route path="/verify" element={<Verify />} />
```

**Status Konversi:**
- ✅ `/` → `src/app/page.tsx` (Landing page - DONE)
- ✅ `/auth` → `src/app/auth/page.tsx` (DONE)
- ✅ `/reset-password` → `src/app/reset-password/page.tsx` (DONE)
- ✅ `/verify` → `src/app/verify/page.tsx` (DONE)

---

### 2. **Protected Dashboard Pages** (9 halaman)
```typescript
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/dashboard/profile" element={<Profile />} />
<Route path="/dashboard/kyc" element={<MemberKyc />} />
<Route path="/groups" element={<Groups />} />
<Route path="/groups/:groupId" element={<GroupDetail />} />
<Route path="/groups/:groupId/pay" element={<Payment />} />
<Route path="/groups/:groupId/invite" element={<GroupInvite />} />
<Route path="/create-group" element={<CreateGroup />} />
<Route path="/notifications" element={<Notifications />} />
```

**Status Konversi:**
- ✅ `/dashboard` → `src/app/dashboard/page.tsx` (DONE)
- ✅ `/dashboard/profile` → `src/app/dashboard/profile/page.tsx` (DONE)
- ✅ `/dashboard/kyc` → `src/app/dashboard/kyc/page.tsx` (DONE)
- ✅ `/groups` → `src/app/groups/page.tsx` (DONE)
- ✅ `/groups/:groupId` → `src/app/groups/[groupId]/page.tsx` (DONE)
- ✅ `/groups/:groupId/pay` → `src/app/groups/[groupId]/pay/page.tsx` (DONE)
- ✅ `/groups/:groupId/invite` → `src/app/groups/[groupId]/invite/page.tsx` (DONE)
- ✅ `/create-group` → `src/app/dashboard/groups/create/page.tsx` (DONE)
- ✅ `/notifications` → `src/app/notifications/page.tsx` (DONE)

---

### 3. **Admin Pages** (15 halaman)
```typescript
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/analytics" element={<AdminAnalytics />} />
<Route path="/admin/kyc" element={<AdminKycReview />} />
<Route path="/admin/kyc/users" element={<AdminKycUsers />} />
<Route path="/admin/kyc/decisions" element={<AdminKycDecisions />} />
<Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
<Route path="/admin/reminders" element={<AdminPaymentReminders />} />
<Route path="/admin/payments-export" element={<AdminPaymentsExport />} />
<Route path="/admin/setup" element={<AdminSetup />} />
<Route path="/admin/data-export" element={<AdminDataExport />} />
<Route path="/admin/users" element={<AdminUserManagement />} />
<Route path="/admin/security" element={<AdminSecurityOverview />} />
<Route path="/admin/tenant-switcher" element={<AdminTenantSwitcher />} />
<Route path="/members" element={<Members />} />
```

**Status Konversi:**
- ✅ `/admin` → `src/app/(admin)/admin/page.tsx` (DONE - basic)
- ⏳ `/admin/dashboard` → `src/app/(admin)/admin/dashboard/page.tsx` (TODO)
- ⏳ `/admin/analytics` → `src/app/(admin)/admin/analytics/page.tsx` (TODO)
- ⏳ `/admin/kyc` → `src/app/(admin)/admin/kyc/page.tsx` (TODO)
- ⏳ `/admin/kyc/users` → `src/app/(admin)/admin/kyc/users/page.tsx` (TODO)
- ⏳ `/admin/kyc/decisions` → `src/app/(admin)/admin/kyc/decisions/page.tsx` (TODO)
- ⏳ `/admin/audit-logs` → `src/app/(admin)/admin/audit-logs/page.tsx` (TODO)
- ⏳ `/admin/reminders` → `src/app/(admin)/admin/reminders/page.tsx` (TODO)
- ⏳ `/admin/payments-export` → `src/app/(admin)/admin/payments-export/page.tsx` (TODO)
- ⏳ `/admin/setup` → `src/app/(admin)/admin/setup/page.tsx` (TODO)
- ⏳ `/admin/data-export` → `src/app/(admin)/admin/data-export/page.tsx` (TODO)
- ⏳ `/admin/users` → `src/app/(admin)/admin/users/page.tsx` (TODO)
- ⏳ `/admin/security` → `src/app/(admin)/admin/security/page.tsx` (TODO)
- ⏳ `/admin/tenant-switcher` → `src/app/(admin)/admin/tenant-switcher/page.tsx` (TODO)
- ⏳ `/members` → `src/app/members/page.tsx` (TODO)

---

### 4. **Special Pages** (2 halaman)
```typescript
<Route path="/invite/:token" element={<InviteAccept />} />
<Route path="*" element={<NotFound />} />
```

**Status Konversi:**
- ✅ `/invite/:token` → `src/app/invite/[token]/page.tsx` (DONE)
- ✅ `*` → `src/app/not-found.tsx` (Built-in Next.js)

---

## 📊 Progress Summary

### Current Status:
```
✅ Public Pages:        4/4   (100%)
✅ Dashboard Pages:     9/9   (100%)
⏳ Admin Pages:         1/15  (7%)
✅ Special Pages:       2/2   (100%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL:                 16/30  (53%)
```

---

## 🎯 NEXT STEPS: Convert Admin Pages

### Priority Order:

#### **Phase 1: Core Admin (High Priority)**
1. ⏳ Admin Dashboard (`/admin/dashboard`)
2. ⏳ Admin Analytics (`/admin/analytics`)
3. ⏳ User Management (`/admin/users`)
4. ⏳ Members Management (`/members`)

#### **Phase 2: KYC Management (Medium Priority)**
5. ⏳ KYC Review (`/admin/kyc`)
6. ⏳ KYC Users (`/admin/kyc/users`)
7. ⏳ KYC Decisions (`/admin/kyc/decisions`)

#### **Phase 3: Operations (Medium Priority)**
8. ⏳ Audit Logs (`/admin/audit-logs`)
9. ⏳ Payment Reminders (`/admin/reminders`)
10. ⏳ Payments Export (`/admin/payments-export`)

#### **Phase 4: Configuration (Low Priority)**
11. ⏳ Admin Setup (`/admin/setup`)
12. ⏳ Data Export (`/admin/data-export`)
13. ⏳ Security Overview (`/admin/security`)
14. ⏳ Tenant Switcher (`/admin/tenant-switcher`)

---

## 🔧 Conversion Strategy

### For Each Page:

1. **Analyze React Router Page**
   - Identify components used
   - Check state management (React Query, Context)
   - Note API calls
   - Document user interactions

2. **Create Next.js Page**
   - Use Server Components where possible
   - Convert to Client Components only when needed
   - Replace React Router hooks with Next.js equivalents:
     - `useNavigate()` → `useRouter()` from `next/navigation`
     - `useParams()` → `params` prop
     - `useSearchParams()` → `searchParams` prop
     - `<Link>` from react-router → `<Link>` from `next/link`

3. **Update API Calls**
   - Replace Supabase client calls with server-side calls
   - Use Server Actions where appropriate
   - Implement proper error handling

4. **Styling**
   - Keep existing Tailwind classes
   - Use shadcn/ui components
   - Maintain design system consistency

5. **Testing**
   - Test page rendering
   - Test navigation
   - Test API integration
   - Test authentication/authorization

---

## 📝 Key Differences: React Router vs Next.js

### Routing
```typescript
// React Router
import { useNavigate } from 'react-router-dom'
const navigate = useNavigate()
navigate('/dashboard')

// Next.js
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/dashboard')
```

### Links
```typescript
// React Router
import { Link } from 'react-router-dom'
<Link to="/dashboard">Dashboard</Link>

// Next.js
import Link from 'next/link'
<Link href="/dashboard">Dashboard</Link>
```

### Params
```typescript
// React Router
import { useParams } from 'react-router-dom'
const { id } = useParams()

// Next.js (Server Component)
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
}

// Next.js (Client Component)
import { useParams } from 'next/navigation'
const params = useParams()
const id = params.id
```

### Protected Routes
```typescript
// React Router
<Route element={<ProtectedRoute><Component /></ProtectedRoute>}>

// Next.js
// Use middleware.ts or layout.tsx for protection
```

---

## 🚀 Estimated Timeline

- **Phase 1 (Core Admin):** 2-3 hours
- **Phase 2 (KYC Management):** 1-2 hours
- **Phase 3 (Operations):** 1-2 hours
- **Phase 4 (Configuration):** 1-2 hours

**Total:** 5-9 hours untuk complete conversion

---

## ✅ What's Already Done

### Components
- ✅ Landing page components (8 components)
- ✅ UI components (shadcn/ui - 15+ components)
- ✅ Layout components
- ✅ Protected route wrapper

### Infrastructure
- ✅ Database schema (Drizzle ORM - 20+ tables)
- ✅ API routes (15+ endpoints)
- ✅ Authentication (Supabase Auth)
- ✅ Middleware (route protection)
- ✅ Design system (globals.css)

### Pages (16/30 complete)
- ✅ All public pages
- ✅ All dashboard pages
- ✅ All group pages
- ✅ Notifications page
- ⏳ Admin pages (1/15)

---

## 🎯 Ready to Start?

Saya siap untuk:
1. **Convert semua admin pages** (14 pages remaining)
2. **Maintain exact structure** dari React Router version
3. **Use Drizzle ORM** untuk database queries
4. **Integrate dengan Supabase** untuk authentication
5. **Keep design consistency** dengan pages yang sudah ada

**Apakah Anda ingin saya mulai convert admin pages sekarang?**

Atau Anda punya prioritas khusus untuk halaman mana yang harus dikerjakan dulu?

---

**Created:** 30 Januari 2026
**Status:** Planning Complete
**Next:** Admin Pages Conversion
