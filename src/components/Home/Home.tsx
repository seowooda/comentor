'use client'

import OnboardingPage from '@/components/onboarding/OnboardingPage'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')

  useEffect(() => {
    if (reason === 'unauthorized') {
      alert('로그인이 필요합니다.')
    }
  }, [reason])

  return (
    <main className="flex flex-grow items-center justify-center">
      <OnboardingPage />
    </main>
  )
}

export default Home
