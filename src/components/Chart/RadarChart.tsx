'use client'

import React from 'react'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { subject: '자료구조', value: 120 },
  { subject: '알고리즘', value: 98 },
  { subject: '운영체제', value: 86 },
  { subject: '네트워크', value: 99 },
  { subject: '데이터베이스', value: 85 },
  { subject: '보안', value: 65 },
  { subject: '언어 및 \n개발 원리', value: 70 },
  { subject: '기타', value: 50 },
]

const getStepSize = (max: number) => {
  if (max >= 150) return 40
  if (max >= 60) return 20
  return 10
}

const getChartScale = (data: { value: number }[]) => {
  const rawMax = Math.max(...data.map((d) => d.value))
  const step = getStepSize(rawMax)
  const maxValue = Math.ceil(rawMax / step) * step
  const tickCount = Math.round(maxValue / step) + 1
  return { maxValue, tickCount }
}

const { maxValue, tickCount } = getChartScale(data)

const renderCustomTick = (props: any) => {
  const { payload, x, y, textAnchor, stroke, radius } = props
  const lines = String(payload.value).split('\n')
  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      stroke={stroke}
      fontSize={12}
      fontFamily="Pretendard, sans-serif"
    >
      {lines.map((line, idx) => (
        <tspan x={x} dy={idx === 0 ? 0 : 16} key={idx}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

const RadarChartComponent: React.FC = () => {
  return (
    <div style={{ width: 550, height: 400 }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={renderCustomTick} />
          <PolarRadiusAxis
            angle={30}
            domain={[0, maxValue]}
            tickCount={tickCount}
          />
          <Radar
            name="점수"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RadarChartComponent
