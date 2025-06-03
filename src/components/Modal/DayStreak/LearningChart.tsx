'use client'

import { useMemo } from 'react'
import { LearningHistoryItem } from '@/api'
import { Calendar, TrendingUp } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface LearningChartProps {
  data: LearningHistoryItem[]
  isLoading?: boolean
}

const LearningChart = ({ data, isLoading = false }: LearningChartProps) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return []

    return data.map((item) => ({
      date: item.date,
      displayDate: new Date(item.date)
        .toLocaleDateString('ko-KR', {
          month: '2-digit',
          day: '2-digit',
        })
        .replace('/', '.'),
      solvedCount: item.solvedCount,
    }))
  }, [data])

  const maxValue = useMemo(() => {
    if (chartData.length === 0) return 10
    return Math.max(10, Math.max(...chartData.map((d) => d.solvedCount)) + 2)
  }, [chartData])

  const yAxisDomain = useMemo(() => [0, maxValue], [maxValue])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
          <p className="text-xs text-gray-600">{`날짜: ${label}`}</p>
          <p className="text-xs font-medium text-blue-600">
            {`해결한 문제: ${payload[0].value}개`}
          </p>
        </div>
      )
    }
    return null
  }

  const CustomDot = (props: any) => {
    const { cx, cy } = props
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#7987FF"
        stroke="white"
        strokeWidth={2}
        className="hover:r-6 cursor-pointer transition-all"
      />
    )
  }

  if (isLoading) {
    return (
      <div className="mb-6">
        <h3 className="mb-4 text-sm font-medium text-gray-700">
          연속 학습 기록
        </h3>
        <div className="flex items-center justify-center rounded-lg bg-gray-50 py-16">
          <div className="text-sm text-gray-500">차트를 불러오는 중...</div>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="mb-6">
        <h3 className="mb-4 text-sm font-medium text-gray-700">
          연속 학습 기록
        </h3>
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 py-16">
          <Calendar className="mb-3 h-8 w-8 text-gray-400" />
          <div className="text-sm font-medium text-gray-600">
            학습 기록이 없습니다
          </div>
          <div className="text-xs text-gray-500">
            문제를 풀어보시면 기록이 나타납니다
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-700">연속 학습 기록</h3>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="none"
              stroke="#F1F1F1"
              strokeWidth={1}
            />
            <XAxis
              dataKey="displayDate"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: '#6B7280',
              }}
              dy={10}
            />
            <YAxis
              domain={yAxisDomain}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: '#6B7280',
              }}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="solvedCount"
              stroke="#7987FF"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{
                r: 6,
                fill: '#7987FF',
                stroke: 'white',
                strokeWidth: 2,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default LearningChart
