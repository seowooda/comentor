'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { getProjectFiles, getFileCode, FileItem } from '@/api'
import { format } from 'date-fns'
import { getProjectChangedFiles } from '@/api/services/github/projectGithubService'

interface UseCodeSelectionProps {
  projectId: string
}

export default function useCodeSelection({ projectId }: UseCodeSelectionProps) {
  // 날짜 범위 (기본값: 매우 넓은 범위로 설정)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(new Date().setFullYear(new Date().getFullYear() - 10)), // 기본값: 10년 전
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

  // 컴포넌트 마운트 시 자동으로 파일 로드
  useEffect(() => {
    if (projectId) {
      fetchCommitsAndFiles()
    }
  }, [projectId])

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
    setCurrentPath('') // 루트 경로로 초기화
    setSelectedFile('')
    setCode('')

    try {
      // 날짜 범위를 ISO 형식으로 변환
      const since = format(dateRange.from, "yyyy-MM-dd'T'HH:mm:ss'Z'")
      const until = format(dateRange.to, "yyyy-MM-dd'T'HH:mm:ss'Z'")

      let filesList: FileItem[]

      // 기본적으로 프로젝트의 모든 파일을 가져옴
      if (dateRange.from.getFullYear() < new Date().getFullYear() - 5) {
        // 기본 범위(10년)일 경우 모든 파일을 가져옴
        filesList = await getProjectFiles(projectId, '1year', '')
      } else {
        // 사용자가 날짜 범위를 변경한 경우 변경 파일만 가져옴
        filesList = await getProjectChangedFiles(projectId, since, until)
      }

      // 파일 목록 설정
      setFiles(filesList)

      // 파일이 없는 경우 에러 메시지 표시
      if (filesList.length === 0) {
        setError('선택한 기간 동안 변경된 파일이 없습니다.')
      } else {
        setError(null)
      }
    } catch (err) {
      console.error('변경 파일 목록을 가져오는 중 오류 발생:', err)
      setError('변경 파일 목록을 가져오는데 실패했습니다.')
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
