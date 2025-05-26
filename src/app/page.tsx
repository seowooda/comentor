import Home from '@/components/Home/Home'
import { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<></>}>
      <Home />
    </Suspense>
  )
}

export default Page
