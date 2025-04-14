'use client'

import { folderInfo } from '@/api/services/folder/quries'
import { QuestionList } from '@/components/Bookmark'
import { FolderList } from '@/components/Bookmark/FolderList'
import { useState } from 'react'

export default function Page() {
  const [folderId, setFolderId] = useState<number | null>(1)

  const { data: folder } = folderInfo()

  return (
    <main className="flex w-full flex-grow justify-center px-[60px] pt-10">
      <div className="flex w-full max-w-screen-xl gap-8">
        <FolderList
          folderId={folderId}
          setFolderId={setFolderId}
          folders={folder?.result || []}
        />
        <div className="flex-1">
          <QuestionList folderId={folderId} folders={folder?.result || []} />
        </div>
      </div>
    </main>
  )
}
