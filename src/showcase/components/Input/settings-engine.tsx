'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { setLabel, setVariant, useEngineSettingsInputStore } from '@/zustand/stores/useEngineSettingsInput';
import React from 'react';

export default function InputSettingsEngine() {

  const { variant, label } = useEngineSettingsInputStore();

  const handleChangeVariant = (
    value:
      | 'default'
      | 'flushed'
      | 'filled'
      | 'dashed'
  ) => {
    setVariant(value);
  }

  const handleChangeLabel = (value: string) => {
    setLabel(value);
  }

  return (
    <div className="flex flex-col space-y-4 sm:space-y-6">
      <div className="w-full sm:w-auto">
        <Select onValueChange={handleChangeVariant} value={variant}>
          <SelectTrigger className="w-full bg-secondary text-secondary-foreground sm:w-[180px]">
            <SelectValue placeholder="Select variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Variants</SelectLabel>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="flushed">Flushed</SelectItem>
              <SelectItem value="filled">Filled</SelectItem>
              <SelectItem value="dashed">Dashed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-auto">
        <Input
          placeholder="Label text"
          value={label}
          onChange={(e) => handleChangeLabel(e.target.value)}
          className="w-[180px]"
        />
      </div>
    </div>
  );
}
