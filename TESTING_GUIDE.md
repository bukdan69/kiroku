# 🧪 Testing Guide - Kiroku Platform

Panduan lengkap untuk testing semua fitur aplikasi Kiroku.

## 📋 Test Checklist

### ✅ Authentication & Authorization

#### User Registration
- [ ] Register dengan email valid
- [ ] Register dengan email invalid (error)
- [ ] Register dengan password lemah (error)
- [ ] Email verification dikirim
- [ ] Verify email berhasil
- [ ] Login setelah verify

#### User Login
- [ ] Login dengan email & password
- [ ] Login dengan Google OAuth
- [ ] Login dengan credentials salah (error)
- [ ] Logout berhasil
- [ ] Session persistence
- [ ] Remember me functionality

#### Password Reset
- [ ] Request password reset
- [ ] Email reset dikirim
- [ ] Reset password dengan token valid
- [ ] Reset password dengan token expired (error)

---

### ✅ KYC (Know Your Customer)

#### KYC Submission
- [ ] Upload KTP/ID card
- [ ] Upload selfie
- [ ] Submit KYC form
- [ ] KYC status: pending
- [ ] Notification dikirim

#### KYC Approval (Super Admin)
- [ ] View KYC submissions
- [ ] Approve KYC
- [ ] User dapat notifikasi approval
- [ ] User dapat akses full features

#### KYC Rejection (Super Admin)
- [ ] Reject KYC dengan reason
- [ ] User dapat notifikasi rejection
- [ ] User dapat re-submit KYC

---

### ✅ Arisan Group Management

#### Create Group (Bandar)
- [ ] Create group dengan data valid
- [ ] Set contribution amount
- [ ] Set period (weekly/monthly)
- [ ] Set max participants
- [ ] Group status: active
- [ ] Bandar otomatis jadi admin

#### Join Group (Peserta)
- [ ] Browse available groups
- [ ] View group details
- [ ] Join group
- [ ] Receive invitation link
- [ ] Accept invitation
- [ ] Payment prompt muncul

#### Group Settings (Bandar)
- [ ] Edit group details
- [ ] Change contribution amount
- [ ] Change period
- [ ] Close group
- [ ] Delete group (if no transactions)

---

### ✅ Payment Processing

#### Payment Methods
- [ ] Bank Transfer (Virtual Account)
- [ ] E-Wallet (GoPay, OVO, Dana)
- [ ] QRIS
- [ ] Credit Card

#### Payment Flow
- [ ] Select payment method
- [ ] Generate payment instructions
- [ ] Redirect ke payment gateway
- [ ] Complete payment
- [ ] Webhook received
- [ ] Transaction status updated
- [ ] Notification sent

#### Payment Verification
- [ ] Manual verification (Bandar)
- [ ] Auto verification (webhook)
- [ ] Payment receipt generated
- [ ] Payment history updated

---

### ✅ Winner Selection

#### Commit-Reveal Process
- [ ] Bandar initiate draw
- [ ] Commit hash generated
- [ ] Eligible members displayed
- [ ] Reveal winner
- [ ] Winner selected randomly
- [ ] Winner notification sent
- [ ] Payout initiated

#### Winner Verification
- [ ] Winner cannot be selected twice
- [ ] Only paid members eligible
- [ ] Selection is provably fair
- [ ] Audit trail recorded

---

### ✅ Payout Processing

#### Winner Payout
- [ ] Payout amount calculated
- [ ] Bank account validated
- [ ] Payout request created
- [ ] Midtrans/Xendit API called
- [ ] Payout status: processing
- [ ] Payout completed
- [ ] Winner notified
- [ ] Transaction recorded

#### Affiliate Withdrawal
- [ ] Check balance
- [ ] Request withdrawal
- [ ] Minimum amount validated
- [ ] Bank details validated
- [ ] Withdrawal request submitted
- [ ] Admin approval
- [ ] Payout processed
- [ ] Notification sent

---

### ✅ Notifications

#### WhatsApp Notifications
- [ ] Payment reminder
- [ ] Payment received
- [ ] Winner selected
- [ ] Payout processed
- [ ] KYC approved/rejected
- [ ] Group invitation

#### Email Notifications
- [ ] Welcome email
- [ ] Email verification
- [ ] Password reset
- [ ] Payment receipt
- [ ] Winner notification
- [ ] Payout confirmation

#### SMS Notifications
- [ ] OTP code
- [ ] Payment reminder
- [ ] Winner notification
- [ ] Payout confirmation

---

### ✅ Bandar Dashboard

#### Overview
- [ ] Total groups displayed
- [ ] Total members count
- [ ] Total revenue calculated
- [ ] Pending payments count
- [ ] Affiliate commission shown

#### Group Management
- [ ] List all groups
- [ ] Filter by status
- [ ] Search groups
- [ ] View group details
- [ ] Quick actions work

#### Member Management
- [ ] List all members
- [ ] Search members
- [ ] Filter by status
- [ ] View member details
- [ ] Contact member
- [ ] View payment history

#### Payment Tracking
- [ ] Pending payments list
- [ ] Completed payments list
- [ ] Late payments highlighted
- [ ] Send payment reminders
- [ ] Manual verification

#### Draw Management
- [ ] Schedule draws
- [ ] View eligible members
- [ ] Commit-reveal interface
- [ ] Winner selection
- [ ] Payout tracking

#### Affiliate Dashboard
- [ ] Referral stats
- [ ] Commission earned
- [ ] Withdrawal requests
- [ ] Referral links
- [ ] Copy/share links

---

### ✅ Super Admin Platform

