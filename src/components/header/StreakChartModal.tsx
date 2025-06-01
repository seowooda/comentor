'use client'

import { X, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import LearningChart from './LearningChart'
import { LearningHistoryItem, useLearningHistory } from '@/api'

interface StreakChartModalProps {
  streakCount: number
  learningData?: LearningHistoryItem[]
  onClose: () => void
}

const StreakChartModal = ({
  streakCount,
  learningData = [],
  onClose,
}: StreakChartModalProps) => {
  const router = useRouter()

  // API에서 학습 히스토리 데이터 가져오기
  const { data: historyData, isLoading } = useLearningHistory()

  // props로 전달받은 데이터가 있으면 사용, 없으면 API 데이터 사용
  const chartData =
    learningData.length > 0 ? learningData : historyData?.result || []
  const totalSolved = chartData.reduce((sum, item) => sum + item.solvedCount, 0)

  const handleStartLearning = () => {
    onClose() // 모달 닫기
    router.push('/cs') // CS 연습 페이지로 이동
  }

  if (isLoading) {
    return (
      <div className="w-[90vw] max-w-md rounded-lg bg-white p-4 shadow-xl sm:w-[462px] sm:max-w-lg sm:p-6 md:w-[580px] lg:w-[680px]">
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-gray-500">데이터를 불러오는 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[90vw] max-w-md rounded-lg bg-white p-4 shadow-xl sm:w-[462px] sm:max-w-lg sm:p-6 md:w-[580px] lg:w-[680px]">
      {/* 헤더 */}
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <div className="flex items-start justify-start gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex gap-2 sm:flex-row sm:items-start sm:gap-4">
            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
              학습 연속 기록
            </h2>
            <div className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-1">
              <span className="text-xs font-medium text-blue-600 sm:text-sm">
                {streakCount}일 연속 학습
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 sm:gap-4">
        <div className="rounded-lg bg-blue-50 p-3 text-center sm:p-4">
          <div className="text-xl font-bold text-blue-600 sm:text-2xl">
            {streakCount}
          </div>
          <div className="text-xs text-blue-600 sm:text-sm">현재 연속</div>
        </div>
        <div className="rounded-lg bg-green-50 p-3 text-center sm:p-4">
          <div className="text-xl font-bold text-green-600 sm:text-2xl">
            {totalSolved}
          </div>
          <div className="text-xs text-green-600 sm:text-sm">총 문제 해결</div>
        </div>
      </div>

      {/* 학습 기록 차트 */}
      <LearningChart data={chartData} isLoading={isLoading} />

      {/* 액션 버튼 */}
      <div className="flex gap-2 sm:gap-3">
        <button
          onClick={onClose}
          className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:text-base"
        >
          닫기
        </button>
        <button
          onClick={handleStartLearning}
          className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700 sm:px-4 sm:text-base"
        >
          CS 학습하기
        </button>
      </div>
    </div>
  )
}

export default StreakChartModal
