'use client'

import { useFolderQuestions } from '@/api'
import { QuestionItem } from './QuestionItem'
import { Bookmark } from 'lucide-react'
import { useBookmarkHandler } from '@/hooks/useBookmarkHandler'

interface QuestionListProps {
  folderId: number
  fileName: string
}

export const QuestionList = ({ fileName, folderId }: QuestionListProps) => {
  const { data: questions } = useFolderQuestions(folderId)
  const { handleBookmarkClick } = useBookmarkHandler()

  return (
    <section className="flex w-full flex-col text-slate-800 md:py-7">
      <div className="hidden items-center gap-4 border-t border-b border-slate-300 px-6 py-2 font-medium md:grid md:grid-cols-[minmax(300px,3fr)_120px_100px_40px]">
        <p>제목</p>
        <p>카테고리</p>
        <p>답변여부</p>
        <div />
      </div>
      {questions?.result.length === 0 ? (
        <div className="flex flex-col items-center gap-2 pt-8 text-slate-500">
          <div className="rounded-md bg-sky-100 p-2">
            <Bookmark size={28} className="rounded-4xl text-sky-800" />
          </div>
          <p className="text-base text-slate-800 md:text-lg">
            아직 저장된 질문이 없습니다.
          </p>
        </div>
      ) : (
        questions?.result.map((q) => (
          <QuestionItem
            key={
              q.projectId ? `project-${q.questionId}` : `cs-${q.csQuestionId}`
            }
            question={q}
            onBookmarkClick={() =>
              handleBookmarkClick({
                questionId: q.projectId ? q.questionId : undefined,
                csQuestionId: !q.projectId ? q.csQuestionId : undefined,
                fileName,
                isBookmarked: true,
                refetchKeys: [['questions', folderId.toString()]],
              })
            }
          />
        ))
      )}
    </section>
  )
}
