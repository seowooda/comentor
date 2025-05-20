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
import { useRouter } from 'next/navigation'

const data = [
  { name: 'Group A', value: 400, slug: 'group-a' },
  { name: 'Group B', value: 300, slug: 'group-b' },
  { name: 'Group C', value: 300, slug: 'group-c' },
  { name: 'Group D', value: 200, slug: 'group-d' },
  { name: 'Group E', value: 400, slug: 'group-e' },
  { name: 'Group F', value: 300, slug: 'group-f' },
  { name: 'Group G', value: 300, slug: 'group-g' },
  { name: 'Group H', value: 50, slug: 'group-h' },
]

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

const PieChartComponent: React.FC = () => {
  const router = useRouter()

  const handlePieClick = (_: any, index: number) => {
    const target = data[index]
    router.push(`/detail/${target.slug}`)
  }

  return (
    <ResponsiveContainer width={550} height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="40%" // 왼쪽으로 이동해서 오른쪽에 공간 확보
          cy="50%"
          labelLine={true}
          label={false}
          outerRadius={160}
          fill="#8884d8"
          dataKey="value"
          onClick={handlePieClick}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconType="circle"
          wrapperStyle={{
            fontSize: 12,
            lineHeight: '20px',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent
