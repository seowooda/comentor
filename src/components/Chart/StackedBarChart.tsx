'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface TBarData {
  name: string
  correct: number
  incorrect: number
}

interface StackedBarChartComponentProps {
  data: TBarData[]
  isLoading: boolean
  error: unknown
}

interface XAxisTickProps {
  x: number
  y: number
  payload?: { value: string }
}

export default function StackedBarChartComponent({
  data,
  isLoading,
  error,
}: StackedBarChartComponentProps) {
  if (isLoading) return <div>로딩 중...</div>
  if (error)
    return (
      <div>에러: {error instanceof Error ? error.message : String(error)}</div>
    )

  // 데이터가 없거나 모든 값이 0인지 체크
  if (
    !data ||
    data.length === 0 ||
    !data.some((item) => item.correct > 0 || item.incorrect > 0)
  ) {
    return <div>데이터가 없습니다.</div>
  }

  return (
    <div className="w-full">
      <div className="aspect-[4/3] min-h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 30, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}
              tick={({ x, y, payload }: XAxisTickProps) => {
                const lines = payload?.value?.split('\n') ?? ['']
                return (
                  <g transform={`translate(${x},${y + 10})`}>
                    {lines.map((line, i) => (
                      <text
                        key={i}
                        x={0}
                        y={i * 14}
                        textAnchor="middle"
                        fontSize={12}
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                )
              }}
            />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="incorrect"
              stackId="a"
              fill="#E15759"
              name="틀린 문제"
            />
            <Bar
              dataKey="correct"
              stackId="a"
              fill="#4E79A7"
              name="맞은 문제"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
