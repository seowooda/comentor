'use client'

import { CSCategory } from '@/api/types/common'
import { mapCS } from '@/lib/mapEnum'
import { useState, useEffect, useRef } from 'react'
import { CSHistory } from '@/components/CS/CSHistory'
import { useInfiniteQuestions } from '@/api/services/CS/queries'
import { CSHistorySkeleton } from '@/components/Skeleton/CSHistorySkeleton'

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<CSCategory | null>(
    null,
  )

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuestions(selectedCategory)

  const bottomRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    })
    if (bottomRef.current) observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, selectedCategory])

  return (
    <main className="flex flex-col gap-6 px-40 py-10">
      <h2 className="text-2xl font-bold">날짜별 질문 내역</h2>

      {/* 카테고리 버튼 목록 */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-[20px] px-3 py-1 text-sm ${
            selectedCategory === null
              ? 'bg-blue-100 text-blue-600'
              : 'bg-blue-50 text-blue-300 hover:bg-blue-100 hover:transition-colors'
          }`}
        >
          전체
        </button>

        {Object.values(CSCategory).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-[20px] px-3 py-1 text-sm ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-600'
                : 'bg-blue-50 text-blue-300 hover:bg-blue-100 hover:transition-colors'
            }`}
          >
            {mapCS(category)}
          </button>
        ))}
      </div>
      {/* ✅ 로딩 상태일 때 스켈레톤 보여주기 */}
      {isLoading ? <CSHistorySkeleton /> : <CSHistory data={data} />}

      <div ref={bottomRef} />

      {isFetchingNextPage && (
        <p className="mt-2 text-center text-sm text-slate-400">
          불러오는 중...
        </p>
      )}
    </main>
  )
}
