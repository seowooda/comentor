'use client'

import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import {
  useCategoryQuestionCount,
  normalizeCategoryCount,
} from '@/api/services/project'

const CATEGORY_MAP = {
  OPERATING_SYSTEMS: '운영체제',
  NETWORKING: '네트워크',
  DATABASES: '데이터베이스',
  SECURITY: '보안',
  LANGUAGE_AND_DEVELOPMENT_PRINCIPLES: '언어 및 개발 원리',
  ETC: '기타',
  DATA_STRUCTURES_ALGORITHMS: '자료구조/알고리즘',
} as const

const CATEGORY_KEYS = [
  'DATA_STRUCTURES_ALGORITHMS',
  'ETC',
  'SECURITY',
  'DATABASES',
  'LANGUAGE_AND_DEVELOPMENT_PRINCIPLES',
  'OPERATING_SYSTEMS',
  'NETWORKING',
] as const

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

export default function PieChartComponent() {
  const { data, isLoading, error } = useCategoryQuestionCount()

  if (isLoading) return <div>로딩 중...</div>
  if (error)
    return (
      <div>에러: {error instanceof Error ? error.message : String(error)}</div>
    )

  const chartData =
    data && data.result
      ? CATEGORY_KEYS.filter((key) => key in CATEGORY_MAP)
          .map((key) => ({
            name: CATEGORY_MAP[key as keyof typeof CATEGORY_MAP],
            value: normalizeCategoryCount(data.result)[key] ?? 0,
          }))
          .filter((item) => item.value > 0)
      : []

  return (
    <div className="w-full">
      {/* 차트 */}
      <div className="aspect-[4/3] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              label
            >
              {chartData.map((entry, index) => (
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
        {chartData.map((entry, index) => (
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
