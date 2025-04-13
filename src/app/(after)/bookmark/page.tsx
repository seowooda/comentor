'use client'

import { QuestionList } from '@/components/Bookmark'
import { FolderList } from '@/components/Bookmark/FolderList'
import { useState } from 'react'

export default function Page() {
  const [folderId, setFolderId] = useState<number | null>(1)

  const folderList = [
    { id: 1, name: '중요질문' },
    { id: 2, name: '폴더2' },
    { id: 3, name: '서우다' },
    { id: 4, name: '폴더4' },
  ]

  return (
    <main className="flex w-full flex-grow justify-center px-[60px] pt-10">
      <div className="flex w-full max-w-screen-xl gap-8">
        <FolderList
          folderId={folderId}
          setFolderId={setFolderId}
          folders={folderList}
        />
        <div className="flex-1">
          <QuestionList folderId={folderId} folders={folderList} />
        </div>
      </div>
    </main>
  )
}
