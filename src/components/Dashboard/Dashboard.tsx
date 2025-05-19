import { PlusCircle, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { DashboardCard } from './DashboardCard/DashboardCard'
import { ProjectImportModal } from '../Modal/ProjectImportModal'
import { useProjectList } from '@/api'
import { ProjectFormValues } from '../Modal/ProjectImportModal/TitleSelect'
import type { CardType } from './DashboardCard/DashboardCard'
import { Button } from '@/components/ui/button'

const Dashboard = ({ filter }: { filter: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState<CardType[]>([])
  const [createSuccess, setCreateSuccess] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)

  const {
    data: projectsData,
    isLoading,
    refetch,
  } = useProjectList(
    filter !== 'all' ? (filter as 'PROGRESS' | 'DONE') : undefined,
    currentPage,
  )

  // 성공 메시지 자동 숨김 타이머
  useEffect(() => {
    if (createSuccess) {
      const timer = setTimeout(() => {
        setCreateSuccess(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [createSuccess])

  // 프로젝트 데이터 변환 및 필터링
  useEffect(() => {
    if (projectsData?.result) {
      const formattedProjects = projectsData.result.content.map((project) => {
        return {
          id: project.id, // 백엔드에서 제공하는 프로젝트 ID
          title: project.name || '제목 없음',
          personal_stack: project.language ? [project.language] : [], // null 값은 빈 배열로 처리 (DashboardCard에서 '기타'로 표시)
          description: project.description,
          status: project.status || 'PROGRESS',
          createdAt: project.updatedAt || new Date().toISOString(),
          updatedAt: project.updatedAt || new Date().toISOString(),
          role: project.role,
        }
      })

      setProjects(formattedProjects)
      setTotalPages(projectsData.result.totalPages)
    }
  }, [projectsData, filter]) // filter가 변경되면 필터링 다시 수행

  // 필터 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(0)
  }, [filter])

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleProjectSubmit = async (
    data?: ProjectFormValues,
    success?: boolean,
  ) => {
    await refetch()

    if (success) {
      setCreateSuccess(true)
    }
  }

  //대시보드 갱신
  const refreshDashboardProjects = () => {
    refetch()
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  if (isLoading) {
    return (
      <div className="flex h-52 w-full items-center justify-center">
        <p className="text-lg text-slate-500">프로젝트 목록을 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-9">
      {/* 프로젝트 생성 성공 알림 */}
      {createSuccess && (
        <div className="fixed top-5 left-1/2 z-50 -translate-x-1/2 transform">
          <div className="animate-slideDown flex items-center gap-2 rounded-lg bg-green-100 px-4 py-3 shadow-lg">
            <Check className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              프로젝트가 성공적으로 생성되었습니다.
            </p>
          </div>
        </div>
      )}

      <div className="card-grid-2:grid-cols-2 card-grid-3:grid-cols-3 card-grid-4:grid-cols-4 grid grid-cols-1 gap-9">
        {projects.length > 0 ? (
          <>
            {projects.map((project) => (
              <div key={project.id} className="flex justify-center">
                <DashboardCard
                  card={project}
                  onRefresh={refreshDashboardProjects}
                />
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

      {/* 페이지네이션 컨트롤 */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i ? 'default' : 'outline'}
              className="h-8 w-8"
              onClick={() => handlePageChange(i)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              handlePageChange(Math.min(totalPages - 1, currentPage + 1))
            }
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

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
