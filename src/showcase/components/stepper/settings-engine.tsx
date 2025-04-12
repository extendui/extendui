'use client';

import React from 'react';

import { Input } from '@/components/extendui/input';
import { Select } from '@/components/extendui/select';
import { Switch } from '@/components/ui/switch';
import {
  setDisabled,
  setLoading,
  setOrientation,
  setSeparatorWidth,
  setVariant,
  setCompleted,
} from '@/zustand/stores/useEngineSettingsStepper';
import { useEngineSettingsStepperStore } from '@/zustand/stores/useEngineSettingsStepper';

export const StepperSettingsEngine = () => {
  const { variant, orientation, disabled, loading, separatorWidth, completed } =
    useEngineSettingsStepperStore();

  const handleChangeVariant = (value: 'default' | 'dotted' | 'outline') => {
    setVariant(value);
  };

  const handleChangeOrientation = (value: 'horizontal' | 'vertical') => {
    setOrientation(value);
  };

  const handleChangeSeparatorWidth = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setSeparatorWidth(numValue);
    }
  };

  const handleChangeDisabled = (value: boolean) => {
    setDisabled(value);
  };

  const handleChangeLoading = (value: boolean) => {
    setLoading(value);
  };

  const handleChangeCompleted = (value: boolean) => {
    setCompleted(value);
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
              <Select.Item value="outline">Outline</Select.Item>
              <Select.Item value="dotted">Dotted</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select>
      </div>

      <div className="w-full sm:w-auto">
        <Select onValueChange={handleChangeOrientation} value={orientation}>
          <Select.Trigger className="bg-secondary text-secondary-foreground w-full sm:w-[180px]">
            <Select.Value placeholder="Select orientation" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Label>Orientation</Select.Label>
              <Select.Item value="horizontal">Horizontal</Select.Item>
              <Select.Item value="vertical">Vertical</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select>
      </div>

      <div className="flex w-full items-center space-x-2 sm:w-[180px]">
        <Input
          type="number"
          value={separatorWidth.toString()}
          onChange={(e) => handleChangeSeparatorWidth(e.target.value)}
          placeholder="Separator Width"
          className="pr-2"
        />
      </div>

      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch checked={disabled} onCheckedChange={handleChangeDisabled} />
        <span className="text-sm">Disabled</span>
      </div>

      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch checked={loading} onCheckedChange={handleChangeLoading} />
        <span className="text-sm">Loading</span>
      </div>

      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch checked={completed} onCheckedChange={handleChangeCompleted} />
        <span className="text-sm">Completed</span>
      </div>
    </div>
  );
};
