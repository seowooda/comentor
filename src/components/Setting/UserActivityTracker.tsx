'use client'

import { useEffect, useRef } from 'react'
import { useUserActivity } from '@/api'
import { useAuthStore } from '@/store/authStore'

const UserActivityTracker = () => {
  const { mutate } = useUserActivity()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) return

    const startInterval = () => {
      intervalRef.current = setInterval(() => mutate(), 5 * 60 * 1000)
    }

    const clearIntervalIfExists = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    const handleBeforeUnload = () => {
      if (process.env.NEXT_PUBLIC_ENV === 'prod') {
        const success = navigator.sendBeacon?.(
          'https://comentor.store/api/user/activity',
        )
        if (success === false || success === undefined) {
          mutate()
        }
      } else {
        mutate()
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startInterval()
      } else {
        clearIntervalIfExists()
      }
    }

    if (document.visibilityState === 'visible') {
      startInterval()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearIntervalIfExists()
    }
  }, [mutate, isLoggedIn])

  return null
}

export default UserActivityTracker
