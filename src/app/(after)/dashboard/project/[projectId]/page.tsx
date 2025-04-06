'use client'

import React, { useEffect, useState, use } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// 컴포넌트 분리
import ProjectHeader from './components/ProjectHeader'
import CodeSelectionTab from './components/CodeSelectionTab'
import CSQuestionsTab from './components/CSQuestionsTab'
import QuestionHistoryTab from './components/QuestionHistoryTab'

interface ProjectParams {
  params: Promise<{
    projectId: string
  }>
}

// 목업 데이터
const mockProject = {
  id: '1',
  title: 'seowooda/CoMentor',
  description: 'Github 커밋 기반으로 개인별 맞춤 CS 질문을 생성해주는 서비스',
  role: '프론트엔드 개발, 기획, 디자인, 백엔드 개발, 데이터베이스 설계',
  techStack: ['Node.js', 'React.js', 'Figma'],
  status: 'Progress',
  updatedAt: '2025. 3. 15',
  files: ['App.js', 'UserProfile.jsx', 'Test.jsx'],
}

const ProjectDetailPage = ({ params }: ProjectParams) => {
  const unwrappedParams = use(params)
  const { projectId } = unwrappedParams

  const [selectedTab, setSelectedTab] = useState('code-select')
  const [projectData, setProjectData] = useState(mockProject)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 실제 구현에서는 여기서 프로젝트 데이터를 API로 가져옵니다
        // const response = await fetch(`/api/projects/${projectId}`)
        // const data = await response.json()

        // 목업 데이터 사용 (API 구현 전)
        await new Promise((resolve) => setTimeout(resolve, 500))
        setProjectData({
          ...mockProject,
          id: projectId,
        })
      } catch (error) {
        console.error('프로젝트 데이터를 가져오는 중 오류 발생:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [projectId])

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 px-6 py-6">
      {/* 프로젝트 정보 헤더 컴포넌트 */}
      <ProjectHeader project={projectData} />

      {/* 탭 컨테이너 */}
      <Tabs
        defaultValue="code-select"
        value={selectedTab}
        onValueChange={handleTabChange}
        className="w-full"
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
          <CodeSelectionTab projectId={projectId} files={projectData.files} />
        </TabsContent>

        <TabsContent value="cs-questions">
          <CSQuestionsTab projectId={projectId} />
        </TabsContent>

        <TabsContent value="question-history">
          <QuestionHistoryTab projectId={projectId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProjectDetailPage
