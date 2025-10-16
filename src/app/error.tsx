'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // 에러 리포팅 서비스(e.g., Sentry)에 에러를 기록할 수 있습니다.
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl bg-white p-8 text-center shadow-lg">
        <AlertTriangle
          size={56}
          strokeWidth={1.5}
          className="text-orange-500"
        />

        <h1 className="text-3xl font-bold text-slate-800">
          오류가 발생했습니다
        </h1>

        <p className="text-slate-600">
          페이지를 표시하는 도중 예상치 못한 문제가 발생했습니다. 잠시 후 다시
          시도해주세요.
        </p>

        <Button
          onClick={() => reset()} // 페이지를 다시 렌더링하도록 시도합니다.
          className="mt-4 px-6 py-5 text-base"
        >
          다시 시도
        </Button>
      </div>
    </main>
  )
}
