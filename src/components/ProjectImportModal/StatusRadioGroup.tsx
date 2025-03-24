import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ControllerRenderProps } from 'react-hook-form'
import { FormItem } from '@/components/ui/form'
import { ProjectFormValues } from './TitleSelect'

/**
 * 상태 옵션 타입 정의
 */
export interface StatusOption {
  id: string
  value: string
  label: string
}

interface StatusRadioGroupProps {
  field: ControllerRenderProps<ProjectFormValues, 'status'>
  options: StatusOption[]
}

/**
 * 프로젝트 진행 상태 선택 라디오 버튼 그룹 컴포넌트
 */
export const StatusRadioGroup = ({ field, options }: StatusRadioGroupProps) => {
  const radioLabelId = 'project-status-label'

  return (
    <FormItem className="flex flex-col gap-1 self-stretch">
      <Label
        id={radioLabelId}
        className="text-[15px] leading-tight font-medium text-slate-900"
      >
        진행 여부
      </Label>
      <RadioGroup
        aria-labelledby={radioLabelId}
        value={field.value}
        onValueChange={field.onChange}
        className="flex items-center justify-between self-stretch px-[106px] py-[14px]"
      >
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.id} />
            <Label htmlFor={option.id} className="text-sm text-black">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </FormItem>
  )
}
