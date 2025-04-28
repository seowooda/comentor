'use client'

import { useParams } from 'next/navigation'
import { CSSolve } from '@/components/CS/CSSolve'

export default function SolvePage() {
  const { id } = useParams()

  return (
    <main className="flex flex-grow flex-col items-center gap-5 px-40 py-5">
      <h3 className="text-2xl font-bold">CS 연습</h3>
      <CSSolve />
    </main>
  )
}
