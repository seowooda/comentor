'use client'

import { folderInfo, folderQuestions } from '@/api/services/folder/quries'
import { QuestionList } from '@/components/Bookmark'
import { FolderList } from '@/components/Bookmark/FolderList'
import { useDelayedLoading } from '@/hooks/useDelayedLoading'
import { useState } from 'react'

export default function Page() {
  const [folderId, setFolderId] = useState<number | null>(1)
  const { data: folder, isLoading } = folderInfo()
  const { data: question } = folderQuestions(folderId || 1)

  const showLoading = useDelayedLoading(isLoading, 1000)

  // folderId에 해당하는 fileName 찾아서 넘겨주기
  const selectedFolder = folder?.result.find((f) => f.folderId === folderId)
  const fileName = selectedFolder?.fileName || 'default' 

  return (
    <main className="flex w-full flex-grow justify-center px-[60px] pt-10">
      <div className="flex w-full max-w-screen-xl gap-8">
        <FolderList
          folderId={folderId}
          setFolderId={setFolderId}
          folders={folder?.result || []}
          isLoading={showLoading}
        />
        <div className="flex-1">
          <QuestionList
            fileName={fileName}
            questions={question?.result || []}
          />
        </div>
      </div>
    </main>
  )
}
