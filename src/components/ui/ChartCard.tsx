import { Card } from '@/components/ui/card'

interface ChartCardProps {
  title: string
  isLoading?: boolean
  error?: any
  children: React.ReactNode
}

export function ChartCard({
  title,
  isLoading,
  error,
  children,
}: ChartCardProps) {
  return (
    <Card className="flex w-full flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-[500px]">
        <h4 className="mb-2 text-lg font-semibold text-indigo-700">{title}</h4>
        {isLoading ? (
          <p className="text-sm text-gray-400">로딩 중...</p>
        ) : error ? (
          <p className="text-sm text-red-500">에러 발생: {error.message}</p>
        ) : (
          children
        )}
      </div>
    </Card>
  )
}
