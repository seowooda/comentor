import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store/authStore'

const GithubCallback = () => {
  const router = useRouter()
  const { setAccessToken } = useAuthStore()

  useEffect(() => {
    const fetchToken = async () => {
      const code = new URLSearchParams(window.location.search).get('code')
      if (!code) return

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/github`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          },
        )

        if (!response.ok) throw new Error('Failed to fetch access token')

        const data = await response.json()
        setAccessToken(data.accessToken) // Zustand에 저장
        router.replace('/') // 로그인 후 메인 페이지로 이동
      } catch (error) {
        console.error('GitHub 로그인 실패:', error)
        router.replace('/login') // 로그인 실패 시 로그인 페이지로 이동
      }
    }

    fetchToken()
  }, [router, setAccessToken])

  return <div>로그인 중...</div>
}

export default GithubCallback
