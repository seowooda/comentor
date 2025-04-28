import { ReactNode } from 'react'

interface ContentCardProps {
  title: string
  children: ReactNode
}

export const ContentCard = ({ title, children }: ContentCardProps) => {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-slate-400 bg-white p-6 shadow-md">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  )
}
