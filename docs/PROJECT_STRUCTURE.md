# 📁 Struktur File & Folder - Arisan KU

## 🎯 Struktur Proyek Next.js 16

```
arisan-ku/
│
├── 📁 src/                          # Source code utama
│   ├── 📁 app/                      # Next.js App Router
│   │   ├── 📁 (auth)/              # Route group: Authentication
│   │   │   └── 📁 auth/
│   │   │       ├── 📁 callback/
│   │   │       │   └── route.ts    # OAuth callback
│   │   │       └── page.tsx        # Login page
│   │   │
│   │   ├── 📁 (dashboard)/         # Route group: User Dashboard
│   │   │   └── 📁 dashboard/
│   │   │       └── page.tsx        # Dashboard home
│   │   │
│   │   ├── 📁 (admin)/             # Route group: Admin
│   │   │   ├── 📁 admin/
│   │   │   │   └── page.tsx        # Admin panel
│   │   │   └── 📁 dashboard/
│   │   │
│   │   ├── 📁 (public)/            # Route group: Public pages
│   │   │   ├── 📁 about/
│   │   │   │   └── page.tsx        # About Us
│   │   │   ├── 📁 privacy/
│   │   │   │   └── page.tsx        # Privacy Policy
│   │   │   └── 📁 terms/
│   │   │       └── page.tsx        # Terms & Conditions
│   │   │
│   │   ├── 📁 api/                 # API Routes
│   │   │   ├── 📁 arisan-groups/
│   │   │   │   ├── route.ts        # GET, POST groups
│   │   │   │   └── 📁 [id]/
│   │   │   │       ├── route.ts    # GET, PUT, DELETE group
│   │   │   │       └── 📁 join/
│   │   │   │           └── route.ts # POST join group
│   │   │   │
│   │   │   ├── 📁 auth/
│   │   │   │   └── 📁 callback/
│   │   │   │       └── route.ts    # Auth callback
│   │   │   │
│   │   │   ├── 📁 kyc/
│   │   │   │   └── route.ts        # KYC verification
│   │   │   │
│   │   │   ├── 📁 notifications/
│   │   │   │   ├── 📁 schedule/
│   │   │   │   │   └── route.ts    # Schedule notification
│   │   │   │   ├── 📁 templates/
│   │   │   │   │   └── route.ts    # Notification templates
│   │   │   │   └── 📁 whatsapp/
│   │   │   │       ├── route.ts    # Send WhatsApp
│   │   │   │       └── 📁 webhook/
│   │   │   │           └── route.ts # WhatsApp webhook
│   │   │   │
│   │   │   ├── 📁 transactions/
│   │   │   │   └── route.ts        # Transaction history
│   │   │   │
│   │   │   └── 📁 user/
│   │   │       ├── route.ts        # User CRUD
│   │   │       ├── 📁 profile/
│   │   │       │   └── route.ts    # User profile
│   │   │       └── 📁 role/
│   │   │           └── route.ts    # User role
│   │   │
│   │   ├── 📁 dashboard/           # Dashboard pages
│   │   │   ├── 📁 groups/
│   │   │   │   ├── page.tsx        # Groups list
│   │   │   │   ├── 📁 create/
│   │   │   │   │   └── page.tsx    # Create group
│   │   │   │   └── 📁 [id]/
│   │   │   │       └── page.tsx    # Group detail
│   │   │   │
│   │   │   ├── 📁 kyc/
│   │   │   │   └── page.tsx        # KYC verification
│   │   │   │
│   │   │   ├── 📁 payments/
│   │   │   │   └── page.tsx        # Payment history
│   │   │   │
│   │   │   └── 📁 profile/
│   │   │       └── page.tsx        # User profile
│   │   │
│   │   ├── favicon.ico             # Favicon
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Landing page (home)
│   │
│   ├── 📁 components/              # React components
│   │   ├── 📁 landing/             # Landing page components
│   │   │   ├── Navbar.tsx          # Navigation bar
│   │   │   ├── HeroSection.tsx     # Hero section
│   │   │   ├── FeaturesSection.tsx # Features showcase
│   │   │   ├── HowItWorksSection.tsx # How it works
│   │   │   ├── TestimonialsSection.tsx # Testimonials
│   │   │   ├── FAQSection.tsx      # FAQ accordion
│   │   │   ├── CTASection.tsx      # Call to action
│   │   │   └── Footer.tsx          # Footer
│   │   │
│   │   ├── 📁 layout/              # Layout components
│   │   │
│   │   ├── 📁 ui/                  # shadcn/ui components
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── textarea.tsx
│   │   │
│   │   └── ProtectedRoute.tsx      # Route protection
│   │
│   ├── 📁 contexts/                # React contexts
│   │   └── AuthContext.tsx         # Authentication context
│   │
│   ├── 📁 hooks/                   # Custom React hooks
│   │   ├── useCurrentTenant.tsx    # Current tenant hook
│   │   ├── useNotifications.tsx    # Notifications hook
│   │   ├── useUserProfile.tsx      # User profile hook
│   │   └── useUserRole.tsx         # User role hook
│   │
│   ├── 📁 lib/                     # Libraries & utilities
│   │   ├── 📁 config/              # Configuration files
│   │   │   └── site.ts             # Site configuration
│   │   │
│   │   ├── 📁 db/                  # Database
│   │   │   ├── schema.ts           # Drizzle schema (20+ tables)
│   │   │   ├── schema.d.ts         # Schema types
│   │   │   ├── schema-complete.ts  # Complete schema
│   │   │   ├── migrate.ts          # Migration script
│   │   │   ├── migrate-complete.ts # Complete migration
│   │   │   ├── seed.ts             # Seed data
│   │   │   └── setup.ts            # Database setup
│   │   │
│   │   ├── 📁 payments/            # Payment integration
│   │   │   ├── midtrans-gateway.ts # Midtrans gateway
│   │   │   ├── payment-service.ts  # Payment service
│   │   │   └── types.ts            # Payment types
│   │   │
│   │   ├── 📁 services/            # External services
│   │   │   └── 📁 whatsapp/
│   │   │       ├── config.ts       # WhatsApp config
│   │   │       └── service.ts      # WhatsApp service
│   │   │
│   │   ├── 📁 supabase/            # Supabase integration
│   │   │   ├── client.ts           # Client-side Supabase
│   │   │   └── server.ts           # Server-side Supabase
│   │   │
│   │   ├── db-client.ts            # Database client
│   │   ├── db.ts                   # Database instance
│   │   ├── supabase.ts             # Supabase instance
│   │   └── utils.ts                # Utility functions
│   │
│   └── middleware.ts               # Next.js middleware
│
├── 📁 supabase/                    # Supabase configuration
│   └── 📁 migrations/              # Database migrations
│       ├── 0000_overconfident_jetstream.sql
│       └── 📁 meta/
│           ├── 0000_snapshot.json
│           └── _journal.json
│
├── 📁 public/                      # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── 📁 .vscode/                     # VS Code settings
│   └── settings.json
│
├── 📁 Documentation/               # Project documentation
│   ├── README.md
│   ├── FIXES_APPLIED.md
│   ├── FIXES_SUMMARY.md
│   ├── LANDING_PAGE_ANALYSIS.md
│   ├── LANDING_PAGE_CHANGELOG.md
│   ├── LANDING_PAGE_GUIDE.md
│   ├── GITHUB_ANALYSIS.md
│   ├── PROJECT_STATUS.md
│   ├── PROJECT_STRUCTURE.md        # This file
│   └── QUICK_START_LANDING.md
│
├── 📄 .env                         # Environment variables (local)
├── 📄 .env.example                 # Environment variables template
├── 📄 .env.local                   # Local environment variables
├── 📄 .gitignore                   # Git ignore rules
├── 📄 drizzle.config.ts            # Drizzle ORM configuration
├── 📄 eslint.config.mjs            # ESLint configuration
├── 📄 next.config.ts               # Next.js configuration
├── 📄 next-env.d.ts                # Next.js TypeScript definitions
├── 📄 package.json                 # NPM dependencies
├── 📄 package-lock.json            # NPM lock file
├── 📄 postcss.config.mjs           # PostCSS configuration
├── 📄 tsconfig.json                # TypeScript configuration
└── 📄 tsconfig.tsbuildinfo         # TypeScript build info

```

