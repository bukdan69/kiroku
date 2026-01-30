export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          google_id: string | null
          email: string
          name: string | null
          avatar: string | null
          role: 'user' | 'admin' | 'bandar'
          email_verified: string | null
          created_at: string
          updated_at: string
          last_login_at: string | null
        }
        Insert: {
          id: string
          google_id?: string | null
          email: string
          name?: string | null
          avatar?: string | null
          role?: 'user' | 'admin' | 'bandar' | null
          email_verified?: string | null
          created_at?: string | null
          updated_at?: string | null
          last_login_at?: string | null
        }
        Update: {
          id?: string
          google_id?: string | null
          email?: string | null
          name?: string | null
          avatar?: string | null
          role?: 'user' | 'admin' | 'bandar' | null
          email_verified?: string | null
          created_at?: string | null
          updated_at?: string | null
          last_login_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          phone_number: string | null
          address: string | null
          city: string | null
          province: string | null
          postal_code: string | null
          date_of_birth: string | null
          bio: string | null
          onboarding_completed: boolean
          onboarding_step: 'profile_setup' | 'kyc_verification' | 'first_arisan' | 'completed'
          onboarding_data: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          phone_number?: string | null
          address?: string | null
          city?: string | null
          province?: string | null
          postal_code?: string | null
          date_of_birth?: string | null
          bio?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: 'profile_setup' | 'kyc_verification' | 'first_arisan' | 'completed' | null
          onboarding_data?: any | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          phone_number?: string | null
          address?: string | null
          city?: string | null
          province?: string | null
          postal_code?: string | null
          date_of_birth?: string | null
          bio?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: 'profile_setup' | 'kyc_verification' | 'first_arisan' | 'completed' | null
          onboarding_data?: any | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          balance: string
          frozen_balance: string
          status: 'active' | 'frozen' | 'closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          balance?: string | null
          frozen_balance?: string | null
          status?: 'active' | 'frozen' | 'closed' | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          balance?: string | null
          frozen_balance?: string | null
          status?: 'active' | 'frozen' | 'closed' | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      arisan_groups: {
        Row: {
          id: string
          admin_id: string
          name: string
          description: string | null
          image_url: string | null
          max_participants: number | null
          contribution_amount: string
          total_periods: number
          current_period: number | null
          is_active: boolean
          invite_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          admin_id: string
          name: string
          description?: string | null
          image_url?: string | null
          max_participants?: number | null
          contribution_amount: string
          total_periods: number
          current_period?: number | null
          is_active?: boolean | null
          invite_code?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          admin_id?: string | null
          name?: string | null
          description?: string | null
          image_url?: string | null
          max_participants?: number | null
          contribution_amount?: string | null
          total_periods?: number | null
          current_period?: number | null
          is_active?: boolean | null
          invite_code?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      arisan_periods: {
        Row: {
          id: string
          group_id: string
          period_number: number
          status: 'active' | 'completed' | 'cancelled'
          start_date: string
          draw_date: string | null
          payment_deadline: string | null
          all_paid_at: string | null
          all_logged_in_at: string | null
          ready_to_draw_at: string | null
          winner_id: string | null
          prize_amount: string | null
          platform_fee: string | null
          admin_fee: string | null
          affiliate_fee: string | null
          winner_amount: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          group_id: string
          period_number: number
          status?: 'active' | 'completed' | 'cancelled' | null
          start_date?: string | null
          draw_date?: string | null
          payment_deadline?: string | null
          all_paid_at?: string | null
          all_logged_in_at?: string | null
          ready_to_draw_at?: string | null
          winner_id?: string | null
          prize_amount?: string | null
          platform_fee?: string | null
          admin_fee?: string | null
          affiliate_fee?: string | null
          winner_amount?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          group_id?: string | null
          period_number?: number | null
          status?: 'active' | 'completed' | 'cancelled' | null
          start_date?: string | null
          draw_date?: string | null
          payment_deadline?: string | null
          all_paid_at?: string | null
          all_logged_in_at?: string | null
          ready_to_draw_at?: string | null
          winner_id?: string | null
          prize_amount?: string | null
          platform_fee?: string | null
          admin_fee?: string | null
          affiliate_fee?: string | null
          winner_amount?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      arisan_participants: {
        Row: {
          id: string
          group_id: string
          period_id: string
          user_id: string
          role: 'participant' | 'admin' | 'winner'
          has_paid: boolean
          paid_at: string | null
          has_logged_in: boolean
          logged_in_at: string | null
          payment_intent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          group_id: string
          period_id: string
          user_id: string
          role?: 'participant' | 'admin' | 'winner' | null
          has_paid?: boolean | null
          paid_at?: string | null
          has_logged_in?: boolean | null
          logged_in_at?: string | null
          payment_intent_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          group_id?: string | null
          period_id?: string | null
          user_id?: string | null
          role?: 'participant' | 'admin' | 'winner' | null
          has_paid?: boolean | null
          paid_at?: string | null
          has_logged_in?: boolean | null
          logged_in_at?: string | null
          payment_intent_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {
      user_role: 'user' | 'admin' | 'bandar'
      kyc_status: 'not_submitted' | 'pending' | 'approved' | 'rejected'
      withdrawal_status: 'pending' | 'approved' | 'rejected'
      arisan_role: 'participant' | 'admin' | 'winner'
      arisan_period_status: 'active' | 'completed' | 'cancelled'
      payment_status: 'pending' | 'completed' | 'failed' | 'cancelled'
      transaction_type: 'deposit' | 'withdrawal' | 'payment' | 'commission' | 'fee'
      transaction_source: 'payment' | 'withdrawal' | 'commission' | 'refund'
      wallet_status: 'active' | 'frozen' | 'closed'
      fraud_risk_level: 'low' | 'medium' | 'high'
      notification_status: 'pending' | 'sent' | 'failed'
      notification_type: 'payment_reminder' | 'winner_notification' | 'payout_notification' | 'arisan_notification'
      onboarding_step: 'profile_setup' | 'kyc_verification' | 'first_arisan' | 'completed'
    }
  }
}