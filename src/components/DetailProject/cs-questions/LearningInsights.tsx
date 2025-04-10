'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Award, RefreshCw, FileText, CheckCircle2 } from 'lucide-react'

interface LearningInsightsProps {
  show: boolean
  showToast: boolean
  onChooseAnotherCode: () => void
  onGenerateMoreQuestions: () => void
  onFinish: () => void
  onToggle: () => void
}

/**
 * 학습 인사이트 컴포넌트
 */
const LearningInsights: React.FC<LearningInsightsProps> = ({
  show,
  showToast,
  onChooseAnotherCode,
  onGenerateMoreQuestions,
  onFinish,
  onToggle,
}) => {
  // 완료 토스트 메시지
  const renderCompletionToast = () => {
    if (!showToast) return null

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

  // 학습 인사이트 정보
  if (!show) {
    return (
      <Button
        variant="outline"
        onClick={onToggle}
        className="mt-4 flex w-full items-center justify-center"
      >
        <Award className="mr-2 h-5 w-5 text-indigo-600" />
        학습 인사이트 보기
      </Button>
    )
  }

  return (
    <>
      {renderCompletionToast()}

      <div className="mb-6 rounded-md border border-indigo-200 bg-indigo-50 p-4 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-indigo-600" />
            <h3 className="font-medium text-indigo-900">학습 인사이트</h3>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-300 text-xs text-indigo-700 hover:bg-indigo-100"
              onClick={onChooseAnotherCode}
            >
              <FileText className="mr-1 h-3 w-3" />
              다른 코드 선택
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-300 text-xs text-indigo-700 hover:bg-indigo-100"
              onClick={onGenerateMoreQuestions}
            >
              <RefreshCw className="mr-1 h-3 w-3" />
              질문 더 받기
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="rounded-md bg-white p-3 shadow-sm">
            <h4 className="text-sm font-medium text-slate-800">학습 요약</h4>
            <p className="mt-1 text-sm text-slate-600">
              모든 질문에 답변해주셨습니다. 다른 코드를 선택하거나 더 많은
              질문을 생성하여 계속 학습할 수 있습니다.
            </p>
            <Button
              variant="default"
              size="sm"
              className="mt-3 bg-indigo-600 text-xs hover:bg-indigo-700"
              onClick={onFinish}
            >
              학습 완료하기
            </Button>
          </div>

          <div className="rounded-md bg-white p-3 shadow-sm">
            <h4 className="text-sm font-medium text-slate-800">학습 팁</h4>
            <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-slate-600">
              <li>답변 내용을 되돌아보며 개념을 다시 정리해보세요.</li>
              <li>피드백을 참고하여 답변의 개선점을 확인하세요.</li>
              <li>다른 코드를 선택하여 다양한 개념을 학습해보세요.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default LearningInsights
