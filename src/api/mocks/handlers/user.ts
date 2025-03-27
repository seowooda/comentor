import { UserResponse } from '@/api/services/user/model'
import { HttpResponse, http } from 'msw'

//예시
export const userHandlers = [
  // POST /user/join
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/user/join`, () => {
    return HttpResponse.json<UserResponse>({
      code: 200,
      message: 'Success',
      result: {
        email: 'koeun0409@gmail.com',
        notifications: true,
        stackNames: ['FRONTEND', 'BACKEND'],
      },
    })
  }),
]
