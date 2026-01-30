# 🚀 Commands untuk Deploy ke GitHub

## 📋 Step-by-Step Commands

### Step 1: Commit Semua Perubahan

```bash
# Add semua file
git add .

# Commit dengan message
git commit -m "feat: complete Next.js 16 + Drizzle + Supabase implementation

- Add 20+ database tables with Drizzle ORM
- Implement authentication with Supabase + Google OAuth
- Add payment integration with Midtrans
- Add WhatsApp notification system
- Create professional landing page (8 sections)
- Add legal pages (Privacy, Terms, About)
- Implement KYC verification system
- Add fraud detection & security features
- Setup multi-tenant architecture
- Add comprehensive documentation"
```

### Step 2: Buat Repository di GitHub

1. Buka https://github.com/new
2. Isi form:
   - **Repository name:** `arisan-ku` (atau nama lain)
   - **Description:** Platform Arisan Online Terpercaya di Indonesia
   - **Visibility:** Private ✅ (Recommended)
   - **JANGAN centang** "Initialize with README"
3. Klik **"Create repository"**

### Step 3: Connect ke GitHub

**Ganti `YOUR-USERNAME` dan `REPO-NAME` dengan yang sebenarnya!**

```bash
# Add remote origin
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Verify remote
git remote -v

# Push ke GitHub
git push -u origin main
```

**Contoh (ganti dengan username Anda):**
```bash
git remote add origin https://github.com/bukdan69/arisan-ku.git
git remote -v
git push -u origin main
```

---

## 🔐 Jika Diminta Authentication

### Option 1: Personal Access Token (Mudah)

1. Buka https://github.com/settings/tokens
2. Klik **"Generate new token"** → **"Generate new token (classic)"**
3. Isi:
   - **Note:** `Arisan KU Development`
   - **Expiration:** 90 days (atau No expiration)
   - **Select scopes:** ✅ `repo` (full control)
4. Klik **"Generate token"**
5. **COPY TOKEN** (hanya muncul sekali!)
6. Saat push, gunakan:
   - **Username:** your-github-username
   - **Password:** paste-token-here

### Option 2: SSH Key (Recommended untuk jangka panjang)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add ke GitHub: https://github.com/settings/keys
```

Lalu gunakan SSH URL:
```bash
git remote set-url origin git@github.com:YOUR-USERNAME/REPO-NAME.git
```

---

## ✅ Verify Push Berhasil

Setelah push, cek di browser:
```
https://github.com/YOUR-USERNAME/REPO-NAME
```

Anda harus bisa melihat semua file proyek Anda di GitHub!

---

## 🎯 Next Steps Setelah Push

### 1. Update README.md
Edit `README.md` dan ganti:
- `YOUR-USERNAME` dengan username GitHub Anda
- `REPO-NAME` dengan nama repository Anda
- Email dan contact info

### 2. Add Repository Description
Di GitHub:
- Go to repository
- Click ⚙️ Settings
- Add description: "Platform Arisan Online Terpercaya di Indonesia"
- Add topics: `nextjs`, `typescript`, `drizzle-orm`, `supabase`, `arisan`

### 3. Setup Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Atau deploy via GitHub:
1. Buka https://vercel.com/new
2. Import repository dari GitHub
3. Configure environment variables
4. Deploy!

---

## 📝 Git Commands Cheat Sheet

### Daily Commands
```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "your message"

# Push
git push

# Pull latest changes
git pull
```

### Branch Management
```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# Merge branch
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
```

### Undo Changes
```bash
# Discard changes in file
git restore filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## 🐛 Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: "Permission denied (publickey)"
Setup SSH key atau gunakan HTTPS dengan Personal Access Token.

### Error: "Updates were rejected"
```bash
git pull --rebase origin main
git push
```

---

## 🎉 Setelah Berhasil Push

Repository Anda sekarang tersedia di:
```
https://github.com/YOUR-USERNAME/REPO-NAME
```

Clone command untuk komputer lain:
```bash
git clone https://github.com/YOUR-USERNAME/REPO-NAME.git
```

---

**Good luck! 🚀**
