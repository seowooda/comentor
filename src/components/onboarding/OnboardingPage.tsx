'use client'

import { WelcomeSection } from './sections/WelcomeSection'
import { FeatureSection } from './sections/FeatureSection'

export default function OnboardingPage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* 배경 효과 - 별도의 레이어로 분리 */}
      <div className="absolute -left-20 -z-[1] h-80 w-80 rounded-full bg-blue-100 opacity-70 blur-3xl" />
      <div className="absolute top-60 right-10 -z-[1] h-60 w-60 rounded-full bg-indigo-100 opacity-60 blur-3xl" />
      <div className="absolute -right-40 bottom-60 -z-[1] h-80 w-80 rounded-full bg-indigo-100 opacity-60 blur-3xl" />
      <div className="absolute bottom-40 left-20 -z-[1] h-60 w-60 rounded-full bg-blue-100 opacity-50 blur-3xl" />

      {/* 컨텐츠 - overflow-hidden 적용 */}
      <div className="container mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-start gap-16 px-4 py-12 md:px-8 md:py-16 lg:py-20">
        <WelcomeSection />
        <FeatureSection />
      </div>
    </div>
  )
}
