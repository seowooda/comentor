'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Loader2 } from 'lucide-react'
import { DetailProjectProps, ProjectData } from './types'
import { useRouter } from 'next/navigation'

// 컴포넌트 및 UI
import ProjectHeader from './ui/ProjectHeader'
import CodeSelectionTab from './code-selection'
import CSQuestionsTab from './cs-questions'
import QuestionHistoryTab from './question-history'
import { ProjectEditModal } from '../ProjectEditModal'
import { DeleteConfirmDialog } from '../DashboardCard/DeleteConfirmDialog'

// API 서비스
import {
  getProjectDetail,
  getCSQuestionHistory,
  submitCSAnswer,
  saveCSQuestion,
  bookmarkCSQuestion,
  useProjectUpdate,
  useProjectDelete,
} from '@/api'

/**
 * 프로젝트 상세 페이지 컴포넌트
 * 프로젝트 정보와 탭 컨텐츠(코드 선택, CS 질문, 질문 기록)를 표시합니다.
 */
export const DetailProject = ({ params }: DetailProjectProps) => {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState('code-select')
  const [projectId, setProjectId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [questionHistory, setQuestionHistory] = useState<any | null>(null)
  const [selectedCodeSnippet, setSelectedCodeSnippet] = useState<string>('')
  const [selectedFileName, setSelectedFileName] = useState<string>('')

  // 수정 및 삭제 관련 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  // 프로젝트 수정 및 삭제 훅 설정
  const { mutateAsync: updateProject } = useProjectUpdate(Number(projectId))
  const { mutateAsync: deleteProject } = useProjectDelete(Number(projectId))

  // 프로젝트 ID를 가져오고 데이터 로드
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true)
        const { projectId: id } = await params

        if (!id) {
          throw new Error('프로젝트 ID가 없습니다')
        }

        setProjectId(id)

        // API 호출하여 프로젝트 데이터 가져오기
        const project = await getProjectDetail(id)
        setProjectData(project)

        // 질문 이력 가져오기
        try {
          const history = await getCSQuestionHistory(id)
          setQuestionHistory(history)
        } catch (historyError) {
          console.error('질문 이력을 가져오는 중 오류 발생:', historyError)
          // 질문 이력 오류는 전체 로딩에 영향을 주지 않음
        }

        setError(null)
      } catch (error) {
        console.error('프로젝트 데이터를 가져오는 중 오류 발생:', error)
        setError(error instanceof Error ? error.message : '데이터 로딩 실패')
      } finally {
        setLoading(false)
      }
    }

    fetchProjectData()
  }, [params])

  // CS 질문 생성 핸들러
  const handleGenerateQuestions = useCallback(
    (code: string, fileName: string) => {
      setSelectedCodeSnippet(code)
      setSelectedFileName(fileName)
      // 질문 생성 후 CS 질문 탭으로 전환
      setSelectedTab('cs-questions')
    },
    [],
  )

  // 답변 제출 핸들러
  const handleAnswerSubmit = useCallback(
    async (answer: string, questionId: number): Promise<string> => {
      try {
        return await submitCSAnswer(questionId, answer)
      } catch (error) {
        console.error('답변 제출 중 오류 발생:', error)
        return '답변 제출 중 오류가 발생했습니다. 다시 시도해주세요.'
      }
    },
    [],
  )

  // 질문 저장 핸들러
  const handleSaveQuestion = useCallback(
    async (questionId: number): Promise<boolean> => {
      try {
        return await saveCSQuestion(questionId)
      } catch (error) {
        console.error('질문 저장 중 오류 발생:', error)
        return false
      }
    },
    [],
  )

  // 질문 북마크 핸들러
  const handleBookmarkQuestion = useCallback(
    async (questionId: number): Promise<boolean> => {
      try {
        return await bookmarkCSQuestion(questionId)
      } catch (error) {
        console.error('북마크 중 오류 발생:', error)
        return false
      }
    },
    [],
  )

  // 다른 코드 선택 핸들러
  const handleChooseAnotherCode = useCallback(() => {
    setSelectedTab('code-select')
  }, [])

  // 프로젝트 수정 핸들러
  const handleEditProject = useCallback(() => {
    setIsEditModalOpen(true)
  }, [])

  // 프로젝트 수정 성공 핸들러
  const handleEditSuccess = useCallback(async () => {
    try {
      // 프로젝트 데이터 다시 불러오기
      const updatedProject = await getProjectDetail(projectId)
      setProjectData(updatedProject)
    } catch (error) {
      console.error('업데이트된 프로젝트 정보를 불러오는 중 오류 발생:', error)
    }
  }, [projectId])

  // 프로젝트 삭제 핸들러
  const handleDeleteProject = useCallback(() => {
    setIsDeleteDialogOpen(true)
  }, [])

  // 프로젝트 삭제 확인 핸들러
  const handleConfirmDelete = useCallback(async () => {
    setDeleteLoading(true)
    setDeleteError(null)

    try {
      await deleteProject()
      setDeleteLoading(false)
      setIsDeleteDialogOpen(false)

      // 대시보드로 이동 시 완전히 새로 고침하도록 강제
      // 추가 쿼리 매개변수(refresh)를 사용하여 새로운 상태를 보장
      const timestamp = new Date().getTime()
      window.location.href = `/dashboard?refresh=${timestamp}`
    } catch (error) {
      setDeleteLoading(false)
      setDeleteError(
        error instanceof Error
          ? error.message
          : '프로젝트 삭제 중 오류가 발생했습니다',
      )
    }
  }, [deleteProject])

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-slate-700" />
          <p className="mt-2 text-sm text-slate-600">프로젝트 로딩 중...</p>
        </div>
      </div>
    )
  }

  // 에러 상태 처리
  if (error || !projectData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">
            {error || '프로젝트를 찾을 수 없습니다'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex w-full max-w-[1368px] flex-col gap-8 px-4 py-6 md:px-6">
      <ProjectHeader
        project={projectData}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />

      <Tabs
        defaultValue="code-select"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full max-w-[1368px]"
      >
        <TabsList className="w-full rounded-lg bg-slate-100">
          <TabsTrigger
            value="code-select"
            className="flex-1 data-[state=active]:text-slate-900 data-[state=inactive]:text-slate-600"
          >
            코드 선택
          </TabsTrigger>
          <TabsTrigger
            value="cs-questions"
            className="flex-1 data-[state=active]:text-slate-900 data-[state=inactive]:text-slate-600"
          >
            CS 질문
          </TabsTrigger>
          <TabsTrigger
            value="question-history"
            className="flex-1 data-[state=active]:text-slate-900 data-[state=inactive]:text-slate-600"
          >
            질문 기록
          </TabsTrigger>
        </TabsList>

        <TabsContent value="code-select" className="mt-4">
          <CodeSelectionTab
            projectId={projectId}
            onSelectCodeSnippet={handleGenerateQuestions}
          />
        </TabsContent>

        <TabsContent value="cs-questions">
          <CSQuestionsTab
            projectId={projectId}
            codeSnippet={selectedCodeSnippet}
            fileName={selectedFileName}
            onAnswerSubmit={handleAnswerSubmit}
            onSaveQuestion={handleSaveQuestion}
            onChooseAnotherCode={handleChooseAnotherCode}
            onGenerateMoreQuestions={() => console.log('더 많은 질문 생성')}
            onFinish={() => setSelectedTab('question-history')}
            onTabChange={(tabId) => setSelectedTab(tabId)}
          />
        </TabsContent>

        <TabsContent value="question-history">
          <QuestionHistoryTab
            projectId={projectId}
            initialHistory={questionHistory}
            onBookmarkQuestion={handleBookmarkQuestion}
          />
        </TabsContent>
      </Tabs>

      {/* 프로젝트 수정 모달 */}
      {isEditModalOpen && projectData && (
        <ProjectEditModal
          projectId={Number(projectId)}
          initialData={{
            description: projectData.description,
            role: projectData.role,
            status: projectData.status.toLowerCase().includes('progress')
              ? 'PROGRESS'
              : 'DONE',
          }}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditSuccess}
        />
      )}

      {/* 프로젝트 삭제 확인 대화상자 - DeleteConfirmDialog 재사용 */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        projectTitle={projectData.title}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteLoading}
        error={deleteError ? { message: deleteError } : undefined}
      />
    </div>
  )
}

// 이전 코드와의 호환성을 위해 기본 내보내기 유지
export default DetailProject
