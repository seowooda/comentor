import { Button } from '@/components/ui/button'

interface ModalButtonsProps {
  onClose: () => void
  isTitleEmpty: boolean
}

/**
 * 프로젝트 모달 하단 버튼 컴포넌트
 * 취소 및 완료 버튼을 포함
 */
export const ModalButtons = ({ onClose, isTitleEmpty }: ModalButtonsProps) => {
  return (
    <div className="inline-flex items-center justify-center gap-2.5 self-stretch">
      <Button
        type="button"
        onClick={onClose}
        className="flex-1 bg-slate-800 hover:bg-slate-900"
        aria-label="취소"
      >
        취소
      </Button>
      <Button
        type="submit"
        disabled={isTitleEmpty}
        className={`flex-1 ${
          isTitleEmpty
            ? 'cursor-not-allowed bg-slate-400'
            : 'bg-slate-800 hover:bg-slate-900'
        }`}
        aria-label="완료"
      >
        완료
      </Button>
    </div>
  )
}
