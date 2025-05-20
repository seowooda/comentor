import Home from '@/components/Home/Home'
import { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <Home />
    </Suspense>
  )
}

export default Page
