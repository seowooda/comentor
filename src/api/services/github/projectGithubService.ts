import { Project, CSQuestion, FileItem } from '@/api/services/project/model'
import { fetcher } from '@/api/lib/fetcher'
import { fetchGitHubContents, fetchGitHubFile } from './githubApi'

/**
 * 프로젝트 상세 정보 조회
 */
export const getProjectDetail = async (projectId: string): Promise<Project> => {
  try {
    const response = await fetcher<any>(
      `/project/info?projectId=${projectId}`,
      { method: 'GET' },
      true,
    )
    return {
      id: response.result?.id?.toString() || projectId,
      title: response.result?.name || '',
      description: response.result?.description || '',
      role: response.result?.role || '',
      techStack: response.result?.language ? [response.result.language] : [],
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
  return fetcher(
    `/projects/${projectId}/commit-periods`,
    { method: 'GET' },
    true,
  )
}

/**
 * 내부: 깃허브 저장소 정보 추출
 */
async function getGitHubRepoInfo(projectId: string) {
  try {
    const response = await fetcher<any>(
      `/project/info?projectId=${projectId}`,
      { method: 'GET' },
      true,
    )
    return {
      owner: response.result?.login || 'CommitMentor',
      repo: response.result?.name || 'CoMentor-Frontend',
      branch: 'develop',
    }
  } catch (error) {
    return {
      owner: 'CommitMentor',
      repo: 'CoMentor-Frontend',
      branch: 'develop',
    }
  }
}

/**
 * 프로젝트 파일 목록 조회 (GitHub API)
 */
export const getProjectFiles = async (
  projectId: string,
  period: string = '1week',
  path: string = '',
): Promise<FileItem[]> => {
  try {
    const { owner, repo, branch } = await getGitHubRepoInfo(projectId)
    const contents = await fetchGitHubContents(owner, repo, path, branch)
    return contents.map((item: any) => ({
      name: item.name,
      path: item.path,
      type: item.type as 'file' | 'dir',
      url: item.html_url || item.url,
    }))
  } catch (error) {
    return []
  }
}

/**
 * 파일 코드 조회 (GitHub API)
 */
export const getFileCode = async (
  projectId: string,
  folderName: string,
): Promise<string> => {
  try {
    const { owner, repo, branch } = await getGitHubRepoInfo(projectId)
    const content = await fetchGitHubFile(owner, repo, folderName, branch)
    return content
  } catch (error) {
    return '// 파일을 불러오는 데 실패했습니다.'
  }
}

/**
 * CS 질문 생성
 */
export const generateCSQuestions = async (
  projectId: string,
  code: string,
  folderName: string,
): Promise<CSQuestion[]> => {
  try {
    const response = await fetcher<{
      code: number
      message: string
      result: any[]
    }>(
      '/question/project',
      {
        method: 'POST',
        body: JSON.stringify({ projectId, userCode: code, folderName }),
      },
      true,
    )
    if (response.result && Array.isArray(response.result)) {
      return response.result.map((item) => ({
        id: item.questionId,
        question: item.question,
        bestAnswer: '',
      }))
    }
    return []
  } catch (error) {
    return []
  }
}
