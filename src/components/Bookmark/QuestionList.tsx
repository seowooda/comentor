'use client'

import { Questions } from '@/api'
import { useState } from 'react'
import { folderBookmarkCancel } from '@/api/services/folder/quries'
import { QuestionItem } from './QuestionItem'
import { useQueryClient } from '@tanstack/react-query'

interface QuestionListProps {
  fileName: string
  questions: Questions[]
}

export const QuestionList = ({ fileName, questions }: QuestionListProps) => {
  const [questionList, setQuestionList] = useState(questions)
  const { mutate } = folderBookmarkCancel()
  const queryClient = useQueryClient()

  const handleBookmarkCancel = (questionId: number) => {
    mutate(
      {
        fileName: fileName,
        csQuestionId: questionId,
      },
      {
        onSuccess: () => {
          setQuestionList((prev) =>
            prev.filter((q) => q.questionId !== questionId),
          )

          queryClient.invalidateQueries({ queryKey: ['questions'] })
        },
      },
    )
  }

  return (
    <section className="flex w-full flex-col px-2 py-7 text-slate-900">
      <div className="grid grid-cols-[minmax(400px,3fr)_minmax(120px,1fr)_minmax(100px,1fr)_40px] items-center gap-4 border-t border-b border-slate-300 px-6 py-2 text-sm font-semibold text-slate-500">
        <p>제목</p>
        <p>카테고리</p>
        <p>답변여부</p>
        <div />
      </div>
      {questions.map((item) => (
        <QuestionItem
          key={item.questionId}
          question={item}
          onBookmarkCancel={() => handleBookmarkCancel(item.questionId)}
        />
      ))}
    </section>
  )
}
