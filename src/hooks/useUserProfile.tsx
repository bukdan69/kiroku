"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

interface UserProfileContextType {
  profile: any | null
  loading: boolean
  refetch: () => Promise<void>
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined)

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  // Fetch user profile
  const fetchProfile = async () => {
    if (!user) {
      setProfile(null)
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/user/profile')
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }
      const data = await response.json()
      setProfile(data.profile)
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  // Real-time subscription for profile updates
  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel(`profile:${user.id}`)
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'profiles',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload: any) => {
          console.log('Profile updated:', payload)
          setProfile(payload.new)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  // Initial fetch
  useEffect(() => {
    fetchProfile()
  }, [user])

  const value: UserProfileContextType = {
    profile,
    loading,
    refetch: fetchProfile,
  }

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  )
}

export function useUserProfile() {
  const context = useContext(UserProfileContext)
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider')
  }
  return context
}