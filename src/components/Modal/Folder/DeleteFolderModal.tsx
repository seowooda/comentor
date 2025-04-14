'use client'

import { folderDelete } from '@/api/services/folder/quries'
import { Button } from '../../ui/button'

interface FolderModalProps {
  folderId: number | null
  onClose: () => void
}

export const DeleteFolderModal = ({ folderId, onClose }: FolderModalProps) => {
  const { mutate } = folderDelete(folderId as number)

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        onClose()
      },
      onError: (error) => {
        console.error('Error deleting folder:', error)
      },
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative min-w-[380px] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">정말 삭제하시겠어요?</h2>
        <p className="text-sm text-slate-500">
          삭제된 폴더는 복구할 수 없습니다.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose}>취소</Button>
          <Button variant="destructive" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  )
}
