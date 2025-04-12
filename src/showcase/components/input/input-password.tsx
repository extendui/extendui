'use client';

import * as React from 'react';

import { Input } from '@/components/extendui/input';

export const InputPassword = () => {
  const [value, setValue] = React.useState('');
  return (
    <Input
      type="password"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={'Type password here...'}
    >
      <Input.Group>
        <Input.PasswordToggle />
      </Input.Group>
    </Input>
  );
};
