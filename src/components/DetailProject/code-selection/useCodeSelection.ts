'use client'

import { useState, useRef, useCallback } from 'react'
import { getProjectFiles, getFileCode, FileItem } from '@/api/services/project'

interface UseCodeSelectionProps {
  projectId: string
}

export default function useCodeSelection({ projectId }: UseCodeSelectionProps) {
  // 날짜 범위
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)), // 기본값: 1주일 전
    to: new Date(), // 기본값: 오늘
  })

  // 파일 관련 상태
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentPath, setCurrentPath] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [code, setCode] = useState('')
  const [selectedCode, setSelectedCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 코드 텍스트 영역 참조
  const codeTextareaRef = useRef<HTMLTextAreaElement | null>(null)

  // 날짜 범위 변경 핸들러
  const handleDateRangeChange = useCallback(
    (value: { from: Date | undefined; to: Date | undefined }) => {
      setDateRange(value)
    },
    [],
  )

  // 폴더 내비게이션
  const navigateToPath = useCallback(
    async (path: string) => {
      setCurrentPath(path)
      setSelectedFile('')
      setCode('')
      setLoading(true)
      setError(null)

      try {
        // 경로에 따라 GitHub API 호출
        // 참고: GitHub API는 폴더별로 별도 요청이 필요함
        const fileItems = await getProjectFiles(projectId, undefined, path)
        console.log('현재 경로 항목:', fileItems)

        setFiles(fileItems)

        if (fileItems.length === 0) {
          setError('폴더에 항목이 없습니다.')
        } else {
          setError(null) // 에러 메시지 초기화
        }
      } catch (err) {
        console.error('폴더 탐색 중 오류:', err)
        setError('폴더 내용을 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    },
    [projectId],
  )

  // 커밋 및 파일 목록 가져오기
  const fetchCommitsAndFiles = useCallback(async () => {
    if (!projectId) return
    if (!dateRange.from || !dateRange.to) {
      setError('날짜 범위를 선택해주세요.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // 날짜 범위 정보는 일단 유지 (향후 필터 기능 위해)
      const startDate = dateRange.from.toISOString().split('T')[0]
      const endDate = dateRange.to.toISOString().split('T')[0]

      // // 커스텀 기간 파라미터 생성 - URL 형식 수정 (? -> &) todo 수정필요
      // const periodParam = `custom&startDate=${startDate}&endDate=${endDate}`

      // // 프로젝트 파일 목록 가져오기
      // const commitFiles = await getProjectFiles(projectId, periodParam)
      // GitHub API는 날짜 범위와 관계없이 전체 파일을 가져옴
      const commitFiles = await getProjectFiles(projectId, '1week', '')

      // 파일 목록 설정 (최상위 항목)
      setFiles(commitFiles)
      setCurrentPath('') // 루트 경로로 초기화

      // 파일이 없는 경우 에러 메시지 표시
      if (commitFiles.length === 0) {
        setError('저장소에서 파일을 찾을 수 없습니다.')
      } else {
        setError(null)
      }
    } catch (err) {
      console.error('파일 목록을 가져오는 중 오류 발생:', err)
      setError('파일 목록을 가져오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [projectId, dateRange])

  // 파일 선택 핸들러
  const handleSelectFile = useCallback(
    async (fileItem: FileItem) => {
      if (!projectId) return

      if (fileItem.type === 'dir') {
        // 폴더인 경우 해당 경로로 이동
        navigateToPath(fileItem.path)
        return
      }

      // 파일인 경우 내용 불러오기
      setSelectedFile(fileItem.path)
      setLoading(true)
      setError(null)

      try {
        const fileContent = await getFileCode(projectId, fileItem.path)
        setCode(fileContent)
        setSelectedCode('') // 새 파일 선택 시 코드 선택 초기화
      } catch (err) {
        console.error('파일 내용을 가져오는 중 오류 발생:', err)
        setError('파일 내용을 가져오는데 실패했습니다.')
        setCode('')
      } finally {
        setLoading(false)
      }
    },
    [projectId, navigateToPath],
  )

  // 상위 폴더로 이동
  const navigateUp = useCallback(() => {
    if (!currentPath) return

    const pathParts = currentPath.split('/')
    pathParts.pop()
    const parentPath = pathParts.join('/')
    navigateToPath(parentPath)
  }, [currentPath, navigateToPath])

  // 코드 선택 핸들러
  const handleSelectCode = useCallback((text: string) => {
    setSelectedCode(text)
  }, [])

  return {
    dateRange,
    handleDateRangeChange,
    files,
    currentPath,
    selectedFile,
    handleSelectFile,
    navigateUp,
    code,
    selectedCode,
    handleSelectCode,
    codeTextareaRef,
    loading,
    error,
    fetchCommitsAndFiles,
  }
}
