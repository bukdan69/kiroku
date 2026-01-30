# 🔧 Super Admin Troubleshooting Guide

## Status Server
✅ Dev server running di: http://localhost:3001

## 🚀 Langkah-Langkah Setup Super Admin

### Metode 1: Web Setup (RECOMMENDED)
1. **Buka halaman setup:**
   ```
   http://localhost:3001/setup/super-admin
   ```

2. **Isi form dengan credentials:**
   - Email: `bukdan101@gmail.com`
   - Password: `Bukdan#bangku101`
   - Name: `bukdan`

3. **Klik "Create Super Admin"**
   - Tunggu sampai muncul pesan sukses
   - Akan muncul link "Go to Login Page"

4. **Login:**
   ```
   http://localhost:3001/platform/login
   ```
   - Gunakan email dan password yang sama

### Metode 2: NPM Script
```bash
npm run create-super-admin
```

## 🔍 Troubleshooting Error

### Error 1: "User already exists"
**Solusi:**
- Klik tombol "Check Existing" di halaman setup
- Jika user sudah ada, langsung coba login
- Jika lupa password, gunakan metode reset

### Error 2: "Missing Supabase credentials"
**Cek file .env:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://rxvwwspxusuttfopomrr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL="postgresql://postgres.rxvwwspxusuttfopomrr:..."
```

**Solusi:**
- Pastikan semua variable ada di .env
- Restart dev server setelah update .env

### Error 3: "Invalid credentials" saat login
**Kemungkinan penyebab:**
1. Password salah
2. User belum dibuat
3. User bukan super_admin

**Solusi:**
1. Cek existing super admin:
   ```
   http://localhost:3001/setup/super-admin
   ```
   Klik "Check Existing"

2. Jika tidak ada, create baru
3. Jika ada tapi password salah, create ulang dengan password baru

### Error 4: "Unauthorized" setelah login
**Penyebab:** User role bukan 'super_admin'

**Solusi:**
1. Buka setup page lagi
2. Create ulang dengan email yang sama
3. System akan update role menjadi super_admin

### Error 5: Database connection error
**Solusi:**
```bash
# Test database connection
npm run db:migrate
```

Jika error, cek:
- DATABASE_URL di .env
- Koneksi internet
- Supabase project masih aktif

## 📋 Checklist Debugging

- [ ] Dev server running (port 3001)
- [ ] File .env ada dan lengkap
- [ ] SUPABASE_SERVICE_ROLE_KEY ada
- [ ] DATABASE_URL valid
- [ ] Bisa akses http://localhost:3001
- [ ] Bisa akses http://localhost:3001/setup/super-admin
- [ ] Create super admin berhasil
- [ ] Bisa login di http://localhost:3001/platform/login
- [ ] Redirect ke /platform/dashboard

## 🔐 Default Credentials

```
Email: bukdan101@gmail.com
Password: Bukdan#bangku101
Role: super_admin
```

## 📍 Important URLs

| Page | URL |
|------|-----|
| Setup Super Admin | http://localhost:3001/setup/super-admin |
| Platform Login | http://localhost:3001/platform/login |
| Platform Dashboard | http://localhost:3001/platform/dashboard |
| Platform Users | http://localhost:3001/platform/users |
| Platform KYC | http://localhost:3001/platform/kyc |
| Platform Analytics | http://localhost:3001/platform/analytics |
| Platform Audit | http://localhost:3001/platform/audit |
| Platform Settings | http://localhost:3001/platform/settings |

## 🧪 Testing Flow

1. **Create Super Admin:**
   ```
   http://localhost:3001/setup/super-admin
   → Fill form → Create
   ```

2. **Verify Creation:**
   ```
   Click "Check Existing" button
   → Should show 1 super admin
   ```

3. **Login:**
   ```
   http://localhost:3001/platform/login
   → Enter credentials → Submit
   ```

4. **Access Dashboard:**
   ```
   Should redirect to: http://localhost:3001/platform/dashboard
   ```

5. **Test Other Pages:**
   - Users: http://localhost:3001/platform/users
   - KYC: http://localhost:3001/platform/kyc
   - Analytics: http://localhost:3001/platform/analytics

## 🐛 Common Issues

### Issue: "Cannot read properties of undefined"
**Solusi:** Restart dev server
```bash
# Stop current server (Ctrl+C)
npm run dev -- -p 3001
```

### Issue: "Middleware error"
**Solusi:** Clear .next cache
```bash
Remove-Item -Recurse -Force .next
npm run dev -- -p 3001
```

### Issue: "Database schema mismatch"
**Solusi:** Run migrations
```bash
npm run db:migrate
```

## 📞 Support

Jika masih error, berikan informasi:
1. Error message lengkap
2. Screenshot error
3. Console log (F12 → Console)
4. Network tab (F12 → Network)

## 🎯 Quick Fix Commands

```bash
# Hapus lock file
Remove-Item -Force .next\dev\lock

# Clear cache
Remove-Item -Recurse -Force .next

# Restart server
npm run dev -- -p 3001

# Create super admin via script
npm run create-super-admin

# Check database
npm run db:migrate
```

---

**Last Updated:** 2026-01-30
**Status:** ✅ Ready to use