---

## 📊 Penjelasan Struktur

### 1. **src/app/** - Next.js App Router
Menggunakan App Router (Next.js 13+) dengan route groups untuk organisasi yang lebih baik.

#### Route Groups (dengan parentheses)
- `(auth)/` - Halaman authentication (login, register)
- `(dashboard)/` - Halaman dashboard user
- `(admin)/` - Halaman admin panel
- `(public)/` - Halaman publik (about, privacy, terms)

**Keuntungan Route Groups:**
- Organisasi lebih baik tanpa mempengaruhi URL
- Shared layouts per group
- Easier to manage permissions

#### API Routes
- `api/arisan-groups/` - CRUD arisan groups
- `api/auth/` - Authentication endpoints
- `api/kyc/` - KYC verification
- `api/notifications/` - Notification system
- `api/transactions/` - Transaction management
- `api/user/` - User management

---

### 2. **src/components/** - React Components

#### Landing Page Components (8 sections)
```
landing/
├── Navbar.tsx              # Fixed navigation
├── HeroSection.tsx         # Hero with dashboard preview
├── FeaturesSection.tsx     # 8 features showcase
├── HowItWorksSection.tsx   # 4 steps process
├── TestimonialsSection.tsx # 6 testimonials + stats
├── FAQSection.tsx          # 8 FAQ with accordion
├── CTASection.tsx          # Final call-to-action
└── Footer.tsx              # Complete footer
```

