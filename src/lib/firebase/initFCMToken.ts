import { requestForToken } from './firebase'

export const initFCMToken = async (
  onSuccess: (token: string) => void,
  onDenied?: () => void,
  onUnsupported?: () => void,
) => {
  if (!('Notification' in window)) {
    console.log('🚫 Notification API not supported')
    onUnsupported?.()
    return
  }

  const permission = await Notification.requestPermission()
  console.log('🔐 알림 권한 상태:', permission)

  if (permission === 'granted') {
    const token = await requestForToken()
    if (token) {
      console.log('📲 발급받은 FCM 토큰:', token)
      onSuccess(token)
    }
  } else {
    console.log('🔕 알림 권한 거부됨')
    onDenied?.()
  }
}
