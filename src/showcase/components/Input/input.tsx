'use client';

import { Input } from '@/components/ui/input';
import { useEngineSettingsInputStore } from '@/zustand/stores/useEngineSettingsInput';

export default function InputExample() {
  const { variant, label } = useEngineSettingsInputStore();

  return (
    <Input type="text" placeholder="Type here..." variant={variant} label={label} />
  );
}

