"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

interface UserRoleContextType {
  isSuperAdmin: boolean
  isAdmin: boolean
  isModerator: boolean
  loading: boolean
  roles: string[]
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined)

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isModerator, setIsModerator] = useState(false)
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState<string[]>([])

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setIsSuperAdmin(false)
        setIsAdmin(false)
        setIsModerator(false)
        setRoles([])
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/user/role')
        if (!response.ok) {
          throw new Error('Failed to check role')
        }
        const data = await response.json()
        setRoles(data.roles)
        setIsSuperAdmin(data.isSuperAdmin)
        setIsAdmin(data.isAdmin)
        setIsModerator(data.isModerator)
      } catch (error) {
        console.error('Error checking role:', error)
        setIsSuperAdmin(false)
        setIsAdmin(false)
        setIsModerator(false)
        setRoles([])
      } finally {
        setLoading(false)
      }
    }

    checkRole()
  }, [user])

  const value: UserRoleContextType = {
    isSuperAdmin,
    isAdmin,
    isModerator,
    loading,
    roles,
  }

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  )
}

export function useUserRole() {
  const context = useContext(UserRoleContext)
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider')
  }
  return context
}