'use client';

import { Input, InputClearButton, InputGroup, InputLabel, InputLeftElement, InputPasswordToggle } from '@/components/ui/input';
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
    <Input
      variant={variant}
      error={error}
      textError="Username is required"
      placeholder="Type here..."
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
    >
      <InputGroup>
        <InputLabel>{label}</InputLabel>
        <InputLeftElement>
          <User />
        </InputLeftElement>
        <InputPasswordToggle />
        <InputClearButton onClick={handleClear} />
      </InputGroup>
    </Input>
  );
}