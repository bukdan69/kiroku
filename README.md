# Arisan KU - Platform Arisan Digital Modern

Platform arisan online terpercaya di Indonesia dengan sistem keamanan terbaik, transparansi penuh, dan kemudahan pengelolaan arisan digital.

![Next.js](https://img.shields.io/badge/Next.js-16.1.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Fitur Utama

### Untuk Peserta
- 🔐 **KYC Verification** - Keamanan maksimal dengan verifikasi identitas
- 💳 **Multi Payment Gateway** - Berbagai metode pembayaran via Midtrans
- 📱 **WhatsApp Notifications** - Update real-time untuk setiap transaksi
- 📊 **Dashboard Lengkap** - Pantau semua arisan dalam satu tempat
- 🎲 **Fair Draw System** - Sistem undian transparan dengan commit-reveal scheme

### Untuk Pengelola (Bandar)
- 👥 **Multi-tenant System** - Kelola banyak grup arisan sekaligus
- 💰 **Affiliate Program** - Komisi hingga 2% dari referral
- 📈 **Analytics Dashboard** - Laporan lengkap dan audit logs
- ⚙️ **Auto Reminders** - Notifikasi otomatis untuk pembayaran
- 🔒 **Fraud Detection** - Sistem keamanan berlapis

### Untuk Super Admin
- 🌐 **Platform Management** - Kelola seluruh platform
- 👤 **User Management** - Verifikasi KYC dan user roles
- 📊 **System Analytics** - Monitor performa platform
- 🔍 **Audit Logs** - Track semua aktivitas sistem
- ⚙️ **System Settings** - Konfigurasi platform

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL (Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: Supabase Auth
- **Payment**: Midtrans Gateway
- **Notifications**: WhatsApp Business API
- **Email**: Resend
- **SMS**: Twilio

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- PostgreSQL database (atau Supabase account)
- Midtrans account (untuk payment)

### Setup

1. **Clone repository**
```bash
git clone https://github.com/bukdan69/kiroku.git
cd kiroku
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` dengan credentials Anda:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=your_database_url

# Midtrans
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false

# WhatsApp (optional)
WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id

# Email (optional)
RESEND_API_KEY=your_resend_api_key

# SMS (optional)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

4. **Run database migrations**
```bash
npm run db:push
```

5. **Seed database (optional)**
```bash
npm run db:seed
```

6. **Start development server**
```bash
npm run dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001)

## 🔐 Super Admin Setup

Setelah database schema di-push, setup super admin:

1. **Buka Supabase SQL Editor**
   - https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new

2. **Run Setup Query**
   - Copy query dari file `FINAL_SETUP.sql`
   - Paste dan execute di SQL Editor

3. **Login ke Platform Admin**
   - URL: http://localhost:3001/platform/login
   - Credentials: Lihat `SUPER_ADMIN_USERS.md`

**Dokumentasi Lengkap:** `SYSTEM_READY.md`

## 🏗️ Project Structure

```
arisan-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (admin)/           # Admin pages
│   │   ├── (auth)/            # Auth pages
│   │   ├── (dashboard)/       # User dashboard
│   │   ├── (public)/          # Public pages
│   │   ├── api/               # API routes
│   │   └── platform/          # Super admin pages
│   ├── components/            # React components
│   │   ├── landing/          # Landing page sections
│   │   ├── layout/           # Layout components
│   │   └── ui/               # shadcn/ui components
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilities & services
│   │   ├── db/              # Database & schema
│   │   ├── payments/        # Payment services
│   │   └── services/        # External services
│   └── middleware.ts         # Next.js middleware
├── public/                   # Static files
├── docs/                     # Documentation
└── tests/                    # Test files
```

## 🎨 Design System

Platform menggunakan design system modern dengan:
- **Color Palette**: Teal (#2AB09E) → Cyan (#5CE1E6) → Purple (#A855F7)
- **Dark Theme**: Professional fintech aesthetic
- **Gradient Effects**: Smooth transitions dan hover effects
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG AA compliant

Lihat [Design System Documentation](./docs/COMPLETE_SYSTEM_CONSISTENCY.md) untuk detail lengkap.

## 📱 Features Overview

### Authentication & Security
- Google OAuth integration
- Email/Password authentication
- KYC verification system
- Row Level Security (RLS)
- Fraud detection

### Payment System
- Midtrans integration
- Multiple payment methods
- Automatic payment verification
- Payout management
- Transaction history

### Notification System
- WhatsApp notifications
- Email notifications
- SMS notifications (optional)
- Scheduled reminders
- Custom templates

### Arisan Management
- Create/join groups
- Automatic draw system
- Fair commit-reveal scheme
- Payment tracking
- Member management

### Analytics & Reporting
- Dashboard analytics
- Transaction reports
- User statistics
- Audit logs
- Data export

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test
npm test -- tests/api/admin.test.ts
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di Vercel
3. Set environment variables
4. Deploy!

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker

```bash
# Build image
docker build -t arisan-ku .

# Run container
docker run -p 3000:3000 arisan-ku
```

Lihat [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md) untuk detail lengkap.

## 📚 Documentation

### Essential Files
- **SYSTEM_READY.md** - Complete system status & overview
- **SUPER_ADMIN_USERS.md** - Admin credentials & management
- **FINAL_SETUP.sql** - Super admin setup query

### Detailed Guides
- [Quick Start Guide](./docs/QUICK_START.md)
- [Design System](./docs/COMPLETE_SYSTEM_CONSISTENCY.md)
- [Testing Guide](./docs/TESTING_GUIDE.md)
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)
- [Super Admin Guide](./docs/SUPER_ADMIN_GUIDE.md)
- [Panduan Pengelola](./docs/PANDUAN_BANDAR.md)
- [Panduan Peserta](./docs/PANDUAN_PESERTA.md)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Pak D Sinnay
- **Repository**: [github.com/bukdan69/kiroku](https://github.com/bukdan69/kiroku)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn for the beautiful UI components
- Supabase for the backend infrastructure
- Midtrans for payment gateway
- All contributors and users

## 📞 Support

- **Email**: support@arisanku.com
- **WhatsApp**: +62 812-3456-7890
- **Website**: [arisanku.com](https://arisanku.com)

---

**Powered by Pak D Sinnay** ✨

Made with ❤️ in Indonesia
