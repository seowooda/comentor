'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

/**
 * 질문 이력을 로딩하는 동안 표시되는 컴포넌트
 */
export const LoadingState: React.FC = () => {
  return (
    <div className="flex h-60 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-slate-700" />
      <span className="ml-2 text-slate-700">질문 이력을 불러오는 중...</span>
    </div>
  )
}
