'use client'

import React from 'react'
import { CodeSelectionTabProps } from '../types'
import DateRangePicker from './DateRangePicker'
import FileList from './FileList'
import CodeViewer from './CodeViewer'
import useCodeSelection from './useCodeSelection'

/**
 * 코드 선택 탭 컴포넌트
 * 프로젝트 파일 목록과 선택된 파일의 코드를 표시합니다.
 */
const CodeSelectionTab: React.FC<CodeSelectionTabProps> = ({
  projectId,
  files = [],
  onGenerateQuestions,
}) => {
  const {
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
  } = useCodeSelection({ projectId, initialFiles: files })

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-slate-300 p-6">
      <h2 className="text-lg font-semibold">커밋 기간 선택</h2>

      {/* 날짜 범위 선택 */}
      <DateRangePicker
        selectedPeriod={selectedPeriod}
        startDate={startDate}
        endDate={endDate}
        onPeriodChange={handlePeriodClick}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* 파일 목록 */}
        <div className="md:col-span-1">
          <h3 className="mb-2 text-sm font-semibold">파일 목록</h3>
          <FileList
            files={availableFiles}
            selectedFile={selectedFile}
            loading={loading}
            onSelectFile={handleFileSelect}
          />
        </div>

        {/* 코드 뷰어 */}
        <div className="md:col-span-2">
          <h3 className="mb-2 text-sm font-semibold">코드 내용</h3>
          <CodeViewer
            code={code}
            selectedCode={selectedCode}
            loading={codeLoading}
            fileName={selectedFile}
            codeTextareaRef={codeTextareaRef}
            onTextSelection={handleTextSelection}
            onGenerateQuestions={() =>
              handleGenerateQuestions(onGenerateQuestions)
            }
          />
        </div>
      </div>
    </div>
  )
}

export default CodeSelectionTab
