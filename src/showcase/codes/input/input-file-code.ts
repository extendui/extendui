export function getInputFileCode() {
  return `'use client';

import * as React from 'react';

import { Input } from '@/components/extendui/input';

export const FileInput = () => {
  return (
    <Input
      className="title:none p-0 pe-3 file:me-3 file:border-0 file:border-e file:h-full file:bg-primary file:text-primary-foreground"
      type="file"
    />
  );
};
`;
}
