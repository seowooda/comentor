import { useMutation } from '@tanstack/react-query'
import { fetcher, usePostMutation } from '@/api/lib/fetcher'
import {
  CSQuestion,
  CSQuestionResponse,
  CreateProjectCsQuestionRequest,
} from './types'

/**
 * 프로젝트 CS 질문 생성 훅
 * POST /question/project
 */
export const useCreateProjectCsQuestion = () => {
  return usePostMutation<CSQuestionResponse, CreateProjectCsQuestionRequest>(
    '/question/project',
  )
}

/**
 * CS 질문 생성 (직접 호출)
 * POST /question/project
 */
export const generateCSQuestions = async (
  projectId: string,
  code: string,
  fileName: string,
): Promise<CSQuestion[]> => {
  try {
    const data = await fetcher<{ result: any[] }>(
      '/question/project',
      {
        method: 'POST',
        body: JSON.stringify({
          projectId: parseInt(projectId),
          userCode: code,
          fileName: fileName,
        }),
      },
      true,
    )

    // 결과가 없거나 배열이 아닌 경우 빈 배열 반환
    if (!data.result || !Array.isArray(data.result)) {
      return []
    }

    // questionId를 id로 매핑하는 작업 추가
    const mappedQuestions = data.result.map((question) => ({
      ...question,
      id: question.id || question.questionId, // questionId가 있으면 id로 사용
    }))

    // 유효한 ID를 가진 질문만 필터링
    const validQuestions = mappedQuestions.filter(
      (question) =>
        question && typeof question.id === 'number' && question.id > 0,
    )

    if (validQuestions.length !== mappedQuestions.length) {
      console.warn(
        '일부 질문이 유효한 ID를 가지고 있지 않아 필터링되었습니다.',
        mappedQuestions.filter(
          (q) => !q || typeof q.id !== 'number' || q.id <= 0,
        ),
      )
    }

    return validQuestions
  } catch (error) {
    console.error('CS 질문 생성 중 오류:', error)
    return []
  }
}

/**
 * CS 질문 생성 훅
 */
export const useGenerateCSQuestions = () => {
  return useMutation({
    mutationFn: ({
      projectId,
      code,
      fileName,
    }: {
      projectId: string
      code: string
      fileName: string
    }) => generateCSQuestions(projectId, code, fileName),
  })
}
