# 🚀 START HERE - ArisanKU Quick Guide

## Welcome to ArisanKU! 👋

Ini adalah panduan cepat untuk memulai dengan platform ArisanKU.

---

## 📖 Documentation Files

### 1️⃣ **README.md** - Start Here First!
Main project documentation dengan:
- Project overview
- Installation guide
- Tech stack
- Quick start

### 2️⃣ **SYSTEM_READY.md** - System Status
Complete system overview:
- Current status
- Super admin credentials
- All URLs
- Database info
- Troubleshooting

### 3️⃣ **SUPER_ADMIN_USERS.md** - Admin Management
Admin credentials dan management:
- List of super admins
- Login credentials
- How to add new admins

### 4️⃣ **FINAL_SETUP.sql** - Setup Query
SQL query untuk setup super admin:
- Copy & paste ke Supabase SQL Editor
- Creates super admin user
- Sets up platform tenant

### 5️⃣ **DOCUMENTATION.md** - Doc Index
Navigation guide untuk semua dokumentasi:
- File structure
- Quick links
- Documentation standards

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Clone & Install
```bash
git clone https://github.com/bukdan69/kiroku.git
cd kiroku
npm install
```

### Step 2: Setup Environment
```bash
cp .env.example .env.local
# Edit .env.local dengan Supabase credentials
```

### Step 3: Push Database Schema
```bash
npm run db:push
```

### Step 4: Setup Super Admin
1. Buka Supabase SQL Editor
2. Copy query dari `FINAL_SETUP.sql`
3. Execute query

### Step 5: Start Dev Server
```bash
npm run dev -- -p 3001
```

### Step 6: Login
- URL: http://localhost:3001/platform/login
- Credentials: Check `SUPER_ADMIN_USERS.md`

**Done! 🎉**

---

## 🎯 What to Read Next?

### For Developers
1. Read `README.md` for full setup
2. Check `SYSTEM_READY.md` for system status
3. Review `docs/QUICK_START.md` for detailed guide
4. Check `docs/COMPLETE_SYSTEM_CONSISTENCY.md` for design system

### For Super Admin
1. Read `SUPER_ADMIN_USERS.md` for credentials
2. Check `docs/SUPER_ADMIN_GUIDE.md` for admin guide
3. Review platform features in `SYSTEM_READY.md`

### For Users
- **Peserta**: Read `docs/PANDUAN_PESERTA.md`
- **Pengelola**: Read `docs/PANDUAN_PENGELOLA.md`

---

## 🔗 Important URLs

### Development
- **Landing**: http://localhost:3001
- **Auth**: http://localhost:3001/auth
- **Platform Admin**: http://localhost:3001/platform/login
- **Dashboard**: http://localhost:3001/dashboard

### External
- **GitHub**: https://github.com/bukdan69/kiroku
- **Supabase**: https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr

---

## 📚 Documentation Structure

```
Root Files (Essential)
├── START_HERE.md           ← You are here!
├── README.md               ← Main documentation
├── SYSTEM_READY.md         ← System status
├── SUPER_ADMIN_USERS.md    ← Admin credentials
├── FINAL_SETUP.sql         ← Setup SQL
├── DOCUMENTATION.md        ← Doc index
└── CLEANUP_SUMMARY.md      ← Cleanup history

docs/ Folder (Detailed Guides)
├── QUICK_START.md
├── DEPLOYMENT_GUIDE.md
├── SUPER_ADMIN_GUIDE.md
├── PANDUAN_PESERTA.md
├── PANDUAN_PENGELOLA.md
└── ... (50+ guides)
```

---

## ❓ Need Help?

### Common Issues
1. **Database kosong?**
   - Run `npm run db:push`

2. **Login gagal?**
   - Check credentials di `SUPER_ADMIN_USERS.md`
   - Verify setup query sudah dijalankan

3. **Port sudah dipakai?**
   - Gunakan port lain: `npm run dev -- -p 3002`

4. **Error di console?**
   - Check `SYSTEM_READY.md` untuk known issues

### Documentation
- Check `DOCUMENTATION.md` for all guides
- Read `SYSTEM_READY.md` for troubleshooting
- Review `docs/` folder for detailed guides

---

## ✨ Quick Tips

- 💡 Always start with `README.md`
- 🔐 Keep `SUPER_ADMIN_USERS.md` secure
- 📊 Check `SYSTEM_READY.md` for current status
- 📚 Use `DOCUMENTATION.md` to navigate
- 🧹 Keep root directory clean (see `CLEANUP_SUMMARY.md`)

---

**Happy Coding! 🚀**

**Powered by Pak D Sinnay** ✨
