import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Control, FieldValues, Path } from 'react-hook-form'

interface RadioGroupFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  description?: string
  options: { value: boolean; label: string }[]
}

export const RadioGroupField = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
}: RadioGroupFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full gap-[3px]">
          {label && (
            <FormLabel className="text-base font-medium">{label}</FormLabel>
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl className="flex items-center justify-center gap-7 py-5">
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

export default RadioGroupField
