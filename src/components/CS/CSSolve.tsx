'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ContentCard } from './ContentCard'
import { CSQuestionDetail } from '@/api'
import { useState } from 'react'

interface CSSolveProps {
  question: CSQuestionDetail
}

export const CSSolve = ({ question }: CSSolveProps) => {
  const [answer, setAnswer] = useState('')
  const userAnswers = question.answers.filter((a) => a.author === 'USER')
  const aiFeedbacks = question.answers.filter((a) => a.author === 'AI')

  return (
    <Tabs defaultValue="challenge" className="flex w-[800px] flex-col gap-5">
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
            <Button className="w-24" disabled={answer.trim().length === 0}>
              답변 제출
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

          {aiFeedbacks.length > 0 ? (
            <ContentCard title="피드백">
              <div className="flex flex-col gap-2">
                {aiFeedbacks.map((a, idx) => (
                  <p key={idx} className="font-medium">
                    {a.content}
                  </p>
                ))}
              </div>
            </ContentCard>
          ) : (
            <ContentCard title="피드백">
              <p className="text-slate-500">
                📝 답변을 하고 피드백을 받아보세요.
              </p>
            </ContentCard>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
