'use client'

import { useModalStore } from '@/store/modalStore'
import { FolderIcon, Pencil, Trash } from 'lucide-react'

interface FolderListProps {
  folderId: number | null
  setFolderId: (id: number) => void
  folders: { id: number; name: string }[]
}

export const FolderList = ({
  folderId,
  setFolderId,
  folders,
}: FolderListProps) => {
  const { openModal } = useModalStore()

  return (
    <section className="flex min-w-64 flex-col gap-9 text-slate-800">
      <h2 className="text-xl font-semibold">폴더 관리</h2>
      <div className="flex flex-col gap-5">
        <h3 className="text-[18px] leading-5 font-medium">폴더 목록</h3>
        <div>
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => setFolderId(folder.id)}
              className={`group cursor-pointer rounded-md transition-colors ${
                folderId === folder.id ? 'bg-sky-100' : ''
              }`}
            >
              <div className="flex items-center gap-4 p-3">
                <FolderIcon size={18} />
                <span className="flex-1">{folder.name}</span>

                {/* ✏️ 연필, 🗑️ 휴지통 - hover 시만 보임 */}
                <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() =>
                      openModal('editFolder', { folderId: folder.id })
                    }
                    className="cursor-pointer p-1 hover:text-sky-600"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() =>
                      openModal('deleteFolder', { folderId: folder.id })
                    }
                    className="cursor-pointer p-1 hover:text-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
