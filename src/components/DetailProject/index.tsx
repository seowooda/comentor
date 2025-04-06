'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Loader2 } from 'lucide-react'

// 컴포넌트 분리
import ProjectHeader from './ProjectHeader'
import CodeSelectionTab from './CodeSelectionTab'
import CSQuestionsTab from './CSQuestionsTab'
import QuestionHistoryTab from './QuestionHistoryTab'
// API 서비스가 개발되면 해당 주석 제거
// import { useProjectDetail } from '@/api/services/project'

import {
  getProjectDetail,
  getQuestionHistory,
  generateCSQuestions,
  submitAnswer,
  saveQuestion,
  bookmarkQuestion,
} from '@/api/services/project'
import {
  Project,
  HistoryByDate,
  CSQuestion,
} from '@/api/mocks/handlers/project'

export interface ProjectData extends Project {}

export interface DetailProjectProps {
  params: Promise<{
    projectId: string
  }>
}

/**
 * 프로젝트 상세 페이지 컴포넌트
 * 프로젝트 정보와 탭 컨텐츠(코드 선택, CS 질문, 질문 기록)를 표시합니다.
 */
export const DetailProject = ({ params }: DetailProjectProps) => {
  const [selectedTab, setSelectedTab] = useState('code-select')
  const [projectId, setProjectId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [questionHistory, setQuestionHistory] = useState<HistoryByDate | null>(
    null,
  )

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
          const history = await getQuestionHistory(id)
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

  // API 연동 시 아래 코드 활성화
  // useEffect(() => {
  //   if (data) {
  //     setProjectData(data);
  //   }
  // }, [data]);

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

  // CS 질문 생성 핸들러
  const handleGenerateQuestions = async (code: string, fileName: string) => {
    try {
      // API 호출하여 질문 생성
      await generateCSQuestions(projectId, code, fileName)
      // 질문 생성 후 CS 질문 탭으로 전환
      setSelectedTab('cs-questions')
    } catch (error) {
      console.error('CS 질문 생성 중 오류 발생:', error)
      // 오류 처리 (필요시 사용자에게 알림)
    }
  }

  // 답변 제출 핸들러
  const handleAnswerSubmit = async (
    answer: string,
    questionId: number,
  ): Promise<string> => {
    try {
      return await submitAnswer(questionId, answer)
    } catch (error) {
      console.error('답변 제출 중 오류 발생:', error)
      return '답변 제출 중 오류가 발생했습니다. 다시 시도해주세요.'
    }
  }

  // 질문 저장 핸들러
  const handleSaveQuestion = async (questionId: number): Promise<boolean> => {
    try {
      return await saveQuestion(questionId)
    } catch (error) {
      console.error('질문 저장 중 오류 발생:', error)
      return false
    }
  }

  // 질문 북마크 핸들러
  const handleBookmarkQuestion = async (
    questionId: number,
  ): Promise<boolean> => {
    try {
      return await bookmarkQuestion(questionId)
    } catch (error) {
      console.error('북마크 중 오류 발생:', error)
      return false
    }
  }

  return (
    <div className="container mx-auto flex w-full max-w-[1368px] flex-col gap-8 px-4 py-6 md:px-6">
      <ProjectHeader
        project={projectData}
        onEdit={() => console.log('프로젝트 편집')}
        onDelete={() => console.log('프로젝트 삭제')}
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
            files={projectData.files}
            onGenerateQuestions={handleGenerateQuestions}
          />
        </TabsContent>

        <TabsContent value="cs-questions">
          <CSQuestionsTab
            projectId={projectId}
            onAnswerSubmit={handleAnswerSubmit}
            onSaveQuestion={handleSaveQuestion}
          />
        </TabsContent>

        <TabsContent value="question-history">
          <QuestionHistoryTab
            projectId={projectId}
            initialHistory={questionHistory || undefined}
            onBookmarkQuestion={handleBookmarkQuestion}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// 이전 코드와의 호환성을 위해 기본 내보내기 유지
export default DetailProject
