import { Check } from 'lucide-react'

interface ProjectSuccessMessageProps {
  type: 'update' | 'delete'
}

/**
 * 프로젝트 작업 성공 메시지 컴포넌트
 */
export const ProjectSuccessMessage = ({ type }: ProjectSuccessMessageProps) => {
  if (type === 'delete') {
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

  // 수정 성공 메시지 (상단 토스트)
  return (
    <div className="fixed top-5 left-1/2 z-50 -translate-x-1/2 transform">
      <div className="animate-slideDown flex items-center gap-2 rounded-lg bg-green-100 px-4 py-3 shadow-lg">
        <Check className="h-5 w-5 text-green-600" />
        <p className="text-sm font-medium text-green-800">
          프로젝트가 성공적으로 수정되었습니다.
        </p>
      </div>
    </div>
  )
}
