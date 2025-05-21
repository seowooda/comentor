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
import {
  useCategoryCorrectStats,
  normalizeCategoryCorrectStats,
} from '@/api/services/project'

const CATEGORY_MAP = {
  OPERATING_SYSTEMS: '운영체제',
  NETWORKING: '네트워크',
  DATABASES: '데이터베이스',
  SECURITY: '보안',
  LANGUAGE_AND_DEVELOPMENT_PRINCIPLES: '언어 및\n개발 원리',
  ETC: '기타',
  DATA_STRUCTURES_ALGORITHMS: '자료구조 및\n알고리즘',
} as const

const CATEGORY_KEYS = [
  'LANGUAGE_AND_DEVELOPMENT_PRINCIPLES',
  'OPERATING_SYSTEMS',
  'NETWORKING',
  'DATA_STRUCTURES_ALGORITHMS',
  'SECURITY',
  'DATABASES',
  'ETC',
] as const

type TBarData = { name: string; correct: number; incorrect: number }

interface XAxisTickProps {
  x: number
  y: number
  payload?: { value: string }
}

export default function StackedBarChartComponent() {
  const { data, isLoading, error } = useCategoryCorrectStats()

  if (isLoading) return <div>로딩 중...</div>
  if (error)
    return (
      <div>에러: {error instanceof Error ? error.message : String(error)}</div>
    )

  const chartData: TBarData[] =
    data && data.result
      ? CATEGORY_KEYS.map((key) => ({
          name: CATEGORY_MAP[key as keyof typeof CATEGORY_MAP],
          correct:
            normalizeCategoryCorrectStats(data.result)[key]?.correct ?? 0,
          incorrect:
            normalizeCategoryCorrectStats(data.result)[key]?.incorrect ?? 0,
        }))
      : []

  return (
    <div className="w-full">
      {/* 차트 */}
      <div className="aspect-[4/3] min-h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
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
