import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Control, FieldValues, Path } from 'react-hook-form'

interface CheckboxGroupProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  description?: string
  options: { id: string; label: string }[]
}

export const CheckboxGroup = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
}: CheckboxGroupProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="w-full gap-[3px]">
          <FormLabel className="text-base">{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <div className="flex justify-between px-[10px] py-[14px]">
            {options.map((item) => (
              <FormField
                key={item.id}
                control={control}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.id,
                                ),
                              )
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  )
}

export default CheckboxGroup
