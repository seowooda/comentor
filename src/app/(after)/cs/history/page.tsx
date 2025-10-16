'use client'

import { CSCategory } from '@/api/types/common'
import { mapCS } from '@/lib/mapEnum'
import { useState, useEffect, useRef } from 'react'
import { CSHistory } from '@/components/CS/History'
import { CSHistorySkeleton } from '@/components/Skeleton/CSHistorySkeleton'
import { useInfiniteQuestions } from '@/api'

const Page = () => {
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

  useEffect(() => {})

  return (
    <main className="flex w-full justify-center py-6 sm:py-10">
      <div className="flex w-full max-w-5xl flex-col gap-6 px-4 sm:px-6">
        <h2 className="text-xl font-bold sm:text-2xl">날짜별 질문 내역</h2>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-[20px] px-3 py-1 text-sm ${
              selectedCategory === null
                ? 'bg-blue-100 text-blue-600'
                : 'bg-blue-50 text-slate-500 hover:bg-blue-100 hover:text-blue-500 hover:transition-colors'
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
                  : 'bg-blue-50 text-slate-500 hover:bg-blue-100 hover:text-blue-500 hover:transition-colors'
              }`}
            >
              {mapCS(category)}
            </button>
          ))}
        </div>

        {/* 로딩 및 데이터 렌더링 부분은 그대로 유지 */}
        {(isLoading || (isFetchingNextPage && hasNextPage)) && (
          <CSHistorySkeleton />
        )}
        {!isLoading && <CSHistory data={data} />}
        <div ref={bottomRef} />
      </div>
    </main>
  )
}

export default Page
