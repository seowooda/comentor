import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SelectDemo() {
  return (
    <Select defaultValue="all">
      <SelectTrigger className="w-[160px] border-none shadow-none">
        <SelectValue placeholder="전체" />
      </SelectTrigger>
      <SelectContent defaultValue="all">
        <SelectGroup>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="progress">진행 중인 프로젝트</SelectItem>
          <SelectItem value="done">완료된 프로젝트</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
