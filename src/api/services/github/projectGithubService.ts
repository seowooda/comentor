import {
  Project,
  CSQuestion,
  FileItem,
  CSQuestionDTO,
  mapDtoToCSQuestion,
} from '@/api/services/project/model'
import { fetcher } from '@/api/lib/fetcher'
import {
  fetchGitHubContents,
  fetchGitHubFile,
  getChangedFiles,
} from './githubApi'

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
    console.error('프로젝트 파일 목록 조회 중 오류:', error)
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
 * CS 질문 생성 post 요청
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
      result: CSQuestionDTO[]
    }>(
      '/question/project',
      {
        method: 'POST',
        body: JSON.stringify({ projectId, userCode: code, folderName }),
      },
      true,
    )
    if (response.result && Array.isArray(response.result)) {
      // DTO에서 도메인 모델로 변환
      return response.result.map(mapDtoToCSQuestion)
    }
    return []
  } catch (error) {
    return []
  }
}

/**
 * 변경 파일을 디렉토리 구조로 변환
 * 파일 목록을 받아 루트 디렉토리 구조로 변환
 */
function organizeFilesToDirectoryStructure(files: string[]): FileItem[] {
  // 첫 번째 단계: 루트 경로에 있는 모든 디렉토리와 파일 찾기
  const rootItems = new Map<string, { path: string; type: 'file' | 'dir' }>()

  files.forEach((path) => {
    const parts = path.split('/')

    if (parts.length === 1) {
      // 루트 파일
      rootItems.set(path, { path, type: 'file' })
    } else {
      // 루트 폴더
      const rootDir = parts[0]
      if (!rootItems.has(rootDir)) {
        rootItems.set(rootDir, { path: rootDir, type: 'dir' })
      }
    }
  })

  // 결과 배열로 변환
  return Array.from(rootItems.entries()).map(([name, item]) => ({
    name,
    path: item.path,
    type: item.type,
    url: `https://github.com/path/to/${item.path}`,
  }))
}

/**
 * 특정 날짜 범위 내 변경된 파일 목록 조회
 */
export const getProjectChangedFiles = async (
  projectId: string,
  since: string,
  until: string,
): Promise<FileItem[]> => {
  try {
    const { owner, repo } = await getGitHubRepoInfo(projectId)

    // 변경된 파일 목록 가져오기
    const files = await getChangedFiles(owner, repo, since, until)
    if (files.length === 0) {
      console.log('변경된 파일이 없어 기본 파일 목록을 조회합니다.')
      // 변경된 파일이 없으면 모든 파일 가져오기
      return getProjectFiles(projectId, '1year', '')
    }

    // 파일 목록을 디렉토리 구조로 변환
    const rootItems = organizeFilesToDirectoryStructure(files)
    return rootItems.map((item) => ({
      ...item,
      url: `https://github.com/${owner}/${repo}/blob/develop/${item.path}`,
    }))
  } catch (error) {
    console.error('변경된 파일 목록 조회 중 오류:', error)
    // 오류 발생 시 기본 파일 목록 가져오기 시도
    return getProjectFiles(projectId, '1year', '')
  }
}
