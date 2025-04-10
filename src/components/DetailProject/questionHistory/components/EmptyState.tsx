'use client'

import React from 'react'

/**
 * 질문 이력이 없을 때 표시되는 컴포넌트
 */
export const EmptyState: React.FC = () => {
  return (
    <div className="flex h-60 items-center justify-center text-slate-500">
      아직 저장된 질문이 없습니다.
    </div>
  )
}
