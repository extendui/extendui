'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/extendui/button/button';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const theme = useTheme().resolvedTheme;

  return (
    <Button
      variant={'ghost'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      size={'icon'}
      className="h-9 w-9 p-2"
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
