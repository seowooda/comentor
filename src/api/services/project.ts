import {
  Project,
  CSQuestion,
  HistoryByDate,
} from '@/api/mocks/handlers/project'
import { fetcher } from '@/api/lib/fetcher'

// API 기본 URL 가져오기
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

/**
 * 특정 프로젝트의 상세 정보를 가져오는 함수
 * @param projectId 프로젝트 ID
 * @returns 프로젝트 상세 정보
 */
export const getProjectDetail = async (projectId: string): Promise<Project> => {
  try {
    // 프로젝트 상세 정보 API 요청
    const response = await fetcher<any>(
      `/project/info?projectId=${projectId}`,
      { method: 'GET' },
      true,
    )

    // API 응답을 Project 인터페이스에 맞게 매핑
    return {
      id: response.result?.id?.toString() || projectId,
      title: response.result?.name || '',
      description: response.result?.description || '',
      role: response.result?.role || '',
      techStack: Array.isArray(response.result?.stack)
        ? response.result.stack
        : response.result?.stack
          ? [response.result.stack]
          : [],
      status: response.result?.status || 'active',
      updatedAt: response.result?.updatedAt || new Date().toISOString(),
      files: response.result?.files || [],
    }
  } catch (error) {
    console.error('프로젝트 상세 정보 조회 중 오류:', error)
    throw error
  }
}

/**
 * 프로젝트의 커밋 기간 조회
 */
export const getCommitPeriods = async (projectId: string) => {
  return await fetcher(
    `/projects/${projectId}/commit-periods`,
    { method: 'GET' },
    true,
  )
}

/**
 * GitHub 저장소 정보 가져오기
 */
async function getGitHubRepoInfo(projectId: string) {
  try {
    const response = await fetcher<any>(
      `/project/info?projectId=${projectId}`,
      { method: 'GET' },
      true,
    )

    // GitHub 정보 추출
    const owner = response.result?.login || 'CommitMentor' // 기본값 설정
    const repo = response.result?.name || 'CoMentor-Frontend' // 기본값 설정
    const branch = 'develop' // 고정값

    return { owner, repo, branch }
  } catch (error) {
    console.error('GitHub 정보 가져오기 실패:', error)
    // 기본값 반환
    return {
      owner: 'CommitMentor',
      repo: 'CoMentor-Frontend',
      branch: 'develop',
    }
  }
}

/**
 * 파일 및 폴더 정보 인터페이스
 */
export interface FileItem {
  name: string
  path: string
  type: 'file' | 'dir'
  url?: string
}

/**
 * 프로젝트 파일 목록 조회 (GitHub API 직접 사용)
 */
export const getProjectFiles = async (
  projectId: string,
  period: string = '1week',
  path: string = '',
): Promise<FileItem[]> => {
  try {
    // GitHub 저장소 정보 가져오기
    const { owner, repo, branch } = await getGitHubRepoInfo(projectId)

    console.log('GitHub 정보:', { owner, repo, branch })

    // GitHub API를 사용하여 파일 목록 가져오기 (경로 지정)
    const { fetchGitHubContents } = await import(
      '@/api/services/github/githubService'
    )

    // 지정된 경로의 파일 및 폴더 목록 가져오기
    const contents = await fetchGitHubContents(owner, repo, path, branch)

    // 파일과 폴더 모두 포함하여 반환 (타입 정보 추가)
    const fileList = contents.map((item: any) => ({
      name: item.name,
      path: item.path,
      type: item.type as 'file' | 'dir',
      url: item.html_url || item.url,
    }))

    return fileList
  } catch (error) {
    console.error('프로젝트 파일 목록 조회 중 오류:', error)
    return []
  }
}

/**
 * 파일 코드 조회 (GitHub API 직접 사용)
 */
export const getFileCode = async (
  projectId: string,
  fileName: string,
): Promise<string> => {
  try {
    // GitHub 저장소 정보 가져오기
    const { owner, repo, branch } = await getGitHubRepoInfo(projectId)

    // GitHub API를 사용하여 파일 내용 가져오기
    const { fetchGitHubFile } = await import(
      '@/api/services/github/githubService'
    )
    const content = await fetchGitHubFile(owner, repo, fileName, branch)

    return content
  } catch (error) {
    console.error('파일 코드 조회 중 오류:', error)
    return '// 파일을 불러오는 데 실패했습니다.'
  }
}

/**
 * CS 질문 생성
 */
export const generateCSQuestions = async (
  projectId: string,
  code: string,
  fileName: string,
): Promise<CSQuestion[]> => {
  return await fetcher<CSQuestion[]>(
    '/cs-questions/generate',
    {
      method: 'POST',
      body: JSON.stringify({ projectId, code, fileName }),
    },
    true,
  )
}

/**
 * CS 질문 답변 제출
 */
export const submitAnswer = async (
  questionId: number,
  answer: string,
): Promise<string> => {
  const data = await fetcher<{ feedback: string }>(
    '/cs-questions/answer',
    {
      method: 'POST',
      body: JSON.stringify({ questionId, answer }),
    },
    true,
  )
  return data.feedback
}

/**
 * 질문 저장
 */
export const saveQuestion = async (questionId: number): Promise<boolean> => {
  const data = await fetcher<{ success: boolean }>(
    `/cs-questions/${questionId}/save`,
    { method: 'POST' },
    true,
  )
  return data.success
}

/**
 * 질문 북마크
 */
export const bookmarkQuestion = async (
  questionId: number,
): Promise<boolean> => {
  const data = await fetcher<{ success: boolean }>(
    `/cs-questions/${questionId}/bookmark`,
    { method: 'POST' },
    true,
  )
  return data.success
}

/**
 * 질문 이력 조회
 */
export const getQuestionHistory = async (
  projectId: string,
): Promise<HistoryByDate> => {
  return await fetcher<HistoryByDate>(
    `/projects/${projectId}/question-history`,
    { method: 'GET' },
    true,
  )
}
