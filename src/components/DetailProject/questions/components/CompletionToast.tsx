'use client'

import React from 'react'
import { CheckCircle2 } from 'lucide-react'

interface CompletionToastProps {
  show: boolean
}

/**
 * 완료 토스트 알림 컴포넌트
 * 모든 질문에 답변 완료 시 표시되는 알림입니다.
 */
export const CompletionToast: React.FC<CompletionToastProps> = ({ show }) => {
  if (!show) return null

  return (
    <div className="animate-fade-in fixed inset-x-0 top-4 z-50 mx-auto w-auto max-w-md rounded-lg bg-green-100 p-4 shadow-md transition-all duration-300">
      <div className="flex items-center">
        <CheckCircle2 className="mr-3 h-5 w-5 text-green-600" />
        <p className="text-sm font-medium text-green-800">
          축하합니다! 모든 질문에 답변을 완료했습니다.
        </p>
      </div>
    </div>
  )
}
