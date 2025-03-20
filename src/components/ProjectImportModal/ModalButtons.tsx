interface ModalButtonsProps {
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
}

export const ModalButtons = ({ onClose, onSubmit }: ModalButtonsProps) => (
  <div className="inline-flex items-center justify-center gap-2.5 self-stretch">
    <button
      type="button"
      onClick={onClose}
      className="flex flex-1 items-center justify-center gap-2.5 rounded-md bg-slate-800 px-4 py-2 text-sm leading-normal font-medium text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:outline-none"
    >
      취소
    </button>
    <button
      type="submit"
      onClick={onSubmit}
      className="flex flex-1 items-center justify-center gap-2.5 rounded-md bg-slate-800 px-4 py-2 text-sm leading-normal font-medium text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:outline-none"
    >
      완료
    </button>
  </div>
)
