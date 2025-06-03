'use client'

import React, { useMemo } from 'react'
import PieChartComponent from '@/components/Chart/PieChart'
import StackedBarChartComponent from '@/components/Chart/StackedBarChart'
import {
  useCategoryQuestionCount,
  useCategoryCorrectStats,
  normalizeCategoryCount,
  normalizeCategoryCorrectStats,
} from '@/api/services/categoryStats/service'
import { mapCS } from '@/lib/mapEnum'
import { CSCategory } from '@/api/types/common'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartColumn } from 'lucide-react'
import { ChartCard } from '@/components/ui/ChartCard'

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

  const pieData = useMemo(
    () =>
      Object.values(CSCategory)
        .map((key) => ({
          name: mapCS(key as CSCategory),
          value: pieNormalized[key] ?? 0,
        }))
        .filter((d) => d.value > 0),
    [pieNormalized],
  )

  const barData = useMemo(
    () =>
      Object.values(CSCategory).map((key) => ({
        name: mapCS(key as CSCategory),
        correct: barNormalized[key]?.correct ?? 0,
        incorrect: barNormalized[key]?.incorrect ?? 0,
      })),
    [barNormalized],
  )

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
          <div className="overflow-x-auto">
            <div className="flex min-w-[640px] flex-col gap-8 min-[1250px]:flex-row">
              <ChartCard
                title="카테고리별 풀이 수"
                isLoading={isPieLoading}
                error={pieError}
              >
                <PieChartComponent
                  data={pieData}
                  isLoading={isPieLoading}
                  error={pieError}
                />
              </ChartCard>
              <ChartCard
                title="정오답 분포"
                isLoading={isBarLoading}
                error={barError}
              >
                <StackedBarChartComponent
                  data={barData}
                  isLoading={isBarLoading}
                  error={barError}
                />
              </ChartCard>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
