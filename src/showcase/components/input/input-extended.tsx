'use client';

import { User } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/components/extendui/input';

export const InputExtended = () => {
  const [value, setValue] = React.useState('');
  const handleClear = () => {
    setValue('');
  };
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
      required={true}
      variant={'flushed'}
    >
      <Input.Group>
        <Input.Label>Username</Input.Label>
        <Input.LeftIcon>
          <User />
        </Input.LeftIcon>
        <Input.ClearButton onClick={handleClear} />
      </Input.Group>
    </Input>
  );
};
