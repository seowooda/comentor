'use client'

import { getCSQuestion } from '@/api'
import { CSCard } from '@/components/CS/CSCard'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export default function Page() {
  const { data } = getCSQuestion(0)
  const router = useRouter()
  const today = new Date().toISOString().slice(0, 10)

  const todayQuestions = useMemo(() => {
    return (
      data?.result.content.find((group) => group.date === today)?.questions ??
      []
    )
  }, [data, today])

  const recentPastGroup = useMemo(() => {
    const pastGroups = data?.result.content
      .filter((group) => group.date !== today)
      .sort((a, b) => (a.date < b.date ? 1 : -1)) // 최신 날짜가 위로
    return pastGroups?.[0]
  }, [data, today])

  return (
    <main className="flex flex-grow flex-col items-center gap-10 py-10">
      {/* 오늘의 CS 질문 */}
      <section className="flex flex-col gap-5">
        <p className="text-xl leading-5 font-bold">오늘의 CS 질문</p>

        {todayQuestions.length === 0 ? (
          <div className="text-sm text-slate-500">
            아직 오늘의 질문이 생성되지 않았습니다. <br />
            매일 오전 10시에 생성됩니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
            {todayQuestions.map((content) => (
              <CSCard key={content.csQuestionId} {...content} />
            ))}
          </div>
        )}
      </section>

      {/* 날짜별 질문 내역 */}
      {recentPastGroup && (
        <section className="flex flex-col gap-5">
          <div
            className="flex cursor-pointer items-center gap-1"
            onClick={() => router.push('/cs/history')}
          >
            <p className="text-xl leading-5 font-bold">날짜별 질문 내역 조회</p>
            <ChevronRight size={24} />
          </div>

          <div className="flex flex-col gap-10">
            <div key={recentPastGroup.date} className="flex flex-col gap-5">
              <p className="text-sm text-slate-400">{recentPastGroup.date}</p>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {recentPastGroup.questions.map((q) => (
                  <CSCard key={q.csQuestionId} {...q} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
