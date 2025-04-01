import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value
  const refreshToken = req.cookies.get('refreshToken')?.value

  if (!accessToken && !refreshToken) {
    // ✅ accessToken과 refreshToken이 모두 없을 경우에만 리디렉트
    const res = NextResponse.redirect(new URL('/', req.url))
    res.cookies.delete('accessToken')
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/user/:path*', '/cs/:path*'],
}
