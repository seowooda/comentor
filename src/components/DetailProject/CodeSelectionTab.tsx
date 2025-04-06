'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Loader2,
  Calendar as CalendarIcon,
  FileText,
  Folder,
  Code,
} from 'lucide-react'
import { format, subDays, subWeeks, subMonths } from 'date-fns'
import { ko } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import {
  getCommitPeriods,
  getProjectFiles,
  getFileCode,
} from '@/api/services/project'

export interface CodeSelectionTabProps {
  projectId: string
  files?: string[]
  onGenerateQuestions?: (code: string, fileName: string) => void
}

/**
 * 코드 선택 탭 컴포넌트
 * 프로젝트 파일 목록과 선택된 파일의 코드를 표시합니다.
 */
const CodeSelectionTab: React.FC<CodeSelectionTabProps> = ({
  projectId,
  files = [],
  onGenerateQuestions,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('1week')
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [availableFiles, setAvailableFiles] = useState<string[]>(files)
  const [codeLoading, setCodeLoading] = useState(false)
  const [selectedCode, setSelectedCode] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | undefined>(
    subWeeks(new Date(), 1),
  )
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const codeTextareaRef = useRef<HTMLTextAreaElement>(null)

  // 커밋 기간 계산 함수
  const calculateDateRange = (period: string) => {
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
  }

  // 커밋 기간 가져오기
  useEffect(() => {
    const fetchPeriods = async () => {
      if (!projectId) return

      try {
        const periods = await getCommitPeriods(projectId)
        // 기간 정보 처리 (필요시)
      } catch (error) {
        console.error('커밋 기간 정보를 가져오는 중 오류 발생:', error)
      }
    }

    fetchPeriods()
  }, [projectId])

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
  }, [projectId, selectedPeriod, startDate, endDate])

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
  const handlePeriodClick = (period: string) => {
    setSelectedPeriod(period)

    // 선택된 기간에 따라 날짜 범위 업데이트
    const { startDate: newStart, endDate: newEnd } = calculateDateRange(period)
    setStartDate(newStart)
    setEndDate(newEnd)
  }

  // 파일 선택 핸들러
  const handleFileSelect = (file: string) => {
    setSelectedFile(file)
  }

  // 텍스트 선택 핸들러
  const handleTextSelection = () => {
    if (codeTextareaRef.current) {
      const textarea = codeTextareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      if (start !== end) {
        const selectedText = code.substring(start, end)
        setSelectedCode(selectedText)
      }
    }
  }

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-slate-300 p-6">
      <h2 className="text-lg font-semibold">커밋 기간 선택</h2>

      <div className="flex gap-2 py-2">
        <button
          className={`rounded-md border px-3 py-1 text-xs ${selectedPeriod === '1week' ? 'border-blue-500' : 'border-slate-200'}`}
          onClick={() => handlePeriodClick('1week')}
        >
          최근 1주일
        </button>
        <button
          className={`rounded-md border px-3 py-1 text-xs ${selectedPeriod === '2weeks' ? 'border-blue-500' : 'border-slate-200'}`}
          onClick={() => handlePeriodClick('2weeks')}
        >
          최근 2주일
        </button>
        <button
          className={`rounded-md border px-3 py-1 text-xs ${selectedPeriod === '1month' ? 'border-blue-500' : 'border-slate-200'}`}
          onClick={() => handlePeriodClick('1month')}
        >
          최근 1개월
        </button>
        <button
          className={`rounded-md border px-3 py-1 text-xs ${selectedPeriod === '3months' ? 'border-blue-500' : 'border-slate-200'}`}
          onClick={() => handlePeriodClick('3months')}
        >
          최근 3개월
        </button>
        <button
          className={`rounded-md border px-3 py-1 text-xs ${selectedPeriod === 'custom' ? 'border-blue-500' : 'border-slate-200'}`}
          onClick={() => handlePeriodClick('custom')}
        >
          직접 선택
        </button>
      </div>

      {selectedPeriod === 'custom' && (
        <div className="flex gap-5">
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm font-semibold">시작 날짜</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'flex items-center justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-slate-600" />
                  {startDate ? (
                    format(startDate, 'PPP', { locale: ko })
                  ) : (
                    <span>날짜 선택</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  locale={ko}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm font-semibold">종료 날짜</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'flex items-center justify-start text-left font-normal',
                    !endDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-slate-600" />
                  {endDate ? (
                    format(endDate, 'PPP', { locale: ko })
                  ) : (
                    <span>날짜 선택</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  locale={ko}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      <h2 className="pt-3 text-lg font-semibold">코드 선택</h2>

      <p className="text-xs text-slate-500">
        {startDate && endDate
          ? `${format(startDate, 'yyyy년 MM월 dd일', { locale: ko })} ~ ${format(endDate, 'yyyy년 MM월 dd일', { locale: ko })} 기간 동안의 커밋된 코드를 확인하고 선택하세요.`
          : '선택한 기간 동안의 커밋된 코드를 확인하고 선택하세요.'}
      </p>

      <div className="flex gap-5">
        <div className="flex w-2/5 flex-col gap-2 rounded-md border border-slate-200 p-2">
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-zinc-700" />
            <span className="text-xs">파일</span>
          </div>

          {loading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
              <span className="ml-2 text-xs text-slate-500">
                파일 목록 로딩 중...
              </span>
            </div>
          ) : availableFiles.length > 0 ? (
            availableFiles.map((file, index) => (
              <div
                key={index}
                className={`flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 px-3 py-1 ${selectedFile === file ? 'bg-slate-50' : ''}`}
                onClick={() => handleFileSelect(file)}
              >
                <FileText className="h-4 w-4 text-zinc-700" />
                <span className="text-xs">{file}</span>
              </div>
            ))
          ) : (
            <div className="flex h-32 items-center justify-center text-xs text-slate-500">
              파일이 없습니다
            </div>
          )}
        </div>

        <div className="flex w-3/5 flex-1 flex-col rounded-md border border-slate-200 p-2">
          <div className="mb-2 flex items-center gap-2">
            <Code className="h-4 w-4 text-zinc-700" />
            <span className="text-xs">코드</span>
          </div>

          {!selectedFile ? (
            <div className="flex h-32 items-center justify-center text-sm text-slate-500">
              왼쪽에서 파일을 선택하세요
            </div>
          ) : codeLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              <span className="ml-2 text-slate-500">코드 로딩 중...</span>
            </div>
          ) : (
            <div className="flex flex-1 flex-col">
              <div className="mb-4 flex-1 overflow-auto rounded-md bg-slate-100 p-2">
                <Textarea
                  ref={codeTextareaRef}
                  value={code}
                  onChange={() => {}} // 읽기 전용
                  onMouseUp={handleTextSelection}
                  onKeyUp={handleTextSelection}
                  className="min-h-[200px] w-full resize-none font-mono text-xs whitespace-pre text-slate-600"
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedCode && (
        <div className="mt-5 rounded-md border border-slate-200 p-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Code className="h-4 w-4 text-zinc-700" />
            <span className="text-xs font-medium">선택된 코드</span>
          </div>
          <div className="mt-3 overflow-auto rounded-md bg-slate-50 p-3">
            <pre className="font-mono text-xs break-all whitespace-pre-wrap text-slate-700">
              {selectedCode}
            </pre>
          </div>
          <div className="flex justify-end pt-3">
            <Button
              onClick={() =>
                onGenerateQuestions?.(selectedCode || code, selectedFile)
              }
              className="bg-black text-white hover:bg-gray-800"
              disabled={!selectedFile || codeLoading}
            >
              CS 질문 생성하기
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeSelectionTab
