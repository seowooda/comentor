'use client'

import { folderInfo } from '@/api/services/folder/queries'
import { QuestionList, FolderList } from '@/components/Bookmark'
import { useDelayedLoading } from '@/hooks/useDelayedLoading'
import { useCallback, useEffect, useState } from 'react'

export default function Page() {
  const [folderId, setFolderId] = useState<number | null>(null)
  const { data: folder, isLoading } = folderInfo()

  const showLoading = useDelayedLoading(isLoading, 1000)

  //첫번째 폴더 선택
  useEffect(() => {
    if (!folderId && folder?.result?.length) {
      setFolderId(folder.result[0].folderId)
    }
  }, [folder, folderId])

  const selectedFolder = folder?.result.find((f) => f.folderId === folderId)
  const fileName = selectedFolder?.fileName || 'default'

  const handleSetFolderId = useCallback((id: number) => {
    setFolderId(id)
  }, [])

  return (
    <main className="flex w-full flex-grow justify-center px-[60px] pt-10">
      <div className="flex w-full max-w-screen-xl gap-8">
        <FolderList
          folderId={folderId}
          setFolderId={handleSetFolderId}
          folders={folder?.result || []}
          isLoading={showLoading}
        />
        <div className="flex-1">
          <QuestionList folderId={folderId || 1} fileName={fileName} />
        </div>
      </div>
    </main>
  )
}
