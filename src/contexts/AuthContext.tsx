"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  selectedTenantId: string | null
  tenantName: string | null
  isSuperAdmin: boolean
  isAdmin: boolean
  setSelectedTenantId: (tenantId: string | null) => void
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null)
  const [tenantName, setTenantName] = useState<string | null>(null)
  const router = useRouter()
  
  const supabase = createClient()

  useEffect(() => {
    const getUserRole = async (userId: string) => {
      try {
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', userId)
          .single()
        
        return userData?.role || 'user'
      } catch (error) {
        console.error('Error fetching user role:', error)
        return 'user'
      }
    }

    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      
      // Fetch user role if session exists
      if (session?.user) {
        const role = await getUserRole(session.user.id)
        return role
      }
      return 'user'
    }

    const initializeAuth = async () => {
      const role = await getSession()
      console.log('User role:', role)
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: any, session: Session | null) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        if (session?.user) {
          const role = await getUserRole(session.user.id)
          console.log('User role after auth change:', role)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  // Simple role detection based on user metadata
  const isSuperAdmin = user?.user_metadata?.role === 'super_admin'
  const isAdmin = ['admin', 'bandar', 'super_admin'].includes(user?.user_metadata?.role || 'user')

  const value: AuthContextType = {
    user,
    session,
    loading,
    selectedTenantId,
    tenantName,
    isSuperAdmin,
    isAdmin,
    setSelectedTenantId,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useUserRole() {
  const { user } = useAuth()
  
  const isSuperAdmin = user?.user_metadata?.role === 'super_admin'
  const isAdmin = ['admin', 'bandar', 'super_admin'].includes(user?.user_metadata?.role || 'user')
  
  return { isSuperAdmin, isAdmin }
}