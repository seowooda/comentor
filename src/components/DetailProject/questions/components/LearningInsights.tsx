'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Award, BookOpen, BarChart3, CheckCircle2 } from 'lucide-react'

interface LearningInsightsProps {
  showLearningInsights: boolean
  onToggleLearningInsights: () => void
  onChooseAnotherCode: () => void
  onGenerateMoreQuestions: () => void
  answeredCount: number
  savedQuestionsCount: number
  totalQuestionsCount: number
}

/**
 * 학습 인사이트 컴포넌트
 * 사용자의 학습 진행 상황을 시각화하고 다음 단계를 제안합니다.
 */
export const LearningInsights: React.FC<LearningInsightsProps> = ({
  showLearningInsights,
  onToggleLearningInsights,
  onChooseAnotherCode,
  onGenerateMoreQuestions,
  answeredCount,
  savedQuestionsCount,
  totalQuestionsCount,
}) => {
  if (showLearningInsights) {
    return (
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
              다른 코드로 학습하기
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-300 text-xs text-indigo-700 hover:bg-indigo-100"
              onClick={onGenerateMoreQuestions}
            >
              추가 질문 생성하기
            </Button>
            <Button
              size="sm"
              className="bg-indigo-700 text-xs hover:bg-indigo-800"
              onClick={onToggleLearningInsights}
            >
              인사이트 숨기기
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-md bg-white p-3 shadow-sm">
            <div className="flex items-center space-x-2 text-indigo-700">
              <BookOpen className="h-4 w-4" />
              <h4 className="text-sm font-medium">핵심 개념 정리</h4>
            </div>
            <ul className="mt-2 space-y-1 text-xs text-slate-700">
              <li>• React 생명주기와 상태 관리</li>
              <li>• 비동기 처리와 예외 처리</li>
              <li>• 컴포넌트 최적화 기법</li>
            </ul>
          </div>

          <div className="rounded-md bg-white p-3 shadow-sm">
            <div className="flex items-center space-x-2 text-indigo-700">
              <BarChart3 className="h-4 w-4" />
              <h4 className="text-sm font-medium">학습 진행 현황</h4>
            </div>
            <div className="mt-2 text-xs text-slate-700">
              <p>
                • 완료한 문제: {answeredCount}/{totalQuestionsCount}
              </p>
              <p>
                • 저장한 문제: {savedQuestionsCount}/{totalQuestionsCount}
              </p>
              <p>• 학습 난이도: 중급</p>
            </div>
          </div>

          <div className="rounded-md bg-white p-3 shadow-sm">
            <div className="flex items-center space-x-2 text-indigo-700">
              <CheckCircle2 className="h-4 w-4" />
              <h4 className="text-sm font-medium">다음 학습 제안</h4>
            </div>
            <div className="mt-2 text-xs text-slate-700">
              <p>• 프론트엔드 최적화 기법 심화</p>
              <p>• 서버 상태 관리 고급 기술</p>
              <p>• 디자인 패턴 실전 적용</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="mb-6 flex cursor-pointer items-center justify-between rounded-md border border-indigo-200 bg-indigo-50 p-3 transition-all duration-300 hover:bg-indigo-100"
      onClick={onToggleLearningInsights}
    >
      <div className="flex items-center space-x-2">
        <Award className="h-4 w-4 text-indigo-600" />
        <span className="text-sm font-medium text-indigo-900">
          학습 인사이트 보기
        </span>
      </div>
      <div className="flex items-center text-xs text-indigo-700">
        <span className="mr-2">
          완료: {answeredCount}/{totalQuestionsCount}
        </span>
        <span>
          저장: {savedQuestionsCount}/{totalQuestionsCount}
        </span>
      </div>
    </div>
  )
}
