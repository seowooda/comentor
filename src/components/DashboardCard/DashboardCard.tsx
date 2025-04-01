import { Pen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { ProjectEditModal } from '../ProjectEditModal'
import { useProjectDelete } from '@/api/services/project'
import { useToast } from '@/components/ui/use-toast'

type CardType = {
  id: number
  title: string
  personal_stack: string[]
  description: string
  status: string
  created_At: string
  updated_At: string
  projectId?: number // 실제 API에서 사용하는 프로젝트 ID
  role?: string // 프로젝트 맡은 역할
}

interface DashboardCardProps {
  card: CardType
  onRefresh: () => void // 대시보드 갱신 함수
}

export const DashboardCard = ({ card, onRefresh }: DashboardCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { toast } = useToast()

  // API가 반환하는 실제 프로젝트 ID 사용
  const projectId = card.id

  const { mutate: deleteProject } = useProjectDelete(projectId)

  // 날짜에서 시간을 제외하고 YYYY. MM. DD 형식으로 변환
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`
  }

  // 상태값 표시 텍스트 변환
  const getStatusText = (status: string) => {
    return status === 'PROGRESS' ? 'Progress' : 'Done'
  }

  // 편집 버튼 클릭 핸들러
  const handleEditClick = () => {
    setIsEditModalOpen(true)
  }

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    // ID가 없는 경우 처리
    if (!projectId) {
      console.error(
        'DashboardCard: 삭제 불가 - 유효하지 않은 프로젝트 ID:',
        projectId,
      )
      toast({
        title: '프로젝트 삭제 실패',
        description: '유효한 프로젝트 ID가 없습니다.',
        variant: 'destructive',
      })
      return
    }

    if (
      confirm(`프로젝트 "${card.title}"를 삭제하시겠습니까? (ID: ${projectId})`)
    ) {
      deleteProject(undefined, {
        onSuccess: (response) => {
          toast({
            title: '프로젝트 삭제 성공',
            description: '프로젝트가 성공적으로 삭제되었습니다.',
          })
          setTimeout(() => {
            onRefresh() // 대시보드 갱신
          }, 1000)
        },
        onError: (error) => {
          toast({
            title: '프로젝트 삭제 실패',
            description:
              error.message || '프로젝트 삭제 중 오류가 발생했습니다.',
            variant: 'destructive',
          })
        },
      })
    }
  }

  return (
    <>
      <article className="flex w-[306px] rounded-[8px] border border-slate-400 bg-white p-[21px] shadow-md">
        <div className="flex w-full flex-col gap-[22px]">
          {/* Header Section */}
          <header className="flex justify-between">
            <h2 className="text-[20px] font-semibold">{card.title}</h2>
            <div className="flex items-center gap-[6px]">
              <button aria-label="Edit" onClick={handleEditClick}>
                <Pen size={14} className="cursor-pointer" />
              </button>
              <button aria-label="Delete" onClick={handleDeleteClick}>
                <Trash2 size={16} className="cursor-pointer" />
              </button>
            </div>
          </header>

          {/* Tech Stack List */}
          <ul className="flex gap-[10px]">
            {card.personal_stack.map((stack, index) => (
              <li
                key={index}
                className="flex items-center rounded-[20px] bg-blue-100 px-2 py-1"
              >
                <span className="text-[8px] text-blue-500">{stack}</span>
              </li>
            ))}
          </ul>

          {/* Description */}
          <p className="text-[14px] font-light">{card.description}</p>

          {/* Status & Updated Date */}
          <footer className="flex justify-between text-[10px] font-light">
            <div className="flex items-center gap-1">
              <span
                className={`h-[7px] w-[7px] rounded-full ${
                  card.status === 'PROGRESS'
                    ? 'bg-yellow-500'
                    : 'bg-emerald-500'
                }`}
                aria-label={
                  card.status === 'PROGRESS' ? 'In Progress' : 'Completed'
                }
              ></span>
              <p>{getStatusText(card.status)}</p>
            </div>
            <time dateTime={card.updated_At}>
              Updated {formatDate(card.updated_At)}
            </time>
          </footer>
        </div>
      </article>

      {/* 편집 모달 */}
      {isEditModalOpen && (
        <ProjectEditModal
          projectId={projectId}
          initialData={{
            description: card.description,
            role: card.role || '',
            status: card.status as 'PROGRESS' | 'DONE',
          }}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={() => {
            setIsEditModalOpen(false)
            onRefresh() // 대시보드 갱신
          }}
        />
      )}
    </>
  )
}
