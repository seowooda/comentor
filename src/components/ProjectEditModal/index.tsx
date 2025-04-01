'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextareaField } from '../ProjectImportModal/TextareaField'
import {
  StatusRadioGroup,
  StatusOption,
} from '../ProjectImportModal/StatusRadioGroup'
import { ModalButtons } from '../ProjectImportModal/ModalButtons'
import { Form, FormField } from '@/components/ui/form'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { useProjectUpdate, ProjectUpdateRequest } from '@/api/services/project'
import { useToast } from '@/components/ui/use-toast'
import { ProjectFormValues } from '../ProjectImportModal/TitleSelect'

// 프로젝트 수정 폼 스키마
const ProjectEditSchema = z.object({
  title: z.string(), // title은 빈 문자열이지만 존재해야 함
  description: z.string().min(1, '프로젝트 내용을 입력해주세요'),
  role: z.string().min(1, '맡은 역할을 입력해주세요'),
  status: z.enum(['in_progress', 'completed']),
})

// 프로젝트 수정 폼 값 타입
export type ProjectEditFormValues = z.infer<typeof ProjectEditSchema>

/**
 * 진행 상태 옵션 정의
 */
const statusOptions: StatusOption[] = [
  { id: 'in_progress', value: 'in_progress', label: '개발 중' },
  { id: 'completed', value: 'completed', label: '완료' },
]

interface ProjectEditModalProps {
  projectId: number
  initialData: {
    description: string
    role: string
    status: 'PROGRESS' | 'DONE'
  }
  onClose: () => void
  onSubmit: () => void
}

/**
 * 프로젝트 정보 수정을 위한 모달 컴포넌트
 */
export const ProjectEditModal = ({
  projectId,
  initialData,
  onClose,
  onSubmit,
}: ProjectEditModalProps) => {
  const { mutate: updateProject, isPending } = useProjectUpdate(projectId)
  const { toast } = useToast()

  // 초기 상태값 변환: 'PROGRESS' -> 'in_progress', 'DONE' -> 'completed'
  const initialStatus =
    initialData.status === 'PROGRESS' ? 'in_progress' : 'completed'

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectEditSchema) as any, // 타입 호환성을 위해 any 사용
    defaultValues: {
      title: '', // 수정 모달에서는 사용하지 않지만 타입 호환성을 위해 필요
      description: initialData.description,
      role: initialData.role,
      status: initialStatus,
    },
  })

  const handleSubmit = (data: ProjectFormValues) => {
    // 상태값 변환: 'in_progress' -> 'PROGRESS', 'completed' -> 'DONE'
    const statusMap = {
      in_progress: 'PROGRESS',
      completed: 'DONE',
    }

    // 서버에 전송할 데이터 구조로 변환
    const serverData: ProjectUpdateRequest = {
      description: data.description,
      role: data.role,
      status: statusMap[data.status as keyof typeof statusMap] as
        | 'PROGRESS'
        | 'DONE',
    }

    // API 직접 호출
    updateProject(serverData, {
      onSuccess: () => {
        toast({
          title: '프로젝트 수정 성공',
          description: '프로젝트가 성공적으로 수정되었습니다.',
        })
        setTimeout(() => {
          form.reset()
          onClose()
          onSubmit()
        }, 2000) // 2초 후에 모달을 닫고 대시보드를 갱신
      },
      onError: (error) => {
        toast({
          title: '프로젝트 수정 실패',
          description: error.message || '프로젝트 수정 중 오류가 발생했습니다.',
          variant: 'destructive',
        })
      },
    })
  }

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
            {/* 프로젝트 내용 필드 */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <TextareaField
                  field={field as any}
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
                  field={field as any}
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
                <StatusRadioGroup
                  field={field as any}
                  options={statusOptions}
                />
              )}
            />

            {/* 취소/완료 버튼 */}
            <ModalButtons
              onClose={() => {
                form.reset()
                onClose()
              }}
              isTitleEmpty={false}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}
