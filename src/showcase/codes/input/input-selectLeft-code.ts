export function getInputSelectLeftCode() {
  return `'use client';

import * as React from 'react';

import { Input } from '@/components/extendui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/extendui/select';

export const InputSelectLeft = () => {
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
        className={\`flex-grow -me-px rounded-l-none focus-visible:rounded-l-none\`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type here..."
      />
    </div>
  );
};
`;
}
