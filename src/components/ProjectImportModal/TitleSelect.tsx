'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { FormItem, FormLabel } from '@/components/ui/form'
import { ControllerRenderProps } from 'react-hook-form'

/**
 * 프로젝트 목록 데이터
 * 차후에 API 연동으로 실제 데이터로 대체될 예정
 */
export const repositories = [
  {
    value: 'commit-mentor',
    label: 'jinu/commit-mentor',
  },
  {
    value: 'portfolio',
    label: 'jinu/portfolio',
  },
  {
    value: 'blog',
    label: 'jinu/blog',
  },
]

/**
 * 프로젝트 폼 필드 값 인터페이스
 */
export interface ProjectFormValues {
  title: string
  description: string
  role: string
  status: 'in_progress' | 'completed'
}

interface TitleSelectProps {
  field: ControllerRenderProps<ProjectFormValues, 'title'>
}

// 스타일 상수
const TRIGGER_BUTTON_CLASSES =
  'inline-flex h-10 w-full min-w-[180px] cursor-pointer items-center justify-between rounded-md bg-white px-3 py-2 text-left outline outline-1 outline-offset-[-1px] outline-slate-300 hover:bg-slate-50 focus:outline-2 focus:outline-slate-400'

const COMMAND_ITEM_CLASSES = 'w-full !bg-white px-3 py-2 text-left text-sm'

/**
 * 프로젝트 제목 선택을 위한 드롭다운 컴포넌트
 */
export const TitleSelect = ({ field }: TitleSelectProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const titleInputId = 'project-title-input'

  /**
   * 프로젝트 선택 핸들러
   */
  const handleSelect = (currentValue: string) => {
    field.onChange(currentValue)
    setOpen(false)
  }

  /**
   * 마우스 클릭 핸들러
   */
  const handleItemClick = (e: React.MouseEvent, value: string) => {
    e.preventDefault()
    e.stopPropagation()
    handleSelect(value)
  }

  /**
   * 선택된 프로젝트 라벨 찾기
   */
  const selectedLabel = field.value
    ? repositories.find((repo) => repo.value === field.value)?.label
    : 'Repository 불러오기'

  return (
    <FormItem className="flex flex-col gap-1 self-stretch">
      <FormLabel
        htmlFor={titleInputId}
        className="text-[15px] leading-tight font-medium text-slate-900"
      >
        프로젝트 제목
      </FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={titleInputId}
            role="combobox"
            aria-expanded={open}
            className={TRIGGER_BUTTON_CLASSES}
          >
            <span className="truncate text-sm font-normal text-zinc-950">
              {selectedLabel}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[414px] p-0" align="start" sideOffset={4}>
          <Command
            shouldFilter={false}
            filter={(value, search) => {
              if (!search) return 1
              const itemValue = value.toLowerCase()
              const searchValue = search.toLowerCase()
              return itemValue.includes(searchValue) ? 1 : 0
            }}
            loop={true}
            className="[&_[cmdk-item-subtitle]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item][aria-selected=true]]:bg-transparent [&_[cmdk-item][data-selected=true]]:bg-slate-100"
          >
            <CommandInput
              placeholder="프로젝트 검색..."
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>프로젝트가 없습니다.</CommandEmpty>
              <CommandGroup>
                {repositories
                  .filter(
                    (repo) =>
                      search === '' ||
                      repo.label.toLowerCase().includes(search.toLowerCase()) ||
                      repo.value.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((repository) => (
                    <div
                      key={repository.value}
                      onClick={(e) => handleItemClick(e, repository.value)}
                      className="cursor-pointer"
                    >
                      <CommandItem
                        value={repository.value}
                        onSelect={() => handleSelect(repository.value)}
                        className={cn(
                          COMMAND_ITEM_CLASSES,
                          field.value === repository.value &&
                            '!bg-slate-100 font-medium',
                        )}
                        data-selected={field.value === repository.value}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            field.value === repository.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {repository.label}
                      </CommandItem>
                    </div>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormItem>
  )
}
