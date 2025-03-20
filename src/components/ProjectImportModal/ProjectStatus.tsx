import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface ProjectStatusProps {
  value: 'in_progress' | 'completed'
  onChange: (value: 'in_progress' | 'completed') => void
}

export const ProjectStatus = ({ value, onChange }: ProjectStatusProps) => (
  <div className="flex flex-col items-start justify-start gap-[3px] self-stretch">
    <div className="justify-start text-[15px] leading-tight font-medium text-slate-900">
      진행 여부
    </div>
    <RadioGroup
      value={value}
      onValueChange={(value) => onChange(value as 'in_progress' | 'completed')}
      className="flex items-center justify-between self-stretch px-[106px] py-[14px]"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="in_progress" id="in_progress" />
        <Label htmlFor="in_progress" className="text-sm text-black">
          개발 중
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="completed" id="completed" />
        <Label htmlFor="completed" className="text-sm text-black">
          완료
        </Label>
      </div>
    </RadioGroup>
  </div>
)
