import { useGetQuery } from '@/api/lib/fetcher'

// GitHub API 응답 타입 정의
export interface GithubRepoResponse {
  code: number
  message: string
  result: GithubRepo[]
}

// GitHub 저장소 타입 정의
export interface GithubRepo {
  id: number
  name: string
}

/**
 * GitHub 저장소 목록을 조회하는 hook
 * @returns GitHub 저장소 목록 조회 쿼리 결과
 */
export const useGithubRepos = () => {
  return useGetQuery<GithubRepoResponse>(
    ['github', 'repos'],
    '/api/github/repos',
  )
}
