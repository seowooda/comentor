import { ReactNode } from 'react'

interface NotificationCardProps {
  icon: ReactNode
  title: string
  description: string
  right?: ReactNode
}

export const NotificationCard = ({
  icon,
  title,
  description,
  right,
}: NotificationCardProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-sm border border-slate-300 p-5 hover:bg-slate-50 hover:transition-colors">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-slate-200 p-2">{icon}</div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-xs text-slate-600">{description}</p>
        </div>
      </div>
      {right && <div>{right}</div>}
    </div>
  )
}
