# 🚀 Deployment Guide - Kiroku Platform

Complete guide untuk deploy aplikasi Kiroku ke production.

## 📋 Prerequisites

### 1. Akun yang Diperlukan
- ✅ Vercel Account (untuk hosting)
- ✅ Supabase Account (database & auth)
- ✅ Midtrans Account (payment gateway)
- ✅ SendGrid/AWS SES (email service)
- ✅ Twilio/AWS SNS (SMS service)
- ✅ WhatsApp Business API (notifications)
- ✅ Domain (optional, bisa pakai vercel.app)

### 2. Tools yang Diperlukan
```bash
node >= 18.x
npm >= 9.x
git
vercel CLI (optional)
```

---

## 🗄️ Step 1: Setup Database (Supabase)

### 1.1 Create Supabase Project
1. Login ke https://supabase.com
2. Create new project
3. Pilih region: Singapore (ap-southeast-1)
4. Set database password (simpan dengan aman)

### 1.2 Run Migrations
```bash
# Install Drizzle Kit
npm install -g drizzle-kit

# Run migrations
npm run db:push

# Seed initial data (optional)
npm run db:seed
```

### 1.3 Setup Authentication
1. Buka Supabase Dashboard → Authentication → Providers
2. Enable Email provider
3. Enable Google OAuth:
   - Add Google Client ID
   - Add Google Client Secret
4. Configure redirect URLs:
   - Add: `https://your-domain.com/auth/callback`
   - Add: `http://localhost:3000/auth/callback` (for testing)

### 1.4 Setup Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE arisan_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies (sudah ada di migrations)
```

---

## 💳 Step 2: Setup Payment Gateway (Midtrans)

### 2.1 Create Midtrans Account
1. Register di https://midtrans.com
2. Verify business documents
3. Get approved (biasanya 1-3 hari kerja)

### 2.2 Get API Keys
1. Login ke Midtrans Dashboard
2. Settings → Access Keys
3. Copy:
   - Server Key
   - Client Key
   - Merchant ID

### 2.3 Setup Midtrans Iris (Payout)
1. Request Iris access dari Midtrans support
2. Get Iris API credentials
3. Add beneficiary banks
4. Test payout di sandbox

### 2.4 Configure Webhooks
1. Settings → Configuration
2. Payment Notification URL: `https://your-domain.com/api/payments/webhook`
3. Finish Redirect URL: `https://your-domain.com/payment/success`
4. Error Redirect URL: `https://your-domain.com/payment/error`

---

## 📧 Step 3: Setup Email Service

### Option A: SendGrid

#### 3.1 Create SendGrid Account
1. Register di https://sendgrid.com
2. Verify email
3. Complete sender verification

#### 3.2 Get API Key
1. Settings → API Keys
2. Create API Key dengan Full Access
3. Copy API key (hanya muncul sekali!)

#### 3.3 Verify Domain (Optional)
1. Settings → Sender Authentication
2. Authenticate Your Domain
3. Add DNS records ke domain provider
4. Wait for verification

### Option B: AWS SES

#### 3.1 Setup AWS Account
1. Create AWS account
2. Go to SES console
3. Request production access (default sandbox mode)

#### 3.2 Verify Email/Domain
1. Identities → Create Identity
2. Verify email atau domain
3. Add DNS records (untuk domain)

#### 3.3 Create IAM User
1. IAM → Users → Create User
2. Attach policy: `AmazonSESFullAccess`
3. Create access key
4. Save Access Key ID & Secret Access Key

---

## 📱 Step 4: Setup SMS Service

### Option A: Twilio

#### 4.1 Create Twilio Account
1. Register di https://twilio.com
2. Verify phone number
3. Upgrade to paid account

#### 4.2 Get Credentials
1. Console → Account Info
2. Copy:
   - Account SID
   - Auth Token
3. Buy phone number (untuk sender)

### Option B: AWS SNS

#### 4.1 Setup AWS SNS
1. Go to SNS console
2. Enable SMS messaging
3. Set default settings:
   - SMS type: Transactional
   - Sender ID: Kiroku

#### 4.2 Request Quota Increase
1. Support → Create Case
2. Request SMS spending limit increase
3. Wait for approval (1-2 hari)

---

## 💬 Step 5: Setup WhatsApp Business API

### 5.1 Create Meta Business Account
1. Register di https://business.facebook.com
2. Create business account
3. Verify business

### 5.2 Setup WhatsApp Business API
1. Go to https://developers.facebook.com
2. Create app → Business → WhatsApp
3. Add WhatsApp product
4. Get phone number ID
5. Generate access token

### 5.3 Configure Webhooks
1. WhatsApp → Configuration
2. Webhook URL: `https://your-domain.com/api/notifications/whatsapp/webhook`
3. Verify token: (generate random string)
4. Subscribe to: messages, message_status

---

## 🌐 Step 6: Deploy to Vercel

### 6.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 6.2 Login to Vercel
```bash
vercel login
```

### 6.3 Deploy
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 6.4 Configure Environment Variables
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add all variables dari `.env.example`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
DATABASE_URL=postgresql://xxx

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

# App
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=xxx
NEXT_PUBLIC_TRIAL_DAYS=14
NEXT_PUBLIC_MIN_PAYOUT=500000

# Midtrans
MERCHANT_ID=xxx
MIDTRANS_SERVER_KEY=xxx
MIDTRANS_CLIENT_KEY=xxx
MIDTRANS_IS_PRODUCTION=true

