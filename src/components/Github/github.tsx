'use client'

import { fetchGitHubContents, fetchGitHubFile } from '@/api'
import { useState, useEffect } from 'react'

export default function GitHubExplorer({
  owner,
  repo,
  branch,
}: {
  owner: string
  repo: string
  branch: string
}) {
  const [currentPath, setCurrentPath] = useState('') // 현재 경로
  const [items, setItems] = useState<any[]>([]) // 폴더 & 파일 목록
  const [fileContent, setFileContent] = useState<string | null>(null) // 선택한 파일 내용

  useEffect(() => {
    fetchGitHubContents(owner, repo, currentPath, branch)
      .then((data) => setItems(data))
      .catch((error) => console.error('폴더/파일 로딩 오류:', error))
  }, [currentPath])

  const handleItemClick = (item: any) => {
    if (item.type === 'dir') {
      setCurrentPath(item.path) // 폴더 클릭 -> 내부 탐색
      setFileContent(null) // 파일 내용 초기화
    } else {
      fetchGitHubFile(owner, repo, item.path, branch)
        .then((content) => setFileContent(content))
        .catch((error) => console.error('파일 로딩 오류:', error))
    }
  }

  return (
    <div>
      <h2>📂 GitHub Explorer</h2>

      {/* 상위 폴더로 이동 버튼 */}
      {currentPath && (
        <button
          onClick={() =>
            setCurrentPath(currentPath.split('/').slice(0, -1).join('/'))
          }
        >
          ⬅️ 뒤로가기
        </button>
      )}

      <ul>
        {items.map((item) => (
          <li
            key={item.path}
            onClick={() => handleItemClick(item)}
            style={{ cursor: 'pointer' }}
          >
            {item.type === 'dir' ? '📁' : '📄'} {item.name}
          </li>
        ))}
      </ul>

      {/* 선택한 파일의 코드 뷰어 */}
      {fileContent && (
        <pre style={{ backgroundColor: '#f4f4f4', padding: '1rem' }}>
          {fileContent}
        </pre>
      )}
    </div>
  )
}
