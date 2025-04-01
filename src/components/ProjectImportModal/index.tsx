'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TitleSelect, ProjectFormValues, Repository } from './TitleSelect'
import { TextareaField } from './TextareaField'
import { StatusRadioGroup, StatusOption } from './StatusRadioGroup'
import { ModalButtons } from './ModalButtons'
import { Form, FormField } from '@/components/ui/form'
import { ProjectSchema } from '@/hooks'
import { useGithubRepos, GithubRepo } from '@/api/services/github'
import { useEffect, useState } from 'react'

/**
 * 진행 상태 옵션 정의
 */
const statusOptions: StatusOption[] = [
  { id: 'in_progress', value: 'in_progress', label: '개발 중' },
  { id: 'completed', value: 'completed', label: '완료' },
]

interface ProjectImportModalProps {
  onClose: () => void
  onSubmit: (data: ProjectFormValues) => void
}

/**
 * 프로젝트 정보 입력을 위한 모달 컴포넌트
 */
export const ProjectImportModal = ({
  onClose,
  onSubmit,
}: ProjectImportModalProps) => {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const { data: reposData, isLoading } = useGithubRepos()

  // GitHub 저장소 데이터 로드 시 저장소 목록 업데이트
  useEffect(() => {
    if (reposData?.result) {
      const mappedRepos = reposData.result.map((repo: GithubRepo) => ({
        value: `${repo.id}-${repo.name}`,
        label: repo.name,
      }))
      setRepositories(mappedRepos)
    }
  }, [reposData])

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: '',
      description: '',
      role: '',
      status: 'in_progress',
    },
  })

  const handleSubmit = (data: ProjectFormValues) => {
    // 선택된 레포지토리의 ID 추출
    const selectedRepo = repositories.find((repo) => repo.label === data.title)
    let repoId = null // 기본값은 null로 설정

    if (selectedRepo && selectedRepo.value) {
      // value 형식이 'id-name'이므로 ID 부분만 추출
      const idStr = selectedRepo.value.split('-')[0]
      repoId = parseInt(idStr)
    }

    // 상태값 변환: 'in_progress' -> 'PROGRESS', 'completed' -> 'DONE'
    const statusMap = {
      in_progress: 'PROGRESS',
      completed: 'DONE',
    }

    // 서버에 전송할 데이터 구조로 변환
    const serverData = {
      id: repoId, // repo.id를 그대로 사용
      description: data.description,
      role: data.role,
      status: statusMap[data.status as keyof typeof statusMap],
    }

    onSubmit(serverData as any)
    form.reset()
    onClose()
  }

  // 프로젝트 제목이 비어있는지 확인
  const isTitleEmpty = !form.watch('title')

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-[462px] rounded-[10px] bg-white px-6 py-8 shadow-md outline-1 outline-offset-[-1px] outline-slate-300">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full flex-col gap-7"
          >
            {/* 프로젝트 제목 필드 */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <TitleSelect
                  field={field}
                  repositories={repositories}
                  isLoading={isLoading}
                />
              )}
            />

            {/* 프로젝트 내용 필드 */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <TextareaField
                  field={field}
                  label="프로젝트 내용"
                  placeholder="프로젝트 내용을 입력하세요"
                />
              )}
            />

            {/* 맡은 역할 필드 */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <TextareaField
                  field={field}
                  label="맡은 역할"
                  placeholder="맡은 역할을 입력하세요"
                />
              )}
            />

            {/* 진행 여부 필드 */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <StatusRadioGroup field={field} options={statusOptions} />
              )}
            />

            {/* 취소/완료 버튼 */}
            <ModalButtons
              onClose={() => {
                form.reset()
                onClose()
              }}
              isTitleEmpty={isTitleEmpty}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}
