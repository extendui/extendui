// @ts-nocheck
import * as React from 'react';
import { ui } from "./registry-ui"

export const Index: Record<string, any> = {
  default: {
    button: {
      name: 'button',
      type: 'components:ui',
      registryDependencies: undefined,
      component: React.lazy(() => import('@/components/ui/button')),
      source: '',
      files: ['src/components/ui/button.tsx'],
      category: 'undefined',
      subcategory: 'undefined',
      chunks: [],
    },
  },
};

export const registryComponents = [
  ...ui
]