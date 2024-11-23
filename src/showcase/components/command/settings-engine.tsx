'use client';

import React from 'react';

import { Input } from '@/components/extendui/input';
import { Switch } from '@/components/ui/switch';
import {
  setLabelText, setNotFoundText, useEngineSettingsCommandStore, setDisabled,
  setPlaceholder,
  setShowIcon,
} from '@/zustand/stores/useEngineSettingsCommand';



export default function CommandSettingsEngine() {
  const { disabled, showIcon, labelText, notFoundText, placeholder } = useEngineSettingsCommandStore();

  const handleChangeDisabled = (value: boolean) => {
    setDisabled(value);
  };

  const handleShowIcon = (value: boolean) => {
    setShowIcon(value);
  };

  const handleChangeLabelText = (value: string) => {
    setLabelText(value);
  };

  const handleChangeNotFoundText = (value: string) => {
    setNotFoundText(value);
  };

  const handleChangePlaceholder = (value: string) => {
    setPlaceholder(value);
  };

  return (
    <div className="flex flex-col space-y-4 sm:space-y-6">
      <div className="flex w-full items-center space-x-2 sm:w-[180px]">
        <Input value={placeholder} onChange={(e) => handleChangePlaceholder(e.target.value)} placeholder="Placeholder" />
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-[180px]">
        <Input value={labelText} onChange={(e) => handleChangeLabelText(e.target.value)} placeholder="Helper text" />
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-[180px]">
        <Input value={notFoundText} onChange={(e) => handleChangeNotFoundText(e.target.value)} placeholder="Not found text" />
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch checked={showIcon} onCheckedChange={handleShowIcon} />
        <span className="text-sm">With icon</span>
      </div>
      <div className="flex w-full items-center space-x-2 sm:w-auto">
        <Switch checked={disabled} onCheckedChange={handleChangeDisabled} />
        <span className="text-sm">Disabled</span>
      </div>
    </div>
  );
}
