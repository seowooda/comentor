import { cookies } from 'next/headers'

export const serverFetcher = async <T>(url: string): Promise<T> => {
  const cookieStore = await cookies()
  let accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    cache: 'no-store',
  })

  // accessToken 만료 시
  if (res.status === 401 || res.status === 403) {
    if (!refreshToken) {
      throw new Error('SSR: RefreshToken이 없어 재발급할 수 없습니다.')
    }

    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    )

    if (!refreshRes.ok) {
      throw new Error('SSR: 토큰 재발급 실패')
    }

    const refreshData = await refreshRes.json()
    if (!refreshData.result) {
      throw new Error('SSR: 재발급된 토큰이 없습니다')
    }

    accessToken = refreshData.result

    // 재발급된 accessToken으로 요청 재시도
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error(`SSR 재요청 실패: ${res.status}`)
    }

    // 여기서 accessToken을 다시 클라이언트에 전달하고 싶다면,
    // 리턴 구조를 바꿔야 함 (예: { data, accessToken } 형태로)
  }

  return res.json()
}
