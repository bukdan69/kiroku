import { pgTable, text, timestamp, boolean, integer, numeric, uuid, jsonb, pgEnum, serial } from 'drizzle-orm/pg-core'

// Enums
export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'moderator', 'super_admin', 'bandar'])
export const kycStatusEnum = pgEnum('kyc_status', ['not_submitted', 'pending', 'approved', 'rejected'])
export const withdrawalStatusEnum = pgEnum('withdrawal_status', ['pending', 'approved', 'rejected'])
export const arisanRoleEnum = pgEnum('arisan_role', ['participant', 'admin', 'winner'])
export const arisanPeriodStatusEnum = pgEnum('arisan_period_status', ['active', 'completed', 'cancelled'])
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'completed', 'failed', 'cancelled', 'refunded'])
export const transactionTypeEnum = pgEnum('transaction_type', ['deposit', 'withdrawal', 'payment', 'commission', 'fee', 'refund'])
export const transactionSourceEnum = pgEnum('transaction_source', ['payment', 'withdrawal', 'commission', 'refund', 'escrow'])
export const walletStatusEnum = pgEnum('wallet_status', ['active', 'frozen', 'closed'])
export const fraudRiskLevelEnum = pgEnum('fraud_risk_level', ['low', 'medium', 'high', 'critical'])
export const notificationStatusEnum = pgEnum('notification_status', ['pending', 'sent', 'failed'])
export const notificationTypeEnum = pgEnum('notification_type', ['payment_reminder', 'winner_notification', 'payout_notification', 'arisan_notification', 'violation', 'kyc_status', 'draw_result'])
export const onboardingStepEnum = pgEnum('onboarding_step', ['profile_setup', 'kyc_verification', 'first_arisan', 'completed'])
export const auditActionEnum = pgEnum('audit_action', ['create', 'update', 'delete', 'login', 'logout', 'payment', 'draw', 'kyc_review', 'admin_action'])
export const violationTypeEnum = pgEnum('violation_type', ['late_payment', 'missing_login', 'fraud_suspicion', 'multiple_accounts', 'policy_violation'])
export const strikeStatusEnum = pgEnum('strike_status', ['active', 'expired', 'resolved'])

// Multi-tenant System
export const tenants = pgTable('tenants', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  domain: text('domain').unique(),
  settings: jsonb('settings'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// User Management
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatar: text('avatar'),
  role: userRoleEnum('role').default('user'),
  emailVerified: timestamp('email_verified'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at'),
})

export const userRoles = pgTable('user_roles', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  role: userRoleEnum('role').notNull(),
  assignedBy: text('assigned_by').references(() => users.id),
  assignedAt: timestamp('assigned_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at'),
})

