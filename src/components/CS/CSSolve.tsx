'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ContentCard } from './ContentCard'
import { CSQuestionDetail, getCSQuestionDetail } from '@/api'
import { useState } from 'react'
import { useCSFeedback } from '@/api/services/CS/queries'
import { Loader2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'

interface CSSolveProps {
  question: CSQuestionDetail
}

export const CSSolve = ({ question }: CSSolveProps) => {
  const [answer, setAnswer] = useState('')
  const [tab, setTab] = useState<'challenge' | 'solution'>('challenge')
  const queryClient = useQueryClient()

  const { mutate, isPending } = useCSFeedback()

  // 간단한 마크다운 문법 자동 보정
  const formatAsMarkdown = (text: string) => {
    return text
      .replace(/(정확한 답변:)/g, '\n\n### $1\n\n')
      .replace(/(보완점:)/g, '\n\n### $1\n\n')
      .replace(/예를 들어,/g, '\n\n- 예를 들어,')
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
          <ContentCard title="질문">
            <p className="font-medium">{question.question}</p>
          </ContentCard>

          <ContentCard
            title="답변"
            stack={
              <p className="rounded-3xl bg-green-100 px-3 py-1 text-sm text-green-600">
                {question.stack}
              </p>
            }
          >
            {userAnswers.length > 0 ? (
              <div className="flex flex-col gap-2">
                {userAnswers.map((a, idx) => (
                  <p key={idx} className="font-medium">
                    {a.content}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">아직 제출된 답변이 없습니다.</p>
            )}
          </ContentCard>

          <ContentCard title="피드백">
            {aiFeedbacks.length > 0 ? (
              <div className="flex flex-col gap-2">
                {aiFeedbacks.map((a, idx) => (
                  <ReactMarkdown key={idx}>
                    {formatAsMarkdown(a.content)}
                  </ReactMarkdown>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">
                📝 답변을 하고 피드백을 받아보세요.
              </p>
            )}
          </ContentCard>
        </div>
      </TabsContent>
    </Tabs>
  )
}
