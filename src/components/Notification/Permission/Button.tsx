'use client'

import { initFCMToken } from '@/lib/firebase/initFCMToken'
import { useRegisterFCMToken } from '@/api/services/FCM/queries'
import { useFCMStore } from '@/store/fcmStore'
import { Button } from '../../ui/button'
import { Bell, Check, Loader2, Lock } from 'lucide-react'
import { useNotificationStore } from '@/store/notificationStore'

export const NotificationPermissionButton = () => {
  const { mutate: registerToken } = useRegisterFCMToken()
  const { fcmToken, setFCMToken } = useFCMStore()
  const { permission, isRegistering, setIsRegistering } = useNotificationStore()

  const handleClick = async () => {
    if (permission !== 'default' || fcmToken || isRegistering) return

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

  let icon = <Bell size={20} />
  let text = '알림 권한 요청'
  let disabled = false

  if (permission === 'denied') {
    icon = <Lock size={20} />
    text = '알림 허용 필요'
    disabled = true
  } else if (permission === 'granted' && fcmToken) {
    icon = <Check size={20} />
    text = '알림 등록 완료'
    disabled = true
  } else if (isRegistering) {
    icon = <Loader2 size={20} className="animate-spin" />
    text = '요청 중...'
    disabled = true
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <Button
        className="border border-slate-300"
        variant="ghost"
        onClick={handleClick}
        disabled={disabled}
      >
        {icon}
        <span>{text}</span>
      </Button>
    </div>
  )
}
