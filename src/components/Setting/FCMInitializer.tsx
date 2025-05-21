'use client'
import { useEffect } from 'react'
import { initFCMToken } from '@/lib/firebase/initFCMToken'
import { useRegisterFCMToken } from '@/api'
import { useFCMStore } from '@/store/fcmStore'
import { useNotificationStore } from '@/store/notificationStore'

const FCMInitializer = () => {
  const { mutate: registerToken } = useRegisterFCMToken()
  const { fcmToken, setFCMToken } = useFCMStore()
  const permission = useNotificationStore((state) => state.permission)

  useEffect(() => {
    if (permission !== 'granted' || fcmToken) return

    initFCMToken((token) => {
      registerToken({ fcmToken: token })
      setFCMToken(token)
    })
  }, [permission])

  return null
}

export default FCMInitializer
