'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CheckCircle,
  BookOpen,
  Award,
  Brain,
  Sparkles,
  ChartColumn,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { QuestionItem } from '../types'
import PieChartComponent from '@/components/Chart/PieChart'
import StackedBarChartComponent from '@/components/Chart/StackedBarChart'
import {
  useProjectCategoryQuestionCount,
  useProjectCategoryCorrectStats,
  normalizeCategoryCount,
  normalizeCategoryCorrectStats,
} from '@/api/services/categoryStats/service'
import {
  CATEGORY_KEYS,
  CATEGORY_MAP,
} from '@/api/services/categoryStats/constants'

interface LearningInsightsProps {
  questions: QuestionItem[]
  className?: string
}

const learningResources = [
  {
    title: '알고리즘과 자료구조',
    description: '효율적인 알고리즘 설계와 자료구조 활용 방법을 학습하세요.',
    url: 'https://www.example.com/algorithms',
    icon: <Brain className="h-5 w-5 text-indigo-500" />,
  },
  {
    title: '디자인 패턴의 이해',
    description: '소프트웨어 설계의 핵심 패턴과 적용 사례를 살펴보세요.',
    url: 'https://www.example.com/design-patterns',
    icon: <Sparkles className="h-5 w-5 text-amber-500" />,
  },
]

export default function LearningInsights({
  questions,
  className = '',
}: LearningInsightsProps) {
  const {
    data: rawPie,
    isLoading: isPieLoading,
    error: pieError,
  } = useProjectCategoryQuestionCount()
  const {
    data: rawBar,
    isLoading: isBarLoading,
    error: barError,
  } = useProjectCategoryCorrectStats()

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

  // 진행률 계산
  const answeredCount = questions.filter((q) => q.answered).length
  const progressPercentage =
    questions.length > 0 ? (answeredCount / questions.length) * 100 : 0

  // 주제 분류
  const categorizeInsights = (questions: QuestionItem[]) => {
    const categories: Record<string, string[]> = {}

    questions.forEach((q) => {
      const categoryKey = q.csCategory ?? 'ETC'
      const readable =
        CATEGORY_MAP[categoryKey as keyof typeof CATEGORY_MAP] ?? '기타'
      if (!categories[readable]) categories[readable] = []
      categories[readable].push(q.question)
    })

    return categories
  }

  const insights = categorizeInsights(questions)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 진행 상황 */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-100 opacity-50" />
        <div className="absolute -right-5 -bottom-5 h-28 w-28 rounded-full bg-indigo-100 opacity-50" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 text-indigo-500" />
            <h2 className="text-xl font-bold text-indigo-900">학습 인사이트</h2>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-md bg-white p-4 shadow-sm">
              <div className="text-sm text-gray-500">진행률</div>
              <div className="mt-1 flex items-end gap-1.5">
                <span className="text-2xl font-bold text-indigo-700">
                  {progressPercentage.toFixed(0)}%
                </span>
                <span className="mb-0.5 text-sm font-medium text-gray-600">
                  완료
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="rounded-md bg-white p-4 shadow-sm">
              <div className="text-sm text-gray-500">학습 현황</div>
              <div className="mt-1 flex items-end gap-1.5">
                <span className="text-2xl font-bold text-indigo-700">
                  {answeredCount}
                </span>
                <span className="mb-0.5 text-sm font-medium text-gray-600">
                  / {questions.length} 질문 완료
                </span>
              </div>
              <div className="mt-2 flex items-center">
                <CheckCircle className="mr-1.5 h-4 w-4 text-green-500" />
                <span className="text-xs font-medium text-gray-600">
                  {questions.length - answeredCount}개 질문 남음
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 사용자 분석 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ChartColumn className="h-5 w-5 text-indigo-500" />
            사용자 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8 min-[1250px]:flex-row">
            <Card className="flex w-full flex-1 flex-col items-center justify-center gap-6 p-6">
              <div className="w-full max-w-[500px]">
                <h4 className="mb-2 text-lg font-semibold text-indigo-700">
                  카테고리 별 학습 분포
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
                  오답률이 높은 항목
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

      {/* 학습 주제 분석 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            학습 주제 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(insights).map(([category, items], index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-sm font-medium hover:text-indigo-600 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-indigo-400" />
                    {category} ({items.length})
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="mt-1 ml-4 space-y-2">
                    {items.map((question, qIndex) => (
                      <li key={qIndex} className="text-sm text-gray-600">
                        • {question}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            추천 학습 자료
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm">
            더 깊이 있는 학습을 위해 다음 자료를 참고해보세요:
          </p>

          <div className="space-y-3">
            {learningResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50"
              >
                <div className="mt-0.5 rounded-full bg-indigo-50 p-1.5">
                  {resource.icon}
                </div>
                <div>
                  <h4 className="font-medium text-indigo-700">
                    {resource.title}
                  </h4>
                  <p className="mt-0.5 text-sm text-gray-600">
                    {resource.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
