"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

interface NotificationContextType {
  notifications: any[]
  unreadCount: number
  loading: boolean
  markAsRead: (notificationId: string) => Promise<void>
  refetch: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  // Fetch unread notifications count
  const fetchUnreadCount = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('notification_logs')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'sent')
        .is('read_at', null)

      if (error) {
        console.error('Error fetching unread count:', error)
        return
      }

      setUnreadCount(data?.[0]?.count || 0)
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('notification_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Error fetching notifications:', error)
        return
      }

      setNotifications(data || [])
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notification_logs')
        .update({ read_at: new Date().toISOString() })
        .eq('id', notificationId)

      if (error) {
        console.error('Error marking notification as read:', error)
        return
      }

      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read_at: new Date().toISOString() }
            : notification
        )
      )

      // Update unread count
      await fetchUnreadCount()
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  // Real-time subscription
  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notification_logs',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload) => {
          console.log('New notification:', payload)
          setNotifications(prev => [payload.new, ...prev])
          setUnreadCount(prev => prev + 1)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  // Initial fetch
  useEffect(() => {
    if (user) {
      fetchNotifications()
      fetchUnreadCount()
    }
  }, [user])

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    refetch: fetchNotifications,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}