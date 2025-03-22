'use client'

import { useState, useCallback } from 'react'
import { ProjectTitle } from './ProjectTitle'
import { ProjectContent } from './ProjectContent'
import { ProjectRole } from './ProjectRole'
import { ProjectStatus } from './ProjectStatus'
import { ModalButtons } from './ModalButtons'

interface ProjectData {
  title: string
  description: string
  role: string
  status: 'in_progress' | 'completed'
}

interface ProjectImportModalProps {
  onClose: () => void
  onSubmit: (data: ProjectData) => void
}

const initialProjectData: ProjectData = {
  title: '',
  description: '',
  role: '',
  status: 'in_progress',
}

export const ProjectImportModal = ({
  onClose,
  onSubmit,
}: ProjectImportModalProps) => {
  const [projectData, setProjectData] =
    useState<ProjectData>(initialProjectData)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!projectData.title.trim()) {
        // 제목이 비어있으면 제출하지 않음
        return
      }
      onSubmit(projectData)
      onClose()
    },
    [projectData, onSubmit, onClose],
  )

  const handleClose = useCallback(() => {
    setProjectData(initialProjectData)
    onClose()
  }, [onClose])

  // 제목이 비어있는지 확인
  const isTitleEmpty = !projectData.title.trim()

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="inline-flex w-[462px] flex-col items-start justify-start gap-5 overflow-hidden rounded-[10px] bg-white px-[23px] py-[33px] shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] shadow-md outline outline-1 outline-offset-[-1px] outline-slate-300">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-start gap-[27px] self-stretch"
        >
          <ProjectTitle
            onSelect={(title) => setProjectData({ ...projectData, title })}
          />
          <ProjectContent
            value={projectData.description}
            onChange={(value) =>
              setProjectData({ ...projectData, description: value })
            }
          />
          <ProjectRole
            value={projectData.role}
            onChange={(value) =>
              setProjectData({ ...projectData, role: value })
            }
          />
          <ProjectStatus
            value={projectData.status}
            onChange={(value) =>
              setProjectData({ ...projectData, status: value })
            }
          />
          <ModalButtons
            onClose={handleClose}
            onSubmit={handleSubmit}
            isSubmitDisabled={isTitleEmpty}
          />
        </form>
      </div>
    </div>
  )
}
