import { ControllerRenderProps } from 'react-hook-form'
import { ProjectFormValues } from './TitleSelect'
import { FormItem, FormLabel } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useId } from 'react'

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

  /**
   * 입력 값이 최대 길이를 초과하지 않도록 처리
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(e.target.value.slice(0, MAX_LENGTH))
  }

  return (
    <FormItem className="flex h-[130px] flex-col gap-2.5 self-stretch">
      <FormLabel
        htmlFor={inputId}
        className="text-[15px] leading-[14px] font-medium text-black"
      >
        {label}
      </FormLabel>
      <div className="flex w-full flex-col">
        <Textarea
          id={inputId}
          className="h-[110px] w-full resize-none rounded-md bg-white px-3 py-2"
          placeholder={placeholder}
          maxLength={MAX_LENGTH}
          {...field}
          onChange={handleChange}
        />
        <div className="mt-1 w-full text-right text-xs text-gray-500">
          {field.value.length}/{MAX_LENGTH}
        </div>
      </div>
    </FormItem>
  )
}
