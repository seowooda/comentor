'use client'

import { useEffect } from 'react'
import { initFCMToken } from '@/lib/firebase/initFCMToken'
import { useDeleteFCMToken, useRegisterFCMToken } from '@/api'
import { useFCMStore } from '@/store/fcmStore'
import { useNotificationStore } from '@/store/notificationStore'

const FCMInitializer = () => {
  const { mutate: registerToken } = useRegisterFCMToken()
  const { mutate: deleteToken } = useDeleteFCMToken()
  const { fcmToken, setFCMToken } = useFCMStore()
  const { permission, setIsRegistering } = useNotificationStore()

  useEffect(() => {
    const register = async () => {
      setIsRegistering(true)
      try {
        const token = await initFCMToken()
        if (!token) return

        registerToken({ fcmToken: token })
        setFCMToken(token)
      } catch (error) {
        console.error('FCM 토큰 등록 실패:', error)
      } finally {
        setIsRegistering(false)
      }
    }

    if (permission === 'granted' && !fcmToken) {
      register()
    }

    if (permission === 'denied' && fcmToken) {
      deleteToken({ fcmToken })
      setFCMToken(null)
    }
  }, [permission])

  return null
}

export default FCMInitializer
