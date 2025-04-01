import { usePostMutation } from '@/api/lib/fetcher'

// 프로젝트 생성 응답 타입 정의
export interface ProjectCreateResponse {
  code: number
  message: string
  result: {
    id: number
  }
}

// 프로젝트 생성 요청 타입 정의
export interface ProjectCreateRequest {
  id: number
  description: string
  role: string
  status: 'PROGRESS' | 'DONE'
}

/**
 * 프로젝트 생성 hook
 * @returns 프로젝트 생성 뮤테이션 객체
 */
export const useProjectCreate = () => {
  return usePostMutation<ProjectCreateResponse, ProjectCreateRequest>(
    '/project',
  )
}
