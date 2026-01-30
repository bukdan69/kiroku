# 🎯 Arisan KU - Platform Arisan Online Terpercaya

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green)](https://orm.drizzle.team/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Platform arisan online enterprise-level dengan sistem keamanan terbaik, notifikasi otomatis, dan pembayaran yang terintegrasi. Dibangun dengan teknologi modern untuk memberikan pengalaman terbaik dalam mengelola arisan digital.

![Arisan KU Banner](https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=Arisan+KU+-+Platform+Arisan+Online+Terpercaya)

---

## ✨ Fitur Utama

### 🔐 Keamanan & Verifikasi
- ✅ KYC Verification System
- ✅ Fraud Detection & Prevention
- ✅ Device Fingerprinting
- ✅ Location Tracking
- ✅ Audit Logs & Monitoring
- ✅ Row Level Security (RLS)

### 💰 Sistem Arisan
- ✅ Multi-tenant Architecture
- ✅ Period-based Management
- ✅ Automated Winner Selection (Commit-Reveal)
- ✅ Fair & Transparent Drawing
- ✅ Member Management
- ✅ Group Administration

### 💳 Payment Integration
- ✅ Midtrans Payment Gateway
- ✅ Multiple Payment Methods
- ✅ Wallet System
- ✅ Escrow Management
- ✅ Automated Payouts
- ✅ Commission Tracking

### 📱 Notification System
- ✅ WhatsApp Integration
- ✅ Multi-channel Support (Email, SMS, Push)
- ✅ Scheduled Reminders (7, 3, 1 day)
- ✅ Template Management
- ✅ Delivery Tracking

### 👥 User Management
- ✅ Google OAuth Authentication
- ✅ Role-based Access Control (5 roles)
- ✅ Profile Management
- ✅ Onboarding Flow
- ✅ User Preferences

### 📊 Admin Features
- ✅ User Management Dashboard
- ✅ KYC Review System
- ✅ System Monitoring
- ✅ Analytics & Reports
- ✅ Violation Management

### 🎨 Landing Page
- ✅ 8 Sections Professional
- ✅ SEO Optimized
- ✅ Mobile Responsive
- ✅ 7 Conversion Points
- ✅ Legal Pages (Privacy, Terms, About)

---

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion

### Backend
- **API:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **ORM:** Drizzle ORM
- **Authentication:** Supabase Auth + Google OAuth

### Integrations
- **Payment:** Midtrans Gateway
- **Notifications:** WhatsApp API
- **Storage:** Supabase Storage
- **Real-time:** Supabase Subscriptions

### DevOps
- **Deployment:** Vercel (Recommended)
- **Database:** Supabase Cloud
- **Version Control:** Git + GitHub
- **Package Manager:** npm/bun

---

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- PostgreSQL database (Supabase recommended)
- Google OAuth credentials
- Midtrans account (for payment)
- WhatsApp Business API (for notifications)

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/YOUR-USERNAME/arisan-ku.git
cd arisan-ku

# 2. Install dependencies
npm install
# or
bun install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Setup database
npm run db:setup

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## ⚙️ Environment Variables

Create `.env.local` file in root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://user:password@host:port/database

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Payment (Midtrans)
MERCHANT_ID=your_merchant_id
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key

# WhatsApp (Optional)
WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_PHONE_NUMBER=your_phone_number
```

---

## 📁 Project Structure

```
arisan-ku/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes
│   │   ├── (dashboard)/       # Dashboard routes
│   │   ├── (admin)/           # Admin routes
│   │   ├── (public)/          # Public pages
│   │   ├── api/               # API endpoints (20+)
│   │   ├── dashboard/         # Dashboard pages
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── landing/           # Landing page (8 sections)
│   │   ├── layout/            # Layout components
│   │   └── ui/                # shadcn/ui components
│   ├── contexts/              # React contexts
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Libraries & utilities
│   │   ├── config/            # Configuration
│   │   ├── db/                # Database (20+ tables)
│   │   ├── payments/          # Payment integration
│   │   ├── services/          # External services
│   │   └── supabase/          # Supabase client
│   └── middleware.ts          # Next.js middleware
├── supabase/                  # Database migrations
├── public/                    # Static assets
└── [config files]
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed structure.

---

## 🗄️ Database Schema

20+ tables with comprehensive relationships:

- **Multi-tenant:** `tenants`
- **Users:** `users`, `profiles`, `user_roles`
- **Arisan:** `arisan_groups`, `arisan_periods`, `arisan_members`
- **Payment:** `wallets`, `transactions`, `payment_intents`
- **Security:** `kyc_verifications`, `fraud_assessments`
- **Notifications:** `notification_logs`
- **Audit:** `audit_logs`
- **Affiliate:** `affiliate_referrals`, `affiliate_commissions`

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate Drizzle migrations
npm run db:migrate       # Run database migrations
npm run db:setup         # Setup complete schema
npm run db:push          # Push schema changes
npm run db:studio        # Open Drizzle Studio
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/arisan-ku)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Setup
1. Configure Supabase project
2. Setup Google OAuth in Supabase
3. Add environment variables to Vercel
4. Run database migrations
5. Deploy!

