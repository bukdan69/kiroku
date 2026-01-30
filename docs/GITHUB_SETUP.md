# 🚀 Setup GitHub Repository - Arisan KU

## 📊 Status Saat Ini

❌ **Repository belum terhubung ke GitHub**

Proyek Anda saat ini hanya ada di local (komputer Anda) dan belum di-push ke GitHub.

---

## 🎯 Cara Setup GitHub Repository

### Opsi 1: Buat Repository Baru di GitHub (Recommended)

#### Step 1: Buat Repository di GitHub
1. Buka https://github.com
2. Login ke akun GitHub Anda
3. Klik tombol **"New"** atau **"+"** → **"New repository"**
4. Isi form:
   - **Repository name:** `arisan-ku` atau `arisan-nextjs`
   - **Description:** Platform Arisan Online Terpercaya di Indonesia
   - **Visibility:** 
     - ✅ **Private** (Recommended untuk production code)
     - ⚠️ Public (Jika ingin open source)
   - ❌ **JANGAN** centang "Initialize with README" (karena sudah ada)
5. Klik **"Create repository"**

#### Step 2: Connect Local ke GitHub
Setelah repository dibuat, GitHub akan menampilkan instruksi. Jalankan di terminal:

```bash
# Add remote origin
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Rename branch ke main (jika perlu)
git branch -M main

# Push ke GitHub
git push -u origin main
```

**Ganti:**
- `USERNAME` dengan username GitHub Anda
- `REPO-NAME` dengan nama repository yang Anda buat

---

### Opsi 2: Gunakan Repository yang Sudah Ada

Jika Anda sudah punya repository `bukdan69/arisan-harmony`:

```bash
# Add remote origin
git remote add origin https://github.com/bukdan69/arisan-harmony.git

# Check current branch
git branch

# Push ke GitHub
git push -u origin main
```

---

## 📝 Langkah-Langkah Detail

### 1. Cek Status Git
```bash
# Cek status file
git status

# Cek branch saat ini
git branch

# Cek remote (harusnya kosong)
git remote -v
```

### 2. Commit Semua Perubahan (Jika Ada)
```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Next.js 16 + Drizzle + Supabase"
```

### 3. Connect ke GitHub
```bash
# Add remote (ganti dengan URL Anda)
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Verify remote
git remote -v
```

### 4. Push ke GitHub
```bash
# Push pertama kali
git push -u origin main

# Atau jika branch-nya master
git push -u origin master
```

---

## 🔐 Authentication

### Jika Diminta Username & Password:

GitHub sudah tidak support password authentication. Gunakan salah satu:

#### Option A: Personal Access Token (PAT)
1. Buka https://github.com/settings/tokens
2. Klik **"Generate new token"** → **"Generate new token (classic)"**
3. Beri nama: `Arisan KU Development`
4. Pilih scope: `repo` (full control)
5. Klik **"Generate token"**
6. **COPY TOKEN** (hanya muncul sekali!)
7. Saat push, gunakan token sebagai password

