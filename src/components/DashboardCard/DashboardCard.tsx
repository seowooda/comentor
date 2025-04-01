import { Pen, Trash2, Loader2, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ProjectEditModal } from '../ProjectEditModal'
import { useProjectDelete } from '@/api/services/project'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type CardType = {
  id: number // 프로젝트 고유 ID (API 통신용)
  title: string
  personal_stack: string[]
  description: string
  status: string
  created_At: string
  updated_At: string
  role?: string // 프로젝트 맡은 역할
}

interface DashboardCardProps {
  card: CardType
  onRefresh: () => void // 대시보드 갱신 함수
}

export const DashboardCard = ({ card, onRefresh }: DashboardCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'success'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // 성공 메시지 자동 숨김 타이머
  useEffect(() => {
    if (updateStatus === 'success') {
      const timer = setTimeout(() => {
        setUpdateStatus('idle')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [updateStatus])

  // 프로젝트 ID 사용
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

  // 프로젝트 수정 완료 핸들러
  const handleEditSuccess = () => {
    setUpdateStatus('success')
    onRefresh() // 대시보드 갱신
  }

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    // ID가 없는 경우 처리
    if (!projectId) {
      setDeleteStatus('error')
      setErrorMessage('유효한 프로젝트 ID가 없습니다.')
      return
    }

    setIsDeleteDialogOpen(true)
  }

  // 삭제 확인 처리
  const handleConfirmDelete = () => {
    setDeleteStatus('loading')

    deleteProject(undefined, {
      onSuccess: () => {
        setDeleteStatus('success')
        setIsDeleteDialogOpen(false)
        setTimeout(() => {
          onRefresh() // 대시보드 갱신
        }, 1000)
      },
      onError: (error) => {
        setDeleteStatus('error')
        setErrorMessage(
          error.message || '프로젝트 삭제 중 오류가 발생했습니다.',
        )
      },
    })
  }

  // 삭제 상태에 따른 렌더링
  if (deleteStatus === 'success') {
    return (
      <article className="animate-fadeOut flex w-[306px] rounded-[8px] border border-green-400 bg-green-50 p-[21px] shadow-md transition-all">
        <div className="flex w-full flex-col items-center justify-center gap-4 text-center text-green-600">
          <svg
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p>프로젝트가 성공적으로 삭제되었습니다.</p>
        </div>
      </article>
    )
  }

  return (
    <>
      {/* 수정 성공 알림 */}
      {updateStatus === 'success' && (
        <div className="fixed top-5 left-1/2 z-50 -translate-x-1/2 transform">
          <div className="animate-slideDown flex items-center gap-2 rounded-lg bg-green-100 px-4 py-3 shadow-lg">
            <Check className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              프로젝트가 성공적으로 수정되었습니다.
            </p>
          </div>
        </div>
      )}

      <article
        className={`flex h-52 w-[306px] rounded-[8px] border ${deleteStatus === 'error' ? 'border-red-400 bg-red-50' : 'border-slate-400 bg-white'} p-[21px] shadow-md transition-all`}
      >
        <div className="flex w-full flex-col gap-[22px]">
          {/* 오류 메시지 표시 */}
          {deleteStatus === 'error' && (
            <div className="absolute top-2 right-0 left-0 mx-auto w-[90%] rounded-md bg-red-100 p-2 text-center text-sm text-red-600 shadow-md">
              {errorMessage}
              <button
                onClick={() => setDeleteStatus('idle')}
                className="ml-2 text-red-800 hover:underline"
              >
                닫기
              </button>
            </div>
          )}

          {/* Header Section */}
          <header className="flex justify-between">
            <h2 className="text-[20px] font-semibold">{card.title}</h2>
            <div className="flex items-center gap-[6px]">
              <button
                aria-label="Edit"
                onClick={handleEditClick}
                disabled={deleteStatus === 'loading'}
              >
                <Pen
                  size={14}
                  className={`cursor-pointer ${deleteStatus === 'loading' ? 'text-gray-300' : ''}`}
                />
              </button>
              <button
                aria-label="Delete"
                onClick={handleDeleteClick}
                disabled={deleteStatus === 'loading'}
              >
                <Trash2
                  size={16}
                  className={`cursor-pointer ${deleteStatus === 'loading' ? 'text-gray-300' : ''}`}
                />
              </button>
            </div>
          </header>

          {/* 로딩 상태 표시 - 아이콘만 작게 표시 */}
          {deleteStatus === 'loading' && (
            <div className="absolute top-2 right-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            </div>
          )}

          {/* Tech Stack List */}
          <ul className="flex gap-[10px]">
            {card.personal_stack && card.personal_stack.length > 0 ? (
              card.personal_stack.map((stack, index) => (
                <li
                  key={index}
                  className="flex items-center rounded-[20px] bg-blue-100 px-2 py-1"
                >
                  <span className="text-[8px] text-blue-500">{stack}</span>
                </li>
              ))
            ) : (
              <li className="flex items-center rounded-[20px] bg-gray-100 px-2 py-1">
                <span className="text-[8px] text-gray-500">기타</span>
              </li>
            )}
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

      {/* 삭제 확인 대화상자 (모달) */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>프로젝트 삭제</DialogTitle>
            <DialogDescription>
              정말 "{card.title}" 프로젝트를 삭제하시겠습니까?
            </DialogDescription>
          </DialogHeader>

          {deleteStatus === 'error' && (
            <div className="my-2 rounded-md bg-red-50 p-3 text-center text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <button
              onClick={() => setIsDeleteDialogOpen(false)}
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
              disabled={deleteStatus === 'loading'}
            >
              취소
            </button>
            <button
              onClick={handleConfirmDelete}
              className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
              disabled={deleteStatus === 'loading'}
            >
              {deleteStatus === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  삭제 중...
                </>
              ) : (
                '삭제'
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
          onSubmit={handleEditSuccess}
        />
      )}
    </>
  )
}
