import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BookmarkIcon, Calendar, Code, MessageSquare } from 'lucide-react'

interface QuestionHistoryTabProps {
  projectId: string
}

interface QuestionItem {
  id: number
  question: string
  answer: string
  feedback: string
  codeSnippet: string
}

interface HistoryByDate {
  [key: string]: QuestionItem[]
}

const QuestionHistoryTab = ({ projectId }: QuestionHistoryTabProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // 목업 데이터
  const mockHistoryByDate: HistoryByDate = {
    '2025-03-15': [
      {
        id: 1,
        question:
          '이 코드에서 사용된 React Hook의 목적과 라이프사이클 메서드와의 관계를 설명해주세요.',
        answer:
          'React Hook은 함수형 컴포넌트에서 상태 관리와 사이드 이펙트를 처리하기 위해 도입되었습니다. 이 코드에서는 useState와 useEffect를 사용하고 있습니다.',
        feedback:
          '좋은 시도입니다! React Hook의 구체적인 사용 사례를 더 설명해보세요.',
        codeSnippet: 'UserProfile.jsx',
      },
      {
        id: 2,
        question:
          'fetch API를 사용할 때 발생할 수 있는 네트워크 오류 처리 방법과 이 코드의 개선점을 설명해주세요.',
        answer:
          'fetch API는 네트워크 요청 실패 시 HTTP 에러를 받을 수 있어 response.ok를 확인해야 합니다.',
        feedback:
          '네트워크 오류 처리에 대한 설명이 좋습니다. 개선 방안도 추가해보세요.',
        codeSnippet: 'UserProfile.jsx',
      },
    ],
    '2025-03-14': [
      {
        id: 3,
        question:
          '상태 관리 관점에서 이 컴포넌트의 특징과 성능 최적화 방법을 논의해주세요.',
        answer: '이 컴포넌트는 여러 상태를 관리하며 API 호출을 처리합니다.',
        feedback: '성능 최적화 방법에 대해 더 자세히 설명해주세요.',
        codeSnippet: 'App.js',
      },
    ],
  }

  const dates = Object.keys(mockHistoryByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  )
  const selectedQuestions = selectedDate ? mockHistoryByDate[selectedDate] : []

  const handleSelectDate = (date: string) => {
    setSelectedDate(date)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
  }

  return (
    <div className="flex flex-col rounded-lg border border-slate-300 p-6">
      <h2 className="mb-4 text-xl font-semibold">질문 기록</h2>

      <div className="flex gap-6">
        {/* 날짜 선택 영역 */}
        <div className="flex w-1/4 flex-col gap-3 border-r border-slate-200 pr-4">
          <h3 className="text-sm font-medium text-slate-700">날짜별 질문</h3>

          <div className="flex flex-col gap-2">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => handleSelectDate(date)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm ${
                  selectedDate === date
                    ? 'bg-slate-100 font-medium'
                    : 'hover:bg-slate-50'
                }`}
              >
                <Calendar className="h-4 w-4 text-slate-500" />
                <span>{formatDate(date)}</span>
                <span className="ml-auto rounded-full bg-slate-200 px-2 py-0.5 text-xs">
                  {mockHistoryByDate[date].length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 질문 내용 영역 */}
        <div className="flex flex-1 flex-col">
          {selectedDate ? (
            <>
              <h3 className="mb-3 text-sm font-medium text-slate-700">
                {formatDate(selectedDate)} - {selectedQuestions.length}개의 질문
              </h3>

              <div className="flex flex-col gap-4">
                {selectedQuestions.map((item: QuestionItem) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-slate-200 p-4"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-slate-600" />
                        <h4 className="text-sm font-semibold">
                          {item.question}
                        </h4>
                      </div>
                      <button className="rounded-full p-1 text-slate-400 hover:bg-slate-50 hover:text-yellow-500">
                        <BookmarkIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                      <Code className="h-3.5 w-3.5" />
                      <span>{item.codeSnippet}</span>
                    </div>

                    <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
                      <p className="mb-2 text-xs font-medium text-slate-600">
                        내 답변:
                      </p>
                      <p className="text-xs text-slate-600">{item.answer}</p>
                    </div>

                    <div className="mt-3 rounded-md border border-green-100 bg-green-50 p-3">
                      <p className="mb-2 text-xs font-medium text-green-700">
                        피드백:
                      </p>
                      <p className="text-xs text-green-600">{item.feedback}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-48 flex-col items-center justify-center text-slate-500">
              <p className="mb-2">왼쪽에서 날짜를 선택하세요</p>
              <p className="text-sm">질문 기록을 확인할 수 있습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionHistoryTab
