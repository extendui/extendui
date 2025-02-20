'use client';

import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { Button } from '@/components/extendui/button';
import { Input } from '@/components/extendui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
          <SelectTrigger className="w-full bg-secondary text-secondary-foreground sm:w-[180px]">
            <SelectValue placeholder="Select variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Variants</SelectLabel>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="destructive">Destructive</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="ghost">Ghost</SelectItem>
              <SelectItem value="link">Link</SelectItem>
              <SelectItem value="ringHover">Ring Hover</SelectItem>
              <SelectItem value="glowingRing">Glowing Ring</SelectItem>
              <SelectItem value="shimmer">Shimmer</SelectItem>
              {/* <SelectItem value="perimeterShimmer">
                Perimeter Shimmer
              </SelectItem> */}
              <SelectItem value="bouncing">Bouncing</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-auto">
        <Select onValueChange={handleChangeSize} value={size}>
          <SelectTrigger className="w-full bg-secondary text-secondary-foreground sm:w-[180px]">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sizes</SelectLabel>
              <SelectItem value="default">default</SelectItem>
              <SelectItem value="sm">sm</SelectItem>
              <SelectItem value="lg">lg</SelectItem>
              <SelectItem value="icon">icon</SelectItem>
            </SelectGroup>
          </SelectContent>
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
