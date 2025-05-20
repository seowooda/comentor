'use client'

import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import {
  useCategoryQuestionCount,
  normalizeCategoryCount,
} from '@/api/services/project'

// 카테고리 한글 매핑 및 키 정의
const CATEGORY_MAP = {
  OPERATING_SYSTEM: '운영체제',
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

const PieChartComponent: React.FC<{
  refetchSignal?: number
}> = ({ refetchSignal }) => {
  const { data, isLoading, error, refetch } = useCategoryQuestionCount()

  let chartData: { name: string; value: number }[] = []
  if (data && data.result) {
    const normalized = normalizeCategoryCount(data.result)
    chartData = CATEGORY_KEYS.filter((key) => key in CATEGORY_MAP)
      .map((key) => ({
        name: CATEGORY_MAP[key as keyof typeof CATEGORY_MAP],
        value: normalized[key] ?? 0,
      }))
      .filter((item) => item.value > 0)
  }

  if (isLoading) return <div>로딩 중...</div>
  if (error)
    return (
      <div>에러: {error instanceof Error ? error.message : String(error)}</div>
    )

  return (
    <div style={{ width: 550, height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
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
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieChartComponent
