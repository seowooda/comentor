'use client'

import { SkeletonBox } from '@/lib/skeleton-generator'

export const CSHistorySkeleton = () => {
  // 질문 항목 3세트를 스켈레톤으로 표시한다고 가정
  const placeholderGroups = Array.from({ length: 3 })

  return (
    <div className="flex flex-col gap-5">
      {placeholderGroups.map((_, groupIdx) => (
        <div key={groupIdx} className="flex flex-col gap-5">
          {/* 날짜 */}
          <SkeletonBox width={120} height={14} className="ml-2" />

          {/* 질문들 */}
          {Array.from({ length: 2 }).map((_, qIdx) => (
            <div
              key={qIdx}
              className="flex flex-col gap-4 border-b border-slate-300 py-4"
            >
              <div className="flex flex-col gap-5 px-5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <SkeletonBox width={80} height={20} />
                    <SkeletonBox width={60} height={20} />
                  </div>
                  <SkeletonBox width={18} height={18} />
                </div>
                <SkeletonBox width="100%" height={24} />
              </div>
              <div className="flex justify-end pr-5">
                <SkeletonBox width={80} height={36} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
