export function getInputSelectRightCode() {
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

export const InputSelectRight = () => {
  const [value, setValue] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('com');

  return (
    <div className="flex items-center">
      <Input
        className={\`grow -me-px rounded-r-none focus-visible:rounded-r-none\`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type here..."
      />
      <Select value={selectValue} onValueChange={(val) => setSelectValue(val)}>
        <SelectTrigger className="w-[80px] rounded-l-none border-l-0 shadow-none focus:outline-hidden focus:ring-0">
          <SelectValue placeholder=".com" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="com">.com</SelectItem>
          <SelectItem value="io">.io</SelectItem>
          <SelectItem value="xyz">.xyz</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};`;
}
