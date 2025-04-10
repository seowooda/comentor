'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface DateRangePickerProps {
  selectedPeriod: string
  startDate?: Date
  endDate?: Date
  onPeriodChange: (period: string) => void
  onStartDateChange: (date?: Date) => void
  onEndDateChange: (date?: Date) => void
}

/**
 * 날짜 범위 선택 컴포넌트
 */
const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedPeriod,
  startDate,
  endDate,
  onPeriodChange,
  onStartDateChange,
  onEndDateChange,
}) => {
  const getPeriodButtonClass = (period: string) => {
    return `rounded-md border px-3 py-1 text-xs ${
      selectedPeriod === period ? 'border-blue-500' : 'border-slate-200'
    }`
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 py-2">
        <button
          className={getPeriodButtonClass('1week')}
          onClick={() => onPeriodChange('1week')}
        >
          최근 1주일
        </button>
        <button
          className={getPeriodButtonClass('2weeks')}
          onClick={() => onPeriodChange('2weeks')}
        >
          최근 2주일
        </button>
        <button
          className={getPeriodButtonClass('1month')}
          onClick={() => onPeriodChange('1month')}
        >
          최근 1개월
        </button>
        <button
          className={getPeriodButtonClass('3months')}
          onClick={() => onPeriodChange('3months')}
        >
          최근 3개월
        </button>
        <button
          className={getPeriodButtonClass('custom')}
          onClick={() => onPeriodChange('custom')}
        >
          직접 선택
        </button>
      </div>

      {selectedPeriod === 'custom' && (
        <div className="flex gap-5">
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm font-semibold">시작 날짜</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'flex items-center justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-slate-600" />
                  {startDate ? (
                    format(startDate, 'PPP', { locale: ko })
                  ) : (
                    <span>날짜 선택</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={onStartDateChange}
                  initialFocus
                  locale={ko}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm font-semibold">종료 날짜</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'flex items-center justify-start text-left font-normal',
                    !endDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-slate-600" />
                  {endDate ? (
                    format(endDate, 'PPP', { locale: ko })
                  ) : (
                    <span>날짜 선택</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={onEndDateChange}
                  disabled={(date) => (startDate ? date < startDate : false)}
                  initialFocus
                  locale={ko}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateRangePicker
