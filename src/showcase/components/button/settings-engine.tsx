'use client';

import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { Button } from '@/components/extendui/button';
import { Input } from '@/components/extendui/input';
import { Select } from '@/components/extendui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import {
  setLoading,
  setSize,
  setVariant,
  setBackgroundColor,
  useEngineSettingsStore,
  setTooltipText,
} from '@/zustand/stores/useEngineSettings';

export default function ButtonSettingsEngine() {
  const { loading, backgroundColor, variant, size } = useEngineSettingsStore();
  const [customColor, setCustomColor] = useState(backgroundColor || '#000000');
  const tooltipText = useEngineSettingsStore((state) => state.tooltipText);
  const handleChangeVariant = (
    value:
      | 'default'
      | 'destructive'
      | 'outline'
      | 'secondary'
      | 'ghost'
      | 'link'
      | 'ringHover'
      | 'glowingRing'
      | 'shimmer'
      // | 'perimeterShimmer'
      | 'bouncing',
  ) => {
    setVariant(value);
  };

  const handleChangeSize = (value: 'default' | 'sm' | 'lg' | 'icon') => {
    setSize(value);
  };

  const handleChangeLoading = (checked: boolean) => {
    setLoading(checked);
  };

  const handleChangeBackgroundColor = (value: string) => {
    const color = colorOptions.find((c) => c.value === value)?.color || value;
    setBackgroundColor(color);
    setCustomColor(color);
  };

  const handleChangeTooltipText = (tooltipText: string) => {
    setTooltipText(tooltipText);
  };

  const colorOptions = [
    { value: 'primary', label: 'Default', color: 'hsl(var(--primary))' },
    { value: 'red', label: 'Red', color: '#ef4444' },
    { value: 'blue', label: 'Blue', color: '#3b82f6' },
    { value: 'green', label: 'Green', color: '#22c55e' },
  ];

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
              <Select.Item value="destructive">Destructive</Select.Item>
              <Select.Item value="outline">Outline</Select.Item>
              <Select.Item value="secondary">Secondary</Select.Item>
              <Select.Item value="ghost">Ghost</Select.Item>
              <Select.Item value="link">Link</Select.Item>
              <Select.Item value="ringHover">Ring Hover</Select.Item>
              <Select.Item value="glowingRing">Glowing Ring</Select.Item>
              <Select.Item value="shimmer">Shimmer</Select.Item>
              <Select.Item value="bouncing">Bouncing</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select>
      </div>
      <div className="w-full sm:w-auto">
        <Select onValueChange={handleChangeSize} value={size}>
          <Select.Trigger className="bg-secondary text-secondary-foreground w-full sm:w-[180px]">
            <Select.Value placeholder="Select size" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Label>Sizes</Select.Label>
              <Select.Item value="default">default</Select.Item>
              <Select.Item value="sm">sm</Select.Item>
              <Select.Item value="lg">lg</Select.Item>
              <Select.Item value="icon">icon</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select>
      </div>
      {variant === 'default' && (
        <div className="w-full sm:w-auto">
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <Button
                key={color.value}
                variant="ghost"
                style={{ backgroundColor: color.color }}
                onClick={() => handleChangeBackgroundColor(color.value)}
                className="flex h-8 w-8 items-center justify-center"
              />
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 items-center justify-center"
                  style={{ backgroundColor: customColor }}
                >
                  {customColor === backgroundColor ? '✓' : '+'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <HexColorPicker
                  color={customColor}
                  onChange={(color) => {
                    setCustomColor(color);
                    handleChangeBackgroundColor(color);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
      <div className="w-full sm:w-auto">
        <Input
          placeholder="Tooltip text"
          value={tooltipText}
          onChange={(e) => handleChangeTooltipText(e.target.value)}
          className="w-[180px]"
        />
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch
          id="loading"
          checked={loading}
          onCheckedChange={handleChangeLoading}
        />
        <label htmlFor="loading" className="text-sm">
          Loading
        </label>
      </div>
    </div>
  );
}
