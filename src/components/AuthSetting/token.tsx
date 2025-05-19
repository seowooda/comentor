'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

const AutoRefreshToken = () => {
  const { accessToken, refreshToken, setAccessToken, clearAuth } =
    useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const refreshAccessToken = async () => {
      const isDev = process.env.NEXT_PUBLIC_ENV === 'dev'

      const shouldTryRefresh =
        (isDev && !accessToken && refreshToken) || // ✅ dev: Zustand 기준
        (!isDev && !accessToken) // ✅ prod: accessToken만 없으면 시도

      if (shouldTryRefresh) {
        try {
          const response = await fetch('/api/user/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(isDev && refreshToken
                ? { Authorization: `Bearer ${refreshToken}` }
                : {}), // prod에서는 서버가 쿠키에서 읽게 함
            },
            credentials: 'include', 
          })

          if (response.ok) {
            const data = await response.json()
            setAccessToken(data.result)
          } else {
            clearAuth()
            router.replace('/')
          }
        } catch (error) {
          console.error('토큰 갱신 실패:', error)
          clearAuth()
          router.replace('/')
        }
      }
    }

    refreshAccessToken()
  }, [accessToken, refreshToken, setAccessToken, clearAuth, router])

  return null // ✅ UI가 필요 없는 컴포넌트
}

export default AutoRefreshToken
