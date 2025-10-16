'use client'

import { useGetCSQuestion } from '@/api'
import { CSCard } from '@/components/CS/Card/CSCard'
import { CSCardSkeleton } from '@/components/Skeleton/CSCardSkeleton'
import { ChevronRight, ChartColumn } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Pag = () => {
  const { data, isLoading } = useGetCSQuestion(0)
  const router = useRouter()
  const today = new Date().toISOString().slice(0, 10)

  const todayGroup = data?.result.content.find((g) => g.date === today)
  const pastGroup = data?.result.content
    .filter((g) => g.date !== today)
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0]

  return (
    <main className="flex flex-grow flex-col items-center gap-10 px-4 py-6 sm:px-6 md:py-10">
      {isLoading ? (
        // ✅ 로딩 중에는 두 섹션 모두 스켈레톤으로 표시
        <div className="grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CSCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* CS 학습 통계 섹션 (페이지 이동 버튼) */}
          <section className="flex w-full max-w-5xl flex-col gap-3">
            <div
              className="flex cursor-pointer items-center justify-between gap-2 rounded-md"
              onClick={() => router.push('/cs/stats')}
            >
              <div className="flex items-center gap-2">
                <ChartColumn className="h-5 w-5 text-indigo-500" />
                <p className="text-lg font-bold sm:text-xl">
                  나의 CS 학습 통계
                </p>
              </div>
              <ChevronRight size={24} />
            </div>
          </section>

          {/* 오늘의 CS 질문 */}
          <section className="flex flex-col gap-5">
            <p className="text-xl leading-5 font-bold">오늘의 CS 질문</p>

            {!todayGroup ? (
              <div className="text-center text-sm text-slate-500">
                아직 오늘의 질문이 생성되지 않았습니다. <br />
                매일 오전 10시에 생성됩니다.
              </div>
            ) : todayGroup.questions.length === 0 ? (
              <div className="text-sm text-slate-500">
                오늘의 질문이 존재하지 않습니다.
              </div>
            ) : (
              <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
                {todayGroup.questions.map((q) => (
                  <CSCard key={q.csQuestionId} csQuestion={q} />
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
                <p className="text-xl leading-5 font-bold">
                  날짜별 질문 내역 조회
                </p>
                <ChevronRight size={24} />
              </div>

              <div className="flex flex-col gap-10">
                <div key={pastGroup.date} className="flex flex-col gap-5">
                  <p className="text-sm text-slate-400">{pastGroup.date}</p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {pastGroup.questions.map((q) => (
                      <CSCard key={q.csQuestionId} csQuestion={q} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default Pag
