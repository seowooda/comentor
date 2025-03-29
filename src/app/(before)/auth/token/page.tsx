'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Cookies from 'js-cookie'

const AuthCallback = () => {
  const router = useRouter()
  const { setAccessToken, accessToken } = useAuthStore()

  // ✅ AccessToken 재발급 요청 함수
  const refreshAccessToken = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/refresh`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // 기존 accessToken (만료 가능)
          },
          credentials: 'include', // 🍪 쿠키 포함해서 요청 (필요 시)
        },
      )

      if (!response.ok) throw new Error('Failed to refresh token')

      const newAccessToken = response.headers
        .get('Authorization')
        ?.replace('Bearer ', '') // 새 accessToken 가져오기
      if (!newAccessToken) throw new Error('New access token not found')

      setAccessToken(newAccessToken) // Zustand에 저장
      console.log('🔄 New AccessToken:', newAccessToken)
    } catch (error) {
      console.error('🔴 Failed to refresh token:', error)
      // router.replace('/login') // 토큰 재발급 실패 시 로그인 페이지로 이동
    }
  }

  useEffect(() => {
    const saveTokens = () => {
      // 쿠키에서 accessToken과 refreshToken 가져오기
      const accessToken = Cookies.get('access')
      const refreshToken = Cookies.get('refresh')

      if (accessToken) {
        setAccessToken(accessToken) // Zustand에 저장
      }

      console.log('AccessToken:', accessToken)
      console.log('RefreshToken:', refreshToken)

      // router.replace('/') // 로그인 후 메인 페이지로 이동
    }

    saveTokens()
  }, [router, setAccessToken])

  return (
    <div>
      <p>로그인 중...</p>
      <button onClick={refreshAccessToken}>🔄 토큰 재발급</button>
    </div>
  )
}

export default AuthCallback
