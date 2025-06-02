import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
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

// Firebase App 초기화
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Firebase 서비스 export
export const auth = getAuth(app)
export const db = getFirestore(app)
export const messaging =
  typeof window !== 'undefined' ? getMessaging(app) : null

// FCM 토큰 요청
export const requestForToken = async (): Promise<string | null> => {
  if (!messaging) return null

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    })
    return token
  } catch (error) {
    // console.error('❌ FCM 토큰 요청 실패:', error)
    return null
  }
}
