# 🚀 Quick Access Guide - Arisan KU

## Dev Server Running ✅

Server sudah running di: **http://localhost:3001**

---

## 🔐 Setup Super Admin (PENTING!)

### 1. Buka Setup Page
```
http://localhost:3001/setup/super-admin
```

### 2. Create Super Admin
- Email: `bukdan101@gmail.com`
- Password: `Bukdan#bangku101`
- Name: `bukdan`
- Klik **"Create Super Admin"**

### 3. Login sebagai Super Admin
```
http://localhost:3001/platform/login
```

---

## 📱 Quick Links

### Landing Pages
- 🏠 **Home**: http://localhost:3001/
- 📖 **About**: http://localhost:3001/about
- 📋 **Terms**: http://localhost:3001/terms
- 🔒 **Privacy**: http://localhost:3001/privacy
- 📚 **Panduan Pengelola**: http://localhost:3001/panduan-pengelola
- 📚 **Panduan Peserta**: http://localhost:3001/panduan-peserta

### Authentication
- 🔑 **User Login**: http://localhost:3001/auth
- 👑 **Super Admin Login**: http://localhost:3001/platform/login
- ⚙️ **Setup Super Admin**: http://localhost:3001/setup/super-admin

### Dashboards
- 📊 **User Dashboard**: http://localhost:3001/dashboard
- 🏢 **Admin Dashboard**: http://localhost:3001/admin/dashboard
- 👑 **Platform Dashboard**: http://localhost:3001/platform/dashboard

### Platform Admin (Super Admin Only)
- 👥 **Users**: http://localhost:3001/platform/users
- ✅ **KYC**: http://localhost:3001/platform/kyc
- 📈 **Analytics**: http://localhost:3001/platform/analytics
- 📋 **Audit**: http://localhost:3001/platform/audit
- ⚙️ **Settings**: http://localhost:3001/platform/settings
- 💰 **Affiliate**: http://localhost:3001/platform/affiliate
- 🚨 **Fraud**: http://localhost:3001/platform/fraud

---

## 🎯 Testing Flow

### 1. Test Landing Pages
```
✅ http://localhost:3001/
✅ http://localhost:3001/about
✅ http://localhost:3001/panduan-pengelola
✅ http://localhost:3001/panduan-peserta
```

### 2. Setup Super Admin
```
1. http://localhost:3001/setup/super-admin
2. Create super admin
3. Verify success message
```

### 3. Login as Super Admin
```
1. http://localhost:3001/platform/login
2. Email: bukdan101@gmail.com
3. Password: Bukdan#bangku101
4. Should redirect to /platform/dashboard
```

### 4. Test Platform Access
```
✅ /platform/dashboard
✅ /platform/users
✅ /platform/kyc
✅ /platform/analytics
```

---

## 🛠️ Dev Commands

### Start Server
```bash
npm run dev
# or with specific port
npm run dev -- -p 3001
```

### Stop Server
```bash
# Kill all node processes
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
```

### Database
```bash
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed database
```

### Super Admin
```bash
npm run create-super-admin  # Create via script
# or use web UI: http://localhost:3001/setup/super-admin
```

---

## 📊 Project Status

### ✅ Completed Features

#### Design System
- ✅ Modern gradient effects (Teal → Cyan → Purple)
- ✅ Dark theme professional
- ✅ Responsive spacing system
- ✅ Consistent hover patterns
- ✅ Eye-catching layouts

#### Landing Pages
- ✅ Hero with animations
- ✅ Features section
- ✅ How It Works
- ✅ Testimonials
- ✅ FAQ
- ✅ CTA section
- ✅ Navbar & Footer

#### System Pages
- ✅ Dashboard with gradient cards
- ✅ Groups page
- ✅ Auth page with animations
- ✅ Public pages (About, Terms, Privacy, Panduan)

#### Super Admin
- ✅ Setup page (/setup/super-admin)
- ✅ API endpoint
- ✅ Login page
- ✅ Platform dashboard
- ✅ User management
- ✅ KYC verification
- ✅ Analytics
- ✅ Audit logs

#### Documentation
- ✅ README.md
- ✅ Design system docs
- ✅ Setup guides
- ✅ Deployment guide
- ✅ Testing guide

---

## 🔗 Repository

**GitHub**: https://github.com/bukdan69/kiroku

### Clone & Setup
```bash
git clone https://github.com/bukdan69/kiroku.git
cd kiroku
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

---

## 📝 Environment Variables

Required in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Database
DATABASE_URL=your_database_url

# Midtrans (optional for now)
MIDTRANS_SERVER_KEY=your_key
MIDTRANS_CLIENT_KEY=your_key
MIDTRANS_IS_PRODUCTION=false
```

---

## 🆘 Troubleshooting

### Server won't start
```bash
# Remove lock file
Remove-Item -Path ".next/dev/lock" -Force

# Kill node processes
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force

# Start again
npm run dev
```

### Can't login as super admin
```
1. Visit: http://localhost:3001/setup/super-admin
2. Click "Check Existing" to see if super admin exists
3. If not, click "Create Super Admin"
4. Try login again at /platform/login
```

### Database errors
```bash
# Push schema
npm run db:push

# Check connection in .env.local
```

---

## ✅ Quick Checklist

Before testing:
- ✅ Dev server running (port 3001)
- ✅ Environment variables set (.env.local)
- ✅ Database connected
- ✅ Super admin created

Testing:
- ✅ Landing pages load
- ✅ Super admin can login
- ✅ Platform dashboard accessible
- ✅ All platform pages work

---

## 🎉 Ready to Test!

1. **Server**: http://localhost:3001 ✅
2. **Setup**: http://localhost:3001/setup/super-admin
3. **Login**: http://localhost:3001/platform/login

**Credentials**:
- Email: `bukdan101@gmail.com`
- Password: `Bukdan#bangku101`

---

**Status**: ✅ READY FOR TESTING
**Server**: Running on port 3001
**Repository**: Pushed to GitHub

**Powered by Pak D Sinnay** ✨

Happy testing! 🚀
