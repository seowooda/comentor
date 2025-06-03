'use client'

import { Clover } from 'lucide-react'
import { useModalStore } from '@/store/modalStore'
import { LearningHistoryItem, useStreakCount, useLearningHistory } from '@/api'

interface DayStreakProps {
  learningData?: LearningHistoryItem[]
}

const DayStreak = ({ learningData }: DayStreakProps) => {
  const { openModal } = useModalStore()
  const { data: streakData, isLoading: streakLoading } = useStreakCount()
  const { data: historyData, isLoading: historyLoading } = useLearningHistory()

  const streakCount = streakData?.result || 0
  const learningHistory = learningData || historyData?.result || []

  const handleOpenStreakModal = () => {
    openModal('streakChart', {
      streakCount,
      learningData: learningHistory,
    })
  }

  if (streakLoading || historyLoading) {
    return (
      <div className="flex cursor-pointer items-center bg-white px-3 py-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100">
          <Clover className="h-4 w-4 text-green-600" />
        </div>
        <div className="hidden flex-col items-start bg-white px-2 py-1 md:flex">
          <span className="text-[14px] leading-tight font-bold">-</span>
          <span className="text-[12px] leading-tight font-semibold text-slate-500">
            Day Streak
          </span>
        </div>
        <div className="flex items-center bg-white px-1 md:hidden">
          <span className="text-[12px] font-bold text-green-600">-</span>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleOpenStreakModal}
      className="flex cursor-pointer items-center bg-white px-3 py-2"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100">
        <Clover className="h-4 w-4 text-green-600" />
      </div>
      <div className="hidden flex-col items-start bg-white px-2 py-1 md:flex">
        <span className="text-[14px] leading-tight font-bold">
          {streakCount}
        </span>
        <span className="text-[12px] leading-tight font-semibold text-slate-500">
          Day Streak
        </span>
      </div>
      <div className="flex items-center bg-white px-1 md:hidden">
        <span className="text-[12px] font-bold text-green-600">
          {streakCount}
        </span>
      </div>
    </button>
  )
}

export default DayStreak
