'use client'

import { BookmarkIcon } from 'lucide-react'
import { useModalStore } from '@/store/modalStore'
import { mapCS } from '@/lib/mapEnum'
import { InfiniteData } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CSQuestionResponse } from '@/api/services/CS/model'
import { useBookmarkHandler } from '@/hooks/useBookmarkHandler'
import { Button } from '@/components/ui/button'

interface CSHistoryProps {
  data: InfiniteData<CSQuestionResponse> | undefined
}

export const CSHistory = ({ data }: CSHistoryProps) => {
  const { openModal } = useModalStore()
  const router = useRouter()
  const { handleBookmarkClick } = useBookmarkHandler()

  //북마크 상태 업데이트
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<number, boolean>>(
    () => {
      const map: Record<number, boolean> = {}
      data?.pages.forEach((page) => {
        page.result.content.forEach((group) => {
          group.questions.forEach((q) => {
            if (q.fileName) map[q.csQuestionId] = true
          })
        })
      })
      return map
    },
  )

  const handleClick = (csQuestionId: number) => {
    router.push(`/cs/solve/${csQuestionId}`)
  }

  return (
    <>
      {data?.pages.map((page) =>
        page.result.content.map(({ date, questions }) => (
          <div key={date} className="flex flex-col gap-5">
            <p className="text-sm text-slate-400">{date}</p>
            {questions.map((item) => {
              const isBookmarked = bookmarkedMap[item.csQuestionId]
              return (
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
                      <button
                        className="cursor-pointer p-1"
                        onClick={() =>
                          handleBookmarkClick({
                            csQuestionId: item.csQuestionId,
                            isBookmarked: bookmarkedMap[item.csQuestionId],
                            fileName: item.fileName,
                            refetchKeys: [['cs-question-infinite']],
                            onLocalToggle: (newState) => {
                              setBookmarkedMap((prev) => ({
                                ...prev,
                                [item.csQuestionId]: newState,
                              }))
                            },
                          })
                        }
                        aria-label={
                          bookmarkedMap[item.csQuestionId]
                            ? '북마크 제거'
                            : '북마크 추가'
                        }
                        aria-pressed={bookmarkedMap[item.csQuestionId]}
                      >
                        <BookmarkIcon
                          size={20}
                          className={`${
                            bookmarkedMap[item.csQuestionId]
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-yellow-400'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="pr-4 text-lg font-medium">{item.question}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      onClick={() => handleClick(item.csQuestionId)}
                      className="border border-slate-300"
                    >
                      {item.questionStatus === 'DONE'
                        ? '다시 풀기'
                        : '도전하기'}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )),
      )}
    </>
  )
}