---

## 📊 API Endpoints

### User Management
- `GET/PUT /api/user` - User profile
- `GET /api/user/profile` - Profile details
- `GET /api/user/role` - User role

### Arisan Management
- `GET/POST /api/arisan-groups` - Groups CRUD
- `GET/PUT/DELETE /api/arisan-groups/[id]` - Group details
- `POST /api/arisan-groups/[id]/join` - Join group

### KYC & Verification
- `GET/POST /api/kyc` - KYC verification

### Transactions
- `GET /api/transactions` - Transaction history

### Notifications
- `POST /api/notifications/whatsapp` - Send WhatsApp
- `POST /api/notifications/schedule` - Schedule notification

See full API documentation in [API.md](docs/API.md)

---

## 🎨 Customization

### Update Site Configuration

Edit `src/lib/config/site.ts`:

```typescript
export const siteConfig = {
  name: "Arisan KU",
  contact: {
    email: "your-email@domain.com",
    phone: "+62 xxx-xxxx-xxxx",
    whatsapp: "62xxxxxxxxxx",
    address: "Your address",
  },
  social: {
    facebook: "https://facebook.com/yourpage",
    instagram: "https://instagram.com/yourpage",
    twitter: "https://twitter.com/yourpage",
  },
  // ... more config
}
```

---

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

---

## 📚 Documentation

- [Project Structure](PROJECT_STRUCTURE.md) - Detailed folder structure
- [Project Status](PROJECT_STATUS.md) - Current project status
- [Landing Page Guide](LANDING_PAGE_GUIDE.md) - Landing page documentation
- [GitHub Setup](GITHUB_SETUP.md) - GitHub setup guide
- [Fixes Applied](FIXES_APPLIED.md) - Bug fixes log

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Developer:** Your Name
- **Email:** your-email@domain.com
- **GitHub:** [@your-username](https://github.com/your-username)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Supabase](https://supabase.com/) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Midtrans](https://midtrans.com/) - Payment gateway

---

## 📞 Support

- **Email:** support@arisanku.com
- **WhatsApp:** +62 812-3456-7890
- **Documentation:** [docs.arisanku.com](https://docs.arisanku.com)
- **Issues:** [GitHub Issues](https://github.com/YOUR-USERNAME/arisan-ku/issues)

---

## 🎯 Roadmap

### Phase 1: MVP (Current)
- [x] Core features
- [x] Landing page
- [x] Authentication
- [x] Payment integration
- [x] Notification system

### Phase 2: Enhancement (Q2 2026)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] AI-powered features
- [ ] Multi-language support

### Phase 3: Scale (Q3 2026)
- [ ] Enterprise features
- [ ] White-label solution
- [ ] API marketplace
- [ ] International expansion

---

## 📈 Statistics

- **Total Files:** 150+
- **Lines of Code:** 15,000+
- **API Endpoints:** 20+
- **Database Tables:** 20+
- **React Components:** 30+
- **Production Ready:** 95%

---

## 🎉 Status

**Current Version:** 0.2.0  
**Status:** 95% Production Ready ✅  
**Last Updated:** January 30, 2026

---

<div align="center">

**Made with ❤️ in Indonesia**

[Website](https://arisanku.com) • [Documentation](https://docs.arisanku.com) • [Support](mailto:support@arisanku.com)

</div>