// User Profiles
export const profiles = pgTable('profiles', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  phoneNumber: text('phone_number'),
  address: text('address'),
  city: text('city'),
  province: text('province'),
  postalCode: text('postal_code'),
  dateOfBirth: timestamp('date_of_birth'),
  bio: text('bio'),
  onboardingCompleted: boolean('onboarding_completed').default(false),
  onboardingStep: onboardingStepEnum('onboarding_step').default('profile_setup'),
  onboardingData: jsonb('onboarding_data'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Wallet System
export const wallets = pgTable('wallets', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  balance: numeric('balance').default('0').notNull(),
  frozenBalance: numeric('frozen_balance').default('0').notNull(),
  escrowBalance: numeric('escrow_balance').default('0').notNull(),
  status: walletStatusEnum('status').default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Transaction System
export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  walletId: text('wallet_id').references(() => wallets.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  type: transactionTypeEnum('type').notNull(),
  source: transactionSourceEnum('source').notNull(),
  amount: numeric('amount').notNull(),
  balanceBefore: numeric('balance_before').notNull(),
  balanceAfter: numeric('balance_after').notNull(),
  description: text('description'),
  referenceId: text('reference_id'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Arisan Groups
export const arisanGroups = pgTable('arisan_groups', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  adminId: text('admin_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  maxParticipants: integer('max_participants').default(10),
  contributionAmount: numeric('contribution_amount').notNull(),
  totalPeriods: integer('total_periods').notNull(),
  currentPeriod: integer('current_period').default(0),
  isActive: boolean('is_active').default(true),
  inviteCode: text('invite_code').unique(),
  settings: jsonb('settings'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Arisan Periods
export const arisanPeriods = pgTable('arisan_periods', {
  id: text('id').primaryKey(),
  groupId: text('group_id').references(() => arisanGroups.id, { onDelete: 'cascade' }).notNull(),
  periodNumber: integer('period_number').notNull(),
  status: arisanPeriodStatusEnum('status').default('active'),
  startDate: timestamp('start_date').defaultNow().notNull(),
  drawDate: timestamp('draw_date'),
  paymentDeadline: timestamp('payment_deadline'),
  allPaidAt: timestamp('all_paid_at'),
  allLoggedInAt: timestamp('all_logged_in_at'),
  readyToDrawAt: timestamp('ready_to_draw_at'),
  winnerId: text('winner_id').references(() => users.id),
  prizeAmount: numeric('prize_amount'),
  platformFee: numeric('platform_fee'),
  adminFee: numeric('admin_fee'),
  affiliateFee: numeric('affiliate_fee'),
  winnerAmount: numeric('winner_amount'),
  drawCommit: text('draw_commit'),
  drawReveal: text('draw_reveal'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Arisan Members
export const arisanMembers = pgTable('arisan_members', {
  id: text('id').primaryKey(),
  groupId: text('group_id').references(() => arisanGroups.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: arisanRoleEnum('role').default('participant'),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Arisan Period Participants
export const arisanPeriodParticipants = pgTable('arisan_period_participants', {
  id: text('id').primaryKey(),
  groupId: text('group_id').references(() => arisanGroups.id, { onDelete: 'cascade' }).notNull(),
  periodId: text('period_id').references(() => arisanPeriods.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: arisanRoleEnum('role').default('participant'),
  hasPaid: boolean('has_paid').default(false),
  paidAt: timestamp('paid_at'),
  hasLoggedIn: boolean('has_logged_in').default(false),
  loggedInAt: timestamp('logged_in_at'),
  paymentIntentId: text('payment_intent_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Arisan Winners
export const arisanWinners = pgTable('arisan_winners', {
  id: text('id').primaryKey(),
  groupId: text('group_id').references(() => arisanGroups.id, { onDelete: 'cascade' }).notNull(),
  periodId: text('period_id').references(() => arisanPeriods.id, { onDelete: 'cascade' }).unique(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  periodNumber: integer('period_number').notNull(),
  winnerSelectedAt: timestamp('winner_selected_at').defaultNow().notNull(),
  prizeAmount: numeric('prize_amount').notNull(),
  winnerAmount: numeric('winner_amount').notNull(),
  platformFee: numeric('platform_fee').notNull(),
  adminFee: numeric('admin_fee').notNull(),
  affiliateFee: numeric('affiliate_fee'),
  paidOut: boolean('paid_out').default(false),
  paidOutAt: timestamp('paid_out_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// KYC System
export const kycVerifications = pgTable('kyc_verifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).unique(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  ktpNumber: text('ktp_number'),
  ktpImageUrl: text('ktp_image_url'),
  selfieImageUrl: text('selfie_image_url'),
  ktpWithSelfieImageUrl: text('ktp_with_selfie_image_url'),
  addressProofImageUrl: text('address_proof_image_url'),
  status: kycStatusEnum('status').default('not_submitted'),
  rejectionReason: text('rejection_reason'),
  reviewedBy: text('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  submittedAt: timestamp('submitted_at'),
  approvedAt: timestamp('approved_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Security & Fraud Detection
export const fraudAssessments = pgTable('fraud_assessments', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  riskLevel: fraudRiskLevelEnum('risk_level').default('low'),
  riskScore: integer('risk_score').default(0),
  reasons: jsonb('reasons'),
  locationJumpDetected: boolean('location_jump_detected').default(false),
  multipleDevicesDetected: boolean('multiple_devices_detected').default(false),
  ipChangeDetected: boolean('ip_change_detected').default(false),
  suspiciousActivityDetected: boolean('suspicious_activity_detected').default(false),
  walletFrozen: boolean('wallet_frozen').default(false),
  accountFrozen: boolean('account_frozen').default(false),
  autoBanned: boolean('auto_banned').default(false),
  reviewed: boolean('reviewed').default(false),
  reviewedBy: text('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const userDevices = pgTable('user_devices', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  deviceFingerprint: text('device_fingerprint').notNull(),
  userAgent: text('user_agent'),
  deviceType: text('device_type'),
  os: text('os'),
  browser: text('browser'),
  lastUsedAt: timestamp('last_used_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const userLocations = pgTable('user_locations', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  latitude: numeric('latitude').notNull(),
  longitude: numeric('longitude').notNull(),
  address: text('address'),
  city: text('city'),
  country: text('country'),
  ipAddress: text('ip_address'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
})

export const loginLogs = pgTable('login_logs', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  deviceId: text('device_id').references(() => userDevices.id),
  locationId: integer('location_id').references(() => userLocations.id),
  ipAddress: text('ip_address'),
  geoCountry: text('geo_country'),
  geoCity: text('geo_city'),
  loginSuccess: boolean('login_success').default(true),
  failureReason: text('failure_reason'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
})

// Violation System
export const violations = pgTable('violations', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  groupId: text('group_id').references(() => arisanGroups.id),
  periodId: text('period_id').references(() => arisanPeriods.id),
  type: violationTypeEnum('type').notNull(),
  description: text('description'),
  severity: text('severity').default('low'),
  status: text('status').default('active'),
  resolvedAt: timestamp('resolved_at'),
  resolvedBy: text('resolved_by').references(() => users.id),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const strikes = pgTable('strikes', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  violationId: text('violation_id').references(() => violations.id, { onDelete: 'cascade' }),
  reason: text('reason').notNull(),
  status: strikeStatusEnum('status').default('active'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Payment System
export const paymentIntents = pgTable('payment_intents', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  arisanMemberId: text('arisan_member_id').references(() => arisanMembers.id),
  amount: numeric('amount').notNull(),
  status: paymentStatusEnum('status').default('pending'),
  paymentMethod: text('payment_method'),
  paymentGateway: text('payment_gateway'),
  gatewayTransactionId: text('gateway_transaction_id'),
  paymentDeadline: timestamp('payment_deadline'),
  reminder7DaySent: boolean('reminder_7day_sent').default(false),
  reminder3DaySent: boolean('reminder_3day_sent').default(false),
  reminder1DaySent: boolean('reminder_1day_sent').default(false),
  completedAt: timestamp('completed_at'),
  failedAt: timestamp('failed_at'),
  refundedAt: timestamp('refunded_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const withdrawals = pgTable('withdrawals', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  walletId: text('wallet_id').references(() => wallets.id, { onDelete: 'cascade' }).notNull(),
  amount: numeric('amount').notNull(),
  status: withdrawalStatusEnum('status').default('pending'),
  bankName: text('bank_name'),
  bankAccountNumber: text('bank_account_number'),
  bankAccountName: text('bank_account_name'),
  reason: text('reason'),
  processedBy: text('processed_by').references(() => users.id),
  processedAt: timestamp('processed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Notification System
export const notificationLogs = pgTable('notification_logs', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  type: notificationTypeEnum('type').notNull(),
  status: notificationStatusEnum('status').default('pending'),
  title: text('title'),
  message: text('message').notNull(),
  phoneNumber: text('phone_number'),
  messageId: text('message_id'),
  sentAt: timestamp('sent_at'),
  failedAt: timestamp('failed_at'),
  errorMessage: text('error_message'),
  metadata: jsonb('metadata'),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// User Preferences
export const userPreferences = pgTable('user_preferences', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).unique(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  enableEmailNotifications: boolean('enable_email_notifications').default(true),
  enableSmsNotifications: boolean('enable_sms_notifications').default(true),
  enableWaNotifications: boolean('enable_wa_notifications').default(true),
  enablePushNotifications: boolean('enable_push_notifications').default(true),
  paymentReminderEnabled: boolean('payment_reminder_enabled').default(true),
  payoutNotificationEnabled: boolean('payout_notification_enabled').default(true),
  winnerNotificationEnabled: boolean('winner_notification_enabled').default(true),
  arisanNotificationEnabled: boolean('arisan_notification_enabled').default(true),
  language: text('language').default('id'),
  timezone: text('timezone').default('Asia/Jakarta'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Onboarding Analytics
export const onboardingAnalytics = pgTable('onboarding_analytics', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  currentStep: onboardingStepEnum('current_step'),
  step1StartedAt: timestamp('step1_started_at'),
  step1CompletedAt: timestamp('step1_completed_at'),
  step2StartedAt: timestamp('step2_started_at'),
  step2CompletedAt: timestamp('step2_completed_at'),
  step3StartedAt: timestamp('step3_started_at'),
  step3CompletedAt: timestamp('step3_completed_at'),
  completedAt: timestamp('completed_at'),
  totalDuration: integer('total_duration'),
  abandonedAt: timestamp('abandoned_at'),
  abandonmentReason: text('abandonment_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Audit System
export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  action: auditActionEnum('action').notNull(),
  entityType: text('entity_type'),
  entityId: text('entity_id'),
  oldValues: jsonb('old_values'),
  newValues: jsonb('new_values'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Affiliate System
export const affiliateReferrals = pgTable('affiliate_referrals', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  bandarId: text('bandar_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  affiliateUserId: text('affiliate_user_id').references(() => users.id, { onDelete: 'cascade' }).unique(),
  affiliateCode: text('affiliate_code').unique(),
  referredUserId: text('referred_user_id').references(() => users.id),
  commissionRate: numeric('commission_rate').default('2.00'),
  totalCommissionEarned: numeric('total_commission_earned').default('0'),
  totalCommissionWithdrawn: numeric('total_commission_withdrawn').default('0'),
  kycStatus: kycStatusEnum('kyc_status').default('not_submitted'),
  kycVerifiedAt: timestamp('kyc_verified_at'),
  walletFrozen: boolean('wallet_frozen').default(false),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const affiliateCommissions = pgTable('affiliate_commissions', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  affiliateReferralId: text('affiliate_referral_id').references(() => affiliateReferrals.id, { onDelete: 'cascade' }).notNull(),
  referredUserId: text('referred_user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  transactionId: text('transaction_id').references(() => transactions.id),
  arisanId: text('arisan_id').references(() => arisanPeriods.id),
  commissionAmount: numeric('commission_amount').notNull(),
  baseAmount: numeric('base_amount').notNull(),
  commissionRate: numeric('commission_rate').notNull(),
  status: withdrawalStatusEnum('status').default('pending'),
  withdrawnAt: timestamp('withdrawn_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Type exports
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Tenant = typeof tenants.$inferSelect
export type NewTenant = typeof tenants.$inferInsert
export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
export type Wallet = typeof wallets.$inferSelect
export type NewWallet = typeof wallets.$inferInsert
export type Transaction = typeof transactions.$inferSelect
export type NewTransaction = typeof transactions.$inferInsert
export type ArisanGroup = typeof arisanGroups.$inferSelect
export type NewArisanGroup = typeof arisanGroups.$inferInsert
export type ArisanPeriod = typeof arisanPeriods.$inferSelect
export type NewArisanPeriod = typeof arisanPeriods.$inferInsert
export type ArisanMember = typeof arisanMembers.$inferSelect
export type NewArisanMember = typeof arisanMembers.$inferInsert
export type ArisanPeriodParticipant = typeof arisanPeriodParticipants.$inferSelect
export type NewArisanPeriodParticipant = typeof arisanPeriodParticipants.$inferInsert
export type ArisanWinner = typeof arisanWinners.$inferSelect
export type NewArisanWinner = typeof arisanWinners.$inferInsert
export type KycVerification = typeof kycVerifications.$inferSelect
export type NewKycVerification = typeof kycVerifications.$inferInsert
export type FraudAssessment = typeof fraudAssessments.$inferSelect
export type NewFraudAssessment = typeof fraudAssessments.$inferInsert
export type UserDevice = typeof userDevices.$inferSelect
export type NewUserDevice = typeof userDevices.$inferInsert
export type UserLocation = typeof userLocations.$inferSelect
export type NewUserLocation = typeof userLocations.$inferInsert
export type LoginLog = typeof loginLogs.$inferSelect
export type NewLoginLog = typeof loginLogs.$inferInsert
export type Violation = typeof violations.$inferSelect
export type NewViolation = typeof violations.$inferInsert
export type Strike = typeof strikes.$inferSelect
export type NewStrike = typeof strikes.$inferInsert
export type PaymentIntent = typeof paymentIntents.$inferSelect
export type NewPaymentIntent = typeof paymentIntents.$inferInsert
export type Withdrawal = typeof withdrawals.$inferSelect
export type NewWithdrawal = typeof withdrawals.$inferInsert
export type NotificationLog = typeof notificationLogs.$inferSelect
export type NewNotificationLog = typeof notificationLogs.$inferInsert
export type UserPreference = typeof userPreferences.$inferSelect
export type NewUserPreference = typeof userPreferences.$inferInsert
export type OnboardingAnalytics = typeof onboardingAnalytics.$inferSelect
export type NewOnboardingAnalytics = typeof onboardingAnalytics.$inferInsert
export type AuditLog = typeof auditLogs.$inferSelect
export type NewAuditLog = typeof auditLogs.$inferInsert
export type AffiliateReferral = typeof affiliateReferrals.$inferSelect
export type NewAffiliateReferral = typeof affiliateReferrals.$inferInsert
export type AffiliateCommission = typeof affiliateCommissions.$inferSelect
export type NewAffiliateCommission = typeof affiliateCommissions.$inferInsert