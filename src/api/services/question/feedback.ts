import { useMutation } from '@tanstack/react-query'
import { fetcher, usePostMutation } from '@/api/lib/fetcher'
import { FeedbackResponse, FeedbackRequest } from './types'

/**
 * 피드백 생성
 * POST /feedback
 */
export const useCreateFeedback = () => {
  return usePostMutation<FeedbackResponse, FeedbackRequest>('/feedback')
}

/**
 * CS 질문 답변 제출
 * POST /feedback
 */
export const submitAnswer = async (
  questionId: number,
  answer: string,
): Promise<string> => {
  try {
    // questionId 유효성 검사
    if (!questionId || isNaN(questionId) || questionId <= 0) {
      throw new Error('유효하지 않은 질문 ID입니다: ' + questionId)
    }

    // 답변 유효성 검사
    if (!answer || answer.trim() === '') {
      throw new Error('답변 내용이 비어있습니다.')
    }

    // API 요청 데이터 로깅
    console.log('답변 제출 데이터:', { questionId, answer })

    // 서버가 기대하는 형식으로 요청 본문 구성 (필드명 변경)
    const requestBody = {
      csQuestionId: questionId,
      answer: answer,
    }

    console.log('서버 요청 본문:', JSON.stringify(requestBody, null, 2))

    const data = await fetcher<{
      code?: number
      message?: string
      result?: string
      feedback?: string
    }>(
      '/feedback',
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
      },
      true,
    )

    console.log('피드백 응답:', data)

    // result 또는 feedback 필드에서 응답 데이터 추출
    if (data.result) {
      return data.result
    } else if (data.feedback) {
      return data.feedback
    } else {
      console.warn('피드백 응답 데이터가 없습니다:', data)
      return '피드백을 불러올 수 없습니다.'
    }
  } catch (error) {
    console.error('답변 제출 중 오류:', error)
    throw error
  }
}

/**
 * 피드백 제출 훅
 */
export const useSubmitFeedback = () => {
  return useMutation({
    mutationFn: ({
      csQuestionId,
      answer,
    }: {
      csQuestionId: number
      answer: string
    }) => submitAnswer(csQuestionId, answer),
  })
}
