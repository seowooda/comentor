import { cookies } from 'next/headers'

export const serverFetcher = async <T>(url: string): Promise<T> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    cache: 'no-store', // ⭐ 항상 최신 데이터
  })

  if (!res.ok) {
    throw new Error(`serverFetcher Error: ${res.status}`)
  }

  return res.json()
}
