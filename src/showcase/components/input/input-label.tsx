'use client';

import * as React from 'react';

import { Input } from '@/components/extendui/input';

export const InputLabel = () => {
  const [value, setValue] = React.useState('');
  return (
    <Input value={value} onChange={(e) => setValue(e.target.value)} type="text">
      <Input.Group>
        <Input.Label>Username</Input.Label>
      </Input.Group>
    </Input>
  );
};
