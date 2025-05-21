'use client'

import { useRegisterFCMToken } from '@/api/services/FCM/queries'
import { requestForToken } from '@/lib/firebase/firebase'
import { useEffect } from 'react'

const FCMInitializer = () => {
  const { mutate: registerToken } = useRegisterFCMToken()

  useEffect(() => {
    const initFCM = async () => {
      if (!('Notification' in window)) {
        console.log('🚫 Notification API not supported')
        return
      }

      const permission = await Notification.requestPermission()
      console.log('🔐 알림 권한 상태:', permission)

      if (permission === 'granted') {
        const token = await requestForToken()
        if (token) {
          console.log('📲 발급받은 FCM 토큰:', token)
          registerToken({ fcmToken: token })
        }
      } else {
        console.log('🔕 알림 권한 거부됨')
      }
    }

    initFCM()
  }, [])

  return null
}

export default FCMInitializer
