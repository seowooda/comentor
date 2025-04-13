import {
  usePostMutation,
  useGetQuery,
  usePutMutation,
  useDeleteMutation,
} from '@/api/lib/fetcher'
import { Project } from '@/api/mocks/handlers/project'

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
  result: {
    content: Array<{
      id: number
      name: string
      language: string
      description: string
      role: string
      status: 'PROGRESS' | 'DONE'
      updatedAt: string
    }>
    totalPages: number
    currentPage: number
    totalElements: number
  }
}

// 프로젝트 상세 조회 응답 타입 정의
export interface ProjectDetailResponse {
  code: number
  message: string
  result: {
    id: number
    name: string
    language: string
    description: string
    role: string
    status: 'PROGRESS' | 'DONE'
    updatedAt: string
    stack: string[] | string
    files?: string[]
  }
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
  result: null | { id: number }
}

/**
 * 프로젝트 목록 조회 (대시보드)
 * GET /project
 */
export const useProjectList = (
  status?: 'PROGRESS' | 'DONE',
  page: number = 0,
) => {
  const url = status
    ? `/project?status=${status}&page=${page}`
    : `/project?page=${page}`
  return useGetQuery<ProjectListResponse>(
    ['projects', status || 'all', page.toString()],
    url,
  )
}

/**
 * 프로젝트 생성
 * POST /project
 */
export const useProjectCreate = () => {
  return usePostMutation<ProjectCreateResponse, ProjectCreateRequest>(
    '/project',
  )
}

/**
 * 프로젝트 수정
 * PUT /project
 */
export const useProjectUpdate = (projectId: number) => {
  return usePutMutation<ProjectUpdateResponse, ProjectUpdateRequest>(
    `/project?projectId=${projectId}`,
  )
}

/**
 * 프로젝트 삭제
 * DELETE /project
 */
export const useProjectDelete = (projectId: number) => {
  return useDeleteMutation<ProjectDeleteResponse>(
    `/project?projectId=${projectId}`,
  )
}

/**
 * 프로젝트 상세 조회
 * GET /project/info
 */
export const useProjectDetail = (projectId: number) => {
  return useGetQuery<ProjectDetailResponse>(
    ['project', projectId.toString()],
    `/project/info?projectId=${projectId}`,
  )
}

/**
 * 프로젝트 상세 정보 변환 (API 응답 -> Project 인터페이스)
 */
export const mapToProject = (data: ProjectDetailResponse): Project => {
  const result = data.result || {}

  return {
    id: result.id?.toString() || '',
    title: result.name || '제목 없음',
    description: result.description || '',
    role: result.role || '',
    techStack: Array.isArray(result.stack)
      ? result.stack
      : result.stack
        ? [result.stack]
        : [],
    status: result.status || 'PROGRESS',
    updatedAt: result.updatedAt || new Date().toISOString(),
    files: Array.isArray(result.files) ? result.files : [],
  }
}
