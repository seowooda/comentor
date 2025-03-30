'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

const AuthCallback = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAccessToken, setRole } = useAuthStore()

  const access = searchParams.get('accessToken') // ✅ URL에서 accessToken 가져오기
  const refresh = searchParams.get('refreshToken') // ✅ URL에서 refreshToken 가져오기
  const role =
    (searchParams.get('role') as 'GUEST' | 'USER' | 'WITHDRAWN') || 'GUEST' // ✅ 기본값 처리

  const refreshAccessToken = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/refresh`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refresh}`, // ✅ refreshToken을 Authorization 헤더에 포함
        },
      },
    )

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

      console.log('Access:', access)
      console.log('Refresh:', refresh)
      console.log('Role:', role)

      // ✅ role에 따라 페이지 이동
      if (role === 'GUEST' || role === 'WITHDRAWN') {
        router.replace('/signup')
      } else if (role === 'USER') {
        // router.replace('/dashboard')
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
