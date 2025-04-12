'use client';

import React from 'react';

import { Input } from '@/components/extendui/input';
import { Select } from '@/components/extendui/select';
import { Switch } from '@/components/ui/switch';
import {
  setChangeOpenIcon,
  setDisabled,
  setError,
  setHelperText,
  setLeftText,
  setPlaceholder,
  setShowIcon,
  setVariant,
} from '@/zustand/stores/useEngineSettingsSelect';
import { useEngineSettingsSelectStore } from '@/zustand/stores/useEngineSettingsSelect';

export const SelectSettingsEngine = () => {
  const {
    variant,
    error,
    disabled,
    changeOpenIcon,
    leftText,
    showIcon,
    helperText,
    placeholder,
  } = useEngineSettingsSelectStore();

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

  const handleShowIcon = (value: boolean) => {
    setShowIcon(value);
  };

  const handleChangeOpenIcon = (value: boolean) => {
    setChangeOpenIcon(value);
  };

  const handleChangeLeftText = (value: string) => {
    setLeftText(value);
  };

  const handleChangeHelperText = (value: string) => {
    setHelperText(value);
  };

  const handleChangePlaceholeder = (value: string) => {
    setPlaceholder(value);
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
      <div className="flex w-full items-center space-x-2 sm:w-[180px]">
        <Input
          value={placeholder}
          onChange={(e) => handleChangePlaceholeder(e.target.value)}
          placeholder="Placeholder"
        />
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-[180px]">
        <Input
          value={helperText}
          onChange={(e) => handleChangeHelperText(e.target.value)}
          placeholder="Helper text"
        />
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-[180px]">
        <Input
          value={leftText}
          onChange={(e) => handleChangeLeftText(e.target.value)}
          placeholder="Left text"
        />
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch checked={showIcon} onCheckedChange={handleShowIcon} />
        <span className="text-sm">Left icon</span>
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch
          checked={changeOpenIcon}
          onCheckedChange={handleChangeOpenIcon}
        />
        <span className="text-sm">Change open icon</span>
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
};
