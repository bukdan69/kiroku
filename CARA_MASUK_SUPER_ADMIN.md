# 🎯 CARA MASUK SEBAGAI SUPER ADMIN

## ✅ Solusi Paling Mudah (3 Langkah)

### Langkah 1: Signup Dulu
1. Buka browser, ketik: **http://localhost:3001/auth**
2. Klik tab "Sign Up"
3. Isi form:
   - **Email:** bukdan101@gmail.com
   - **Password:** Bukdan#bangku101
   - **Name:** bukdan
4. Klik "Sign Up"
5. Tunggu sampai berhasil signup

### Langkah 2: Update Role
1. Buka tab baru, ketik: **http://localhost:3001/setup/update-role**
2. Email sudah terisi otomatis: bukdan101@gmail.com
3. Klik tombol **"Update to Super Admin"**
4. Tunggu sampai muncul pesan sukses (hijau)
5. Klik tombol **"Go to Login Page"**

### Langkah 3: Login
1. Akan redirect ke: **http://localhost:3001/platform/login**
2. Isi form login:
   - **Email:** bukdan101@gmail.com
   - **Password:** Bukdan#bangku101
3. Klik **"Login sebagai Admin"**
4. Selesai! Anda akan masuk ke dashboard super admin

---

## 📍 Link Penting

| Halaman | URL | Fungsi |
|---------|-----|--------|
| **Signup** | http://localhost:3001/auth | Daftar user baru |
| **Update Role** | http://localhost:3001/setup/update-role | Ubah jadi super admin |
| **Login Super Admin** | http://localhost:3001/platform/login | Login khusus super admin |
| **Dashboard** | http://localhost:3001/platform/dashboard | Dashboard super admin |

---

## 🔍 Troubleshooting

### ❌ Error: "User not found" di step 2
**Penyebab:** Belum signup di step 1

**Solusi:**
1. Kembali ke http://localhost:3001/auth
2. Signup dulu
3. Baru update role

### ❌ Error: "Invalid credentials" saat login
**Penyebab:** Password salah atau user belum ada

**Solusi:**
1. Pastikan password: **Bukdan#bangku101** (huruf besar B, ada #)
2. Pastikan sudah signup di step 1
3. Coba signup ulang dengan email berbeda

### ❌ Error: "Unauthorized" setelah login
**Penyebab:** Role belum di-update

**Solusi:**
1. Buka http://localhost:3001/setup/update-role
2. Update role lagi
3. Logout dan login ulang

### ❌ Server tidak jalan
**Solusi:**
```bash
# Hapus lock file
Remove-Item -Force .next\dev\lock

# Start server
npm run dev -- -p 3001
```

---

## 🎬 Video Tutorial (Step by Step)

### Step 1: Signup
```
1. Buka: http://localhost:3001/auth
2. Klik "Sign Up"
3. Isi:
   Email: bukdan101@gmail.com
   Password: Bukdan#bangku101
   Name: bukdan
4. Klik "Sign Up"
5. ✅ Tunggu pesan sukses
```

### Step 2: Update Role
```
1. Buka tab baru: http://localhost:3001/setup/update-role
2. Email sudah terisi: bukdan101@gmail.com
3. Klik "Update to Super Admin"
4. ✅ Tunggu pesan hijau "Successfully updated"
5. Klik "Go to Login Page"
```

### Step 3: Login
```
1. Di halaman login: http://localhost:3001/platform/login
2. Isi:
   Email: bukdan101@gmail.com
   Password: Bukdan#bangku101
3. Klik "Login sebagai Admin"
4. ✅ Redirect ke dashboard
```

---

## 📋 Checklist

Ikuti checklist ini step by step:

- [ ] Server running di port 3001
- [ ] Buka http://localhost:3001/auth
- [ ] Signup dengan email bukdan101@gmail.com
- [ ] Signup berhasil (dapat konfirmasi)
- [ ] Buka http://localhost:3001/setup/update-role
- [ ] Klik "Update to Super Admin"
- [ ] Dapat pesan sukses (hijau)
- [ ] Buka http://localhost:3001/platform/login
- [ ] Login dengan credentials yang sama
- [ ] Berhasil masuk dashboard

---

## 🚀 Quick Start (Copy-Paste)

### Terminal 1: Start Server
```bash
npm run dev -- -p 3001
```

### Browser: Buka 3 Tab
```
Tab 1: http://localhost:3001/auth
Tab 2: http://localhost:3001/setup/update-role
Tab 3: http://localhost:3001/platform/login
```

### Credentials
```
Email: bukdan101@gmail.com
Password: Bukdan#bangku101
```

---

## 💡 Tips

1. **Gunakan Chrome/Edge** untuk testing (lebih stabil)
2. **Buka DevTools** (F12) untuk lihat error jika ada
3. **Clear cache** jika ada masalah (Ctrl+Shift+Delete)
4. **Gunakan Incognito** jika ada masalah session
5. **Screenshot error** jika masih gagal

---

## 📞 Jika Masih Error

Berikan informasi ini:
1. Screenshot error message
2. Console log (F12 → Console tab)
3. Network tab (F12 → Network tab)
4. Step mana yang error (1, 2, atau 3)

---

## ✅ Setelah Berhasil Login

Anda bisa akses:
- **Dashboard:** http://localhost:3001/platform/dashboard
- **Users:** http://localhost:3001/platform/users
- **KYC:** http://localhost:3001/platform/kyc
- **Analytics:** http://localhost:3001/platform/analytics
- **Audit:** http://localhost:3001/platform/audit
- **Settings:** http://localhost:3001/platform/settings
- **Affiliate:** http://localhost:3001/platform/affiliate

---

**Last Updated:** 2026-01-30  
**Status:** ✅ Tested & Working  
**Difficulty:** ⭐ Easy (3 langkah saja!)
