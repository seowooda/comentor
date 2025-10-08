'use client'

import { Pen, Trash2, Loader2 } from 'lucide-react'
import { CardType } from './DashboardCard'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/utils/updated_date'

interface CardContentProps {
  card: CardType
  deleteStatus: 'idle' | 'loading' | 'error' | 'success'
  errorMessage?: string
  onEditClick: () => void
  onDeleteClick: () => void
  onCloseError: () => void
}

/**
 * 프로젝트 카드의 본문 내용을 표시하는 컴포넌트
 */
export const CardContent = ({
  card,
  deleteStatus,
  errorMessage,
  onEditClick,
  onDeleteClick,
  onCloseError,
}: CardContentProps) => {
  const router = useRouter()

  // 상태값 표시 텍스트 변환
  const getStatusText = (status: string) => {
    return status === 'PROGRESS' ? 'Progress' : 'Done'
  }

  // 프로젝트 상세 페이지로 이동하는 핸들러
  const handleCardClick = (e: React.MouseEvent) => {
    // 편집/삭제 버튼 클릭 시 이벤트 전파 방지
    if ((e.target as HTMLElement).closest('button')) {
      return
    }

    router.push(`/project/${card.id}`)
  }

  return (
    <article
      className={`flex w-[306px] rounded-[8px] border ${deleteStatus === 'error' ? 'border-red-400 bg-red-50' : 'border-slate-400 bg-white'} cursor-pointer p-[21px] shadow-md transition-all hover:shadow-lg`}
      onClick={handleCardClick}
    >
      <div className="flex w-full flex-col">
        {/* 오류 메시지 표시 */}
        {deleteStatus === 'error' && errorMessage && (
          <div className="absolute top-2 right-0 left-0 mx-auto w-[90%] rounded-md bg-red-100 p-2 text-center text-sm text-red-600 shadow-md">
            {errorMessage}
            <button
              onClick={onCloseError}
              className="ml-2 text-red-800 hover:underline"
            >
              닫기
            </button>
          </div>
        )}

        <div className="flex flex-col gap-[22px]">
          {/* Header Section */}
          <header className="flex justify-between">
            <h2 className="text-[20px] font-semibold">{card.title}</h2>
            <div className="flex items-center gap-[6px]">
              <button
                aria-label="Edit"
                onClick={onEditClick}
                disabled={deleteStatus === 'loading'}
              >
                <Pen
                  size={14}
                  className={`cursor-pointer ${deleteStatus === 'loading' ? 'text-gray-300' : ''}`}
                />
              </button>
              <button
                aria-label="Delete"
                onClick={onDeleteClick}
                disabled={deleteStatus === 'loading'}
              >
                <Trash2
                  size={16}
                  className={`cursor-pointer ${deleteStatus === 'loading' ? 'text-gray-300' : ''}`}
                />
              </button>
            </div>
          </header>

          {/* Tech Stack List */}
          <ul className="flex flex-wrap gap-[10px]">
            {card.personal_stack && card.personal_stack.length > 0 ? (
              card.personal_stack.map((stack, index) => (
                <li
                  key={index}
                  className="flex items-center rounded-[20px] bg-blue-100 px-2 py-1"
                >
                  <span className="text-[12px] text-blue-500">{stack}</span>
                </li>
              ))
            ) : (
              <li className="flex items-center rounded-[20px] bg-gray-100 px-2 py-1">
                <span className="text-[8px] text-gray-500">기타</span>
              </li>
            )}
          </ul>

          {/* Description */}
          <p className="line-clamp-2 text-[16px] font-light">
            {card.description}
          </p>
        </div>

        {/* 로딩 상태 표시 - 아이콘만 작게 표시 */}
        {deleteStatus === 'loading' && (
          <div className="absolute top-2 right-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          </div>
        )}

        {/* Status & Updated Date */}
        <footer className="mt-auto flex justify-between pt-[22px] text-[14px] font-light">
          <div className="flex items-center gap-1">
            <span
              className={`h-[7px] w-[7px] rounded-full ${
                card.status === 'PROGRESS' ? 'bg-yellow-500' : 'bg-emerald-500'
              }`}
              aria-label={
                card.status === 'PROGRESS' ? 'In Progress' : 'Completed'
              }
            ></span>
            <p>{getStatusText(card.status)}</p>
          </div>
          <time dateTime={card.updatedAt}>
            Updated {formatDate(card.updatedAt)}
          </time>
        </footer>
      </div>
    </article>
  )
}
