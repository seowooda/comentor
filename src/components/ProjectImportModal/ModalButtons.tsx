interface ModalButtonsProps {
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitDisabled?: boolean
}

export const ModalButtons = ({
  onClose,
  onSubmit,
  isSubmitDisabled = false,
}: ModalButtonsProps) => (
  <div className="inline-flex items-center justify-center gap-2.5 self-stretch">
    <button
      type="button"
      onClick={onClose}
      className="flex flex-1 items-center justify-center gap-2.5 rounded-md bg-slate-800 px-4 py-2 text-sm leading-normal font-medium text-white hover:bg-slate-900 focus:ring-2 focus:ring-slate-400 focus:outline-none"
    >
      취소
    </button>
    <button
      type="submit"
      onClick={onSubmit}
      disabled={isSubmitDisabled}
      className={`flex flex-1 items-center justify-center gap-2.5 rounded-md px-4 py-2 text-sm leading-normal font-medium ${
        isSubmitDisabled
          ? 'cursor-not-allowed bg-slate-400'
          : 'bg-slate-800 hover:bg-slate-900 focus:ring-2 focus:ring-slate-400'
      } text-white focus:outline-none`}
    >
      완료
    </button>
  </div>
)
