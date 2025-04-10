'use client'

import React, { RefObject } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2, Code } from 'lucide-react'

interface CodeViewerProps {
  code: string
  selectedCode: string
  loading: boolean
  fileName: string
  codeTextareaRef: RefObject<HTMLTextAreaElement | null>
  onTextSelection: () => void
  onGenerateQuestions: () => void
}

/**
 * 코드 뷰어 컴포넌트
 */
const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  selectedCode,
  loading,
  fileName,
  codeTextareaRef,
  onTextSelection,
  onGenerateQuestions,
}) => {
  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
        <span className="ml-2 text-sm text-slate-600">코드 로딩 중...</span>
      </div>
    )
  }

  if (!code) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500">
        파일을 선택하여 코드를 확인하세요.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Code className="h-4 w-4 text-slate-600" />
        <span className="text-sm font-medium">{fileName}</span>
      </div>

      <div className="rounded-md border border-slate-200 p-1">
        <Textarea
          ref={codeTextareaRef}
          value={code}
          readOnly
          className="h-60 resize-none font-mono text-sm"
          onMouseUp={onTextSelection}
          onKeyUp={onTextSelection}
        />
      </div>

      {selectedCode && (
        <div className="space-y-2">
          <div className="rounded-md bg-blue-50 p-4">
            <h4 className="mb-2 text-sm font-medium text-blue-700">
              선택된 코드
            </h4>
            <pre className="rounded-md bg-white p-2 text-xs whitespace-pre-wrap text-slate-700">
              {selectedCode}
            </pre>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={onGenerateQuestions}
              className="bg-blue-600 hover:bg-blue-700"
            >
              CS 질문 생성하기
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeViewer
