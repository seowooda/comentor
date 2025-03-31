'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const AuthCallback = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAccessToken, setRole } = useAuthStore()

  const access = searchParams.get('accessToken')
  const refresh = searchParams.get('refreshToken')
  const role =
    (searchParams.get('role') as 'GUEST' | 'USER' | 'WITHDRAWN') || 'GUEST' // ✅ 기본값 처리

  const refreshAccessToken = async () => {
    const response = await fetch(`/api/user/refresh`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refresh}`,
      },
    })

    if (!response.ok) {
      console.error('Failed to refresh access token')
      return
    }
    const data = await response.json()
    console.log(data)
  }
  useEffect(() => {
    if (access && refresh) {
      setAccessToken(access)
      setRole(role)

      if (role === 'GUEST' || role === 'WITHDRAWN') {
        router.replace('/signup')
      } else if (role === 'USER') {
        router.replace('/dashboard')
      }
    }
  }, [access, refresh, role, router, setAccessToken, setRole])

  return (
    <div>
      <p>로그인 중...</p>
      <button onClick={refreshAccessToken}>🔄 토큰 재발급</button>
    </div>
  )
}

export default AuthCallback
