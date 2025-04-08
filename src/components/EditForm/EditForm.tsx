'use client'

import { Github, LogOut } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { CheckboxGroup, InputField, RadioGroupField } from '../Form'
import { SignupSchema } from '@/hooks'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { stackNames, User } from '@/api'
import { useGetQuery, usePutMutation } from '@/api/lib/fetcher'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { UserResponse } from '@/api/services/user/model'
import { useAuthStore } from '@/store/authStore'
import { useQueryClient } from '@tanstack/react-query'

const notificationOptions = [
  { value: 'agree', label: '알림 허용' },
  { value: 'deny', label: '알림 거부' },
]

const techStackOptions = Object.keys(stackNames).map((key) => ({
  id: stackNames[key as keyof typeof stackNames],
  label: key,
}))

export const EditForm = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { clearAuth } = useAuthStore()

  const { data: user } = useGetQuery<UserResponse>(['user'], '/user/info')

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      stackNames: [],
      notification: 'agree',
    },
  })

  useEffect(() => {
    if (user) {
      form.setValue('email', user.result.email)
      form.setValue('stackNames', user.result.stackNames)
      form.setValue('notification', user.result.notification ? 'agree' : 'deny')
    }
  }, [user])

  const { mutate, isPending } = usePutMutation<{ message: string }, User>(
    '/user/info',
    {
      onSuccess: () => {
        router.push('/dashboard')

        queryClient.invalidateQueries({ queryKey: ['user'] })
      },
    },
  )

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    if (!user) return

    const updatedUser: User = {
      ...data,
      notification: data.notification === 'agree',
    }

    mutate(updatedUser)
  }

  const handleLogout = () => {
    clearAuth()
    router.push('/')
  }

  return (
    <section className="flex w-[550px] min-w-[450px] flex-col gap-10">
      <div className="flex flex-col gap-5 rounded-[15px] border border-slate-400 px-[30px] py-5 shadow">
        <h1 className="text-[25px] font-semibold text-slate-800">
          깃허브 계정
        </h1>
        <div className="flex items-center gap-5">
          <Image
            src={user?.result.avatarUrl || '/images/glassdumpling.png'}
            alt="avatar"
            width={60}
            height={60}
            className="rounded-full border border-slate-100"
          />
          <div className="flex flex-1 flex-col">
            <p className="flex items-center gap-2">
              <Github size={18} />
              <span>{user?.result.userName}</span>
            </p>
            <p className="text-[14px] text-slate-500">
              깃허브 계정으로 로그인됨
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="cursor-pointer"
          >
            <LogOut size={14} />
            <span className="text-[13px]">로그아웃</span>
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-5 rounded-[15px] border border-slate-400 px-[30px] py-5 shadow">
            <InputField
              control={form.control}
              name="email"
              label="이메일"
              placeholder="example@test.com"
              description="이메일을 입력해주세요"
            />
            <RadioGroupField
              control={form.control}
              name="notification"
              label="이메일 수신 설정"
              description="매일 새로운 CS 질문이 생성되면 알림을 받습니다."
              options={notificationOptions}
            />
          </div>

          <div className="flex flex-col gap-5 rounded-[15px] border border-slate-400 px-[30px] py-5 shadow">
            <CheckboxGroup
              control={form.control}
              name="stackNames"
              label="기술 스택"
              description="받고 싶은 기술 스택을 선택하세요."
              options={techStackOptions}
            />
          </div>

          <div className="flex gap-[10px]">
            <Button
              className="flex-1 bg-slate-800"
              onClick={() => router.push('/dashboard')}
            >
              취소
            </Button>
            <Button className="flex-1 bg-slate-800" type="submit">
              {isPending ? '저장 중..' : '수정'}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
