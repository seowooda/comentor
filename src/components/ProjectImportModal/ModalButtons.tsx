import { Button } from '@/components/ui/button'

// 스타일 상수
const BUTTON_CONTAINER_CLASSES =
  'inline-flex items-center justify-center gap-2.5 self-stretch'
const CANCEL_BUTTON_CLASSES = 'flex-1 bg-slate-800  hover:bg-slate-900'
const SUBMIT_BUTTON_BASE_CLASSES = 'flex-1'
const SUBMIT_BUTTON_DISABLED_CLASSES = 'cursor-not-allowed bg-slate-400'
const SUBMIT_BUTTON_ENABLED_CLASSES = 'bg-slate-800 hover:bg-slate-900'

interface ModalButtonsProps {
  onClose: () => void
  isTitleEmpty: boolean
}

/**
 * 프로젝트 모달 하단 버튼 컴포넌트
 * 취소 및 완료 버튼을 포함
 */
export const ModalButtons = ({ onClose, isTitleEmpty }: ModalButtonsProps) => {
  const submitButtonClasses = `${SUBMIT_BUTTON_BASE_CLASSES} ${
    isTitleEmpty
      ? SUBMIT_BUTTON_DISABLED_CLASSES
      : SUBMIT_BUTTON_ENABLED_CLASSES
  }`

  return (
    <div className={BUTTON_CONTAINER_CLASSES}>
      <Button
        type="button"
        onClick={onClose}
        className={CANCEL_BUTTON_CLASSES}
        aria-label="취소"
      >
        취소
      </Button>
      <Button
        type="submit"
        disabled={isTitleEmpty}
        className={submitButtonClasses}
        aria-label="완료"
      >
        완료
      </Button>
    </div>
  )
}