# Payout
PAYOUT_PROVIDER=midtrans
XENDIT_SECRET_KEY=xxx

# Email (SendGrid)
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=xxx
SENDGRID_FROM_EMAIL=noreply@kiroku.app
SENDGRID_FROM_NAME=Kiroku

# SMS (Twilio)
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_FROM_NUMBER=+xxx

# WhatsApp
WHATSAPP_BUSINESS_ACCOUNT_ID=xxx
WHATSAPP_ACCESS_TOKEN=xxx
WHATSAPP_PHONE_NUMBER_ID=xxx
WHATSAPP_WEBHOOK_SECRET=xxx
WHATSAPP_WEBHOOK_URL=https://your-domain.vercel.app/api/notifications/whatsapp/webhook
WHATSAPP_VERIFIED_BUSINESS_ACCOUNT=true
```

### 6.5 Configure Custom Domain (Optional)
1. Vercel Dashboard → Project → Settings → Domains
2. Add domain
3. Update DNS records di domain provider:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (5-30 menit)

---

## ✅ Step 7: Post-Deployment Checklist

### 7.1 Test Core Features
- [ ] User registration & login
- [ ] Google OAuth login
- [ ] Email verification
- [ ] KYC submission
- [ ] Create arisan group
- [ ] Join arisan group
- [ ] Payment (all methods)
- [ ] Winner selection
- [ ] Payout processing
- [ ] WhatsApp notifications
- [ ] Email notifications
- [ ] SMS notifications

### 7.2 Test Admin Features
- [ ] Bandar dashboard
- [ ] Member management
- [ ] Payment tracking
- [ ] Winner selection
- [ ] Affiliate withdrawal

### 7.3 Test Super Admin Features
- [ ] Platform login
- [ ] KYC approval/rejection
- [ ] User management
- [ ] Fraud detection
- [ ] Analytics
- [ ] Audit logs
- [ ] Affiliate management

### 7.4 Security Checks
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API keys tidak exposed
- [ ] RLS policies active
- [ ] Rate limiting configured
- [ ] CORS configured
- [ ] CSP headers set

### 7.5 Performance Checks
- [ ] Lighthouse score > 90
- [ ] Page load < 3s
- [ ] API response < 500ms
- [ ] Database queries optimized
- [ ] Images optimized
- [ ] Caching configured

---

## 🔧 Step 8: Monitoring & Maintenance

### 8.1 Setup Monitoring
1. **Vercel Analytics**
   - Enable di Vercel Dashboard
   - Monitor traffic & performance

2. **Sentry (Error Tracking)**
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard@latest -i nextjs
   ```

3. **Supabase Monitoring**
   - Monitor database performance
   - Check query performance
   - Monitor storage usage

### 8.2 Setup Alerts
1. **Vercel Alerts**
   - Deployment failures
   - High error rates
   - Performance degradation

2. **Supabase Alerts**
   - Database CPU > 80%
   - Storage > 80%
   - Connection pool exhausted

3. **Payment Alerts**
   - Failed payments
   - Payout failures
   - High refund rate

### 8.3 Backup Strategy
1. **Database Backup**
   - Supabase auto-backup (daily)
   - Manual backup sebelum major changes
   ```bash
   pg_dump $DATABASE_URL > backup.sql
   ```

2. **Code Backup**
   - GitHub repository (already done)
   - Tag releases
   ```bash
   git tag -a v1.0.0 -m "Production release"
   git push origin v1.0.0
   ```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear cache
vercel --force

# Check logs
vercel logs
```

#### 2. Database Connection Issues
- Check DATABASE_URL format
- Verify Supabase project is active
- Check connection pooling settings

#### 3. Payment Webhook Not Working
- Verify webhook URL di Midtrans dashboard
- Check webhook secret
- Test dengan Midtrans simulator

#### 4. Email Not Sending
- Verify SendGrid API key
- Check sender verification
- Review email logs di SendGrid dashboard

#### 5. WhatsApp Not Working
- Verify access token
- Check webhook verification
- Review message logs di Meta dashboard

---

## 📊 Performance Optimization

### 1. Database Optimization
```sql
-- Add indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_arisan_groups_status ON arisan_groups(status);

-- Analyze queries
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

### 2. Caching Strategy
```typescript
// API route caching
export const revalidate = 60; // 60 seconds

// Static page caching
export const dynamic = 'force-static';
```

### 3. Image Optimization
- Use Next.js Image component
- Compress images
- Use WebP format
- Lazy load images

### 4. Code Splitting
- Dynamic imports
- Route-based splitting
- Component lazy loading

---

## 🔐 Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use Vercel environment variables
- Rotate keys regularly

### 2. API Security
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

### 3. Authentication
- Use secure session tokens
- Implement 2FA (optional)
- Password strength requirements
- Account lockout after failed attempts

### 4. Data Protection
- Encrypt sensitive data
- Use HTTPS only
- Implement CORS
- Set security headers

---

## 📞 Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Midtrans: https://docs.midtrans.com
- Vercel: https://vercel.com/docs

### Community
- GitHub Issues: https://github.com/bukdan69/kiroku/issues
- Discord: (coming soon)
- Email: support@kiroku.app

---

## 🎉 Deployment Complete!

Selamat! Aplikasi Kiroku sudah live di production.

**Next Steps:**
1. Monitor aplikasi 24 jam pertama
2. Test semua fitur di production
3. Collect user feedback
4. Plan next features
5. Scale as needed

**Production URL:** https://your-domain.vercel.app

---

**Last Updated:** January 2026
**Version:** 1.0.0
