import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface CSQuestionsTabProps {
  projectId: string
}

const CSQuestionsTab = ({ projectId }: CSQuestionsTabProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isAnswering, setIsAnswering] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  // 목업 질문 데이터
  const mockQuestions = [
    {
      id: 1,
      question:
        '이 코드에서 사용된 React Hook의 목적과 라이프사이클 메서드와의 관계를 설명해주세요.',
      bestAnswer:
        'React Hook은 함수형 컴포넌트에서 상태 관리와 사이드 이펙트를 처리하기 위해 도입되었습니다. 이 코드에서는 useState와 useEffect를 사용하고 있는데, useState는 컴포넌트의 상태를 관리하고, useEffect는 componentDidMount, componentDidUpdate, componentWillUnmount와 같은 라이프사이클 메서드의 기능을 대체합니다.',
    },
    {
      id: 2,
      question:
        'fetch API를 사용할 때 발생할 수 있는 네트워크 오류 처리 방법과 이 코드의 개선점을 설명해주세요.',
      bestAnswer:
        'fetch API는 네트워크 요청 실패 시 reject 대신 HTTP 에러 응답을 받을 수 있으므로, response.ok를 확인하는 것이 중요합니다. 이 코드에서는 try-catch 블록으로 네트워크 오류를 처리하고 있으며, response.ok 체크도 구현되어 있습니다. 개선점으로는 타임아웃 설정, 재시도 로직, 더 구체적인 에러 메시지 제공 등이 있을 수 있습니다.',
    },
    {
      id: 3,
      question:
        '상태 관리 관점에서 이 컴포넌트의 특징과 성능 최적화 방법을 논의해주세요.',
      bestAnswer:
        '이 컴포넌트는 여러 상태(user, loading, error)를 관리하며, useEffect 내에서 API 호출을 처리합니다. 성능 최적화를 위해 메모이제이션(React.memo, useMemo, useCallback), 불필요한 렌더링 방지, 데이터 페칭 라이브러리(React Query) 사용, 컴포넌트 분할 등을 고려할 수 있습니다.',
    },
  ]

  const handleStartAnswer = () => {
    setIsAnswering(true)
  }

  const handleSubmitAnswer = () => {
    // 실제 구현에서는 API를 통해 답변을 제출하고 피드백을 받음
    setFeedback(`
      좋은 시도입니다! 몇 가지 보완할 점이 있습니다:
      
      1. React Hook의 사용 목적에 대해 더 자세히 설명하면 좋겠습니다.
      2. useState와 useEffect의 구체적인 사용 사례를 코드에서 찾아 설명해보세요.
      3. 클래스 컴포넌트의 라이프사이클 메서드와 useEffect의 관계를 더 명확히 설명해보세요.
    `)
    setIsAnswering(false)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setUserAnswer('')
      setFeedback('')
      setIsAnswering(false)
    }
  }

  const currentQuestion = mockQuestions[currentQuestionIndex]

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-slate-300 p-6">
      <h2 className="text-xl font-semibold">CS 질문</h2>

      <div className="mb-2 rounded-md bg-slate-50 p-4">
        <p className="font-medium text-slate-800">{currentQuestion.question}</p>
      </div>

      {isAnswering ? (
        <div className="flex flex-col gap-4">
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="답변을 작성해주세요..."
            className="min-h-[200px] rounded-md border border-slate-300 p-2 text-sm"
          />

          <Button
            onClick={handleSubmitAnswer}
            className="self-end bg-black text-white hover:bg-gray-800"
          >
            답변 제출
          </Button>
        </div>
      ) : feedback ? (
        <div className="flex flex-col gap-4">
          <div className="rounded-md border border-slate-300 p-4">
            <h3 className="mb-2 font-medium text-slate-700">내 답변:</h3>
            <p className="text-sm whitespace-pre-wrap text-slate-600">
              {userAnswer}
            </p>
          </div>

          <div className="rounded-md border border-green-100 bg-green-50 p-4">
            <h3 className="mb-2 font-medium text-green-700">피드백:</h3>
            <p className="text-sm whitespace-pre-wrap text-green-600">
              {feedback}
            </p>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={() => setIsAnswering(true)}
              variant="outline"
              className="border-slate-300 text-slate-700"
            >
              다시 답변하기
            </Button>

            {currentQuestionIndex < mockQuestions.length - 1 && (
              <Button
                onClick={handleNextQuestion}
                className="bg-black text-white hover:bg-gray-800"
              >
                다음 질문
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Button
          onClick={handleStartAnswer}
          className="self-start bg-black text-white hover:bg-gray-800"
        >
          답변 시작하기
        </Button>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            질문 {currentQuestionIndex + 1}/{mockQuestions.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CSQuestionsTab
