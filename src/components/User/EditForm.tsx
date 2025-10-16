'use client'

import React from 'react'
import Image from 'next/image'
import { Github } from 'lucide-react'
import { User, UserResponse, useUserEdit } from '@/api' // 실제 UserResponse 타입 경로
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupSchema } from '@/hooks'
import { z } from 'zod'
import { CheckboxGroup, InputField, RadioGroupField } from '../Form'
import { Button } from '../ui/button'
import { Stack } from '@/api/types/common'
import { Form } from '../ui/form'

interface FormSectionProps {
  title: string
  children: React.ReactNode
}

export const FormSection = ({ title, children }: FormSectionProps) => (
  <div className="flex flex-col justify-center rounded-xl border border-slate-100 p-7 shadow">
    <h3 className="mb-4 text-base font-semibold sm:text-lg lg:text-xl">
      {title}
    </h3>
    {children}
  </div>
)

interface UserProfileHeaderProps {
  user: UserResponse['result']
}

export const UserProfileHeader = ({ user }: UserProfileHeaderProps) => (
  <div className="mb-5 flex items-center gap-5 rounded-xl border border-slate-100 p-7 shadow">
    <Image
      src={user?.avatarUrl || '/images/glassdumpling.png'}
      alt="avatar"
      width={60}
      height={60}
      className="rounded-full"
    />
    <div className="flex flex-1 flex-col">
      <p className="flex items-center gap-2 font-semibold">
        <Github size={18} />
        <span>{user?.userName}</span>
      </p>
      <p className="text-sm text-slate-500">깃허브 계정으로 로그인됨</p>
    </div>
  </div>
)

const techStackOptions = Object.keys(Stack).map((key) => ({
  id: Stack[key as keyof typeof Stack],
  label: key,
}))

const notificationOptions = [
  { value: true, label: '알림 허용' },
  { value: false, label: '알림 거부' },
]

export const UserEditForm = ({ user }: { user: UserResponse['result'] }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useUserEdit()

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: user.email,
      stackNames: user.stackNames,
      notification: user.notification,
    },
  })

  const onSubmit = (data: z.infer<typeof SignupSchema>) => {
    const updatedUser: User = {
      ...data,
    }
    mutate(updatedUser, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] })
        router.push('/dashboard')
      },
      onError: (error) => {
        console.error('회원정보 수정 실패:', error)
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-grow flex-col justify-between"
      >
        <div className="flex flex-col gap-5">
          <FormSection title="이메일">
            <InputField
              control={form.control}
              name="email"
              placeholder="example@test.com"
            />
            <RadioGroupField
              control={form.control}
              name="notification"
              options={notificationOptions}
            />
          </FormSection>
          <FormSection title="기술 스택">
            <CheckboxGroup
              control={form.control}
              name="stackNames"
              options={techStackOptions}
            />
          </FormSection>
        </div>

        <div className="mt-5 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="px-9 py-5"
            onClick={() => router.push('/dashboard')}
          >
            취소
          </Button>
          <Button type="submit" className="px-9 py-5" disabled={isPending}>
            {isPending ? '저장 중...' : '수정'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
