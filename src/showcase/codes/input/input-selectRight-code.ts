export function getInputSelectRightCode() {
  return `'use client';

import * as React from 'react';

import { Input } from '@/components/extendui/input';
import {
  Select
} from '@/components/extendui/select';

export const InputSelectRight = () => {
  const [value, setValue] = React.useState('');
  const [Select.Value, setSelect.Value] = React.useState('com');

  return (
    <div className="flex items-center">
      <Input
        className={\`grow -me-px rounded-r-none focus-visible:rounded-r-none\`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type here..."
      />
      <Select value={Select.Value} onValueChange={(val) => setSelect.Value(val)}>
        <Select.Trigger className="w-[80px] rounded-l-none border-l-0 shadow-none focus:outline-hidden focus:ring-0">
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
};`;
}