#### Dashboard
- [ ] Platform stats
- [ ] User growth chart
- [ ] Revenue chart
- [ ] Active groups count
- [ ] Pending KYC count

#### KYC Management
- [ ] List all KYC submissions
- [ ] Filter by status
- [ ] View KYC details
- [ ] Approve/reject KYC
- [ ] Bulk actions

#### User Management
- [ ] List all users
- [ ] Search users
- [ ] Filter by role
- [ ] View user details
- [ ] Edit user
- [ ] Suspend user
- [ ] Delete user

#### Fraud Detection
- [ ] Suspicious activities list
- [ ] Risk score calculation
- [ ] Multiple accounts detection
- [ ] Unusual payment patterns
- [ ] Investigation tools

#### Analytics
- [ ] User analytics
- [ ] Revenue analytics
- [ ] Group analytics
- [ ] Payment analytics
- [ ] Export reports

#### Audit Logs
- [ ] All actions logged
- [ ] Filter by user
- [ ] Filter by action
- [ ] Filter by date
- [ ] Export logs

#### Affiliate Management
- [ ] Pending withdrawals
- [ ] Approved withdrawals
- [ ] Rejected withdrawals
- [ ] Top affiliates
- [ ] Commission settings

#### Settings
- [ ] Platform settings
- [ ] Payment settings
- [ ] Notification settings
- [ ] Security settings
- [ ] API keys management

---

## 🔧 API Endpoint Testing

### Member Detail API
```bash
# GET /api/admin/members/[id]
curl -X GET http://localhost:3000/api/admin/members/1 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Expected Response:
{
  "member": {
    "id": "1",
    "fullName": "John Doe",
    "email": "john@example.com",
    ...
  },
  "stats": {
    "totalPaid": 1000000,
    "totalWon": 5000000,
    ...
  }
}
```

### Winner Selection API
```bash
# GET /api/admin/draws/[id]/select
curl -X GET http://localhost:3000/api/admin/draws/1/select \
  -H "Authorization: Bearer YOUR_TOKEN"

# POST /api/admin/draws/[id]/select (Commit)
curl -X POST http://localhost:3000/api/admin/draws/1/select \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "commit",
    "commitHash": "abc123..."
  }'

# POST /api/admin/draws/[id]/select (Reveal)
curl -X POST http://localhost:3000/api/admin/draws/1/select \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "reveal",
    "revealSecret": "secret123..."
  }'
```

### Affiliate Withdrawal API
```bash
# GET /api/admin/affiliate/withdraw
curl -X GET http://localhost:3000/api/admin/affiliate/withdraw \
  -H "Authorization: Bearer YOUR_TOKEN"

# POST /api/admin/affiliate/withdraw
curl -X POST http://localhost:3000/api/admin/affiliate/withdraw \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500000,
    "bankName": "BCA",
    "accountNumber": "1234567890",
    "accountName": "John Doe"
  }'
```

---

## 🧪 Automated Testing

### Setup Jest
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Run Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test tests/api/admin.test.ts

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### Test Coverage Goals
- Unit tests: > 80%
- Integration tests: > 70%
- E2E tests: Critical paths

---

## 🔍 Manual Testing Scenarios

### Scenario 1: Complete User Journey
1. Register new user
2. Verify email
3. Submit KYC
4. Wait for KYC approval
5. Browse groups
6. Join group
7. Make payment
8. Wait for draw
9. Win draw
10. Receive payout

### Scenario 2: Bandar Journey
1. Register as Bandar
2. Complete KYC
3. Create arisan group
4. Invite members
5. Track payments
6. Send reminders
7. Conduct draw
8. Process payout
9. Close group

### Scenario 3: Affiliate Journey
1. Register as affiliate
2. Get referral link
3. Share link
4. Track referrals
5. Earn commission
6. Request withdrawal
7. Receive payout

---

## 📊 Performance Testing

### Load Testing
```bash
# Install k6
brew install k6

# Run load test
k6 run load-test.js
```

### Metrics to Monitor
- Response time < 500ms
- Throughput > 100 req/s
- Error rate < 1%
- CPU usage < 70%
- Memory usage < 80%

---

## 🐛 Bug Reporting

### Bug Report Template
```markdown
**Title:** Brief description

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- URL: https://kiroku.app/dashboard

**Steps to Reproduce:**
1. Go to dashboard
2. Click on "Create Group"
3. Fill form
4. Click submit

**Expected Result:**
Group should be created

**Actual Result:**
Error message appears

**Screenshots:**
[Attach screenshots]

**Console Errors:**
[Paste console errors]
```

---

## ✅ Pre-Production Checklist

### Code Quality
- [ ] All tests passing
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Code reviewed
- [ ] Documentation updated

### Security
- [ ] Environment variables secured
- [ ] API keys not exposed
- [ ] SQL injection prevented
- [ ] XSS protection enabled
- [ ] CSRF protection enabled

### Performance
- [ ] Lighthouse score > 90
- [ ] Page load < 3s
- [ ] API response < 500ms
- [ ] Images optimized
- [ ] Caching configured

### Functionality
- [ ] All features working
- [ ] Payment gateway tested
- [ ] Notifications working
- [ ] Email delivery working
- [ ] SMS delivery working

### Monitoring
- [ ] Error tracking setup
- [ ] Analytics setup
- [ ] Logging configured
- [ ] Alerts configured
- [ ] Backup strategy ready

---

## 📞 Support

Jika menemukan bug atau issue:
1. Check existing issues di GitHub
2. Create new issue dengan template
3. Tag dengan label yang sesuai
4. Provide detailed information

**GitHub Issues:** https://github.com/bukdan69/kiroku/issues

---

**Last Updated:** January 2026
**Version:** 1.0.0
