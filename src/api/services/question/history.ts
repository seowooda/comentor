import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/api/lib/fetcher'
import { HistoryByDate, QuestionHistoryItem } from './types'

/**
 * 질문 이력 조회
 * GET /question/project/list
 */
export const getQuestionHistory = async (
  projectId: string,
): Promise<HistoryByDate> => {
  try {
    if (!projectId) {
      console.warn('프로젝트 ID가 없습니다. 질문 이력을 가져올 수 없습니다.')
      return {}
    }

    const data = await fetcher<{
      code?: number
      message?: string
      result?: any
    }>(`/question/project/list?projectId=${projectId}`, { method: 'GET' }, true)

    // 응답 구조 검사 및 변환
    if (!data || !data.result) {
      console.warn('질문 이력 응답이 비어있거나 예상한 형식이 아닙니다:', data)
      return {}
    }

    // 응답 형식에 따라 다르게 처리
    let resultData: HistoryByDate = {}

    // 배열 형태인 경우 (각 항목에 createdAt과 questions 배열이 있는 경우)
    if (Array.isArray(data.result)) {
      data.result.forEach((item) => {
        if (item.createdAt && Array.isArray(item.questions)) {
          // 각 질문의 상태값 정규화
          const normalizedQuestions = item.questions.map((q: any) => ({
            ...q,
            status: (q.questionStatus || q.status || 'TODO').toUpperCase(),
            // 답변 여부 확인
            answered:
              q.answered !== undefined
                ? q.answered
                : q.questionStatus === 'DONE' ||
                  String(q.status).toUpperCase() === 'DONE',
          }))
          resultData[item.createdAt] = normalizedQuestions
        }
      })
    }
    // 날짜별로 그룹화된 객체인 경우
    else if (typeof data.result === 'object') {
      if (Object.keys(data.result).length === 0) {
        return {}
      }

      // 날짜키로 되어있는 객체 형태인 경우
      if (
        Object.keys(data.result).some((key) => /^\d{4}-\d{2}-\d{2}/.test(key))
      ) {
        // 모든 날짜의 질문들에 대해 상태값 정규화 처리
        Object.keys(data.result).forEach((date) => {
          if (Array.isArray(data.result[date])) {
            resultData[date] = data.result[date].map((q: any) => ({
              ...q,
              status: (q.questionStatus || q.status || 'TODO').toUpperCase(),
              // 답변 여부 확인
              answered:
                q.answered !== undefined
                  ? q.answered
                  : q.questionStatus === 'DONE' ||
                    String(q.status).toUpperCase() === 'DONE',
            }))
          }
        })
      }
    }

    return resultData
  } catch (error) {
    console.error('질문 이력 조회 중 오류:', error)
    return {}
  }
}

/**
 * 질문 이력 조회 훅
 */
export const useQuestionHistory = (projectId: string) => {
  return useQuery({
    queryKey: ['questionHistory', projectId],
    queryFn: () => getQuestionHistory(projectId),
    enabled: !!projectId,
  })
}

/**
 * 질문 저장
 * POST /cs-questions/{questionId}/save
 */
export const saveQuestion = async (questionId: number): Promise<boolean> => {
  try {
    const data = await fetcher<{ success: boolean }>(
      `/cs-questions/${questionId}/save`,
      { method: 'POST' },
      true,
    )

    return data.success
  } catch (error) {
    console.error('질문 저장 중 오류:', error)
    throw error
  }
}

/**
 * 질문 북마크
 * POST /cs-questions/{questionId}/bookmark
 */
export const bookmarkQuestion = async (
  questionId: number,
): Promise<boolean> => {
  try {
    const data = await fetcher<{ success: boolean }>(
      `/cs-questions/${questionId}/bookmark`,
      { method: 'POST' },
      true,
    )

    return data.success
  } catch (error) {
    console.error('북마크 중 오류:', error)
    throw error
  }
}
