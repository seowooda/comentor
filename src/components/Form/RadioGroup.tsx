import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface RadioGroupFieldProps {
  control: any
  name: string
  label: string
  description?: string
  options: { value: boolean; label: string }[]
}

export function RadioGroupField({
  control,
  name,
  label,
  description,
  options,
}: RadioGroupFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full gap-[3px]">
          <FormLabel className="text-[16px] font-medium">{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl className="flex items-center justify-between px-[106px] py-[14px]">
            <RadioGroup
              onValueChange={(val) => field.onChange(val === 'true')}
              value={String(field.value)}
            >
              {options.map((option) => (
                <FormItem
                  key={String(option.value)}
                  className="flex items-center gap-2"
                >
                  <FormControl>
                    <RadioGroupItem value={String(option.value)} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
