import { BookmarkIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useModalStore } from '@/store/modalStore'
import { CSQuestionResponse } from '@/api/services/CS/model'
import { mapCS } from '@/lib/mapEnum'
import { InfiniteData } from '@tanstack/react-query'

interface CSHistoryProps {
  data: InfiniteData<CSQuestionResponse> | undefined
}

export const CSHistory = ({ data }: CSHistoryProps) => {
  const { openModal } = useModalStore()

  const handleBookmarkClick = (csQuestionId: number) => {
    openModal('createFolder', {
      csQuestionId,
      onBookmarkDone: () => {},
    })
  }

  return (
    <>
      {data?.pages.map((page) =>
        page.result.content.map(({ date, questions }) => (
          <div key={date} className="flex flex-col gap-5">
            <p className="text-sm text-slate-400">{date}</p>
            {questions.map((item) => (
              <div
                key={item.csQuestionId}
                className="flex flex-col gap-4 border-b border-slate-300 py-4"
              >
                <div className="flex flex-col gap-5 px-5">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <p className="text-lg font-semibold">{item.stack}</p>
                      <p className="rounded-2xl bg-blue-100 px-2 py-1 text-sm font-light text-blue-600">
                        {mapCS(item.csCategory)}
                      </p>
                    </div>
                    <BookmarkIcon
                      onClick={() => handleBookmarkClick(item.csQuestionId)}
                      size={18}
                      className="cursor-pointer"
                    />
                  </div>
                  <p className="pr-4 text-lg font-medium">{item.question}</p>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" className="border border-slate-300">
                    {item.questionStatus === 'DONE' ? '다시 풀기' : '도전하기'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )),
      )}
    </>
  )
}
