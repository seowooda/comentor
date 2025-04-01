import { PlusCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { DashboardCard } from '../DashboardCard/DashboardCard'
import { ProjectImportModal } from '../ProjectImportModal'
import { useProjectList } from '@/api/services/project'

const Dashboard = ({ filter }: { filter: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState<any[]>([])

  // API에서 프로젝트 목록 조회 (필터링은 프론트엔드에서 처리)
  const { data: projectsData, isLoading, refetch } = useProjectList()

  // 프로젝트 데이터 변환 및 필터링
  useEffect(() => {
    if (projectsData?.result) {
      const formattedProjects = projectsData.result.map((project) => {
        return {
          id: project.id, // 백엔드에서 제공하는 실제 ID 사용
          title: project.name || '제목 없음',
          personal_stack: [project.language].filter(Boolean), // null 값 필터링
          description: project.description || '',
          status: project.status || 'PROGRESS',
          created_At: project.updatedAt || new Date().toISOString(),
          updated_At: project.updatedAt || new Date().toISOString(),
          role: project.role || '', // 백엔드에서 제공하는 role 사용
          projectId: project.id, // id와 동일한 값 (삭제 API용)
        }
      })

      // 필터 적용 (필터가 'all'이 아닌 경우에만 적용)
      const filteredProjects =
        filter === 'all'
          ? formattedProjects
          : formattedProjects.filter((project) => project.status === filter)

      setProjects(filteredProjects)
    }
  }, [projectsData, filter]) // filter가 변경되면 필터링 다시 수행

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleProjectSubmit = async () => {
    await refetch() // 프로젝트 목록 갱신
  }

  // 프로젝트 목록 갱신 함수
  const refreshProjects = () => {
    refetch()
  }

  if (isLoading) {
    return (
      <div className="flex h-52 w-full items-center justify-center">
        <p className="text-lg text-slate-500">프로젝트 목록을 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-9">
      <div className="card-grid-2:grid-cols-2 card-grid-3:grid-cols-3 card-grid-4:grid-cols-4 card-grid-5:grid-cols-5 grid grid-cols-1 gap-9">
        {projects.length > 0 ? (
          <>
            {projects.map((project) => (
              <div key={project.id} className="flex justify-center">
                <DashboardCard card={project} onRefresh={refreshProjects} />
              </div>
            ))}
            <div className="flex h-52 items-center justify-center">
              <PlusCircle
                size={52}
                className="cursor-pointer text-slate-400"
                onClick={handleModalOpen}
              />
            </div>
          </>
        ) : (
          // 프로젝트가 없는 경우 추가 버튼만 중앙에 표시
          <div className="col-span-full flex h-[300px] w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg text-slate-500">
                추가된 프로젝트가 없습니다
              </p>
              <PlusCircle
                size={64}
                className="cursor-pointer text-slate-400 transition-all hover:text-slate-600"
                onClick={handleModalOpen}
              />
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ProjectImportModal
          onClose={handleModalClose}
          onSubmit={handleProjectSubmit}
        />
      )}
    </div>
  )
}
export default Dashboard
