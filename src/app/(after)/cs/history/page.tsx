'use client'

import { CSCard } from '@/components/CS/CSCard'
import { CSCategory } from '@/api/types/common'
import { mapCS } from '@/lib/mapEnum'
import { useState, useMemo } from 'react'
import { getCSQuestion } from '@/api'

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<CSCategory | null>(
    null,
  )
  const { data } = getCSQuestion(0)

  const filteredContent = useMemo(() => {
    if (!data?.result.content) return []

    return data.result.content
      .map(({ date, questions }) => {
        const filteredQuestions = selectedCategory
          ? questions.filter((q) => q.csCategory === selectedCategory)
          : questions
        return { date, questions: filteredQuestions }
      })
      .filter((group) => group.questions.length > 0) // 질문이 없는 날짜는 제거
  }, [data, selectedCategory])

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
              : 'bg-blue-50 text-blue-300 hover:bg-blue-100'
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
                : 'bg-blue-50 text-blue-300 hover:bg-blue-100'
            }`}
          >
            {mapCS(category)}
          </button>
        ))}
      </div>
    </main>
  )
}
