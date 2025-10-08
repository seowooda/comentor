'use client'

import { useFolderUpdate } from '@/api/services/folder/queries'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { useForm } from 'react-hook-form'
import { Folder } from '@/api'
import { useQueryClient } from '@tanstack/react-query'

interface FolderModalProps {
  folder: Folder
  onClose: () => void
}

interface FormData {
  fileName: string
}

export const EditFolderModal = ({ folder, onClose }: FolderModalProps) => {
  const { mutate } = useFolderUpdate()
  const form = useForm<FormData>()
  const queryClient = useQueryClient()

  const onSubmit = (data: FormData) => {
    mutate(
      {
        folderId: folder.folderId,
        fileName: data.fileName,
      },
      {
        onSuccess: () => {
          onClose()

          queryClient.invalidateQueries({ queryKey: ['folders'] })
        },
        onError: (error) => {
          if (error.message === 'API Error: 400') {
            form.setError('fileName', {
              type: 'manual',
              message: '중복된 폴더 이름입니다.',
            })
          } else {
            console.error('Error updating folder:', error)
          }
        },
      },
    )
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="min-w-[380px] rounded-lg bg-white p-6 shadow-lg"
    >
      <h2 className="mb-4 text-lg font-semibold">폴더 이름 수정</h2>
      <Input
        type="text"
        placeholder="새 폴더 이름"
        {...form.register('fileName')}
        maxLength={10}
        required
      />
      {form.formState.errors.fileName && (
        <p className="mt-1 text-sm text-red-500">
          {form.formState.errors.fileName.message}
        </p>
      )}
      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" onClick={onClose}>
          취소
        </Button>
        <Button type="submit" disabled={!form.watch('fileName')}>
          저장
        </Button>
      </div>
    </form>
  )
}
