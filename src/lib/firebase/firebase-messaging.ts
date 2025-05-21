import { initializeApp, getApps } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDFogTQX_h9I7sDwLBflzWGWst3Jl-kiuE',
  authDomain: 'comentor-b661e.firebaseapp.com',
  projectId: 'comentor-b661e',
  storageBucket: 'comentor-b661e.firebasestorage.app',
  messagingSenderId: '568911920834',
  appId: '1:568911920834:web:9089c72816710a5374c55b',
  measurementId: 'G-WJP86BT6CY',
}

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const setTokenHandler = async () => {
  try {
    const messaging = getMessaging(app)
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    })

    if (token) {
      console.log('📲 FCM 토큰:', token)
      // 서버로 token 전송하면 됩니다
    } else {
      console.warn('⚠️ 알림 권한 없음')
    }
  } catch (err) {
    console.error('❌ FCM 토큰 오류:', err)
  }
}
