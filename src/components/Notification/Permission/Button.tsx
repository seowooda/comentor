'use client'

import { initFCMToken } from '@/lib/firebase/initFCMToken'
import { useRegisterFCMToken } from '@/api/services/FCM/queries'
import { useFCMStore } from '@/store/fcmStore'
import { Button } from '../../ui/button'
import { Bell } from 'lucide-react'
import { useNotificationStore } from '@/store/notificationStore'

export const NotificationPermissionButton = () => {
  const { mutate: registerToken } = useRegisterFCMToken()
  const { fcmToken, setFCMToken } = useFCMStore()
  const permission = useNotificationStore((state) => state.permission)

  const handleClick = () => {
    if (permission === 'granted' || fcmToken) return

    initFCMToken((token) => {
      registerToken({ fcmToken: token })
      setFCMToken(token)
    })
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <Button
        className="border border-slate-300"
        variant="ghost"
        onClick={handleClick}
        disabled={permission === 'denied'}
      >
        <Bell size={20} />
        <span>
          {permission === 'granted' && fcmToken
            ? '알림 등록 완료'
            : '알림 권한 요청'}
        </span>
      </Button>
    </div>
  )
}
