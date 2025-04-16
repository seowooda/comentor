import { useQuery } from '@tanstack/react-query'
import { fetcher, useGetQuery } from '@/api/lib/fetcher'
import {
  CSQuestion,
  CSQuestionResponse,
  CSQuestionListResponse,
  RecentCSQuestionsResponse,
  QuestionHistoryItem,
} from './types'

/**
 * PROJECT CS 질문 상세 조회
 * GET /question/project
 */
export const useProjectCsQuestion = (csQuestionId: number) => {
  return useGetQuery<CSQuestionResponse>(
    ['csQuestion', csQuestionId.toString()],
    `/question/project?csQuestionId=${csQuestionId}`,
  )
}

/**
 * 최근 CS 질문 3개 조회
 * GET /question/project/recent
 */
export const useRecentCSQuestions = () => {
  return useGetQuery<RecentCSQuestionsResponse>(
    ['recentCsQuestions'],
    '/question/project/recent',
  )
}

/**
 * 프로젝트 CS 질문 목록 조회
 * GET /question/project/list
 */
export const useProjectCsQuestionList = (projectId: number) => {
  return useGetQuery<CSQuestionListResponse>(
    ['csQuestions', projectId.toString()],
    `/question/project/list?projectId=${projectId}`,
  )
}

/**
 * 질문 상세 정보 조회
 * GET /question/project
 */
export const getQuestionDetail = async (
  csQuestionId: number,
): Promise<QuestionHistoryItem | null> => {
  try {
    if (!csQuestionId) {
      console.warn('질문 ID가 없습니다. 질문 상세 정보를 가져올 수 없습니다.')
      return null
    }

    const data = await fetcher<{
      code?: number
      message?: string
      result?: any
    }>(
      `/question/project?csQuestionId=${csQuestionId}`,
      { method: 'GET' },
      true,
    )

    // 응답 구조 검사
    if (!data || !data.result) {
      console.warn(
        '질문 상세 정보 응답이 비어있거나 예상한 형식이 아닙니다:',
        data,
      )
      return null
    }

    // answers 배열에서 사용자와 AI 답변 추출
    let userAnswer = ''
    let aiAnswer = ''

    if (data.result.answers && Array.isArray(data.result.answers)) {
      // 사용자 답변 찾기
      const userAnswerObj = data.result.answers.find(
        (a: any) => a.author === 'USER',
      )
      if (userAnswerObj) {
        userAnswer = userAnswerObj.content || ''
      }

      // AI 피드백 찾기
      const aiAnswerObj = data.result.answers.find(
        (a: any) => a.author === 'AI',
      )
      if (aiAnswerObj) {
        aiAnswer = aiAnswerObj.content || ''
      }
    }

    // 질문 객체 변환
    const questionDetail = {
      ...data.result,
      id: data.result.questionId || data.result.id || data.result.csQuestionId,
      question: data.result.question || '',
      codeSnippet: data.result.userCode || '',
      fileName: data.result.fileName || '',
      concept: data.result.concept || '',
      answer: userAnswer || data.result.answer || '',
      feedback: aiAnswer || data.result.feedback || '',
      answered:
        data.result.answered !== undefined
          ? data.result.answered
          : data.result.questionStatus === 'DONE' ||
            (data.result.answers && data.result.answers.length > 0),
      status: (
        data.result.questionStatus ||
        data.result.status ||
        'TODO'
      ).toUpperCase(),
    }

    return questionDetail
  } catch (error) {
    console.error('질문 상세 정보 조회 중 오류:', error)
    return null
  }
}

/**
 * 질문 상세 정보 조회 훅
 */
export const useQuestionDetail = (csQuestionId: number | undefined) => {
  return useQuery({
    queryKey: ['questionDetail', csQuestionId?.toString()],
    queryFn: () => getQuestionDetail(csQuestionId || 0),
    enabled: !!csQuestionId,
  })
}
