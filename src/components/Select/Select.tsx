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

export function DashboardSelect({
  setFilter,
}: {
  setFilter: (value: string) => void
}) {
  return (
    <Select defaultValue="all" onValueChange={(value) => setFilter(value)}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="전체" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="Progress">진행 중인 프로젝트</SelectItem>
          <SelectItem value="Done">완료된 프로젝트</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
