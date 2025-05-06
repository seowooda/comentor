'use client'

import { FolderItem } from './FolderItem'
import { Folder } from '@/api'
import { useCallback } from 'react'

interface FolderListProps {
  folderId: number | null
  setFolderId: (id: number) => void
  folders: Folder[]
  isLoading: boolean
}

export const FolderList = ({
  folderId,
  setFolderId,
  folders,
  isLoading,
}: FolderListProps) => {
  const handleSelect = useCallback(
    (id: number) => setFolderId(id),
    [setFolderId],
  )

  return (
    <section className="flex min-w-64 flex-col gap-3 text-slate-800">
      <h2 className="text-xl font-semibold">폴더 관리</h2>
      <div className="flex flex-col gap-5">
        <h3 className="pb-3 text-[18px] leading-5 font-medium">폴더 목록</h3>
        <div className="flex flex-col gap-2">
          {folders.map((folder) => (
            <FolderItem
              key={folder.folderId}
              folder={folder}
              isSelected={folderId === folder.folderId}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
