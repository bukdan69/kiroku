"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface CurrentTenantContextType {
  selectedTenantId: string | null
  tenantName: string | null
  loading: boolean
  setSelectedTenantId: (tenantId: string | null) => void
}

const CurrentTenantContext = createContext<CurrentTenantContextType | undefined>(undefined)

export function CurrentTenantProvider({ children }: { children: ReactNode }) {
  const { selectedTenantId, setSelectedTenantId } = useAuth()
  const [tenantName, setTenantName] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch tenant name when tenant changes
  useEffect(() => {
    const fetchTenant = async () => {
      if (!selectedTenantId) {
        setTenantName(null)
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        // This would be implemented with an API call
        // For now, use a placeholder
        setTenantName('Default Tenant')
      } catch (error) {
        console.error('Error fetching tenant:', error)
        setTenantName(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTenant()
  }, [selectedTenantId])

  const value: CurrentTenantContextType = {
    selectedTenantId,
    tenantName,
    loading,
    setSelectedTenantId,
  }

  return React.createElement(
    CurrentTenantContext.Provider,
    { value },
    children
  )
}

export function useCurrentTenant() {
  const context = useContext(CurrentTenantContext)
  if (context === undefined) {
    throw new Error('useCurrentTenant must be used within a CurrentTenantProvider')
  }
  return context
}