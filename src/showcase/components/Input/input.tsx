'use client';

import { Input } from '@/components/ui/input';
import { useEngineSettingsInputStore } from '@/zustand/stores/useEngineSettingsInput';
import { useState } from 'react';

export default function InputExample() {
  const { variant, label, error, disabled, required } = useEngineSettingsInputStore();
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
      placeholder="Type here..."
      variant={variant}
      label={label}
      error={error}
      textError='This field is required'
      disabled={disabled}
      required={required}
    />
  );
}

