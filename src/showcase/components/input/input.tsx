'use client';

import { useState } from 'react';

import { Input } from '@/components/extendui/input';
import { useEngineSettingsInputStore } from '@/zustand/stores/useEngineSettingsInput';

export const InputExample = () => {
  const { variant, error, disabled } = useEngineSettingsInputStore();
  const [value, setValue] = useState('');

  return (
    <Input
      variant={variant}
      error={error}
      textError="Username is required"
      placeholder="Type here..."
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
    />
  );
};