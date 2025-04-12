'use client';

import React from 'react';

import { Select } from '@/components/extendui/select';
import { Switch } from '@/components/ui/switch';
import {
  setCalendarVariant,
  setDisabled,
  setError,
  setVariant,
  useEngineSettingsDatePickerStore,
} from '@/zustand/stores/useEngineSettingsDatePicker';

export default function DatePickerSettingsEngine() {
  const { variant, calendarVariant, disabled, error } =
    useEngineSettingsDatePickerStore();

  const handleChangeVariant = (
    value: 'default' | 'flushed' | 'flushedfilled' | 'filled' | 'dashed',
  ) => {
    setVariant(value);
  };

  const handleChangeCalendarVariant = (
    value: 'default' | 'glowingRing' | 'outline',
  ) => {
    setCalendarVariant(value);
  };

  const handleChangeError = (value: boolean) => {
    setError(value);
  };

  const handleChangeDisabled = (value: boolean) => {
    setDisabled(value);
  };

  return (
    <div className="flex flex-col space-y-4 sm:space-y-6">
      <div className="w-full sm:w-auto">
        <Select onValueChange={handleChangeVariant} value={variant}>
          <Select.Trigger className="bg-secondary text-secondary-foreground w-full sm:w-[180px]">
            <Select.Value placeholder="Select variant" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Label>Variants</Select.Label>
              <Select.Item value="default">Default</Select.Item>
              <Select.Item value="flushed">Flushed</Select.Item>
              <Select.Item value="flushedfilled">Flushed Filled</Select.Item>
              <Select.Item value="filled">Filled</Select.Item>
              <Select.Item value="dashed">Dashed</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select>
      </div>
      <div className="w-full sm:w-auto">
        <Select
          onValueChange={handleChangeCalendarVariant}
          value={calendarVariant}
        >
          <Select.Trigger className="bg-secondary text-secondary-foreground w-full sm:w-[180px]">
            <Select.Value placeholder="Select variant" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Label>Calendar Variants</Select.Label>
              <Select.Item value="default">Default</Select.Item>
              <Select.Item value="outline">Outline</Select.Item>
              <Select.Item value="glowingRing">Glowing Ring</Select.Item>
            </Select.Group>
          </Select.Content>
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
    </div>
  );
}
