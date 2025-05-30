'use client'

import { useState, useEffect } from 'react'
import { Loader2, Info } from 'lucide-react'
import DateRangePicker from './DateRangePicker'
import FileList from './FileList'
import CodeViewer from './CodeViewer'
import useCodeSelection from './useCodeSelection'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DateRange } from 'react-day-picker'
import { FileItem } from '@/api'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CodeSelectionTabProps {
  projectId: string
  files?: FileItem[]
  onSelectCodeSnippet: (snippet: string, folderName: string) => void
}

export const CodeSelectionTab = ({
  projectId,
  files: initialFiles,
  onSelectCodeSnippet,
}: CodeSelectionTabProps) => {
  const {
    dateRange,
    handleDateRangeChange,
    selectedBranch,
    availableBranches,
    handleBranchChange,
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
  } = useCodeSelection({ projectId })

  const [activeTab, setActiveTab] = useState<string>('calendar')

  useEffect(() => {
    if (selectedFile) {
      setActiveTab('code')
    }
  }, [selectedFile])

  const handleGenerateQuestions = () => {
    if (selectedCode) {
      onSelectCodeSnippet(selectedCode, selectedFile)
    }
  }

  // DateRange 타입으로 변환하는 헬퍼 함수
  const handleDateChange = (range: DateRange | undefined) => {
    if (range) {
      handleDateRangeChange({
        from: range.from,
        to: range.to || range.from,
      })
    }
  }

  return (
    <div className="space-y-6">
      <Alert className="mb-6 border-blue-200 bg-blue-50">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertTitle className="font-medium text-blue-700">시작하기</AlertTitle>
        <AlertDescription className="text-blue-600">
          코드를 분석하여 CS 질문을 생성하려면 파일을 선택하고 분석할 코드
          영역을 선택해 주세요. 필요한 경우 날짜 범위를 지정하여 특정 기간 동안
          변경된 파일만 조회할 수 있습니다.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            1. 파일 선택
          </TabsTrigger>
          <TabsTrigger
            value="code"
            disabled={!selectedFile}
            className="flex items-center gap-2"
          >
            2. 코드 선택
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">
                  파일 필터링 (선택사항)
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  특정 기간에 변경된 파일만 보려면 날짜 범위를 선택하세요.
                </p>

                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium">
                    브랜치 선택
                  </label>
                  <Select
                    value={selectedBranch}
                    onValueChange={handleBranchChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="브랜치 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBranches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={handleDateChange}
                />

                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={fetchCommitsAndFiles}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        불러오는 중...
                      </>
                    ) : (
                      '파일 필터링 적용'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">파일 목록</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  분석할 코드가 포함된 파일을 선택해주세요.
                </p>
                {error ? (
                  <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                ) : files.length === 0 && !loading ? (
                  <div className="bg-muted rounded-md border p-4 text-sm">
                    파일이 없습니다. 날짜 범위를 변경해보세요.
                  </div>
                ) : (
                  <FileList
                    files={files}
                    selectedFile={selectedFile}
                    currentPath={currentPath}
                    onSelectFile={handleSelectFile}
                    onNavigateUp={navigateUp}
                    loading={loading}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">코드 선택</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    분석할 코드 영역을 드래그하여 선택해주세요.
                  </p>
                </div>
                <Button
                  onClick={handleGenerateQuestions}
                  disabled={!selectedCode}
                  className="bg-primary hover:bg-primary/90"
                >
                  CS 질문 생성하기
                </Button>
              </div>

              <div className="bg-muted/20 overflow-hidden rounded-md border">
                <CodeViewer
                  code={code}
                  selectedCode={selectedCode}
                  codeTextareaRef={codeTextareaRef}
                  onSelectCode={handleSelectCode}
                  loading={loading}
                  className="min-h-[400px] md:min-h-[500px]"
                />
              </div>

              {selectedCode && (
                <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-4">
                  <h4 className="mb-2 text-sm font-medium text-blue-700">
                    선택된 코드
                  </h4>
                  <p className="text-muted-foreground mb-2 text-xs">
                    선택한 코드로 CS 질문이 생성됩니다.
                  </p>
                  <pre className="max-h-[150px] overflow-auto rounded border bg-white p-3 text-xs">
                    {selectedCode.substring(0, 500)}
                    {selectedCode.length > 500 && '...'}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CodeSelectionTab
