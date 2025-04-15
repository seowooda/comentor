'use client'

import { folderDetailInfo } from '@/api/services/folder/quries'
import { Bookmark } from 'lucide-react'
import { useState } from 'react'

interface QuestionListProps {
  folderId: number | null
  folders: { id: number; folder_name: string }[]
}

export const QuestionList = ({ folderId, folders }: QuestionListProps) => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      folderId: 1,
      question: '이 코드에서 사용된 디자인 패턴에 대해 설명해주세요...',
      date: '2025.03.16',
      answer:
        '이 코드에서 사용된 디자인 패턴은 컴포지트 패턴입니다...이 코드에서 사용된 디자인 패턴은 컴포지트 패턴입니다...이 코드에서 사용된 디자인 패턴은 컴포지트 패턴입니다...이 코드에서 사용된 디자인 패턴은 컴포지트 패턴입니다...',
      feedback:
        '좋은 답변입니다! 확장성 측면도 고려해보면 좋겠어요.좋은 답변입니다! 확장성 측면도 고려해보면 좋겠어요.좋은 답변입니다! 확장성 측면도 고려해보면 좋겠어요.좋은 답변입니다! 확장성 측면도 고려해보면 좋겠어요.좋은 답변입니다! 확장성 측면도 고려해보면 좋겠어요.',
    },
    {
      id: 2,
      folderId: 2,
      question: '옵저버 패턴에 대해 설명해주세요.',
      date: '2025.03.18',
      answer: '옵저버 패턴은 객체 상태 변경을 관찰자에게 알리는 구조입니다...',
      feedback: '예시와 함께 설명하면 더 좋을 것 같아요.',
    },
  ])

  const filteredQuestions = questions?.filter((q) => q.folderId === folderId)

  const currentFolder = folders?.find((f) => f.id === folderId)

  const handleRemoveQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  return (
    <section className="flex w-full min-w-2xl flex-col gap-5 px-7 py-3">
      <h2 className="text-[18px] font-semibold">
        {currentFolder?.folder_name}의 질문 목록
      </h2>
      {filteredQuestions.length > 0 ? (
        filteredQuestions?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 rounded-md border border-slate-200 p-4 text-[12px] text-slate-900"
          >
            <div className="flex items-center justify-between">
              <p className="text-[14px]">{item.question}</p>
              <button
                onClick={() => handleRemoveQuestion(item.id)}
                className="cursor-pointer p-1"
              >
                <Bookmark size={21} className="fill-sky-800 text-sky-800" />
              </button>
            </div>
            <p className="text-slate-500">{item.date}</p>
            <p className="text-[14px]">내 답변:</p>
            <p className="line-clamp-2 text-zinc-700">{item.answer}</p>
            <p className="text-[14px]">피드백:</p>
            <p className="line-clamp-2 text-zinc-700">{item.feedback}</p>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <div className="rounded-md bg-sky-100 p-2">
            <Bookmark size={28} className="rounded-4xl text-sky-800" />
          </div>
          <p className="text-[18px] text-slate-800">
            아직 저장된 질문이 없습니다.
          </p>
        </div>
      )}
    </section>
  )
}
