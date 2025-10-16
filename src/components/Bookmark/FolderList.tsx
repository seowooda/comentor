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
    <section className="w-full flex-col gap-3 text-slate-800 lg:w-64 lg:flex-shrink-0">
      <h2 className="text-lg font-semibold md:text-xl">폴더 관리</h2>
      <div className="mt-5 flex flex-col gap-5">
        <h3 className="border-b pb-3 text-base font-medium md:text-lg">
          폴더 목록
        </h3>
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
