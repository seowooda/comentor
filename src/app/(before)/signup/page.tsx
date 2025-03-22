'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const items = [
  {
    id: 'front',
    label: '프론트엔드',
  },
  {
    id: 'backend',
    label: '백엔드',
  },
  {
    id: 'algorithm',
    label: '알고리즘',
  },
  {
    id: 'database',
    label: '데이터베이스',
  },
]

const FormSchema = z.object({
  email: z.string().email(),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  type: z.enum(['agree', 'deny']),
})

export default function Signup() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      items: [],
    },
  })
  return (
    <main className="flex items-center justify-center">
      <Form {...form}>
        <form className="flex h-full w-[400px] flex-col items-center gap-6">
          <h1 className="text-4xl font-semibold text-slate-800">회원가입</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>이메일</FormLabel>
                <FormDescription>이메일을 입력해주세요</FormDescription>
                <FormControl>
                  <Input placeholder="example@test.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem className="w-full">
                <div>
                  <FormLabel className="text-base">기술 스택</FormLabel>
                  <FormDescription>
                    선택한 기술을 기반으로 CS 질문을 생성해요
                  </FormDescription>
                </div>
                <div className="flex justify-between px-[10px] py-[14px]">
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex gap-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-slate-800 text-[14px]">
            회원 가입
          </Button>
        </form>
      </Form>
    </main>
  )
}
