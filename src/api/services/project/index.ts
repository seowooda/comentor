import {
  usePostMutation,
  useGetQuery,
  usePutMutation,
  useDeleteMutation,
} from '@/api/lib/fetcher'

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

// 프로젝트 조회 응답 타입 정의
export interface ProjectListResponse {
  code: number
  message: string
  result: Array<{
    id: number
    name: string
    language: string
    description: string
    role: string
    status: 'PROGRESS' | 'DONE'
    updatedAt: string
  }>
}

// 프로젝트 수정 요청 타입 정의
export interface ProjectUpdateRequest {
  description: string
  role: string
  status: 'PROGRESS' | 'DONE'
}

// 프로젝트 수정 응답 타입 정의
export interface ProjectUpdateResponse {
  code: number
  message: string
  result: {
    description: string
    role: string
    status: 'PROGRESS' | 'DONE'
  }
}

// 프로젝트 삭제 응답 타입 정의
export interface ProjectDeleteResponse {
  code: number
  message: string
  result: any
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

/**
 * 프로젝트 목록 조회 hook
 * @param status 프로젝트 상태 필터 (선택 사항)
 * @returns 프로젝트 목록 쿼리 객체
 */
export const useProjectList = (status?: 'PROGRESS' | 'DONE') => {
  const url = status ? `/project?status=${status}` : '/project'
  return useGetQuery<ProjectListResponse>(['projects', status || 'all'], url)
}

/**
 * 프로젝트 수정 hook
 * @param projectId 수정할 프로젝트 ID
 * @returns 프로젝트 수정 뮤테이션 객체
 */
export const useProjectUpdate = (projectId: number) => {
  return usePutMutation<ProjectUpdateResponse, ProjectUpdateRequest>(
    `/project?projectId=${projectId}`,
  )
}

/**
 * 프로젝트 삭제 hook
 * @param projectId 삭제할 프로젝트 ID
 * @returns 프로젝트 삭제 뮤테이션 객체
 */
export const useProjectDelete = (projectId: number) => {
  return useDeleteMutation<ProjectDeleteResponse>(
    `/project?projectId=${projectId}`,
  )
}
