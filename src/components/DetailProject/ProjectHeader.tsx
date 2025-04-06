import React from 'react'
import { Edit3, Trash2 } from 'lucide-react'

export interface IProject {
  id: string
  title: string
  description: string
  role: string
  techStack: string[]
  status: string
  updatedAt: string
}

interface ProjectHeaderProps {
  project: IProject
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="flex w-full flex-col gap-5 rounded-lg border border-slate-300 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
        <div className="flex gap-2">
          <button className="rounded-full p-1.5 text-slate-700 hover:bg-slate-100">
            <Edit3 size={18} />
          </button>
          <button className="rounded-full p-1.5 text-red-500 hover:bg-red-50">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-600">
        최근 업데이트: {project.updatedAt}
      </div>

      <div className="flex gap-5">
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-xs text-slate-500">프로젝트 설명</span>
          <p className="text-sm text-slate-700">{project.description}</p>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <span className="text-xs text-slate-500">맡은 역할</span>
          <p className="text-sm text-slate-700">{project.role}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500">기술 스택</span>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500">상태:</span>
        <div className="flex items-center gap-1.5">
          <div
            className={`h-2 w-2 rounded-full ${
              project.status === 'Progress' ? 'bg-yellow-400' : 'bg-green-500'
            }`}
          ></div>
          <span className="text-xs font-medium">{project.status}</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectHeader
