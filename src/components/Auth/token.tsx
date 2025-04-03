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
      if (!accessToken && refreshToken) {
        try {
          const response = await fetch('/api/user/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            setAccessToken(data.result) // ✅ 새로운 accessToken 저장
          } else {
            clearAuth()
            router.replace('/') // ✅ 갱신 실패 시 로그인 페이지로 이동
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
