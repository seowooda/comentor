'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TitleSelect, ProjectFormValues, Repository } from './TitleSelect'
import { TextareaField } from './TextareaField'
import { StatusRadioGroup, StatusOption } from './StatusRadioGroup'
import { ModalButtons } from './ModalButtons'
import { Form, FormField } from '@/components/ui/form'
import { ProjectSchema } from '@/hooks'

/**
 * 프로젝트 목록 데이터
 * 차후에 API 연동으로 실제 데이터로 대체될 예정
 */
const repositories: Repository[] = [
  {
    value: 'commit-mentor',
    label: 'jinu/commit-mentor',
  },
  {
    value: 'portfolio',
    label: 'jinu/portfolio',
  },
  {
    value: 'blog',
    label: 'jinu/blog',
  },
]

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
    onSubmit(data)
    form.reset()
    onClose()
  }

  // 프로젝트 제목이 비어있는지 확인
  const isTitleEmpty = !form.watch('title')

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-white"
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
                <TitleSelect field={field} repositories={repositories} />
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
