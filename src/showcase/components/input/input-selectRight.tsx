'use client';

import * as React from 'react';

import { Input } from '@/components/extendui/input';
import { Select } from '@/components/extendui/select';

export const InputSelectRight = () => {
  const [value, setValue] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('com');

  return (
    <div className="flex items-center">
      <Input
        className={`-me-px grow rounded-r-none focus-visible:rounded-r-none`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type here..."
      />
      <Select value={selectValue} onValueChange={(val) => setSelectValue(val)}>
        <Select.Trigger className="w-[80px] rounded-l-none border-l-0 shadow-none focus:ring-0 focus:outline-hidden">
          <Select.Value placeholder=".com" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="com">.com</Select.Item>
          <Select.Item value="io">.io</Select.Item>
          <Select.Item value="xyz">.xyz</Select.Item>
        </Select.Content>
      </Select>
    </div>
  );
};
