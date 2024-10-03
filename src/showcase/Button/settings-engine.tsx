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
  useEngineSettingsStore,
} from '@/zustand/stores/useEngineSettings';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

export default function ButtonSettingsEngine() {
  const loading = useEngineSettingsStore((state) => state.loading);

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
