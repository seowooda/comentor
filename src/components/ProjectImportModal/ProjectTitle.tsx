'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

// 데모 데이터
const DEMO_REPOS = [
  { id: 1, name: 'commit-mentor', fullName: 'jinu/commit-mentor' },
  { id: 2, name: 'portfolio', fullName: 'jinu/portfolio' },
  { id: 3, name: 'blog', fullName: 'jinu/blog' },
]

export const ProjectTitle = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState<
    (typeof DEMO_REPOS)[0] | null
  >(null)

  return (
    <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
      <div className="justify-start text-[15px] leading-[14px] font-medium text-black">
        프로젝트 제목
      </div>
      <div className="relative">
        <div
          className="inline-flex h-10 max-h-10 min-h-10 w-[180px] max-w-[180px] min-w-[180px] cursor-pointer items-center justify-between rounded-md bg-white px-3 py-2 outline outline-1 outline-offset-[-1px] outline-slate-300 hover:bg-slate-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-start gap-2.5">
            <div className="justify-start text-sm font-normal text-zinc-950">
              {selectedRepo ? selectedRepo.fullName : 'Repository 불러오기'}
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2.5">
            <ChevronDown
              className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-[180px] rounded-md bg-white shadow-lg outline outline-1 outline-slate-300">
            {DEMO_REPOS.map((repo) => (
              <div
                key={repo.id}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-slate-50"
                onClick={() => {
                  setSelectedRepo(repo)
                  setIsOpen(false)
                }}
              >
                {repo.fullName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
