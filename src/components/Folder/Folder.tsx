import { FolderIcon, MoreHorizontal } from 'lucide-react'

export const Folder = () => {
  const folderList = [
    { id: 1, name: '폴더1' },
    { id: 2, name: '폴더2' },
    { id: 3, name: '폴더3' },
    { id: 4, name: '폴더4' },
  ]
  return (
    <section className="flex w-80 flex-col gap-9 py-5">
      <h2 className="text-[25px] font-semibold">폴더 관리</h2>
      <div className="flex flex-col gap-5">
        <h3 className="text-[18px] font-semibold">폴더 목록</h3>
        {folderList.map((folder) => (
          <div className="flex items-center gap-4 px-4" key={folder.id}>
            <FolderIcon size={15} />
            <span className="flex-1">{folder.name}</span>
            <MoreHorizontal size={16} className="cursor-pointer" />
          </div>
        ))}
      </div>
    </section>
  )
}
