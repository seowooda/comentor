'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  useCategoryCorrectStats,
  normalizeCategoryCorrectStats,
} from '@/api/services/project'

const CATEGORY_MAP = {
  OPERATING_SYSTEM: '운영체제',
  NETWORKING: '네트워크',
  DATABASES: '데이터베이스',
  SECURITY: '보안',
  LANGUAGE_AND_DEVELOPMENT_PRINCIPLES: '언어 및 개발\n원리',
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

type TBarData = { name: string; correct: number; incorrect: number }

interface XAxisTickProps {
  x: number
  y: number
  payload?: {
    value: string
    coordinate: number
  }
}

const StackedBarChartComponent: React.FC<{
  refetchSignal?: number
}> = ({ refetchSignal }) => {
  const { data, isLoading, error, refetch } = useCategoryCorrectStats()

  let chartData: TBarData[] = []
  if (data && data.result) {
    const normalized = normalizeCategoryCorrectStats(data.result)
    chartData = CATEGORY_KEYS.filter((key) => key in CATEGORY_MAP).map(
      (key) => ({
        name: CATEGORY_MAP[key as keyof typeof CATEGORY_MAP],
        correct: normalized[key]?.correct ?? 0,
        incorrect: normalized[key]?.incorrect ?? 0,
      }),
    )
  }

  if (isLoading) return <div>로딩 중...</div>
  if (error)
    return (
      <div>에러: {error instanceof Error ? error.message : String(error)}</div>
    )

  return (
    <div style={{ width: 550, height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 60, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            tick={({ x, y, payload }: XAxisTickProps) => {
              const lines = payload?.value ? payload.value.split('\n') : ['']
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
          <Legend verticalAlign="top" align="center" />
          <Bar
            dataKey="incorrect"
            stackId="a"
            fill="#E15759"
            name="틀린 문제"
          />
          <Bar dataKey="correct" stackId="a" fill="#4E79A7" name="맞은 문제" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StackedBarChartComponent
