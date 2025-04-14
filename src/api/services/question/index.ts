import { useGetQuery, usePostMutation } from '@/api/lib/fetcher'
import { useQuery, useMutation } from '@tanstack/react-query'
import {
  CSQuestion,
  HistoryByDate,
  QuestionHistoryItem,
} from '@/api/mocks/handlers/project'
import { fetcher } from '@/api/lib/fetcher'

// CS 질문 생성 요청 타입 정의
export interface CreateProjectCsQuestionRequest {
  projectId: number
  userCode: string
  fileName?: string
}

// 피드백 요청 타입 정의
export interface FeedbackRequest {
  csQuestionId: number
  answer: string
}

// 피드백 응답 타입 정의
export interface FeedbackResponse {
  code: number
  message: string
  result: string
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

// 최근 CS 질문 목록 응답 타입 정의
export interface RecentCSQuestionsResponse {
  code: number
  message: string
  result: Array<{
    id: number
    question: string
    csStack?: string
    codeSnippet?: string
    createdAt: string
  }>
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
 * 피드백 생성
 * POST /feedback
 */
export const useCreateFeedback = () => {
  return usePostMutation<FeedbackResponse, FeedbackRequest>('/feedback')
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

    console.log('CS 질문 생성 결과:', data)

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

/**
 * 최근 질문 3개 조회 (직접 호출)
 * GET /question/project/recent
 */
export const getRecentQuestions = async (): Promise<CSQuestion[]> => {
  try {
    const data = await fetcher<{ result: CSQuestion[] }>(
      '/question/project/recent',
      { method: 'GET' },
      true,
    )

    return data.result || []
  } catch (error) {
    console.error('최근 질문 조회 중 오류:', error)
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

/**
 * 최근 질문 조회 훅
 */
export const useRecentQuestions = () => {
  return useQuery({
    queryKey: ['recentQuestions'],
    queryFn: getRecentQuestions,
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
