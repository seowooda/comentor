import { ControllerRenderProps } from 'react-hook-form'
import { ProjectFormValues } from './TitleSelect'
import {
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useId } from 'react'
import { cn } from '@/lib/utils'

interface TextareaFieldProps {
  field: ControllerRenderProps<ProjectFormValues, 'description' | 'role'>
  label: string
  placeholder: string
}

/**
 * 텍스트 영역 입력 컴포넌트
 * 프로젝트 내용 및 맡은 역할 입력에 사용
 */
export const TextareaField = ({
  field,
  label,
  placeholder,
}: TextareaFieldProps) => {
  const inputId = useId()
  const MAX_LENGTH = 100
  const { error } = useFormField()

  /**
   * 입력 값이 최대 길이를 초과하지 않도록 처리
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(e.target.value.slice(0, MAX_LENGTH))
  }

  return (
    <FormItem className="flex flex-col gap-2.5 self-stretch">
      <div className="flex items-center justify-between">
        <FormLabel
          htmlFor={inputId}
          className="text-[15px] leading-[14px] font-medium text-black"
        >
          {label} {error && <span className="text-red-500">*</span>}
        </FormLabel>
        <div className="text-xs text-gray-500">
          {field.value.length}/{MAX_LENGTH}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <Textarea
          id={inputId}
          className={cn(
            'h-[110px] w-full resize-none rounded-md border px-3 py-2',
            error && !field.value.trim()
              ? 'border-red-300 focus-visible:ring-red-400'
              : 'border-slate-300 bg-white focus-visible:ring-slate-400',
          )}
          placeholder={placeholder}
          maxLength={MAX_LENGTH}
          {...field}
          onChange={handleChange}
        />
        <FormMessage className="mt-1 text-xs" />
      </div>
    </FormItem>
  )
}
