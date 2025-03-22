import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ControllerRenderProps } from 'react-hook-form'
import { FormItem } from '@/components/ui/form'
import { ProjectFormValues } from './TitleSelect'

// 진행 상태 옵션 정의
const STATUS_OPTIONS = [
  { id: 'in_progress', value: 'in_progress', label: '개발 중' },
  { id: 'completed', value: 'completed', label: '완료' },
]

// 스타일 상수
const LABEL_CLASSES = 'text-[15px] font-medium leading-tight text-slate-900'
const RADIO_GROUP_CLASSES =
  'flex items-center justify-between self-stretch px-[106px] py-[14px]'
const RADIO_LABEL_CLASSES = 'text-sm text-black'

interface StatusRadioGroupProps {
  field: ControllerRenderProps<ProjectFormValues, 'status'>
}

/**
 * 프로젝트 진행 상태 선택 라디오 버튼 그룹 컴포넌트
 */
export const StatusRadioGroup = ({ field }: StatusRadioGroupProps) => {
  const radioLabelId = 'project-status-label'

  return (
    <FormItem className="flex flex-col gap-1 self-stretch">
      <Label id={radioLabelId} className={LABEL_CLASSES}>
        진행 여부
      </Label>
      <RadioGroup
        aria-labelledby={radioLabelId}
        value={field.value}
        onValueChange={field.onChange}
        className={RADIO_GROUP_CLASSES}
      >
        {STATUS_OPTIONS.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.id} />
            <Label htmlFor={option.id} className={RADIO_LABEL_CLASSES}>
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </FormItem>
  )
}
