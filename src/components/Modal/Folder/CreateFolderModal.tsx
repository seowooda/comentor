'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { PlusIcon, XIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'
import { Folder, folderBookmark, folderInfo } from '@/api'

interface FolderModalProps {
  csQuestionId: number
  onBookmarkDone?: () => void
  onClose: () => void
}

export const CreateFolderModal = ({
  csQuestionId,
  onBookmarkDone,
  onClose,
}: FolderModalProps) => {
  const { data } = folderInfo()
  const { mutate: bookmark } = folderBookmark()
  const queryClient = useQueryClient()

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<{
    selected: number | null
    newFolder: string
    creating: boolean
  }>({
    defaultValues: {
      selected: null,
      newFolder: '',
      creating: false,
    },
  })

  const selected = watch('selected')
  const creating = watch('creating')

  const handleSelect = (folderId: number, fileName: string) => {
    setValue('selected', folderId)
    bookmark(
      { csQuestionId, fileName },
      {
        onSuccess: () => {
          onBookmarkDone?.()
        },
      },
    )
  }

  const onNewFolder = (formData: { newFolder: string }) => {
    if (!formData.newFolder.trim()) return
    bookmark(
      {
        fileName: formData.newFolder,
        csQuestionId,
      },
      {
        onSuccess: () => {
          setValue('creating', false)
          setValue('newFolder', '')
          queryClient.invalidateQueries({ queryKey: ['folders'] })
          onBookmarkDone?.()
        },
      },
    )
  }

  const folders: Folder[] = data?.result || []

  return (
    <form
      className="flex min-w-48 flex-col gap-5 rounded-[10px] border border-slate-300 bg-white p-5 shadow-md"
      onSubmit={handleSubmit(onNewFolder)}
    >
      <div className="flex justify-between">
        <p className="text-[16px] font-medium">질문 저장</p>
        <button type="button" className="cursor-pointer p-1" onClick={onClose}>
          <XIcon size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {folders.map((folder) => (
          <label
            key={folder.folderId}
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="checkbox"
              checked={selected === folder.folderId}
              onChange={() => handleSelect(folder.folderId, folder.fileName)}
            />
            <p className="font-medium">{folder.fileName}</p>
          </label>
        ))}

        {creating ? (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked
              readOnly
              className="cursor-default"
            />
            <Input
              {...register('newFolder')}
              placeholder="폴더 이름"
              className="w-36"
            />
            <Button
              type="submit"
              variant="outline"
              disabled={!watch('newFolder') || isSubmitting}
            >
              저장
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="secondary"
            className="flex gap-2 rounded-3xl"
            onClick={() => setValue('creating', true)}
          >
            <PlusIcon size={13} />
            <p className="font-medium">새 폴더</p>
          </Button>
        )}
      </div>
    </form>
  )
}
