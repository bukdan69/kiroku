# 🚀 Vercel Deployment Guide - ArisanKU

## ✅ Pre-Deployment Checklist

Sistem sudah siap untuk di-deploy ke Vercel!

### What's Ready
- ✅ Next.js 16 configuration
- ✅ TypeScript compilation (no errors)
- ✅ Database schema (Supabase)
- ✅ Environment variables template
- ✅ Build scripts configured
- ✅ Vercel configuration file
- ✅ All pages working locally

---

## 🎯 Deployment Steps

### Step 1: Prepare Environment Variables

Siapkan environment variables berikut dari Supabase dashboard:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# Midtrans (Optional - for payments)
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false

# Resend (Optional - for emails)
RESEND_API_KEY=your_resend_api_key

# Twilio (Optional - for SMS/WhatsApp)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. **Login to Vercel**
   - Go to https://vercel.com
   - Login dengan GitHub account

2. **Import Project**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose: `bukdan69/kiroku`

3. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Add Environment Variables**
   - Go to "Environment Variables" section
   - Add all variables from Step 1
   - Make sure to add for all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-5 minutes)

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? kiroku (or your choice)
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add DATABASE_URL
# ... add all other variables

# Deploy to production
vercel --prod
```

### Step 3: Post-Deployment Setup

1. **Verify Deployment**
   - Check deployment URL (e.g., https://kiroku.vercel.app)
   - Test landing page
   - Test auth page
   - Test platform login

2. **Update Supabase Settings**
   - Go to Supabase Dashboard
   - Authentication > URL Configuration
   - Add Vercel URL to "Site URL"
   - Add to "Redirect URLs":
     ```
     https://your-app.vercel.app/auth/callback
     https://your-app.vercel.app/api/auth/callback
     ```

3. **Test Super Admin Login**
   - Go to: https://your-app.vercel.app/platform/login
   - Login with credentials from `SUPER_ADMIN_USERS.md`
   - Verify dashboard loads correctly

4. **Configure Custom Domain (Optional)**
   - Go to Vercel Dashboard > Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed
   - Update Supabase redirect URLs with new domain

---

## 🔧 Build Configuration

### package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  }
}
```

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sin1"]
}
```

### Next.js Configuration
- Framework: Next.js 16.1.5
- React: 19.0.0
- TypeScript: 5.x
- Output: Standalone (optimized)

---

## 🌍 Recommended Settings

### Vercel Project Settings

**General**
- Framework: Next.js
- Node.js Version: 20.x (recommended)
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables**
- Add all required variables
- Set for: Production, Preview, Development
- Use Vercel Secrets for sensitive data

**Domains**
- Primary: your-app.vercel.app
- Custom: your-domain.com (optional)

**Git Integration**
- Auto-deploy: main branch
- Preview deployments: All branches
- Production branch: main

---

## 🔐 Security Checklist

### Before Production

- [ ] Update all environment variables
- [ ] Use production API keys (not test keys)
- [ ] Enable Supabase RLS policies
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable HTTPS only
- [ ] Configure CSP headers
- [ ] Review authentication flows
- [ ] Test payment gateway (production mode)
- [ ] Set up error monitoring (Sentry, etc.)

### Supabase Security

- [ ] Enable RLS on all tables
- [ ] Review and test RLS policies
- [ ] Rotate service role key if exposed
- [ ] Enable email confirmation
- [ ] Configure password requirements
- [ ] Set up MFA (optional)
- [ ] Review API rate limits

---

## 📊 Performance Optimization

### Vercel Settings

**Caching**
- Enable Edge Caching
- Configure Cache-Control headers
- Use ISR for static pages

**Analytics**
- Enable Vercel Analytics
- Monitor Core Web Vitals
- Track page performance

**Speed Insights**
- Enable Speed Insights
- Monitor real user metrics
- Optimize based on data

---

## 🐛 Troubleshooting

### Build Fails

**Error: TypeScript compilation failed**
```bash
# Run locally first
npm run build

# Fix any TypeScript errors
# Then commit and push
```

**Error: Missing environment variables**
```bash
# Check Vercel dashboard
# Ensure all required variables are set
# Redeploy after adding variables
```

**Error: Database connection failed**
```bash
# Verify DATABASE_URL is correct
# Check Supabase connection pooler
# Use connection pooler URL for production
```

### Runtime Errors

**Error: Supabase client initialization failed**
- Check NEXT_PUBLIC_SUPABASE_URL
- Check NEXT_PUBLIC_SUPABASE_ANON_KEY
- Verify keys are for correct project

**Error: Authentication not working**
- Check Supabase redirect URLs
- Verify Site URL in Supabase
- Check middleware configuration

**Error: Database queries failing**
- Check RLS policies
- Verify service role key
- Check database connection

---

## 📈 Monitoring & Maintenance

### Vercel Dashboard

**Deployments**
- Monitor build status
- Check deployment logs
- Review preview deployments

**Analytics**
- Page views
- User sessions
- Performance metrics

**Logs**
- Runtime logs
- Error tracking
- API request logs

### Supabase Dashboard

**Database**
- Monitor query performance
- Check connection pool
- Review slow queries

**Authentication**
- Monitor user signups
- Check failed logins
- Review security events

**Storage**
- Monitor usage
- Check file uploads
- Review access logs

---

## 🔄 Continuous Deployment

### Automatic Deployments

**Production (main branch)**
```bash
git push origin main
# Automatically deploys to production
```

**Preview (feature branches)**
```bash
git push origin feature/new-feature
# Creates preview deployment
# URL: https://kiroku-git-feature-new-feature.vercel.app
```

### Manual Deployments

```bash
# Deploy specific branch
vercel --prod

# Rollback to previous deployment
vercel rollback
```

---

## 📝 Post-Deployment Checklist

### Immediate Tasks
- [ ] Verify deployment successful
- [ ] Test all main pages
- [ ] Test authentication flow
- [ ] Test super admin login
- [ ] Check database connection
- [ ] Verify environment variables

### Within 24 Hours
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Test payment flow (if configured)
- [ ] Test notification system
- [ ] Review security settings
- [ ] Set up monitoring alerts

### Within 1 Week
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Enable analytics
- [ ] Configure backup strategy
- [ ] Document production URLs
- [ ] Train team on deployment process

---

## 🔗 Useful Links

### Vercel
- **Dashboard**: https://vercel.com/dashboard
- **Documentation**: https://vercel.com/docs
- **CLI Docs**: https://vercel.com/docs/cli

### Project
- **GitHub**: https://github.com/bukdan69/kiroku
- **Supabase**: https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr

### Support
- **Vercel Support**: https://vercel.com/support
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs

---

## 💡 Tips

### Development Workflow
1. Develop locally on feature branch
2. Test thoroughly
3. Push to GitHub
4. Review preview deployment
5. Merge to main for production

### Environment Management
- Use Vercel Secrets for sensitive data
- Keep .env.example updated
- Document all required variables
- Never commit .env files

### Performance
- Use Edge Functions where possible
- Enable caching for static content
- Optimize images with next/image
- Monitor Core Web Vitals

---

## ✨ Ready to Deploy!

Sistem sudah siap untuk production deployment:

✅ Code quality: Excellent  
✅ TypeScript: No errors  
✅ Build: Successful  
✅ Configuration: Complete  
✅ Documentation: Ready  

**Next Step:** Follow Step 1-3 above to deploy! 🚀

---

**Last Updated:** 2026-01-31  
**Status:** ✅ Ready for Vercel Deployment  
**Estimated Deploy Time:** 2-5 minutes
