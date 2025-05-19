'use client'

import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  InputField,
  CheckboxGroup,
  RadioGroupField,
} from '@/components/Form/index'
import { SignupSchema } from '@/hooks'
import { User, useUserJoin } from '@/api'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Stack } from '@/api/types/common'

const notificationOptions = [
  { value: true, label: '알림 허용' },
  { value: false, label: '알림 거부' },
]

export default function SignupForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      stackNames: [],
      notification: true,
    },
  })

  // enum 값을 배열로 변환
  const techStackOptions = Object.keys(Stack).map((key) => ({
    id: Stack[key as keyof typeof Stack],
    label: key,
  }))

  const { mutate, isPending } = useUserJoin()

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    const signupUser: User = {
      ...data,
      notification: data.notification,
    }

    mutate(signupUser, {
      onSuccess: () => {
        router.push('/dashboard')
      },
      onError: (error) => {
        console.error('회원가입 실패:', error)
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex w-[400px] flex-col items-center gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl leading-[20px] font-semibold tracking-[1.08px] text-slate-800">
          회원가입
        </h1>

        <InputField
          control={form.control}
          name="email"
          label="이메일"
          placeholder="example@test.com"
          description="이메일을 입력해주세요"
        />

        <CheckboxGroup
          control={form.control}
          name="stackNames"
          label="기술 스택"
          description="선택한 기술을 기반으로 CS 질문을 생성해요"
          options={techStackOptions}
        />

        <RadioGroupField
          control={form.control}
          name="notification"
          label="알림 설정"
          description="알림을 받을지 거부할지 선택해주세요"
          options={notificationOptions}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer bg-slate-800 text-[14px] leading-6"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {isPending ? <Loader2 className="animate-spin" /> : '회원 가입'}
        </Button>
      </form>
    </Form>
  )
}
