import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value
  const role = req.cookies.get('role')?.value as 'GUEST' | 'USER' | 'WITHDRAWN'

  // 로그인하지 않은 경우 로그인 페이지로 리디렉션
  if (!accessToken || role === 'WITHDRAWN') {
    const res = NextResponse.redirect(new URL('/', req.url))
    res.cookies.delete('accessToken')
    return res
  }

  return NextResponse.next() // 계속 진행
}

// ✅ 보호할 경로 지정 (App Router 방식)
export const config = {
  matcher: [
    '/dashboard/:path*', // 보호할 경로들 추가
    '/user/:path*',
    '/cs/:path*',
  ],
}
