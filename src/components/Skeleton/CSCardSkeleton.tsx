'use client'

import { SkeletonBox } from '@/lib/skeleton-generator'

export const CSCardSkeleton = () => {
  // 카드 2개를 스켈레톤으로 표시
  const placeholders = Array.from({ length: 2 })

  return (
    <div className="flex flex-col gap-5">
      {placeholders.map((_, i) => (
        <div
          key={i}
          className="flex h-[170px] w-full max-w-[430px] min-w-[380px] flex-col gap-5 rounded-2xl bg-white p-5"
        >
          <div className="flex justify-between">
            <SkeletonBox width={80} height={20} />
            <SkeletonBox width={20} height={20} />
          </div>

          <SkeletonBox width="100%" height={20} />

          <div className="flex justify-between">
            <SkeletonBox width={60} height={20} />
            <SkeletonBox width={80} height={36} />
          </div>
        </div>
      ))}
    </div>
  )
}
