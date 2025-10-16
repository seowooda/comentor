import { ReactNode } from 'react'

interface ContentCardProps {
  title: string
  stack?: ReactNode
  children: ReactNode
}

export const ContentCard = ({ title, stack, children }: ContentCardProps) => {
  return (
    // ✅ 카드 내부 여백(padding)을 반응형으로 수정
    <div className="flex flex-col gap-5 rounded-xl border border-slate-300 bg-white p-4 shadow-sm md:p-6">
      <div className="flex items-center justify-between">
        {/* ✅ 카드 제목 텍스트 크기를 반응형으로 수정 */}
        <h2 className="text-lg font-semibold md:text-xl">{title}</h2>
        {stack}
      </div>
      {children}
    </div>
  )
}
