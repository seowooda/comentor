'use client'

import { getCSQuestion } from '@/api'
import { CSCard } from '@/components/CS/CSCard'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { data } = getCSQuestion(0)
  const router = useRouter()
  const today = new Date().toISOString().slice(0, 10)

  const todayGroup = data?.result.content.find((g) => g.date === today)
  const pastGroup = data?.result.content
    .filter((g) => g.date !== today)
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0]

  return (
    <main className="flex flex-grow flex-col items-center gap-10 py-10">
      {/* 오늘의 CS 질문 */}
      <section className="flex flex-col gap-5">
        <p className="text-xl leading-5 font-bold">오늘의 CS 질문</p>

        {todayGroup?.questions.length === 0 ? (
          <div className="text-sm text-slate-500">
            아직 오늘의 질문이 생성되지 않았습니다. <br />
            매일 오전 10시에 생성됩니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
            {todayGroup?.questions.map((content) => (
              <CSCard key={content.csQuestionId} csQuestion={content} />
            ))}
          </div>
        )}
      </section>

      {/* 날짜별 질문 내역 */}
      {pastGroup && (
        <section className="flex flex-col gap-5">
          <div
            className="flex cursor-pointer items-center gap-1"
            onClick={() => router.push('/cs/history')}
          >
            <p className="text-xl leading-5 font-bold">날짜별 질문 내역 조회</p>
            <ChevronRight size={24} />
          </div>

          <div className="flex flex-col gap-10">
            <div key={pastGroup.date} className="flex flex-col gap-5">
              <p className="text-sm text-slate-400">{pastGroup.date}</p>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {pastGroup.questions.map((q) => (
                  <CSCard key={q.csQuestionId} csQuestion={q}/>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
