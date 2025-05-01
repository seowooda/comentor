'use client'

import { useParams } from 'next/navigation'
import { CSSolve } from '@/components/CS/CSSolve'
import { getCSQuestionDetail } from '@/api'

export default function SolvePage() {
  const { id } = useParams()
  const { data, isLoading } = getCSQuestionDetail(Number(id))

  if (isLoading || !data?.result) {
    return <div>Loading...</div> // 또는 스켈레톤
  }

  return (
    <main className="flex flex-col items-center justify-center gap-5 px-40 py-5">
      <h3 className="text-2xl font-bold">CS 연습</h3>
      <CSSolve question={data.result} />
    </main>
  )
}
