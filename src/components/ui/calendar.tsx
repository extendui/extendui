'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { format } from 'date-fns';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { buttonVariants } from '../extendedui/button/button';

import { Button } from './button';

const calendarVariants = cva('p-3', {
  variants: {
    variant: {
      default: '',
      glowingRing:
        'relative overflow-hidden ring-2 ring-primary/50 animate-glow transition-all',
      outline: 'border border-input shadow-sm',
      secondary: 'bg-secondary text-secondary-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type CalendarProps = React.ComponentProps<typeof DayPicker> &
  VariantProps<typeof calendarVariants>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  variant,
  month,
  onMonthChange,
  ...props
}: CalendarProps) {
  const [isMonthPickerOpen, setIsMonthPickerOpen] = React.useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = React.useState(false);
  const [yearOffset, setYearOffset] = React.useState(0);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleMonthSelect = (monthIndex: number) => {
    if (month && onMonthChange) {
      const newDate = new Date(month);
      newDate.setMonth(monthIndex);
      onMonthChange(newDate);
      setIsMonthPickerOpen(false);
    }
  };

  const handleYearSelect = (year: number) => {
    if (month && onMonthChange) {
      const newDate = new Date(month);
      newDate.setFullYear(year);
      onMonthChange(newDate);
      setIsYearPickerOpen(false);
    }
  };

  const currentYear = React.useMemo(
    () => (month ? month.getFullYear() : new Date().getFullYear()),
    [month],
  );

  const yearRange = React.useMemo(() => {
    const baseYear = currentYear + yearOffset;
    return Array.from({ length: 12 }, (_, i) => baseYear - 5 + i);
  }, [currentYear, yearOffset]);

  const MonthPicker = () => (
    <div className="grid grid-cols-3 gap-2">
      {months.map((monthName, index) => (
        <button
          key={monthName}
          onClick={() => handleMonthSelect(index)}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'w-full px-2 py-1 text-sm',
            month &&
              month.getMonth() === index &&
              'bg-primary text-primary-foreground',
          )}
        >
          {format(new Date(2024, index), 'MMM')}
        </button>
      ))}
    </div>
  );

  const YearPicker = () => (
    <div className="grid grid-cols-3 gap-2">
      {yearRange?.map((year) => (
        <button
          key={year}
          onClick={() => handleYearSelect(year)}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'w-full px-2 py-1 text-sm',
            month &&
              month.getFullYear() === year &&
              'bg-primary text-primary-foreground',
          )}
        >
          {year}
        </button>
      ))}
      <div />
      <div className="flex justify-between">
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => setYearOffset((prev) => prev - 12)}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => setYearOffset((prev) => prev + 12)}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );

  return (
    <DayPicker
      month={month}
      onMonthChange={onMonthChange}
      showOutsideDays={showOutsideDays}
      className={cn(calendarVariants({ variant }), className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today:
          'text-accent-foreground bg-muted relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-accent-foreground after:rounded-full',
        day_outside:
          'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
        CaptionLabel: ({ displayMonth }) => (
          <div className="flex justify-center space-x-1">
            <Popover
              open={isMonthPickerOpen}
              onOpenChange={setIsMonthPickerOpen}
            >
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-7 px-2 text-sm font-medium',
                  )}
                >
                  {format(displayMonth, 'MMMM')}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <MonthPicker />
              </PopoverContent>
            </Popover>
            <Popover open={isYearPickerOpen} onOpenChange={setIsYearPickerOpen}>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-7 px-2 text-sm font-medium',
                  )}
                >
                  {format(displayMonth, 'yyyy')}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <YearPicker />
              </PopoverContent>
            </Popover>
          </div>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar, calendarVariants };
