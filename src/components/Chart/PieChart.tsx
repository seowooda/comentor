'use client'

import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface PieChartComponentProps {
  data: { name: string; value: number }[]
  isLoading: boolean
  error: unknown
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#A28CFF',
  '#E15759',
  '#66CCFF',
  '#F4A261',
]

export default function PieChartComponent({
  data,
  isLoading,
  error,
}: PieChartComponentProps) {
  if (isLoading) return <div>로딩 중...</div>
  if (error) {
    return (
      <div>에러: {error instanceof Error ? error.message : String(error)}</div>
    )
  }

  // 데이터가 없거나 모든 값이 0인지 체크
  if (!data || data.length === 0 || !data.some((item) => item.value > 0)) {
    return <div>데이터가 없습니다.</div>
  }

  return (
    <div className="w-full">
      {/* 차트 */}
      <div className="aspect-[4/3] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-700">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  )
}
