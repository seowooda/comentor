'use client'

import { useState } from 'react'
import { useModalStore } from '@/store/modalStore'
import { Bookmark, BookmarkIcon } from 'lucide-react'
import { folderBookmarkCancel } from '@/api'

export default function Test() {
  const { openModal } = useModalStore()
  const [bookmarked, setBookmarked] = useState(false)
  const { mutate: cancelBookmark } = folderBookmarkCancel()

  const handleClick = () => {
    if (bookmarked) {
      cancelBookmark({ fileName: 'default', csQuestionId: 1 })
      setBookmarked(false)
    } else {
      openModal('createFolder', {
        csQuestionId: 1,
        onBookmarkDone: () => setBookmarked(true), // ✅ 성공 시 상태 반영
      })
    }
  }

  return (
    <div>
      {bookmarked ? (
        <BookmarkIcon
          size={24}
          className="cursor-pointer fill-yellow-500 text-yellow-500"
          onClick={handleClick}
        />
      ) : (
        <Bookmark
          size={24}
          className="cursor-pointer text-gray-500"
          onClick={handleClick}
        />
      )}
    </div>
  )
}
