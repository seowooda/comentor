'use client'

import { Button } from '../../ui/button'
import { Input } from '../../ui/input'

interface FolderModalProps {
  folderId: number | null
  onClose: () => void
}

export const EditFolderModal = ({ folderId, onClose }: FolderModalProps) => {
  const handleSave = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative min-w-[380px] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">폴더 이름 수정</h2>
        <Input type="text" placeholder="새 폴더 이름" />
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose}>취소</Button>
          <Button onClick={handleSave}>저장</Button>
        </div>
      </div>
    </div>
  )
}
