CREATE TYPE "public"."arisan_period_status" AS ENUM('active', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."arisan_role" AS ENUM('participant', 'admin', 'winner');--> statement-breakpoint
CREATE TYPE "public"."fraud_risk_level" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."kyc_status" AS ENUM('not_submitted', 'pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."notification_status" AS ENUM('pending', 'sent', 'failed');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('payment_reminder', 'winner_notification', 'payout_notification', 'arisan_notification');--> statement-breakpoint
CREATE TYPE "public"."onboarding_step" AS ENUM('profile_setup', 'kyc_verification', 'first_arisan', 'completed');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'completed', 'failed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."transaction_source" AS ENUM('payment', 'withdrawal', 'commission', 'refund');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('deposit', 'withdrawal', 'payment', 'commission', 'fee');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin', 'bandar');--> statement-breakpoint
CREATE TYPE "public"."wallet_status" AS ENUM('active', 'frozen', 'closed');--> statement-breakpoint
CREATE TYPE "public"."withdrawal_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "affiliate_commissions" (
	"id" text PRIMARY KEY NOT NULL,
	"affiliate_referral_id" text NOT NULL,
	"referred_user_id" text NOT NULL,
	"transaction_id" text,
	"arisan_id" text,
	"commission_amount" numeric NOT NULL,
	"base_amount" numeric NOT NULL,
	"commission_rate" numeric NOT NULL,
	"status" "withdrawal_status" DEFAULT 'pending',
	"withdrawn_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "affiliate_referrals" (
	"id" text PRIMARY KEY NOT NULL,
	"bandar_id" text NOT NULL,
	"affiliate_user_id" text,
	"affiliate_code" text,
	"referred_user_id" text,
	"commission_rate" numeric DEFAULT '2.00',
	"total_commission_earned" numeric DEFAULT '0',
	"total_commission_withdrawn" numeric DEFAULT '0',
	"kyc_status" "kyc_status" DEFAULT 'not_submitted',
	"kyc_verified_at" timestamp,
	"wallet_frozen" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "affiliate_referrals_affiliate_user_id_unique" UNIQUE("affiliate_user_id"),
	CONSTRAINT "affiliate_referrals_affiliate_code_unique" UNIQUE("affiliate_code")
);
--> statement-breakpoint
CREATE TABLE "arisan_groups" (
	"id" text PRIMARY KEY NOT NULL,
	"admin_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"image_url" text,
	"max_participants" integer DEFAULT 10,
	"contribution_amount" numeric NOT NULL,
	"total_periods" integer NOT NULL,
	"current_period" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"invite_code" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "arisan_groups_invite_code_unique" UNIQUE("invite_code")
);
--> statement-breakpoint
CREATE TABLE "arisan_participants" (
	"id" text PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"period_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" "arisan_role" DEFAULT 'participant',
	"has_paid" boolean DEFAULT false,
	"paid_at" timestamp,
	"has_logged_in" boolean DEFAULT false,
	"logged_in_at" timestamp,
	"payment_intent_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arisan_periods" (
	"id" text PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"period_number" integer NOT NULL,
	"status" "arisan_period_status" DEFAULT 'active',
	"start_date" timestamp DEFAULT now() NOT NULL,
	"draw_date" timestamp,
	"payment_deadline" timestamp,
	"all_paid_at" timestamp,
	"all_logged_in_at" timestamp,
	"ready_to_draw_at" timestamp,
	"winner_id" text,
	"prize_amount" numeric,
	"platform_fee" numeric,
	"admin_fee" numeric,
	"affiliate_fee" numeric,
	"winner_amount" numeric,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arisan_winners" (
	"id" text PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"period_id" text,
	"user_id" text NOT NULL,
	"period_number" integer NOT NULL,
	"draw_commit" text,
	"draw_reveal" text,
	"winner_selected_at" timestamp DEFAULT now() NOT NULL,
	"prize_amount" numeric NOT NULL,
	"winner_amount" numeric NOT NULL,
	"platform_fee" numeric NOT NULL,
	"admin_fee" numeric NOT NULL,
	"affiliate_fee" numeric,
	"paid_out" boolean DEFAULT false,
	"paid_out_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "arisan_winners_period_id_unique" UNIQUE("period_id"),
	CONSTRAINT "arisan_winners_draw_commit_unique" UNIQUE("draw_commit")
);
--> statement-breakpoint
CREATE TABLE "fraud_assessments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"risk_level" "fraud_risk_level" DEFAULT 'low',
	"risk_score" integer DEFAULT 0,
	"reasons" jsonb,
	"location_jump_detected" boolean DEFAULT false,
	"multiple_devices_detected" boolean DEFAULT false,
	"ip_change_detected" boolean DEFAULT false,
	"suspicious_activity_detected" boolean DEFAULT false,
	"wallet_frozen" boolean DEFAULT false,
	"account_frozen" boolean DEFAULT false,
	"auto_banned" boolean DEFAULT false,
	"reviewed" boolean DEFAULT false,
	"reviewed_by" text,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kyc_verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"ktp_number" text,
	"ktp_image_url" text,
	"selfie_image_url" text,
	"ktp_with_selfie_image_url" text,
	"address_proof_image_url" text,
	"status" "kyc_status" DEFAULT 'not_submitted',
	"rejection_reason" text,
	"reviewed_by" text,
	"reviewed_at" timestamp,
	"submitted_at" timestamp,
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "kyc_verifications_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "login_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"device_id" text,
	"location_id" integer,
	"ip_address" text,
	"geo_country" text,
	"geo_city" text,
	"login_success" boolean DEFAULT true,
	"failure_reason" text,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" "notification_type" NOT NULL,
	"status" "notification_status" DEFAULT 'pending',
	"title" text,
	"message" text NOT NULL,
	"phone_number" text,
	"message_id" text,
	"sent_at" timestamp,
	"failed_at" timestamp,
	"error_message" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "onboarding_analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"current_step" "onboarding_step",
	"step1_started_at" timestamp,
	"step1_completed_at" timestamp,
	"step2_started_at" timestamp,
	"step2_completed_at" timestamp,
	"step3_started_at" timestamp,
	"step3_completed_at" timestamp,
	"completed_at" timestamp,
	"total_duration" integer,
	"abandoned_at" timestamp,
	"abandonment_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_intents" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"arisan_participant_id" text,
	"amount" numeric NOT NULL,
	"status" "payment_status" DEFAULT 'pending',
	"payment_method" text,
	"payment_gateway" text,
	"gateway_transaction_id" text,
	"payment_deadline" timestamp,
	"reminder_7day_sent" boolean DEFAULT false,
	"reminder_3day_sent" boolean DEFAULT false,
	"reminder_1day_sent" boolean DEFAULT false,
	"completed_at" timestamp,
	"failed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"phone_number" text,
	"address" text,
	"city" text,
	"province" text,
	"postal_code" text,
	"date_of_birth" timestamp,
	"bio" text,
	"onboarding_completed" boolean DEFAULT false,
	"onboarding_step" "onboarding_step" DEFAULT 'profile_setup',
	"onboarding_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"domain" text,
	"settings" jsonb,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"wallet_id" text NOT NULL,
	"user_id" text NOT NULL,
	"type" "transaction_type" NOT NULL,
	"source" "transaction_source" NOT NULL,
	"amount" numeric NOT NULL,
	"balance_before" numeric NOT NULL,
	"balance_after" numeric NOT NULL,
	"description" text,
	"reference_id" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_devices" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"device_fingerprint" text NOT NULL,
	"user_agent" text,
	"device_type" text,
	"os" text,
	"browser" text,
	"last_used_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"latitude" numeric NOT NULL,
	"longitude" numeric NOT NULL,
	"address" text,
	"city" text,
	"country" text,
	"ip_address" text,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"enable_email_notifications" boolean DEFAULT true,
	"enable_sms_notifications" boolean DEFAULT true,
	"enable_wa_notifications" boolean DEFAULT true,
	"enable_push_notifications" boolean DEFAULT true,
	"payment_reminder_enabled" boolean DEFAULT true,
	"payout_notification_enabled" boolean DEFAULT true,
	"winner_notification_enabled" boolean DEFAULT true,
	"arisan_notification_enabled" boolean DEFAULT true,
	"language" text DEFAULT 'id',
	"timezone" text DEFAULT 'Asia/Jakarta',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_preferences_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"google_id" text,
	"email" text NOT NULL,
	"name" text,
	"avatar" text,
	"role" "user_role" DEFAULT 'user',
	"email_verified" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp,
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"balance" numeric DEFAULT '0' NOT NULL,
	"frozen_balance" numeric DEFAULT '0' NOT NULL,
	"status" "wallet_status" DEFAULT 'active',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wallets_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "withdrawals" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"wallet_id" text NOT NULL,
	"amount" numeric NOT NULL,
	"status" "withdrawal_status" DEFAULT 'pending',
	"bank_name" text,
	"bank_account_number" text,
	"bank_account_name" text,
	"reason" text,
	"processed_by" text,
	"processed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "affiliate_commissions" ADD CONSTRAINT "affiliate_commissions_affiliate_referral_id_affiliate_referrals_id_fk" FOREIGN KEY ("affiliate_referral_id") REFERENCES "public"."affiliate_referrals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "affiliate_commissions" ADD CONSTRAINT "affiliate_commissions_referred_user_id_users_id_fk" FOREIGN KEY ("referred_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "affiliate_commissions" ADD CONSTRAINT "affiliate_commissions_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "affiliate_commissions" ADD CONSTRAINT "affiliate_commissions_arisan_id_arisan_periods_id_fk" FOREIGN KEY ("arisan_id") REFERENCES "public"."arisan_periods"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "affiliate_referrals" ADD CONSTRAINT "affiliate_referrals_bandar_id_users_id_fk" FOREIGN KEY ("bandar_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "affiliate_referrals" ADD CONSTRAINT "affiliate_referrals_affiliate_user_id_users_id_fk" FOREIGN KEY ("affiliate_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "affiliate_referrals" ADD CONSTRAINT "affiliate_referrals_referred_user_id_users_id_fk" FOREIGN KEY ("referred_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arisan_groups" ADD CONSTRAINT "arisan_groups_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arisan_participants" ADD CONSTRAINT "arisan_participants_group_id_arisan_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."arisan_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arisan_participants" ADD CONSTRAINT "arisan_participants_period_id_arisan_periods_id_fk" FOREIGN KEY ("period_id") REFERENCES "public"."arisan_periods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arisan_participants" ADD CONSTRAINT "arisan_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arisan_periods" ADD CONSTRAINT "arisan_periods_group_id_arisan_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."arisan_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arisan_periods" ADD CONSTRAINT "arisan_periods_winner_id_users_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arisan_winners" ADD CONSTRAINT "arisan_winners_group_id_arisan_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."arisan_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arisan_winners" ADD CONSTRAINT "arisan_winners_period_id_arisan_periods_id_fk" FOREIGN KEY ("period_id") REFERENCES "public"."arisan_periods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arisan_winners" ADD CONSTRAINT "arisan_winners_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fraud_assessments" ADD CONSTRAINT "fraud_assessments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fraud_assessments" ADD CONSTRAINT "fraud_assessments_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kyc_verifications" ADD CONSTRAINT "kyc_verifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kyc_verifications" ADD CONSTRAINT "kyc_verifications_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "login_logs" ADD CONSTRAINT "login_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "login_logs" ADD CONSTRAINT "login_logs_device_id_user_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."user_devices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "login_logs" ADD CONSTRAINT "login_logs_location_id_user_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."user_locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_logs" ADD CONSTRAINT "notification_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding_analytics" ADD CONSTRAINT "onboarding_analytics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_intents" ADD CONSTRAINT "payment_intents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_intents" ADD CONSTRAINT "payment_intents_arisan_participant_id_arisan_participants_id_fk" FOREIGN KEY ("arisan_participant_id") REFERENCES "public"."arisan_participants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_devices" ADD CONSTRAINT "user_devices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_locations" ADD CONSTRAINT "user_locations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "withdrawals" ADD CONSTRAINT "withdrawals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "withdrawals" ADD CONSTRAINT "withdrawals_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "withdrawals" ADD CONSTRAINT "withdrawals_processed_by_users_id_fk" FOREIGN KEY ("processed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;