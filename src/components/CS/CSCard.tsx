import { Bookmark } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import { CSQuestionList, folderBookmarkCancel } from '@/api'
import { mapCS } from '@/lib/mapEnum'

interface CSCardProps {
  csQuestion: CSQuestionList
}

export const CSCard = ({ csQuestion }: CSCardProps) => {
  const router = useRouter()
  const { openModal } = useModalStore()
  const [bookmarked, setBookmarked] = useState(false)
  const { mutate: cancelBookmark } = folderBookmarkCancel()

  const handleClick = () => {
    router.push(`/cs/solve/${csQuestion.csQuestionId}`)
  }

  const handleBookmarkClick = () => {
    if (bookmarked) {
      // 북마크 취소 API 호출
      cancelBookmark(
        { csQuestionId: csQuestion.csQuestionId, fileName: 'hi' },
        {
          onSuccess: () => setBookmarked(false),
        },
      )
    } else {
      // 폴더 선택 모달 열기
      openModal('createFolder', {
        csQuestionId: csQuestion.csQuestionId,
        onBookmarkDone: () => setBookmarked(true),
      })
    }
  }

  return (
    <div className="flex h-[170px] w-full max-w-[430px] min-w-[380px] gap-5 rounded-2xl border border-slate-300 bg-white p-5 shadow-md">
      <div className="flex h-full w-full flex-col gap-5">
        <div className="flex justify-between">
          <p className="text-[18px] font-semibold">{csQuestion.stack}</p>
          <button className="cursor-pointer p-1">
            <Bookmark
              size={20}
              onClick={handleBookmarkClick}
              className={`cursor-pointer ${
                bookmarked ? 'fill-slate-500 text-slate-500' : 'text-slate-500'
              }`}
            />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <p className="line-clamp-1 pr-5 text-[18px] font-medium">
            {csQuestion.question}
          </p>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-[20px] bg-blue-100 px-2 py-1 text-sm text-blue-600">
                {mapCS(csQuestion.csCategory)}
              </span>
            </div>
            <Button
              onClick={handleClick}
              variant="ghost"
              className="border border-slate-300"
            >
              {csQuestion.questionStatus === 'DONE' ? '다시 풀기' : '도전하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
