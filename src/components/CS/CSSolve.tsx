'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ContentCard } from './ContentCard'
import { getCSQuestionDetail, useCSFeedback } from '@/api'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { AnswerList } from './AnswerList'
import { FeedbackList } from './FeedbackList'

interface CSSolveProps {
  id: number
}

export const CSSolve = ({ id }: CSSolveProps) => {
  const [answer, setAnswer] = useState('')
  const [tab, setTab] = useState<'challenge' | 'solution'>('challenge')
  const queryClient = useQueryClient()

  const { data, isLoading } = getCSQuestionDetail(id)
  const question = data?.result
  
  const { mutate, isPending } = useCSFeedback()

    if (isLoading || !question) {
      return <div>Loading...</div>
    }

  const handleSubmit = () => {
    mutate(
      {
        csQuestionId: question.csQuestionId,
        answer: answer.trim(),
      },
      {
        onSuccess: async () => {
          setAnswer('')
          setTab('solution')
          
          // ✅ 최신 답변/피드백을 위해 데이터 강제 새로고침
          await queryClient.invalidateQueries({
            queryKey: ['cs-question', question.csQuestionId.toString()],
          })
        },
      },
    )
  }

  const userAnswers = question.answers.filter((a) => a.author === 'USER')
  const aiFeedbacks = question.answers.filter((a) => a.author === 'AI')

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => setTab(v as typeof tab)}
      className="flex w-[800px] flex-col gap-5"
    >
      <TabsList className="w-full">
        <TabsTrigger value="challenge">도전하기</TabsTrigger>
        <TabsTrigger value="solution">답변보기</TabsTrigger>
      </TabsList>

      {/* 도전하기 탭 */}
      <TabsContent value="challenge">
        <div className="flex flex-col gap-5">
          <ContentCard
            title="질문"
            stack={
              <p className="rounded-3xl bg-green-100 px-3 py-1 text-sm text-green-600">
                {question.stack}
              </p>
            }
          >
            <p className="font-medium">{question.question}</p>
          </ContentCard>

          <ContentCard title="답변">
            <Textarea
              placeholder="질문에 대한 답변을 작성해주세요..."
              className="h-[200px] resize-none border-slate-300"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </ContentCard>

          <div className="flex justify-end">
            <Button
              className="flex w-24 items-center justify-center gap-1"
              disabled={answer.trim().length === 0 || isPending}
              onClick={handleSubmit}
            >
              {isPending && (
                <Loader2 className="animate-spin text-slate-500" size={16} />
              )}
              {isPending ? '제출 중...' : '답변 제출'}
            </Button>
          </div>
        </div>
      </TabsContent>

      {/* 답변보기 탭 */}
      <TabsContent value="solution">
        <div className="flex flex-col gap-5">
          <ContentCard
            title="질문"
            stack={
              <p className="rounded-3xl bg-green-100 px-3 py-1 text-sm text-green-600">
                {question.stack}
              </p>
            }
          >
            <p className="font-medium">{question.question}</p>
          </ContentCard>

          <ContentCard title="답변">
            <AnswerList answers={userAnswers} />
          </ContentCard>

          <ContentCard title="피드백">
            <FeedbackList feedbacks={aiFeedbacks} />
          </ContentCard>
        </div>
      </TabsContent>
    </Tabs>
  )
}
