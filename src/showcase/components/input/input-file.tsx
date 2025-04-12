'use client';

import * as React from 'react';

import { Input } from '@/components/extendui/input';

export const FileInput = () => {
  return (
    <Input
      className="title:none file:bg-primary file:text-primary-foreground p-0 pe-3 file:me-3 file:h-full file:border-0 file:border-e"
      type="file"
    />
  );
};
