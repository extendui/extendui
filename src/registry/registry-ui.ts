import { type Registry } from './schema';

export const ui: Registry = [
  {
    name: 'button',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-slot'],
    files: ['components/ui/button.tsx'],
  },
  {
    name: 'input',
    type: 'registry:ui',
    dependencies: [],
    files: ['components/ui/input.tsx'],
  },
];
