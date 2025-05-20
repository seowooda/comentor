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

const data = [
  { name: '자료구조', correct: 6, wrong: 3 },
  { name: '알고리즘', correct: 8, wrong: 4 },
  { name: '운영체제', correct: 3, wrong: 6 },
  { name: '네트워크', correct: 2, wrong: 7 },
  { name: '데이터베이스', correct: 4, wrong: 5 },
  { name: '보안', correct: 5, wrong: 4 },
  { name: '언어 및 개발\n원리', correct: 6, wrong: 6 },
  { name: '기타', correct: 11, wrong: 10 },
]

const StackedBarChartComponent: React.FC = () => {
  return (
    <div style={{ width: 550, height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 60, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            tick={({ x, y, payload }) => {
              const lines = payload.value.includes('\n')
                ? payload.value.split('\n')
                : [payload.value]
              return (
                <g transform={`translate(${x},${y + 10})`}>
                  {lines.map((line: string, i: number) => (
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
          <Bar dataKey="wrong" stackId="a" fill="#E15759" name="틀린 문제" />
          <Bar dataKey="correct" stackId="a" fill="#4E79A7" name="맞은 문제" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StackedBarChartComponent
