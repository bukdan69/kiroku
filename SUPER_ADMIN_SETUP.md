# 🔐 Super Admin Setup Guide

## Current Status
The super admin creation script encountered a database error. This is likely because:
1. The users table might not exist yet in Supabase
2. There might be database triggers or RLS policies blocking the insert
3. The database schema needs to be synced

## ✅ Solution: Create Super Admin via Supabase Dashboard

### Step 1: Access Supabase Dashboard
1. Go to: https://rxvwwspxusuttfopomrr.supabase.co
2. Login to your Supabase account

### Step 2: Create User in Authentication
1. Navigate to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Fill in:
   - **Email**: `bukdan101@gmail.com`
   - **Password**: `Bukdan#bangku101`
   - **Auto Confirm User**: ✅ (check this box)
4. Click **Create User**
5. **Copy the User ID** (you'll need this for the next step)

### Step 3: Add User to Database
1. Navigate to **Table Editor** → **users** table
2. Click **Insert** → **Insert row**
3. Fill in:
   - **id**: (paste the User ID from Step 2)
   - **email**: `bukdan101@gmail.com`
   - **name**: `bukdan`
   - **role**: `super_admin`
   - **tenant_id**: `NULL` (leave empty)
   - **email_verified**: (current timestamp)
   - **is_active**: `true`
4. Click **Save**

### Step 4: Test Login
1. Go to: http://localhost:3001/platform/login
2. Login with:
   - **Email**: bukdan101@gmail.com
   - **Password**: Bukdan#bangku101
3. You should be redirected to: http://localhost:3001/platform/dashboard

---

## 🔧 Alternative: Fix Database Schema First

If you prefer to use the script, you need to ensure the database schema is properly set up:

### Option A: Run Migrations
```bash
# Check if migrations exist
npx drizzle-kit generate

# Push schema to database
npx drizzle-kit push
```

### Option B: Use Supabase Migrations
```bash
# If you have supabase CLI installed
supabase db push
```

### Then Run the Script
```bash
npx tsx src/lib/db/create-super-admin.ts
```

---

## 📋 Super Admin Credentials

**Email**: bukdan101@gmail.com  
**Password**: Bukdan#bangku101  
**Role**: super_admin  
**Tenant**: NULL (platform-wide access)

---

## 🌐 Login URLs

- **Platform Admin**: http://localhost:3001/platform/login
- **Regular Auth**: http://localhost:3001/auth

---

## 🔍 Troubleshooting

### Error: "Database error creating new user"
- The users table might not exist
- Run migrations first: `npx drizzle-kit push`
- Or create user manually via Supabase Dashboard (recommended)

### Error: "password authentication failed"
- Check DATABASE_URL in .env file
- Ensure password is URL-encoded: `Bukdan%23bangku101`

### Error: "User already exists"
- User exists in Auth but not in database
- Add user to database manually via Supabase Dashboard

### Can't Login
- Check if user exists in both:
  1. Authentication → Users (Supabase Auth)
  2. Table Editor → users (Database)
- Ensure role is set to `super_admin`
- Ensure tenant_id is `NULL`

---

## ✅ Next Steps After Login

Once logged in as super admin, you can:
1. Access Platform Dashboard: `/platform/dashboard`
2. Manage KYC Verifications: `/platform/kyc`
3. Manage Users: `/platform/users`
4. View Analytics: `/platform/analytics`
5. Manage Affiliates: `/platform/affiliate`
6. View Audit Logs: `/platform/audit`
7. Detect Fraud: `/platform/fraud`
8. Platform Settings: `/platform/settings`

---

## 📝 Notes

- Super admin has **platform-wide access** (no tenant restriction)
- All login attempts are logged in audit_logs table
- Super admin can access all tenants and perform admin actions
- Keep credentials secure - this is the master admin account

---

**Last Updated**: January 30, 2026  
**Status**: Manual setup required via Supabase Dashboard
