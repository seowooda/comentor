import { requestForToken } from './firebase'

export const initFCMToken = async (): Promise<string | null> => {
  if (!('Notification' in window)) {
    console.log('🚫 Notification API not supported')
    return null
  }

  const permission = await Notification.requestPermission()

  if (permission === 'granted') {
    const token = await requestForToken()
    return token || null
  }

  return null
}
