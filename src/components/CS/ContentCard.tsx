import { ReactNode } from 'react'

interface ContentCardProps {
  title: string
  stack?: ReactNode
  children: ReactNode
}

export const ContentCard = ({ title, stack, children }: ContentCardProps) => {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-slate-400 bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {stack}
      </div>
      {children}
    </div>
  )
}
