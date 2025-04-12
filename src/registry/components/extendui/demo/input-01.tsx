'use client';

import { useState } from 'react';

import { Input } from '@/components/extendui/input';

export const InputDemo = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      required={true}
      variant={'flushed'}
      textError="Username is required"
      placeholder="Type here..."
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
