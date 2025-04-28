import { CSCard } from '@/components/CS/CSCard'
import { ChevronRight } from 'lucide-react'

export default function Page() {
  const contents = [
    {
      id: 1,
      title: 'CS',
      question:
        'OOP의 5가지 설계 원칙은?OOP의 5가지 설계 원칙은?OOP의 5가지 설계 원칙은?OOP의 5가지 설계 원칙은?',
      stack: ['Java', 'Spring'],
      createdAt: '2025-03-20',
      status: 'DONE',
    },
    {
      id: 2,
      title: 'CS',
      question: 'Promise와 Callback 차이를 설명해보세요',
      stack: ['Java', 'Spring'],
      createdAt: '2025-03-20',
      status: 'DONE',
    },
    {
      id: 3,
      title: 'CS',
      question: 'Garbage Collection이란?',
      stack: ['Java', 'Spring'],
      createdAt: '2025-03-20',
      status: 'DONE',
    },
    {
      id: 4,
      title: 'CS',
      question: 'Garbage Collection이란?',
      stack: ['Java', 'Spring'],
      createdAt: '2025-03-21',
      status: 'PROGRESS',
    },
  ]

  // 날짜별로 묶기
  const groupedByDate = contents.reduce(
    (acc: Record<string, typeof contents>, item) => {
      if (!acc[item.createdAt]) {
        acc[item.createdAt] = []
      }
      acc[item.createdAt].push(item)
      return acc
    },
    {},
  )

  return (
    <main className="flex flex-grow flex-col items-center gap-10 py-10">
      {/* 오늘의 CS 질문 */}
      <section className="flex flex-col gap-5">
        <p className="text-xl leading-5 font-bold">오늘의 CS 질문</p>

        <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
          {contents.map((content) => (
            <CSCard key={content.id} {...content} />
          ))}
        </div>
      </section>

      {/* 날짜별 질문 내역 */}
      <section className="flex flex-col gap-5">
        <div className="flex gap-1">
          <p className="text-xl leading-5 font-bold">날짜별 질문 내역 조회</p>
          <ChevronRight size={24} />
        </div>

        <div className="flex flex-col gap-10">
          {Object.entries(groupedByDate).map(([date, questions]) => (
            <div key={date} className="flex flex-col gap-5">
              <p className="text-sm text-slate-400">{date}</p>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {questions.map((q) => (
                  <CSCard key={q.id} {...q} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
