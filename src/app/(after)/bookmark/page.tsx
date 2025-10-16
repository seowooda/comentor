'use client'

import { useFolderInfo } from '@/api'
import { QuestionList, FolderList } from '@/components/Bookmark'
import { useDelayedLoading } from '@/hooks/useDelayedLoading'
import { useCallback, useEffect, useState } from 'react'

const Page = () => {
  const [folderId, setFolderId] = useState<number | null>(null)
  const { data: folder, isLoading } = useFolderInfo()

  const showLoading = useDelayedLoading(isLoading, 1000)

  //첫번째 폴더 선택
  useEffect(() => {
    if (!folderId && folder?.result?.length) {
      setFolderId(folder.result[0].folderId)
    }
  }, [folder, folderId])

  useEffect(() => {
    // 폴더 데이터가 있고, 현재 폴더 ID가 선택된 상태일 때만 실행
    if (folder?.result && folderId) {
      // 현재 선택된 폴더 ID가 새로운 폴더 목록에 여전히 존재하는지 확인
      const isSelectedFolderStillPresent = folder.result.some(
        (f) => f.folderId === folderId,
      )

      // 만약 선택된 폴더가 더 이상 존재하지 않는다면 (삭제되었다면)
      if (!isSelectedFolderStillPresent) {
        // 남은 폴더가 있는지 확인
        if (folder.result.length > 0) {
          // 남은 폴더 중 가장 첫 번째 폴더를 자동으로 선택
          setFolderId(folder.result[0].folderId)
        } else {
          // 남은 폴더가 없다면 선택 해제
          setFolderId(null)
        }
      }
    }
  }, [folder, folderId]) // folder 목록이 바뀔 때마다 이 효과를 실행

  const selectedFolder = folder?.result.find((f) => f.folderId === folderId)
  const fileName = selectedFolder?.fileName || 'default'

  const handleSetFolderId = useCallback((id: number) => {
    setFolderId(id)
  }, [])

  return (
    <main className="flex w-full flex-grow justify-center px-4 pt-6 sm:px-6 md:px-10 lg:pt-10">
      <div className="flex w-full max-w-screen-xl flex-col gap-8 lg:flex-row">
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

export default Page
