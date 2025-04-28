'use client'

import { Bookmark } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'

interface CSCardProps {
  id: number
  title: string
  question: string
  stack: string[]
  createdAt: string
  status: string
}

export const CSCard = ({ id, title, question, stack, status }: CSCardProps) => {
  const router = useRouter()
  const { openModal } = useModalStore()
  const [bookmarked, setBookmarked] = useState(false)

  const handleClick = (id: number) => {
    router.push(`/cs/solve/${id}`)
  }

  const handleBookmarkClick = () => {
    if (bookmarked) {
      // 북마크 취소 로직
      setBookmarked(false)
    } else {
      openModal('createFolder', {
        csQuestionId: id,
        onBookmarkDone: () => setBookmarked(true), // ✅ 성공 시 상태 반영
      })
    }
  }

  return (
    <div className="flex h-[170px] w-full max-w-[430px] min-w-[380px] gap-5 rounded-2xl border border-slate-300 bg-white p-5 shadow-md">
      <div className="flex h-full w-full flex-col gap-5">
        <div className="flex justify-between">
          <p className="text-[18px] font-semibold">{title}</p>
          <button className="cursor-pointer p-1">
            <Bookmark
              size={20}
              className="text-slate-500"
              onClick={handleBookmarkClick}
            />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <p className="line-clamp-1 text-[18px] font-medium">{question}</p>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              {stack.map((s, index) => (
                <span
                  key={index}
                  className="rounded-[20px] bg-blue-100 px-2 py-1 text-sm text-blue-600"
                >
                  {s}
                </span>
              ))}
            </div>
            <Button
              onClick={() => handleClick(id)}
              variant="ghost"
              className="border border-slate-300"
            >
              {status === 'DONE' ? '다시 풀기' : '도전하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
