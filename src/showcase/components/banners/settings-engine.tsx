'use client';

import React from 'react';

import { Button } from '@/components/extendui/button';
import { Input } from '@/components/extendui/input';
import { Select } from '@/components/extendui/select';
import { Switch } from '@/components/ui/switch';
import {
  setVariant,
  setPosition,
  setSize,
  setTitle,
} from '@/zustand/stores/useEngineSettingsBanner';
import { useEngineSettingsBanner } from '@/zustand/stores/useEngineSettingsBanner';

export const BannerSettingsEngine = () => {
  const { variant, position, size, title, resetToDefaults } =
    useEngineSettingsBanner();

  const handleChangeVariant = (
    value:
      | 'default'
      | 'primary'
      | 'destructive'
      | 'success'
      | 'warning'
      | 'info'
      | 'outline'
      | 'subtle'
      | 'ghost'
      | 'shimmer',
  ) => {
    setVariant(value);
  };

  const handleChangePosition = (
    value: 'top' | 'bottom' | 'center' | 'static',
  ) => {
    setPosition(value);
  };

  const handleChangeSize = (value: 'default' | 'sm' | 'lg') => {
    setSize(value);
  };

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const handleReset = () => {
    resetToDefaults();
  };

  return (
    <div>
      {/* Settings in 2 columns */}
      <div className="flex flex-col space-y-4 sm:space-y-6">
        <div className="flex w-full items-center space-x-2 sm:w-[180px]">
          <Select onValueChange={handleChangeVariant} value={variant}>
            <Select.Trigger className="bg-secondary text-secondary-foreground w-full">
              <Select.Value placeholder="Select variant" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>Variants</Select.Label>
                <Select.Item value="default">Default</Select.Item>
                <Select.Item value="primary">Primary</Select.Item>
                <Select.Item value="destructive">Destructive</Select.Item>
                <Select.Item value="success">Success</Select.Item>
                <Select.Item value="warning">Warning</Select.Item>
                <Select.Item value="info">Info</Select.Item>
                <Select.Item value="outline">Outline</Select.Item>
                <Select.Item value="subtle">Subtle</Select.Item>
                <Select.Item value="ghost">Ghost</Select.Item>
                <Select.Item value="shimmer">Shimmer</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select>
        </div>

        {/* Position Selection */}
        <div className="flex w-full items-center space-x-2 sm:w-[180px]">
          <Select onValueChange={handleChangePosition} value={position}>
            <Select.Trigger className="bg-secondary text-secondary-foreground w-full">
              <Select.Value placeholder="Select position" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>Position</Select.Label>
                <Select.Item value="top">Top</Select.Item>
                <Select.Item value="bottom">Bottom</Select.Item>
                <Select.Item value="center">Center</Select.Item>
                <Select.Item value="static">Static</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select>
        </div>

        {/* Size Selection */}
        <div className="flex w-full items-center space-x-2 sm:w-[180px]">
          <Select onValueChange={handleChangeSize} value={size}>
            <Select.Trigger className="bg-secondary text-secondary-foreground w-full">
              <Select.Value placeholder="Select size" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>Size</Select.Label>
                <Select.Item value="default">Default</Select.Item>
                <Select.Item value="sm">Small</Select.Item>
                <Select.Item value="lg">Large</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select>
        </div>
        {/* Text Inputs */}
        <div className="flex w-full items-center space-x-2 sm:w-[180px]">
          <Input
            value={title}
            onChange={(e) => handleChangeTitle(e.target.value)}
            placeholder="Banner title"
          />
        </div>
        <div className="flex w-full items-center justify-end space-x-2 sm:w-[180px]">
          <Button onClick={handleReset} variant={'outline'}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
