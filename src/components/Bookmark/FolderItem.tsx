import { ModalType } from '@/types/modal'
import { FolderIcon, Pencil, Trash } from 'lucide-react'
import React from 'react'

interface FolderItemProps {
  folder: { id: number; folder_name: string }
  isSelected: boolean
  onSelect: (id: number) => void
  openModal: (type: ModalType, props: { folderId: number }) => void
}

export const FolderItem = React.memo(
  ({ folder, isSelected, onSelect, openModal }: FolderItemProps) => {
    const handleEdit = (e: React.MouseEvent) => {
      e.stopPropagation()
      openModal('editFolder', { folderId: folder.id })
    }

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation()
      openModal('deleteFolder', { folderId: folder.id })
    }

    return (
      <div
        onClick={() => onSelect(folder.id)}
        className={`group cursor-pointer rounded-md transition-colors hover:bg-sky-50 ${
          isSelected ? 'bg-sky-100' : ''
        }`}
      >
        <div className="flex items-center gap-4 p-3">
          <FolderIcon size={18} />
          <span className="flex-1">{folder.folder_name}</span>

          <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={handleEdit}
              className="cursor-pointer p-1 hover:text-sky-600"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="cursor-pointer p-1 hover:text-red-600"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  },
)

FolderItem.displayName = 'FolderItem'
