'use client'

import { folderUpdate } from '@/api/services/folder/quries'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { useForm } from 'react-hook-form'

interface FolderModalProps {
  folderId: number | null
  onClose: () => void
}

interface FormData {
  folder_name: string
}

export const EditFolderModal = ({ folderId, onClose }: FolderModalProps) => {
  const { mutate } = folderUpdate(folderId as number)
  const form = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        onClose()
      },
      onError: (error) => {
        console.error('Error updating folder:', error)
      },
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative min-w-[380px] rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-lg font-semibold">폴더 이름 수정</h2>
        <Input
          type="text"
          name="folder_name"
          placeholder="새 폴더 이름"
          required
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button type="button" onClick={onClose}>
            취소
          </Button>
          <Button type="submit">저장</Button>
        </div>
      </form>
    </div>
  )
}
