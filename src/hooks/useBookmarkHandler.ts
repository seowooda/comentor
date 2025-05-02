import { folderBookmarkCancel } from '@/api'
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
  const { mutate: cancelBookmark } = folderBookmarkCancel()

  const handleBookmarkClick = ({
    questionId,
    csQuestionId,
    isBookmarked,
    fileName,
    refetchKeys,
    onLocalToggle,
  }: HandleBookmarkParams) => {
    if (isBookmarked) {
      cancelBookmark(
        {
          ...(questionId && { questionId }),
          ...(csQuestionId && { csQuestionId }),
          fileName: fileName!, // 이미 북마크되어 있으므로 존재함
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
