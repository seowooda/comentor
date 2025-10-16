import Link from 'next/link'
import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button' // 기존에 사용하시던 버튼 컴포넌트

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl bg-white p-8 text-center shadow-lg">
        <SearchX size={56} strokeWidth={1.5} className="text-red-500" />

        <h1 className="text-3xl font-bold text-slate-800">
          페이지를 찾을 수 없습니다
        </h1>

        <p className="text-slate-600">
          요청하신 페이지가 존재하지 않거나, 주소가 변경되었을 수 있습니다.
          입력하신 주소를 다시 한번 확인해주세요.
        </p>

        <Button asChild className="mt-4 px-6 py-5 text-base">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </main>
  )
}
