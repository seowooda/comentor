import { useGetQuery, usePostMutation } from '@/api/lib/fetcher'
import { useQuery, useMutation } from '@tanstack/react-query'
import { CSQuestion, HistoryByDate } from '@/api/mocks/handlers/project'
import { fetcher } from '@/api/lib/fetcher'

// CS 질문 생성 요청 타입 정의
export interface CreateProjectCsQuestionRequest {
  projectId: number
  userCode: string
  fileName?: string
}

// CS 질문 응답 타입 정의
export interface CSQuestionResponse {
  code: number
  message: string
  result: {
    id: number
    question: string
    csStack?: string
    codeSnippet?: string
    createdAt: string
  }
}

// CS 질문 목록 응답 타입 정의
export interface CSQuestionListResponse {
  code: number
  message: string
  result: Record<
    string,
    Array<{
      id: number
      question: string
      csStack?: string
      answered?: boolean
      createdAt: string
    }>
  >
}

/**
 * PROJECT CS 질문 기록 상세 조회
 * GET /question/project
 */
export const useProjectCsQuestion = (csQuestionId: number) => {
  return useGetQuery<CSQuestionResponse>(
    ['csQuestion', csQuestionId.toString()],
    `/question/project?csQuestionId=${csQuestionId}`,
  )
}

/**
 * 프로젝트 CS 질문 생성
 * POST /question/project
 */
export const useCreateProjectCsQuestion = () => {
  return usePostMutation<CSQuestionResponse, CreateProjectCsQuestionRequest>(
    '/question/project',
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
 * CS 질문 생성 (직접 호출)
 * POST /question/project
 */
export const generateCSQuestions = async (
  projectId: string,
  code: string,
  fileName: string,
): Promise<CSQuestion[]> => {
  try {
    const data = await fetcher<{ result: CSQuestion[] }>(
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

    console.log('CS 질문 생성 결과:', data)
    return data.result || []
  } catch (error) {
    console.error('CS 질문 생성 중 오류:', error)
    return []
  }
}

/**
 * GET /question/project/list
 */
export const getQuestionHistory = async (
  projectId: string,
): Promise<HistoryByDate> => {
  try {
    console.log(
      `질문 이력 조회 요청: /question/project/list?projectId=${projectId}`,
    )

    const data = await fetcher<{ result: HistoryByDate }>(
      `/question/project/list?projectId=${projectId}`,
      { method: 'GET' },
      true,
    )

    console.log('질문 이력 조회 결과:', data)
    return data.result || {}
  } catch (error) {
    console.error('질문 이력 조회 중 오류:', error)
    // 빈 기록 반환 - 에러로 인해 앱이 중단되지 않도록
    return {}
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
 * CS 질문 답변 제출
 */
export const submitAnswer = async (
  questionId: number,
  answer: string,
): Promise<string> => {
  try {
    const data = await fetcher<{ feedback: string }>(
      '/cs-questions/answer',
      {
        method: 'POST',
        body: JSON.stringify({ questionId, answer }),
      },
      true,
    )

    return data.feedback
  } catch (error) {
    console.error('답변 제출 중 오류:', error)
    throw error
  }
}

/**
 * 질문 저장
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
