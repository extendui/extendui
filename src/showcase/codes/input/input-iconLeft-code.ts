export function getInputIconLeftCode() {
  return `'use client';

import { User } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/components/extendui/input';

export const InputIconLeft = () => {
  const [value, setValue] = React.useState('');
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
      placeholder="Type here..."
    >
      <Input.Group>
        <Input.LeftIcon>
          <User />
        </Input.LeftIcon>
      </Input.Group>
    </Input>
  );
};`;
}
