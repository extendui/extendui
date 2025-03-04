export function getInputSelectLeftCode() {
  return `'use client';

import * as React from 'react';

import { Input } from '@/components/extendui/input';
import {
  Select,
} from '@/components/extendui/select';

export const InputSelectLeft = () => {
  const [value, setValue] = React.useState('');
  const [Select.Value, setSelect.Value] = React.useState('http');

  return (
    <div className="flex items-center">
      <Select value={Select.Value} onValueChange={(val) => setSelect.Value(val)}>
        <Select.Trigger className="w-[95px] rounded-r-none border-r-0 shadow-none focus:outline-hidden focus:ring-0">
          <Select.Value placeholder="http" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="http">http:\\</Select.Item>
          <Select.Item value="https">https:\\</Select.Item>
        </Select.Content>
      </Select>
      <Input
        className={\`grow -me-px rounded-l-none focus-visible:rounded-l-none\`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type here..."
      />
    </div>
  );
};`;
}
