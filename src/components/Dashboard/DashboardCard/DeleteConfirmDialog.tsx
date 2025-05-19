import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DeleteConfirmDialogProps {
  isOpen: boolean
  projectTitle: string
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
  error?: {
    message: string
  }
}

/**
 * 프로젝트 삭제 확인 대화상자 컴포넌트
 */
export const DeleteConfirmDialog = ({
  isOpen,
  projectTitle,
  onClose,
  onConfirm,
  isLoading,
  error,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로젝트 삭제</DialogTitle>
          <DialogDescription>
            정말 "{projectTitle}" 프로젝트를 삭제하시겠습니까?
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="my-2 rounded-md bg-red-50 p-3 text-center text-sm text-red-600">
            {error.message}
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
            disabled={isLoading}
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                삭제 중...
              </>
            ) : (
              '삭제'
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
