'use client'

import React from 'react'
import { Code } from 'lucide-react'

interface CodeSnippetProps {
  codeSnippet: string
  currentQuestionIndex: number
  totalQuestions: number
  answeredCount: number
}

/**
 * 코드 스니펫 컴포넌트
 * 선택된 코드 영역을 표시하고 진행 상황을 시각화합니다.
 */
export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  codeSnippet,
  currentQuestionIndex,
  totalQuestions,
  answeredCount,
}) => {
  return (
    <div className="mb-6 rounded-md border border-slate-200 p-4">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4 text-zinc-600" />
          <span className="text-xs font-medium text-zinc-900">선택된 코드</span>
        </div>
        <span className="text-xs text-slate-500">
          {currentQuestionIndex} / {totalQuestions}
        </span>
      </div>

      <div className="relative">
        <div className="max-h-[260px] overflow-auto rounded-md bg-slate-50 p-4">
          <pre className="text-sm whitespace-pre-wrap text-slate-700">
            {codeSnippet || '코드가 선택되지 않았습니다.'}
          </pre>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-zinc-400"
            style={{
              width: `${(answeredCount / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
