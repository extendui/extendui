'use client';

import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/extendui/select';
import { Switch } from '@/components/ui/switch';
import {
  setDisabled,
  setError,
  setRequired,
  setVariant,
  useEngineSettingsInputStore,
} from '@/zustand/stores/useEngineSettingsInput';

export default function InputSettingsEngine() {
  const { variant, disabled, error, required } = useEngineSettingsInputStore();

  const handleChangeVariant = (
    value: 'default' | 'flushed' | 'flushedfilled' | 'filled' | 'dashed',
  ) => {
    setVariant(value);
  };

  const handleChangeError = (value: boolean) => {
    setError(value);
  };

  const handleChangeDisabled = (value: boolean) => {
    setDisabled(value);
  };

  const handleChangeRequired = (value: boolean) => {
    setRequired(value);
  };

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
              <SelectItem value="flushedfilled">Flushed Filled</SelectItem>
              <SelectItem value="filled">Filled</SelectItem>
              <SelectItem value="dashed">Dashed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch checked={disabled} onCheckedChange={handleChangeDisabled} />
        <span className="text-sm">Disabled</span>
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch checked={error} onCheckedChange={handleChangeError} />
        <span className="text-sm">Error</span>
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch checked={required} onCheckedChange={handleChangeRequired} />
        <span className="text-sm">Required</span>
      </div>
    </div>
  );
}
