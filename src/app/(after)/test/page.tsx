'use client'

import PieChartComponent from '@/components/Chart/PieChart'
import StackedBarChartComponent from '@/components/Chart/StackedBarChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'

export default function ChartPage() {
  return (
    <div className="mx-auto space-y-6 p-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            사용자 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8 flex flex-col gap-8 md:flex-row">
            <Card className="flex w-full flex-1 flex-col items-center justify-center gap-6 p-8 md:w-1/2">
              <div className="flex w-full flex-col items-center md:items-start">
                <h4 className="mb-2 text-lg font-semibold text-indigo-700">
                  카테고리 별 학습 분포
                </h4>
                <p className="mb-4 text-sm text-gray-600">
                  카테고리 별 학습률을 확인하세요
                </p>
                <PieChartComponent />
              </div>
            </Card>
            <Card className="flex w-full flex-1 flex-col items-center justify-center gap-6 p-8 md:w-1/2">
              <div className="flex w-full flex-col items-center md:items-start">
                <h4 className="mb-2 text-lg font-semibold text-indigo-700">
                  오답률이 높은 항목
                </h4>
                <p className="mb-4 text-sm text-gray-600">
                  카테고리별 정답과 오답 비율을 확인하세요
                </p>
                <StackedBarChartComponent />
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
