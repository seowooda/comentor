'use client'

import { useModalStore } from '@/store/modalStore'
import { FolderItem } from './FolderItem'

interface FolderListProps {
  folderId: number | null
  setFolderId: (id: number) => void
  folders: { id: number; folder_name: string }[]
  isLoading: boolean
}

export const FolderList = ({
  folderId,
  setFolderId,
  folders,
  isLoading,
}: FolderListProps) => {
  const { openModal } = useModalStore()

  return (
    <section className="flex min-w-64 flex-col gap-9 text-slate-800">
      <h2 className="text-xl font-semibold">폴더 관리</h2>
      <div className="flex flex-col gap-5">
        <h3 className="text-[18px] leading-5 font-medium">폴더 목록</h3>
        <div className="flex flex-col gap-2">
          {isLoading
            ? Array.from({ length: folders.length || 0 }).map((_, i) => (
                <div
                  key={i}
                  className="flex animate-pulse items-center gap-4 rounded-md bg-slate-100 p-3"
                >
                  <div className="h-4 w-4 rounded-full bg-slate-300" />
                  <div className="h-4 flex-1 rounded bg-slate-200" />
                </div>
              ))
            : folders.map((folder) => (
                <FolderItem
                  key={folder.id}
                  folder={folder}
                  isSelected={folderId === folder.id}
                  onSelect={setFolderId}
                  openModal={openModal}
                />
              ))}
        </div>
      </div>
    </section>
  )
}
