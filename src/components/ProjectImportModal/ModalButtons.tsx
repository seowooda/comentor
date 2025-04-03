import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface ModalButtonsProps {
  onClose: () => void
  isSubmitting?: boolean
}

/**
 * 프로젝트 모달 하단 버튼 컴포넌트
 * 취소 및 완료 버튼을 포함
 */
export const ModalButtons = ({
  onClose,
  isSubmitting = false,
}: ModalButtonsProps) => {
  return (
    <div className="inline-flex items-center justify-center gap-2.5 self-stretch">
      <Button
        type="button"
        onClick={onClose}
        className="flex-1 bg-slate-800 hover:bg-slate-900"
        aria-label="취소"
        disabled={isSubmitting}
      >
        취소
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`flex-1 ${
          isSubmitting
            ? 'cursor-not-allowed bg-slate-400'
            : 'bg-slate-800 hover:bg-slate-900'
        }`}
        aria-label="완료"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            저장 중...
          </span>
        ) : (
          '완료'
        )}
      </Button>
    </div>
  )
}
