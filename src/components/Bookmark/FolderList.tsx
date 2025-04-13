import { FolderIcon, MoreHorizontal } from 'lucide-react'

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
              className={`cursor-pointer rounded-md ${
                folderId === folder.id ? 'bg-sky-100' : ''
              }`}
            >
              <div className="flex items-center gap-4 p-3">
                <FolderIcon size={18} />
                <span className="flex-1">{folder.name}</span>
                <MoreHorizontal size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
