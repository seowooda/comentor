'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TitleSelect, ProjectFormValues } from './TitleSelect'
import { TextareaField } from './TextareaField'
import { StatusRadioGroup } from './StatusRadioGroup'
import { ModalButtons } from './ModalButtons'
import { Form, FormField } from '@/components/ui/form'

/**
 * 프로젝트 폼 유효성 검증을 위한 Zod 스키마
 */
const formSchema = z.object({
  title: z.string().min(1, '프로젝트 제목을 선택해주세요'),
  description: z.string().max(100, '최대 100자까지 입력 가능합니다'),
  role: z.string().max(100, '최대 100자까지 입력 가능합니다'),
  status: z.enum(['in_progress', 'completed']),
})

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
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      role: '',
      status: 'in_progress',
    },
  })

  const handleSubmit = (data: ProjectFormValues) => {
    console.log('폼 제출 데이터:', data)
    onSubmit(data)
    onClose()
  }

  // 프로젝트 제목이 비어있는지 확인
  const isTitleEmpty = !form.watch('title')

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-[462px] rounded-[10px] bg-white px-6 py-8 shadow-md outline outline-1 outline-offset-[-1px] outline-slate-300">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full flex-col gap-7"
          >
            {/* 프로젝트 제목 필드 */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => <TitleSelect field={field} />}
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
              render={({ field }) => <StatusRadioGroup field={field} />}
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
