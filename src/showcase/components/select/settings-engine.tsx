'use client';

import { UtensilsCrossed } from 'lucide-react';
import React from 'react';

import { Input } from '@/components/extendui/input';
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
  setChangeOpenIcon,
  setDisabled,
  setError,
  setHelperText,
  setLeftText,
  setPlaceholeder,
  setShowIcon,
  setVariant,
} from '@/zustand/stores/useEngineSettingsSelect';
import { useEngineSettingsSelectStore } from '@/zustand/stores/useEngineSettingsSelect';

export default function SelectSettingsEngine() {
  const { variant, error, disabled, changeOpenIcon, leftText, showIcon, helperText, placeholeder } = useEngineSettingsSelectStore();

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
    setPlaceholeder(value);
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
      <div className="flex w-full items-center space-x-2 sm:w-[180px]">
        <Input value={placeholeder} onChange={(e) => handleChangePlaceholeder(e.target.value)} placeholder="Placeholder" />
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-[180px]">
        <Input value={helperText} onChange={(e) => handleChangeHelperText(e.target.value)} placeholder="Helper text" />
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-[180px]">
        <Input value={leftText} onChange={(e) => handleChangeLeftText(e.target.value)} placeholder="Left text" />
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch checked={showIcon} onCheckedChange={handleShowIcon} />
        <span className="text-sm">Left icon</span>
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch checked={changeOpenIcon} onCheckedChange={handleChangeOpenIcon} />
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
}
