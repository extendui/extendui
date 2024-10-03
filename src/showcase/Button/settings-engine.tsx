'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  setLoading,
  setSize,
  setVariant,
  setBackgroundColor,
  useEngineSettingsStore,
} from '@/zustand/stores/useEngineSettings';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import { cn } from '@/lib/utils';

export default function ButtonSettingsEngine() {
  const loading = useEngineSettingsStore((state) => state.loading);
  const backgroundColor = useEngineSettingsStore(
    (state) => state.backgroundColor,
  );
  const variant = useEngineSettingsStore((state) => state.variant);

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
      | 'perimeterShimmer',
  ) => {
    setVariant(value);
  };

  const handleChangeSize = (value: 'default' | 'sm' | 'lg' | 'icon') => {
    setSize(value);
  };

  const handleChangeLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleChangeBackgroundColor = (value: string) => {
    setBackgroundColor(value);
  };

  const colorOptions = [
    { value: 'primary', label: 'Default', class: 'bg-primary' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
  ];

  return (
    <>
      <div className="mx-auto">
        <Select onValueChange={handleChangeVariant}>
          <SelectTrigger className="w-[180px] bg-secondary text-secondary-foreground">
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
              <SelectItem value="perimeterShimmer">
                Perimeter Shimmer
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mx-auto mt-4">
        <Select onValueChange={handleChangeSize}>
          <SelectTrigger className="w-[180px] bg-secondary text-secondary-foreground">
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
      <div className="mx-auto mt-4">
        <h3 className="mb-2 text-sm font-medium">Background Color</h3>
        <div
          className={cn(
            'grid grid-cols-5 gap-1',
            variant !== 'default' && 'pointer-events-none opacity-50',
          )}
        >
          {colorOptions.map((color) => (
            <label key={color.value} className="flex items-center space-x-2">
              <Checkbox
                checked={backgroundColor === color.value}
                onCheckedChange={() => handleChangeBackgroundColor(color.value)}
                className={cn(
                  `h-6 w-6 rounded-lg border-none data-[state=checked]:bg-${color.class}`,
                  color.class,
                )}
                disabled={variant !== 'default'}
              />
            </label>
          ))}
        </div>
        <div>
          {variant !== 'default' && (
            <p className="mt-2 text-xs text-muted-foreground">
              Background color is only available for the default variant.
            </p>
          )}
        </div>
      </div>
      <div className="mx-auto mt-4">
        <div className="items-top flex space-x-2">
          <Checkbox
            checked={loading}
            onCheckedChange={() => handleChangeLoading(!loading)}
          />
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Loading
          </label>
        </div>
      </div>
    </>
  );
}
