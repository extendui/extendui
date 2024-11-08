'use client';

import * as React from 'react';

import { Input } from '@/components/extendui/input/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InputSelectLeftProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

export const InputSelectLeft = React.forwardRef<
  HTMLInputElement,
  InputSelectLeftProps
>(({ className, ...props }, ref) => {
  const [value, setValue] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('http');

  return (
    <div className="flex items-center">
      <Select value={selectValue} onValueChange={(val) => setSelectValue(val)}>
        <SelectTrigger className="w-[95px] rounded-r-none border-r-0 shadow-none focus:outline-none focus:ring-0">
          <SelectValue placeholder="http" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="http">http:\\</SelectItem>
          <SelectItem value="https">https:\\</SelectItem>
        </SelectContent>
      </Select>
      <Input
        ref={ref}
        className={`flex-grow ${className} -me-px rounded-l-none focus-visible:rounded-l-none`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type here..."
        {...props}
      />
    </div>
  );
});

InputSelectLeft.displayName = 'InputSelectLeft';
