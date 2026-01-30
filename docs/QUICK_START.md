# ⚡ Quick Start Guide - Kiroku Platform

Panduan cepat untuk mulai development dan testing.

## 🚀 Setup (5 menit)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
# Copy template
cp .env.example .env.local

# Edit .env.local dengan credentials Anda
# Minimal yang diperlukan untuk development:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
```

### 3. Setup Database
```bash
# Push schema ke database
npm run db:push

# (Optional) Seed data untuk testing
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```

Buka http://localhost:3000 🎉

---

## 🧪 Testing Services

### Test Email Service

#### Setup SendGrid (Recommended untuk testing)
1. Register di https://sendgrid.com (Free tier: 100 emails/day)
2. Get API key
3. Add ke `.env.local`:
```env
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your_api_key
SENDGRID_FROM_EMAIL=your_verified_email@example.com
```

#### Test Email
```typescript
// Create test file: test-email.ts
import { emailService } from '@/lib/services/email/service';

await emailService.send({
  to: 'test@example.com',
  subject: 'Test Email dari Kiroku',
  template: 'welcome',
  data: {
    name: 'Test User',
    dashboardUrl: 'http://localhost:3000/dashboard'
  }
});

console.log('Email sent!');
```

```bash
# Run test
npx tsx test-email.ts
```

---

### Test SMS Service

#### Setup Twilio (Recommended untuk testing)
1. Register di https://twilio.com (Free trial: $15 credit)
2. Get credentials
3. Add ke `.env.local`:
```env
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_NUMBER=your_twilio_number
```

#### Test SMS
```typescript
// Create test file: test-sms.ts
import { smsService } from '@/lib/services/sms/service';

await smsService.send({
  to: '+628123456789', // Your phone number
  template: 'otp',
  data: { code: '123456' }
});

console.log('SMS sent!');
```

```bash
# Run test
npx tsx test-sms.ts
```

---

### Test Payout Service

#### Setup Midtrans Sandbox (Free)
1. Register di https://midtrans.com
2. Use sandbox credentials
3. Add ke `.env.local`:
```env
PAYOUT_PROVIDER=midtrans
MIDTRANS_SERVER_KEY=your_sandbox_server_key
MIDTRANS_IS_PRODUCTION=false
```

#### Test Payout
```typescript
// Create test file: test-payout.ts
import { payoutService } from '@/lib/payments/payout-service';

const result = await payoutService.processPayout({
  userId: '1',
  amount: 100000,
  bankAccount: {
    bankName: 'BCA',
    accountNumber: '1234567890',
    accountName: 'Test User'
  },
  type: 'winner_payout',
  referenceId: 'test-123',
  description: 'Test payout'
});

console.log('Payout result:', result);
```

```bash
# Run test
npx tsx test-payout.ts
```

---

## 🔍 Test API Endpoints

### Start Server
```bash
npm run dev
```

### Test Member Detail API
```bash
curl http://localhost:3000/api/admin/members/1
```

### Test Winner Selection API
```bash
# Get draw info
curl http://localhost:3000/api/admin/draws/1/select

# Commit selection
curl -X POST http://localhost:3000/api/admin/draws/1/select \
  -H "Content-Type: application/json" \
  -d '{"action":"commit","commitHash":"test123"}'

# Reveal winner
curl -X POST http://localhost:3000/api/admin/draws/1/select \
  -H "Content-Type: application/json" \
  -d '{"action":"reveal","revealSecret":"secret123"}'
```

### Test Withdrawal API
```bash
# Get balance
curl http://localhost:3000/api/admin/affiliate/withdraw

# Create withdrawal
curl -X POST http://localhost:3000/api/admin/affiliate/withdraw \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500000,
    "bankName": "BCA",
    "accountNumber": "1234567890",
    "accountName": "Test User"
  }'
```

---

## 🧪 Run Automated Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 📱 Test Pages

### Public Pages
- Landing: http://localhost:3000
- Panduan Pengelola: http://localhost:3000/panduan-pengelola
- Panduan Peserta: http://localhost:3000/panduan-peserta
- Privacy: http://localhost:3000/privacy
- Terms: http://localhost:3000/terms
- About: http://localhost:3000/about

### User Pages
- Login: http://localhost:3000/auth
- Dashboard: http://localhost:3000/dashboard
- Groups: http://localhost:3000/dashboard/groups
- KYC: http://localhost:3000/dashboard/kyc
- Profile: http://localhost:3000/dashboard/profile

### Bandar Pages
- Dashboard: http://localhost:3000/admin/dashboard
- Member Detail: http://localhost:3000/admin/members/1
- Winner Selection: http://localhost:3000/admin/draws/1/select
- Withdrawal: http://localhost:3000/admin/affiliate/withdraw

### Super Admin Pages
- Login: http://localhost:3000/platform/login
- Dashboard: http://localhost:3000/platform/dashboard
- KYC: http://localhost:3000/platform/kyc
- Users: http://localhost:3000/platform/users
- Fraud: http://localhost:3000/platform/fraud
- Analytics: http://localhost:3000/platform/analytics
- Audit: http://localhost:3000/platform/audit
- Affiliate: http://localhost:3000/platform/affiliate
- Settings: http://localhost:3000/platform/settings

---

## 🐛 Common Issues

### Issue: Database connection error
**Solution:**
```bash
# Check DATABASE_URL format
# Should be: postgresql://user:password@host:port/database

# Test connection
npm run db:studio
```

### Issue: Email not sending
**Solution:**
1. Verify SendGrid API key
2. Check sender email is verified
3. Check SendGrid dashboard for errors

### Issue: SMS not sending
**Solution:**
1. Verify Twilio credentials
2. Check phone number format (+62xxx)
3. Check Twilio console for errors

### Issue: Build error
**Solution:**
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📚 Documentation

- **Full Deployment:** `DEPLOYMENT_GUIDE.md`
- **Complete Testing:** `TESTING_GUIDE.md`
- **Production Ready:** `PRODUCTION_READY_SUMMARY.md`
- **User Guides:** `PANDUAN_*.md`

---

## 🎯 Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/new-feature
```

### 2. Make Changes
```bash
# Edit files
# Test locally
npm run dev
```

### 3. Test
```bash
npm test
npm run lint
```

### 4. Commit & Push
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

### 5. Create Pull Request
- Go to GitHub
- Create PR from feature branch to main
- Wait for review
- Merge when approved

---

## 🚀 Deploy to Production

### Quick Deploy (Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Full Deployment
Follow `DEPLOYMENT_GUIDE.md` for complete steps.

---

## 💡 Tips

### Development
- Use `npm run dev` untuk hot reload
- Use `npm run db:studio` untuk database GUI
- Use browser DevTools untuk debugging

### Testing
- Test di Chrome, Firefox, Safari
- Test di mobile (responsive)
- Test semua user flows
- Test error cases

### Performance
- Use Next.js Image component
- Lazy load components
- Optimize database queries
- Use caching

---

## 📞 Need Help?

- **Documentation:** Check `DEPLOYMENT_GUIDE.md` dan `TESTING_GUIDE.md`
- **GitHub Issues:** https://github.com/bukdan69/kiroku/issues
- **Email:** support@kiroku.app

---

## ✅ Quick Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Database migrated
- [ ] Email service tested
- [ ] SMS service tested
- [ ] Payment gateway tested
- [ ] Payout service tested
- [ ] All pages responsive
- [ ] Security headers configured
- [ ] Monitoring setup

---

**Happy Coding! 🚀**

Last Updated: January 30, 2026
