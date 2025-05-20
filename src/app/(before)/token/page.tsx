'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

const AuthCallback = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallbackContent />
    </Suspense>
  )
}

const AuthCallbackContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAccessToken, setRole, setRefreshToken, setGithubAccessToken } =
    useAuthStore()

  const env = process.env.NEXT_PUBLIC_ENV || 'dev'

  useEffect(() => {
    const role =
      (searchParams.get('role') as 'GUEST' | 'USER' | 'WITHDRAWN') || 'GUEST'

    if (env === 'dev') {
      const access = searchParams.get('accessToken')
      const refresh = searchParams.get('refreshToken')
      const githubAccess = searchParams.get('githubAccessToken')

      if (access && refresh && githubAccess) {
        setAccessToken(access)
        setRefreshToken(refresh)
        setGithubAccessToken(githubAccess)
        setRole(role)

        router.replace(role === 'USER' ? '/dashboard' : '/signup')
      }
    } else {
      setRole(role)
      router.replace(role === 'USER' ? '/dashboard' : '/signup')
    }
  }, [
    env,
    searchParams,
    router,
    setAccessToken,
    setRefreshToken,
    setGithubAccessToken,
    setRole,
  ])

  return null
}

export default AuthCallback
