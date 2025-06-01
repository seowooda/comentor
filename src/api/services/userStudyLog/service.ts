import { useGetQuery } from '@/api/lib/fetcher'
import { LearningHistoryResponse, StreakCountResponse } from './model'

// 사용자 학습 기록 조회
export const useLearningHistory = (startDate?: string, endDate?: string) => {
  const params = new URLSearchParams()
  if (startDate) params.append('startDate', startDate)
  if (endDate) params.append('endDate', endDate)

  const queryString = params.toString()
  const url = `/log/history${queryString ? `?${queryString}` : ''}`

  return useGetQuery<LearningHistoryResponse>(
    ['learningHistory', startDate || '', endDate || ''],
    url,
    {
      enabled: true,
      staleTime: 1000 * 60 * 5, // 5분 캐시
    },
  )
}

// 연속 학습일 수 조회
export const useStreakCount = () => {
  return useGetQuery<StreakCountResponse>(['streakCount'], '/log', {
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5분 캐시
  })
}
