'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { format, subDays, subWeeks, subMonths } from 'date-fns'
import { getProjectFiles, getFileCode } from '@/api/services/project'

interface UseCodeSelectionProps {
  projectId: string
  initialFiles?: string[]
}

export default function useCodeSelection({
  projectId,
  initialFiles = [],
}: UseCodeSelectionProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('1week')
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [availableFiles, setAvailableFiles] = useState<string[]>(initialFiles)
  const [codeLoading, setCodeLoading] = useState(false)
  const [selectedCode, setSelectedCode] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | undefined>(
    subWeeks(new Date(), 1),
  )
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const codeTextareaRef = useRef<HTMLTextAreaElement>(null)

  // 커밋 기간 계산 함수
  const calculateDateRange = useCallback(
    (period: string) => {
      const today = new Date()
      let start: Date = today

      switch (period) {
        case '1week':
          start = subWeeks(today, 1)
          break
        case '2weeks':
          start = subWeeks(today, 2)
          break
        case '1month':
          start = subMonths(today, 1)
          break
        case '3months':
          start = subMonths(today, 3)
          break
        // custom 기간의 경우 기존 startDate, endDate 유지
        case 'custom':
          return { startDate, endDate }
      }

      return { startDate: start, endDate: today }
    },
    [startDate, endDate],
  )

  // 프로젝트 파일 목록 가져오기
  useEffect(() => {
    const fetchFiles = async () => {
      if (!projectId) return

      setLoading(true)
      try {
        // 커스텀 기간일 경우 startDate와 endDate를 사용
        const periodParam =
          selectedPeriod === 'custom'
            ? `custom?startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}`
            : selectedPeriod

        const files = await getProjectFiles(projectId, periodParam)
        setAvailableFiles(files)

        // 새 파일 목록에 기존 선택 파일이 없으면 초기화
        if (files.length > 0 && !files.includes(selectedFile)) {
          setSelectedFile(files[0])
        }
      } catch (error) {
        console.error('파일 목록을 가져오는 중 오류 발생:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [projectId, selectedPeriod, startDate, endDate, selectedFile])

  // 파일 선택 시 코드 가져오기
  useEffect(() => {
    const fetchCode = async () => {
      if (!projectId || !selectedFile) return

      setCodeLoading(true)
      try {
        const code = await getFileCode(projectId, selectedFile)
        setCode(code)
        setSelectedCode('') // 코드 변경 시 선택된 코드 초기화
      } catch (error) {
        console.error('파일 코드를 가져오는 중 오류 발생:', error)
        setCode('')
      } finally {
        setCodeLoading(false)
      }
    }

    fetchCode()
  }, [projectId, selectedFile])

  // 기간 선택 버튼 핸들러
  const handlePeriodClick = useCallback(
    (period: string) => {
      setSelectedPeriod(period)

      // 선택된 기간에 따라 날짜 범위 업데이트
      const { startDate: newStart, endDate: newEnd } =
        calculateDateRange(period)
      setStartDate(newStart)
      setEndDate(newEnd)
    },
    [calculateDateRange],
  )

  // 파일 선택 핸들러
  const handleFileSelect = useCallback((file: string) => {
    setSelectedFile(file)
  }, [])

  // 텍스트 선택 핸들러
  const handleTextSelection = useCallback(() => {
    if (codeTextareaRef.current) {
      const textarea = codeTextareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      if (start !== end) {
        const selectedText = code.substring(start, end)
        setSelectedCode(selectedText)
      }
    }
  }, [code])

  // 질문 생성 핸들러
  const handleGenerateQuestions = useCallback(
    (onGenerate?: (code: string, fileName: string) => void) => {
      if (onGenerate && selectedCode) {
        onGenerate(selectedCode, selectedFile)
      }
    },
    [selectedCode, selectedFile],
  )

  return {
    // 상태 변수
    selectedPeriod,
    selectedFile,
    code,
    loading,
    availableFiles,
    codeLoading,
    selectedCode,
    startDate,
    endDate,
    codeTextareaRef,

    // 이벤트 핸들러
    handlePeriodClick,
    handleFileSelect,
    handleTextSelection,
    handleGenerateQuestions,
    setStartDate,
    setEndDate,
  }
}
