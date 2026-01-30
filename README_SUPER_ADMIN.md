# 🔐 SUPER ADMIN SETUP - README

## ⚡ Quick Start (2 Menit!) - UPDATED

### 1. Start Server
```bash
npm run dev -- -p 3001
```

### 2. Buka 3 Link Ini (Berurutan):

#### Link 1: SIMPLE SIGNUP (NEW!)
```
http://localhost:3001/setup/simple-signup
```
- Name: **bukdan**
- Email: **bukdan101@gmail.com**
- Password: **Bukdan#bangku101**
- Klik "Create Account"
- Tunggu pesan sukses ✅
- Klik "Go to Update Role →"

#### Link 2: UPDATE ROLE
```
http://localhost:3001/setup/update-role
```
- Email sudah terisi otomatis
- Klik tombol **"Update to Super Admin"**
- Tunggu pesan hijau ✅
- Klik **"Go to Login Page"**

#### Link 3: LOGIN
```
http://localhost:3001/platform/login
```
- Email: **bukdan101@gmail.com**
- Password: **Bukdan#bangku101**
- Klik **"Login sebagai Admin"**
- **SELESAI!** Anda masuk sebagai Super Admin ✅

---

## 📋 Credentials

```
Name: bukdan
Email: bukdan101@gmail.com
Password: Bukdan#bangku101
Role: super_admin
```

**PENTING:** Password ada huruf besar B dan simbol #

---

## 🎯 Setelah Login

Anda bisa akses halaman-halaman ini:

| Halaman | URL | Fungsi |
|---------|-----|--------|
| Dashboard | http://localhost:3001/platform/dashboard | Dashboard utama |
| Users | http://localhost:3001/platform/users | Kelola semua user |
| KYC | http://localhost:3001/platform/kyc | Verifikasi KYC |
| Analytics | http://localhost:3001/platform/analytics | Lihat statistik |
| Audit | http://localhost:3001/platform/audit | Log aktivitas |
| Settings | http://localhost:3001/platform/settings | Pengaturan platform |
| Affiliate | http://localhost:3001/platform/affiliate | Kelola affiliate |

---

## ❌ Troubleshooting

### Error: "Database error saving new user"
**Solusi:** Gunakan Simple Signup page bukan /auth page
```
http://localhost:3001/setup/simple-signup
```

### Error: "User not found"
**Solusi:** Belum signup. Kembali ke step 1 (simple signup dulu)

### Error: "Invalid credentials"
**Solusi:** Password salah. Pastikan: `Bukdan#bangku101` (B besar, ada #)

### Error: "Unauthorized"
**Solusi:** Role belum di-update. Ulangi step 2 (update role)

### Error: "Email already registered"
**Solusi:** User sudah ada, langsung ke step 2 (update role)

### Server tidak jalan
**Solusi:**
```bash
Remove-Item -Force .next\dev\lock
npm run dev -- -p 3001
```

---

## 📚 Dokumentasi Lengkap

Untuk panduan detail, baca file-file ini:

1. **CARA_MASUK_SUPER_ADMIN.md** ⭐ - Panduan paling lengkap
2. **SUPER_ADMIN_FINAL_SOLUTION.md** - Summary semua solusi
3. **SUPER_ADMIN_SIMPLE_SOLUTION.md** - Solusi alternatif via SQL
4. **SUPER_ADMIN_TROUBLESHOOTING.md** - Troubleshooting lengkap

---

## ✅ Checklist

- [ ] Server running (port 3001)
- [ ] Signup di /auth
- [ ] Update role di /setup/update-role
- [ ] Login di /platform/login
- [ ] Masuk dashboard ✅

---

## 💡 Tips

- Gunakan **Chrome** atau **Edge** (lebih stabil)
- Buka **DevTools** (F12) jika ada error
- Gunakan **Incognito mode** untuk testing
- **Screenshot** error jika masih gagal

---

## 🚀 Alternative: Via Supabase Dashboard

Jika cara di atas tidak berhasil:

1. Signup dulu di http://localhost:3001/setup/simple-signup
2. Buka Supabase Dashboard: https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr
3. Klik "SQL Editor"
4. Run query ini:

```sql
UPDATE users 
SET role = 'super_admin', 
    tenant_id = NULL 
WHERE email = 'bukdan101@gmail.com';
```

5. Login di http://localhost:3001/platform/login

---

**Last Updated:** 2026-01-30  
**Status:** ✅ Working (Fixed database error!)  
**Time:** ~2 minutes  
**Difficulty:** ⭐ Easy
