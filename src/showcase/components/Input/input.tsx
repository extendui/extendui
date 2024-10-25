'use client';

import { Input } from '@/components/ui/input';
import { useEngineSettingsInputStore } from '@/zustand/stores/useEngineSettingsInput';
import { useState } from 'react';
import { User } from 'lucide-react';

export default function InputExample() {
  const { variant, label, error, disabled, required } = useEngineSettingsInputStore();
  const [value, setValue] = useState('');

  const handleClear = () => {
    setValue('');
  };

  return (
    <Input.Root
      variant={variant}
      error={error}
      textError="Username is required"
      placeholder="Type here..."
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
    >
      <Input.Group>
        <Input.Label>{label}</Input.Label>
        <Input.LeftElement>
          <User />
        </Input.LeftElement>
        <Input.PasswordToggle />
        <Input.ClearButton onClick={handleClear} />
      </Input.Group>
    </Input.Root>
  );
}