'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
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
  const [periodOptions, setPeriodOptions] = useState<
    Record<string, { startDate: string; endDate: string }>
  >({})
  const [availableFiles, setAvailableFiles] = useState<string[]>(files)
  const [codeLoading, setCodeLoading] = useState(false)

  // 커밋 기간 가져오기
  useEffect(() => {
    const fetchPeriods = async () => {
      if (!projectId) return

      try {
        const periods = await getCommitPeriods(projectId)
        setPeriodOptions(periods)
      } catch (error) {
        console.error('커밋 기간 정보를 가져오는 중 오류 발생:', error)
      }
    }

    fetchPeriods()
  }, [projectId])

  // 프로젝트 파일 목록 가져오기
  useEffect(() => {
    const fetchFiles = async () => {
      if (!projectId || !selectedPeriod) return

      setLoading(true)
      try {
        const files = await getProjectFiles(projectId, selectedPeriod)
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
  }, [projectId, selectedPeriod])

  // 파일 선택 시 코드 가져오기
  useEffect(() => {
    const fetchCode = async () => {
      if (!projectId || !selectedFile) return

      setCodeLoading(true)
      try {
        const code = await getFileCode(projectId, selectedFile)
        setCode(code)
      } catch (error) {
        console.error('파일 코드를 가져오는 중 오류 발생:', error)
        setCode('')
      } finally {
        setCodeLoading(false)
      }
    }

    fetchCode()
  }, [projectId, selectedFile])

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <label
            htmlFor="period-select"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            커밋 기간
          </label>
          <Select
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            disabled={loading}
          >
            <SelectTrigger id="period-select" className="w-full">
              <SelectValue placeholder="기간 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1week">최근 1주</SelectItem>
              <SelectItem value="2weeks">최근 2주</SelectItem>
              <SelectItem value="1month">최근 1개월</SelectItem>
              <SelectItem value="3months">최근 3개월</SelectItem>
            </SelectContent>
          </Select>
          {periodOptions[selectedPeriod] && (
            <p className="mt-1 text-xs text-slate-500">
              {periodOptions[selectedPeriod].startDate} -{' '}
              {periodOptions[selectedPeriod].endDate}
            </p>
          )}
        </div>

        <div className="flex-1">
          <label
            htmlFor="file-select"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            파일 선택
          </label>
          <Select
            value={selectedFile}
            onValueChange={setSelectedFile}
            disabled={loading || availableFiles.length === 0}
          >
            <SelectTrigger id="file-select" className="w-full">
              <SelectValue placeholder="파일 선택" />
            </SelectTrigger>
            <SelectContent>
              {availableFiles.map((file) => (
                <SelectItem key={file} value={file}>
                  {file}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
          <span className="font-medium text-slate-800">
            {selectedFile || '파일을 선택해주세요'}
          </span>
        </div>
        <div className="relative min-h-[300px] overflow-auto bg-slate-50 p-4">
          {codeLoading ? (
            <div className="flex h-[300px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : code ? (
            <Textarea
              className="h-[300px] w-full font-mono text-sm"
              value={code}
              readOnly
            />
          ) : (
            <div className="flex h-[300px] items-center justify-center text-slate-400">
              {selectedFile
                ? '코드를 불러올 수 없습니다'
                : '파일을 선택하면 코드가 표시됩니다'}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="default"
          disabled={
            !selectedFile || !code || codeLoading || !onGenerateQuestions
          }
          onClick={() => onGenerateQuestions?.(code, selectedFile)}
        >
          CS 질문 생성하기
        </Button>
      </div>
    </div>
  )
}

export default CodeSelectionTab
