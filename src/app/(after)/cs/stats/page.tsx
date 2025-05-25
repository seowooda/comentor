'use client'

import React from 'react'
import PieChartComponent from '@/components/Chart/PieChart'
import StackedBarChartComponent from '@/components/Chart/StackedBarChart'
import {
  useCategoryQuestionCount,
  useCategoryCorrectStats,
  normalizeCategoryCount,
  normalizeCategoryCorrectStats,
} from '@/api/services/categoryStats/service'
import {
  CATEGORY_KEYS,
  CATEGORY_MAP,
} from '@/api/services/categoryStats/constants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartColumn } from 'lucide-react'

export default function CSChartPage() {
  const {
    data: rawPie,
    isLoading: isPieLoading,
    error: pieError,
  } = useCategoryQuestionCount()
  const {
    data: rawBar,
    isLoading: isBarLoading,
    error: barError,
  } = useCategoryCorrectStats()

  const pieNormalized = normalizeCategoryCount(rawPie?.result ?? {})
  const barNormalized = normalizeCategoryCorrectStats(rawBar?.result ?? [])

  const pieData = CATEGORY_KEYS.map((key) => ({
    name: CATEGORY_MAP[key],
    value: pieNormalized[key] ?? 0,
  })).filter((d) => d.value > 0)

  const barData = CATEGORY_KEYS.map((key) => ({
    name: CATEGORY_MAP[key],
    correct: barNormalized[key]?.correct ?? 0,
    incorrect: barNormalized[key]?.incorrect ?? 0,
  }))

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ChartColumn className="h-5 w-5 text-indigo-500" />
            CS 질문 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8 min-[1250px]:flex-row">
            <Card className="flex w-full flex-1 flex-col items-center justify-center gap-6 p-6">
              <div className="w-full max-w-[500px]">
                <h4 className="mb-2 text-lg font-semibold text-indigo-700">
                  카테고리별 풀이 수
                </h4>
                <PieChartComponent
                  data={pieData}
                  isLoading={isPieLoading}
                  error={pieError}
                />
              </div>
            </Card>
            <Card className="flex w-full flex-1 flex-col items-center justify-center gap-6 p-6">
              <div className="w-full max-w-[500px]">
                <h4 className="mb-2 text-lg font-semibold text-indigo-700">
                  정오답 분포
                </h4>
                <StackedBarChartComponent
                  data={barData}
                  isLoading={isBarLoading}
                  error={barError}
                />
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
