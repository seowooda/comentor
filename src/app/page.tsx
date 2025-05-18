import Home from '@/components/Home/Home'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <Home />
    </Suspense>
  )
}
