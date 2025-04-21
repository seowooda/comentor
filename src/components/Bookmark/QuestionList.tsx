'use client'

import { folderBookmarkCancel, Questions } from '@/api'
import { QuestionItem } from './QuestionItem'
import { useQueryClient } from '@tanstack/react-query'
import { Bookmark } from 'lucide-react'
import { useCallback } from 'react'

interface QuestionListProps {
  fileName: string
  questions: Questions[]
}

export const QuestionList = ({ fileName, questions }: QuestionListProps) => {
  const { mutate } = folderBookmarkCancel()
  const queryClient = useQueryClient()

  const handleBookmarkCancel = useCallback(
    (questionId: number) => {
      mutate(
        {
          fileName: fileName,
          csQuestionId: questionId,
        },
        {
          onSuccess: () => {
            queryClient.setQueryData(['questions'], (oldData: Questions[]) => {
              if (!oldData) return oldData
              return {
                ...oldData,
                result: oldData.filter(
                  (q: Questions) => q.questionId !== questionId,
                ),
              }
            })
          },
        },
      )
    },
    [fileName, mutate, queryClient],
  )

  return (
    <section className="flex w-full flex-col px-2 py-7 text-slate-900">
      <div className="grid grid-cols-[minmax(400px,3fr)_minmax(120px,1fr)_minmax(100px,1fr)_40px] items-center gap-4 border-t border-b border-slate-300 px-6 py-2 text-sm font-semibold text-slate-500">
        <p>제목</p>
        <p>카테고리</p>
        <p>답변여부</p>
        <div />
      </div>
      {questions.length === 0 ? (
        <div className="flex flex-col items-center gap-2 pt-8 text-slate-500">
          <div className="rounded-md bg-sky-100 p-2">
            <Bookmark size={28} className="rounded-4xl text-sky-800" />
          </div>
          <p className="text-[18px] text-slate-800">
            아직 저장된 질문이 없습니다.
          </p>
        </div>
      ) : (
        questions.map((q) => (
          <QuestionItem
            key={q.questionId}
            question={q}
            onBookmarkCancel={handleBookmarkCancel}
          />
        ))
      )}
    </section>
  )
}
