import { useFolderBookmarkCancel } from '@/api'
import { useModalStore } from '@/store/modalStore'
import { useQueryClient } from '@tanstack/react-query'

type HandleBookmarkParams = {
  questionId?: number
  csQuestionId?: number
  isBookmarked: boolean
  fileName?: string
  refetchKeys?: string[][]
  onLocalToggle?: (newState: boolean) => void
}

export const useBookmarkHandler = () => {
  const { openModal } = useModalStore()
  const queryClient = useQueryClient()
  const { mutate: cancelBookmark } = useFolderBookmarkCancel()

  const handleBookmarkClick = ({
    questionId,
    csQuestionId,
    isBookmarked,
    fileName,
    refetchKeys,
    onLocalToggle,
  }: HandleBookmarkParams) => {
    if (isBookmarked) {
      // ✅ 안전한 null 체크
      if (!fileName) {
        console.warn('파일 이름이 없습니다.')
        return
      }

      cancelBookmark(
        {
          ...(questionId && { questionId }),
          ...(csQuestionId && { csQuestionId }),
          fileName,
        },
        {
          onSuccess: () => {
            onLocalToggle?.(false)
            refetchKeys?.forEach((key) =>
              queryClient.invalidateQueries({ queryKey: key }),
            )
          },
        },
      )
    } else {
      openModal('createFolder', {
        ...(questionId && { questionId }),
        ...(csQuestionId && { csQuestionId }),
        onBookmarkDone: () => {
          onLocalToggle?.(true)
          refetchKeys?.forEach((key) =>
            queryClient.invalidateQueries({ queryKey: key }),
          )
        },
      })
    }
  }

  return { handleBookmarkClick }
}
