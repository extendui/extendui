'use client';

import { format, isValid, parse } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Calendar } from '@/components/extendui/calendar';
import { Input } from '@/components/extendui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useEngineSettingsDatePickerStore } from '@/zustand/stores/useEngineSettingsDatePicker';

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();
  const [month, setMonth] = React.useState<Date>(new Date());
  const [inputValue, setInputValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const { variant, error, disabled, calendarVariant } =
    useEngineSettingsDatePickerStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    const parsedDate = parse(e.target.value, 'yyyy-MM-dd', new Date());

    if (isValid(parsedDate)) {
      setDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setDate(undefined);
    }
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setInputValue(format(selectedDate, 'yyyy-MM-dd'));
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Input
        type="date"
        variant={variant}
        disabled={disabled}
        value={inputValue}
        error={error}
        textError="Date is required"
        onChange={handleInputChange}
        placeholder="yyyy-MM-dd"
        className={cn(!date && 'text-muted-foreground', 'w-[180px]')}
      >
        <Input.Group>
          <Input.Label>Date</Input.Label>
          <PopoverTrigger asChild>
            <Input.RightIcon>
              <CalendarIcon className="h-4 w-4 hover:cursor-pointer max-sm:hidden" />
            </Input.RightIcon>
          </PopoverTrigger>
        </Input.Group>
      </Input>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={date}
          onSelect={handleCalendarSelect}
          variant={calendarVariant}
          disabled={{ dayOfWeek: [0] }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
