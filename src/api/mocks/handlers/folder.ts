import {
  FolderDetailResponse,
  FolderResponse,
} from '@/api/services/folder/model'
import { HttpResponse, http } from 'msw'

export const folderHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/folders`, () => {
    return HttpResponse.json<FolderResponse>({
      code: 200,
      message: 'SUCCESS',
      result: [
        {
          id: 1,
          folder_name: '중요질문',
        },
        {
          id: 2,
          folder_name: '폴더2',
        },
        {
          id: 3,
          folder_name: '서우다',
        },
        {
          id: 4,
          folder_name: '폴더4',
        },
      ],
    })
  }),

  http.put(`${process.env.NEXT_PUBLIC_API_URL}/folders/:folderId`, () => {
    return HttpResponse.json({
      code: 200,
      message: 'PUT SUCCESS',
    })
  }),

  http.delete(`${process.env.NEXT_PUBLIC_API_URL}/folders/:folderId`, () => {
    return HttpResponse.json({
      code: 200,
      message: 'DELETE SUCCESS',
    })
  }),

  http.get(`${process.env.NEXT_PUBLIC_API_URL}records`, () => {
    return HttpResponse.json<FolderDetailResponse>({
      code: 200,
      message: 'SUCCESS',
      result: [
        {
          id: 1,
          folderId: 1,
          question: '이 코드에서 사용된 디자인 패턴에 대해 설명해주세요...',
          date: '2025.03.16',
          answer:
            '이 코드에서 사용된 디자인 패턴은 컴포지트 패턴입니다...이 코드에서 사용된 디자인 패턴은 컴포지트 패턴입니다...이 코드에서 사용된 디자인 패턴은 컴포지트 패턴입니다...이 코드에서 사용된 디자인 패턴은 컴포지트 패턴입니다...',
          feedback:
            '좋은 답변입니다! 확장성 측면도 고려해보면 좋겠어요.좋은 답변입니다! 확장성 측면도 고려해보면 좋겠어요.좋은 답변입니다! 확장성 측면도 고려해보면 좋겠어요.좋은 답변입니다! 확장성 측면도 고려해보면 좋겠어요.좋은 답변입니다! 확장성 측면도 고려해보면 좋겠어요.',
        },
        {
          id: 2,
          folderId: 2,
          question: '옵저버 패턴에 대해 설명해주세요.',
          date: '2025.03.18',
          answer:
            '옵저버 패턴은 객체 상태 변경을 관찰자에게 알리는 구조입니다...',
          feedback: '예시와 함께 설명하면 더 좋을 것 같아요.',
        },
      ],
    })
  }),
]
