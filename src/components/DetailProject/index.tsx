'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// 컴포넌트 분리
import ProjectHeader from './ProjectHeader'
import CodeSelectionTab from './CodeSelectionTab'
import CSQuestionsTab from './CSQuestionsTab'
import QuestionHistoryTab from './QuestionHistoryTab'

interface ProjectParams {
  params: Promise<{
    projectId: string
  }>
}

interface ProjectData {
  id: string
  title: string
  description: string
  role: string
  techStack: string[]
  status: string
  updatedAt: string
  files: string[]
}

// 목업 데이터
const mockProject: ProjectData = {
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
  const [selectedTab, setSelectedTab] = useState('code-select')
  const [projectData, setProjectData] = useState<ProjectData>(mockProject)
  const [loading, setLoading] = useState(true)
  const [projectId, setProjectId] = useState<string>('')

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const { projectId: id } = await params

        if (!id) return

        setProjectId(id)

        // API 구현 후 실제 데이터를 가져오는 로직
        // const response = await fetch(`/api/projects/${id}`)
        // const data = await response.json()
        // setProjectData(data)

        // 목업 데이터 사용 (API 구현 전)
        await new Promise((resolve) => setTimeout(resolve, 300))
        setProjectData((prev) => ({
          ...prev,
          id,
        }))
      } catch (error) {
        console.error('프로젝트 데이터를 가져오는 중 오류 발생:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectData()
  }, [params])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex w-full max-w-[1368px] flex-col gap-8 px-4 py-6 md:px-6">
      <ProjectHeader project={projectData} />

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
