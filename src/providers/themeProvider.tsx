'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';



export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <NextThemeProvider
    attribute="class"
    defaultTheme="light"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </NextThemeProvider>
);
