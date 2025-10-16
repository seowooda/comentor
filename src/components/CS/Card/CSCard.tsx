import { Bookmark } from 'lucide-react'
import { Button } from '../../ui/button'
import { useRouter } from 'next/navigation'
import { CSQuestionList } from '@/api'
import { mapCS } from '@/lib/mapEnum'
import { useBookmarkHandler } from '@/hooks/useBookmarkHandler'

interface CSCardProps {
  csQuestion: CSQuestionList
}

export const CSCard = ({ csQuestion }: CSCardProps) => {
  const router = useRouter()
  const { handleBookmarkClick } = useBookmarkHandler()
  const isBookmarked = !!csQuestion.fileName

  const handleClick = () => {
    router.push(`/cs/solve/${csQuestion.csQuestionId}`)
  }

  return (
    // ✅ w-full을 통해 부모 요소의 너비를 꽉 채우도록 설정
    <div className="flex w-full flex-col justify-between rounded-2xl border border-slate-300 bg-white p-4 shadow-md sm:p-5">
      <div className="flex flex-col gap-4">
        {/* 상단: 스택, 북마크 */}
        <div className="flex items-start justify-between">
          <p className="text-lg font-semibold">{csQuestion.stack}</p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleBookmarkClick({
                csQuestionId: csQuestion.csQuestionId,
                isBookmarked,
                fileName: csQuestion.fileName,
                refetchKeys: [['CS Dashboard', '0']],
              })
            }}
            aria-label={isBookmarked ? '북마크 제거' : '북마크 추가'}
            aria-pressed={isBookmarked}
            className="cursor-pointer p-1"
          >
            <Bookmark
              size={20}
              className={`${
                isBookmarked
                  ? 'fill-yellow-500 text-yellow-500 hover:fill-yellow-400'
                  : 'text-yellow-400 hover:text-yellow-500'
              } transition-colors`}
            />
          </button>
        </div>
        {/* 중간: 질문 */}
        <p className="line-clamp-2 pr-5 text-base font-medium text-slate-800 sm:text-lg">
          {csQuestion.question}
        </p>
      </div>

      {/* 하단: 카테고리, 버튼 */}
      <div className="flex items-center justify-between pt-2">
        <span className="rounded-[20px] bg-blue-100 px-2 py-1 text-xs text-blue-600 sm:text-sm">
          {mapCS(csQuestion.csCategory)}
        </span>
        <Button
          onClick={handleClick}
          variant="ghost"
          className="h-auto border border-slate-300 px-3 py-1 text-sm"
        >
          {csQuestion.questionStatus === 'DONE' ? '다시 풀기' : '도전하기'}
        </Button>
      </div>
    </div>
  )
}
