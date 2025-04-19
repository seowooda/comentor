'use client'

import { Folder } from '@/api'
import { QuestionItem } from './QuestionItem'

interface QuestionListProps {
  folderId: number | null
  folders: Folder[]
}

export const QuestionList = ({ folderId, folders }: QuestionListProps) => {
  const questions = [
    {
      questionId: 1,
      question: '이 코드에서 사용된 디자인 패턴에 대해 설명해주세요...',
      status: '답변됨',
      category: '네트워크',
      project: 'CoMentor-Frontend',
      folderName: 'src/api/lib/fetcher.ts',
    },
    {
      questionId: 2,
      question: '이 코드의 성능 병목 지점을 알려주세요.',
      status: '답변필요',
      category: '성능',
      project: 'CoMentor-Backend',
      folderName: 'src/services/db/optimizer.ts',
    },
  ]

  return (
    <section className="flex w-full flex-col gap-3 px-2 py-7">
      <div className="grid grid-cols-[3fr_1fr_1fr_40px] items-center border-t border-b border-slate-300 px-6 py-2 text-sm font-semibold text-slate-500">
        <p>제목</p>
        <p>카테고리</p>
        <p>답변여부</p>
        <div /> {/* 북마크 칼럼 */}
      </div>
      {questions.map((item) => (
        <QuestionItem
          key={item.questionId}
          question={item.question}
          status={item.status}
          category={item.category}
          project={item.project}
          folderName={item.folderName}
        />
      ))}
    </section>
  )
}
