'use client'

import React from 'react'
import { Loader2, Folder, FileText, ChevronUp } from 'lucide-react'
import { FileItem } from '@/api'
import { generateSkeleton } from '@/lib/skeleton-generator'

interface FileListProps {
  files: FileItem[]
  selectedFile: string
  currentPath: string
  loading: boolean
  onSelectFile: (file: FileItem) => void
  onNavigateUp: () => void
  className?: string
}

/**
 * 파일 목록 컴포넌트
 */
const FileList: React.FC<FileListProps> = ({
  files,
  selectedFile,
  currentPath,
  loading,
  onSelectFile,
  onNavigateUp,
  className = '',
}) => {
  // 파일 아이콘 결정 함수
  const getFileIcon = (type: string) => {
    if (type === 'dir') {
      return <Folder className="h-4 w-4 text-blue-500" />
    }
    return <FileText className="h-4 w-4 text-slate-500" />
  }

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
        <span className="ml-2 text-sm text-slate-600">
          파일 목록 로딩 중...
        </span>
      </div>
    )
  }

  if (files.length === 0 && !currentPath) {
    return (
      <div className="rounded-md bg-slate-50 p-4 text-center text-slate-500">
        저장소에서 파일을 찾을 수 없습니다.
      </div>
    )
  }

  return (
    <div
      className={`h-64 overflow-y-auto rounded-md border border-slate-200 ${className}`}
    >
      {/* 현재 경로 표시 */}
      <div className="bg-slate-50 p-2 text-sm font-medium text-slate-700">
        <div className="flex items-center">
          {currentPath ? (
            <>
              <button
                onClick={onNavigateUp}
                className="mr-2 rounded-full p-1 hover:bg-slate-200"
                title="상위 폴더로 이동"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <span className="truncate">{currentPath || '/'}</span>
            </>
          ) : (
            '루트 디렉토리'
          )}
        </div>
      </div>

      <ul className="divide-y divide-slate-100">
        {files.map((file) => (
          <li
            key={file.path}
            className={`cursor-pointer p-2 hover:bg-slate-50 ${
              selectedFile === file.path ? 'bg-slate-100' : ''
            }`}
            onClick={() => onSelectFile(file)}
          >
            <div className="flex items-center space-x-2">
              {getFileIcon(file.type)}
              <span className="text-sm text-slate-700">{file.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * 파일 목록 스켈레톤 컴포넌트
 */
const FileListSkeleton: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div
    className={`h-64 overflow-y-auto rounded-md border border-slate-200 ${className}`}
  >
    <div className="bg-slate-50 p-2 text-sm font-medium text-slate-700">
      <div className="flex items-center">루트 디렉토리</div>
    </div>
    <ul className="divide-y divide-slate-100">
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index} className="p-2">
          <div className="flex items-center space-x-2">
            {index % 3 === 0 ? (
              <Folder className="h-4 w-4 text-blue-500" />
            ) : (
              <FileText className="h-4 w-4 text-slate-500" />
            )}
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
          </div>
        </li>
      ))}
    </ul>
  </div>
)

/**
 * 파일 목록 래퍼 컴포넌트
 * 로딩 상태에 따라 실제 컴포넌트 또는 스켈레톤을 표시
 */
const FileListWrapper: React.FC<FileListProps> = ({
  loading = false,
  className = '',
  ...props
}) => {
  if (loading) {
    return <FileListSkeleton className={className} />
  }

  return <FileList loading={loading} className={className} {...props} />
}

export default FileListWrapper
