'use client'

import { useNotificationStore } from '@/store/notificationStore'

export const NotificationPermissionMessage = () => {
  const permission = useNotificationStore((state) => state.permission)

  if (permission !== 'denied') return null

  return (
    <p className="pl-2 text-end text-sm text-red-500">
      ⚠️ 알림이 차단되어 있어요. 브라우저 설정에서 허용으로 바꿔주세요.
    </p>
  )
}
