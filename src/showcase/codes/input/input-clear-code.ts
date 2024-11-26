export function getInputClearCode() {
  return `'use client';

import * as React from 'react';
import { useState } from 'react';

import { Input } from '@/components/extendui/input';

export const InputClear = () => {
  const [value, setValue] = useState('');

  const handleClear = () => {
    setValue('');
  };

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
      placeholder="Type here..."
    >
      <Input.Group>
        <Input.ClearButton onClick={handleClear} />
      </Input.Group>
    </Input>
  );
};`;
}
