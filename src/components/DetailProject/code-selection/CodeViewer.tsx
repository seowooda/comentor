'use client'

import React, { RefObject, useCallback } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { generateSkeleton } from '@/lib/skeleton-generator'

interface CodeViewerProps {
  code: string
  selectedCode: string
  codeTextareaRef: RefObject<HTMLTextAreaElement | null>
  onSelectCode: (text: string) => void
  loading?: boolean
  className?: string
}

/**
 * 코드 뷰어 컴포넌트
 */
const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  selectedCode,
  codeTextareaRef,
  onSelectCode,
  loading = false,
  className = '',
}) => {
  // 텍스트 선택 핸들러
  const handleTextSelection = useCallback(() => {
    if (codeTextareaRef?.current) {
      const textarea = codeTextareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      if (start !== end) {
        const selectedText = code.substring(start, end)
        onSelectCode(selectedText)
      }
    }
  }, [code, codeTextareaRef, onSelectCode])

  // 코드가 없을 때는 안내 메시지 표시
  if (!code) {
    return (
      <div
        className={`text-muted-foreground flex h-full min-h-[200px] items-center justify-center p-6 ${className}`}
      >
        파일을 선택하여 코드를 확인하세요.
      </div>
    )
  }

  // 코드 표시
  return (
    <Textarea
      ref={codeTextareaRef}
      value={code}
      readOnly
      className={`h-full min-h-[300px] resize-none font-mono text-sm ${className}`}
      onMouseUp={handleTextSelection}
      onKeyUp={handleTextSelection}
      placeholder="코드를 드래그하여 선택해주세요."
    />
  )
}

/**
 * 코드 뷰어 스켈레톤 컴포넌트
 */
const CodeViewerSkeleton = generateSkeleton(
  ({ className = '' }: { className?: string }) => (
    <div className={`min-h-[300px] rounded-md border p-4 ${className}`}>
      <div className="animate-pulse space-y-2 font-mono text-sm">
        {Array.from({ length: 30 }).map((_, index) => {
          // 들여쓰기 패턴 (3라인마다 들여쓰기 증가)
          const indentLevel = Math.floor(index / 3) % 4
          const baseIndent = indentLevel * 5

          // 30% ~ 95% 사이의 랜덤한 너비 + 들여쓰기
          const width = Math.floor(Math.random() * 65) + 30 + baseIndent

          // 가끔 짧은 라인 (주석, 괄호닫기 등)
          const finalWidth =
            index % 7 === 0 ? `${baseIndent + 10}%` : `${Math.min(width, 95)}%`

          return (
            <div
              key={index}
              className="h-4 rounded bg-slate-200"
              style={{ width: finalWidth }}
            />
          )
        })}
      </div>
    </div>
  ),
)

/**
 * 코드 뷰어 래퍼 컴포넌트
 * 로딩 상태에 따라 실제 컴포넌트 또는 스켈레톤을 표시
 */
const CodeViewerWrapper: React.FC<CodeViewerProps> = ({
  loading = false,
  className = '',
  ...props
}) => {
  if (loading) {
    return <CodeViewerSkeleton className={className} />
  }

  return <CodeViewer loading={loading} className={className} {...props} />
}

export default CodeViewerWrapper