#### UI Components (shadcn/ui)
15+ reusable UI components dari shadcn/ui library.

---

### 3. **src/lib/** - Libraries & Utilities

#### Database (Drizzle ORM)
```
db/
├── schema.ts               # Main schema (20+ tables)
├── migrate.ts              # Migration runner
├── seed.ts                 # Seed data
└── setup.ts                # Database setup
```

**20+ Tables:**
- Multi-tenant: `tenants`
- Users: `users`, `profiles`, `user_roles`
- Arisan: `arisan_groups`, `arisan_periods`, `arisan_members`
- Payment: `wallets`, `transactions`, `payment_intents`
- Security: `kyc_verifications`, `fraud_assessments`
- Notifications: `notification_logs`
- Audit: `audit_logs`

#### Configuration
```
config/
└── site.ts                 # Centralized site config
```

**Site Config includes:**
- Contact information
- Social media links
- Business details
- Feature settings
- Support information

#### Payment Integration
```
payments/
├── midtrans-gateway.ts     # Midtrans integration
├── payment-service.ts      # Payment logic
└── types.ts                # Payment types
```

#### Services
```
services/
└── whatsapp/
    ├── config.ts           # WhatsApp config
    └── service.ts          # WhatsApp API
```

---

### 4. **src/contexts/** - React Contexts
Global state management menggunakan React Context API.

---

### 5. **src/hooks/** - Custom Hooks
Reusable React hooks untuk logic yang sering digunakan.

---

### 6. **supabase/** - Supabase Configuration
Database migrations dan configuration untuk Supabase.

---

### 7. **public/** - Static Assets
File statis yang dapat diakses langsung (images, icons, etc).

---

### 8. **Documentation/** - Project Documentation
Semua dokumentasi proyek dalam satu folder.

---

## 🎯 Konvensi Penamaan

### Files
- **Components:** PascalCase (e.g., `HeroSection.tsx`)
- **Utilities:** camelCase (e.g., `utils.ts`)
- **Config:** kebab-case (e.g., `site-config.ts`)
- **API Routes:** kebab-case (e.g., `route.ts`)

### Folders
- **Route Groups:** (parentheses) e.g., `(auth)/`
- **Dynamic Routes:** [brackets] e.g., `[id]/`
- **Regular Folders:** kebab-case e.g., `arisan-groups/`

---

## 📁 Folder yang TIDAK Digunakan

### ❌ Folder yang Dihapus
```
❌ app/                     # Duplicate, sudah ada src/app/
❌ lib/                     # Duplicate, sudah ada src/lib/
```

**Alasan:**
- Next.js 13+ dengan App Router menggunakan `src/app/` sebagai convention
- Semua library code ada di `src/lib/`
- Menghindari konflik dan kebingungan

---

## 🔧 File Konfigurasi Penting

### 1. **next.config.ts**
Konfigurasi Next.js (output, images, etc)

### 2. **drizzle.config.ts**
Konfigurasi Drizzle ORM (schema path, migrations, database URL)

### 3. **tsconfig.json**
Konfigurasi TypeScript (paths, strict mode, etc)

### 4. **eslint.config.mjs**
Konfigurasi ESLint untuk code quality

### 5. **postcss.config.mjs**
Konfigurasi PostCSS untuk Tailwind CSS

### 6. **.env.local**
Environment variables (TIDAK di-commit ke Git)

---

## 🚀 Cara Navigasi Proyek

### Untuk Development
```bash
# Landing page
src/app/page.tsx

# Dashboard
src/app/dashboard/

# API endpoints
src/app/api/

# Components
src/components/

# Database schema
src/lib/db/schema.ts

# Configuration
src/lib/config/site.ts
```

### Untuk Menambah Fitur Baru

#### 1. Tambah API Endpoint
```
src/app/api/
└── feature-name/
    └── route.ts
```

#### 2. Tambah Page
```
src/app/
└── feature-name/
    └── page.tsx
```

#### 3. Tambah Component
```
src/components/
└── feature-name/
    └── ComponentName.tsx
```

#### 4. Tambah Database Table
```
src/lib/db/schema.ts
```

---

## 📊 Statistik Proyek

### Files Count
- **Total Files:** 150+
- **TypeScript Files:** 100+
- **React Components:** 30+
- **API Routes:** 20+
- **Database Tables:** 20+

### Lines of Code
- **Total LOC:** ~15,000+
- **TypeScript:** ~12,000+
- **CSS:** ~1,000+
- **Config:** ~500+

---

## 🎯 Best Practices

### 1. **File Organization**
- Group related files together
- Use route groups for better organization
- Keep components small and focused

### 2. **Naming Conventions**
- Be consistent with naming
- Use descriptive names
- Follow TypeScript conventions

### 3. **Code Structure**
- One component per file
- Export at the bottom
- Import order: external → internal → relative

### 4. **Documentation**
- Add JSDoc comments for complex functions
- Keep README updated
- Document API endpoints

---

## 🔍 Quick Reference

### Find Files Quickly

**Landing Page:**
```
src/app/page.tsx
src/components/landing/
```

**Dashboard:**
```
src/app/dashboard/
```

**API:**
```
src/app/api/
```

**Database:**
```
src/lib/db/schema.ts
```

**Config:**
```
src/lib/config/site.ts
.env.local
```

**Styles:**
```
src/app/globals.css
```

---

## 📝 Notes

### Struktur ini mengikuti:
- ✅ Next.js 13+ App Router conventions
- ✅ TypeScript best practices
- ✅ React component patterns
- ✅ Clean architecture principles
- ✅ Scalable folder structure

### Keuntungan struktur ini:
- ✅ Easy to navigate
- ✅ Scalable for growth
- ✅ Clear separation of concerns
- ✅ Easy to maintain
- ✅ Team-friendly

---

**Last Updated:** 30 Januari 2026
**Version:** 1.0.0
**Status:** Production Ready ✅

---

## 🎉 Kesimpulan

Struktur proyek ini dirancang untuk:
- **Scalability** - Mudah untuk berkembang
- **Maintainability** - Mudah untuk di-maintain
- **Developer Experience** - Mudah untuk dipahami
- **Best Practices** - Mengikuti standar industri

**Struktur ini siap untuk production dan tim development!** 🚀
