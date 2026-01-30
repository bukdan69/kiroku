import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

export const databaseConfig = {
  // Supabase Configuration
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  databaseUrl: process.env.DATABASE_URL!,

  // Google OAuth Configuration
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,

  // Application Configuration
  nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  nextAuthSecret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // Business Configuration
  trialDays: parseInt(process.env.NEXT_PUBLIC_TRIAL_DAYS || '14'),
  minPayout: parseInt(process.env.NEXT_PUBLIC_MIN_PAYOUT || '500000'),

  // Payment Configuration (Midtrans)
  merchantId: process.env.MERCHANT_ID!,
  midtransServerKey: process.env.MIDTRANS_SERVER_KEY!,
  midtransClientKey: process.env.MIDTRANS_CLIENT_KEY!,

  // Development Configuration
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
}

export default databaseConfig