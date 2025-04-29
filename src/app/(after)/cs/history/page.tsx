'use client'

import { CSCategory } from '@/api'
import { mapCS } from '@/lib/mapEnum'
import { useState } from 'react'

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<CSCategory | null>(
    null,
  )

  return (
    <main className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">날짜별 질문 내역</h2>

      {/* 카테고리 버튼 목록 */}
      <div className="flex flex-wrap gap-3">
        {/* 전체 버튼 */}
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

        {/* 개별 카테고리 버튼 */}
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

      {/* 선택된 필터 출력 예시 (개발 확인용) */}
      <p className="text-sm text-slate-600">
        현재 선택된 카테고리:{' '}
        {selectedCategory ? mapCS(selectedCategory) : '전체'}
      </p>
    </main>
  )
}