#### Option B: SSH Key (Recommended)
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add ke GitHub:
# https://github.com/settings/keys
```

Lalu gunakan SSH URL:
```bash
git remote add origin git@github.com:USERNAME/REPO-NAME.git
```

---

## 📋 Checklist Setup

### Pre-Push Checklist
- [ ] Pastikan `.env.local` ada di `.gitignore` ✅
- [ ] Pastikan `node_modules/` ada di `.gitignore` ✅
- [ ] Pastikan tidak ada sensitive data di code
- [ ] Update `README.md` dengan info project
- [ ] Commit semua perubahan

### Push Checklist
- [ ] Buat repository di GitHub
- [ ] Add remote origin
- [ ] Push ke GitHub
- [ ] Verify di GitHub web

### Post-Push Checklist
- [ ] Setup branch protection (optional)
- [ ] Add collaborators (jika ada tim)
- [ ] Setup GitHub Actions (optional)
- [ ] Add repository description
- [ ] Add topics/tags

---

## 🎯 Recommended Repository Settings

### Repository Name
```
arisan-ku
atau
arisan-nextjs
atau
arisan-harmony
```

### Description
```
Platform Arisan Online Terpercaya di Indonesia - Next.js 16 + Drizzle ORM + Supabase
```

### Topics (Tags)
```
nextjs
typescript
drizzle-orm
supabase
arisan
fintech
indonesia
payment-gateway
midtrans
whatsapp-api
```

### .gitignore (Sudah Ada)
Pastikan file ini ada dan berisi:
```
node_modules/
.next/
.env
.env.local
.env.*.local
*.log
.DS_Store
dist/
build/
.vercel
.turbo
```

---

## 🚀 Setelah Push ke GitHub

### 1. Setup GitHub Actions (Optional)
Buat file `.github/workflows/ci.yml` untuk CI/CD

### 2. Setup Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Setup Branch Protection
Di GitHub:
- Settings → Branches → Add rule
- Branch name: `main`
- ✅ Require pull request reviews
- ✅ Require status checks

### 4. Add README Badges
```markdown
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)
```

---

## 📞 Troubleshooting

### Error: "remote origin already exists"
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/USERNAME/REPO-NAME.git
```

### Error: "failed to push some refs"
```bash
# Pull first
git pull origin main --allow-unrelated-histories

# Then push
git push -u origin main
```

### Error: "Permission denied (publickey)"
Setup SSH key atau gunakan HTTPS dengan Personal Access Token.

---

## 🎯 Quick Commands

### Setup Baru
```bash
# 1. Buat repo di GitHub dulu
# 2. Jalankan commands ini:

git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

### Update Existing
```bash
git add .
git commit -m "Update: your message"
git push
```

### Clone di Komputer Lain
```bash
git clone https://github.com/USERNAME/REPO-NAME.git
cd REPO-NAME
npm install
cp .env.example .env.local
# Edit .env.local dengan credentials Anda
npm run dev
```

---

## 📊 Recommended GitHub Repository Structure

```
arisan-ku/
├── .github/
│   ├── workflows/
│   │   └── ci.yml              # GitHub Actions
│   └── ISSUE_TEMPLATE/
│       └── bug_report.md
├── src/                        # Source code
├── public/                     # Static assets
├── .gitignore                  # Git ignore
├── README.md                   # Project documentation
├── LICENSE                     # License file
└── package.json                # Dependencies
```

---

## 🎉 Setelah Setup Selesai

### URL Repository Anda:
```
https://github.com/USERNAME/REPO-NAME
```

### Clone Command:
```bash
git clone https://github.com/USERNAME/REPO-NAME.git
```

### Deployment URL (Vercel):
```
https://REPO-NAME.vercel.app
```

---

## 📝 Next Steps

1. **Push ke GitHub** ✅
2. **Setup Vercel** untuk deployment
3. **Add collaborators** (jika ada tim)
4. **Setup CI/CD** dengan GitHub Actions
5. **Add documentation** di README.md
6. **Create releases** untuk versioning

---

## 💡 Tips

### Commit Message Convention
```bash
# Feature
git commit -m "feat: add payment integration"

# Bug fix
git commit -m "fix: resolve login issue"

# Documentation
git commit -m "docs: update README"

# Refactor
git commit -m "refactor: improve database queries"

# Style
git commit -m "style: format code"
```

### Branch Strategy
```
main/master     → Production
develop         → Development
feature/*       → New features
bugfix/*        → Bug fixes
hotfix/*        → Urgent fixes
```

---

## 🔗 Useful Links

- **GitHub Docs:** https://docs.github.com
- **Git Docs:** https://git-scm.com/doc
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment

---

**Status:** Ready to push to GitHub! 🚀

**Last Updated:** 30 Januari 2026
