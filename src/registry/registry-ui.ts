import { type Registry } from './schema';

export const ui: Registry = [
  {
    name: 'banner',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-slot'],
    files: ['components/extendui/banner.tsx'],
    tailwind: {
      config: {
        theme: {
          extend: {
            keyframes: {
              shimmer: {
                '0%': { backgroundPosition: '200% 0' },
                '100%': { backgroundPosition: '-200% 0' },
              },
            },
            animation: {
              shimmer: 'shimmer 3s linear infinite',
            },
          },
        },
      },
    },
  },
  {
    name: 'banner-01',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-slot'],
    files: ['components/extendui/demo/banner-01.tsx','components/extendui/banner.tsx'],
    tailwind: {
      config: {
        theme: {
          extend: {
            keyframes: {
              shimmer: {
                '0%': { backgroundPosition: '200% 0' },
                '100%': { backgroundPosition: '-200% 0' },
              },
            },
            animation: {
              shimmer: 'shimmer 3s linear infinite',
            },
          },
        },
      },
    },
  },
  {
    name: 'button',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-slot', '@radix-ui/react-tooltip'],
    files: ['components/extendui/button.tsx', 'components/ui/tooltip.tsx'],
    tailwind: {
      config: {
        theme: {
          extend: {
            keyframes: {
              glow: {
                '0%, 100%': { boxShadow: '0 0 5px rgba(52, 211, 153, 0.5), 0 0 10px rgba(52, 211, 153, 0.3)' },
                '50%': { boxShadow: '0 0 10px rgba(52, 211, 153, 0.8), 0 0 20px rgba(52, 211, 153, 0.5)' },
              },
              shimmer: {
                '0%': { backgroundPosition: '200% 0' },
                '100%': { backgroundPosition: '-200% 0' },
              },
              perimeterShimmer: {
                '0%, 100%': { clipPath: 'inset(0 0 calc(100% - 2px) 0)' },
                '25%': { clipPath: 'inset(0 0 0 calc(100% - 2px))' },
                '50%': { clipPath: 'inset(calc(100% - 2px) 0 0 0)' },
                '75%': { clipPath: 'inset(0 calc(100% - 2px) 0 0)' },
              },
            },
            animation: {
              glow: 'glow 2s ease-in-out infinite',
              shimmer: 'shimmer 3s linear infinite',
              perimeterShimmer: 'perimeterShimmer 4s linear infinite',
            },
          },
        },
      },
    },
  },
  {
    name: 'button-01',
    type: 'registry:component',
    dependencies: ['@radix-ui/react-slot', '@radix-ui/react-tooltip'],
    files: ['components/extendui/demo/button-01.tsx', 'components/extendui/button.tsx', 'components/ui/tooltip.tsx'],
    tailwind: {
      config: {
        theme: {
          extend: {
            keyframes: {
              glow: {
                '0%, 100%': { boxShadow: '0 0 5px rgba(52, 211, 153, 0.5), 0 0 10px rgba(52, 211, 153, 0.3)' },
                '50%': { boxShadow: '0 0 10px rgba(52, 211, 153, 0.8), 0 0 20px rgba(52, 211, 153, 0.5)' },
              },
              shimmer: {
                '0%': { backgroundPosition: '200% 0' },
                '100%': { backgroundPosition: '-200% 0' },
              },
              perimeterShimmer: {
                '0%, 100%': { clipPath: 'inset(0 0 calc(100% - 2px) 0)' },
                '25%': { clipPath: 'inset(0 0 0 calc(100% - 2px))' },
                '50%': { clipPath: 'inset(calc(100% - 2px) 0 0 0)' },
                '75%': { clipPath: 'inset(0 calc(100% - 2px) 0 0)' },
              },
            },
            animation: {
              glow: 'glow 2s ease-in-out infinite',
              shimmer: 'shimmer 3s linear infinite',
              perimeterShimmer: 'perimeterShimmer 4s linear infinite',
            },
          },
        },
      },
    },
  },
  {
    name: 'input',
    type: 'registry:ui',
    dependencies: [],
    files: ['components/extendui/input.tsx', 'helpers/hasNestedElementOfType.ts']
  },
  {
    name: 'input-01',
    type: 'registry:ui',
    dependencies: [],
    files: ['components/extendui/demo/input-01.tsx','components/extendui/input.tsx', 'helpers/hasNestedElementOfType.ts']
  },
  {
    name: 'select',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-select', '@radix-ui/react-icons'],
    files: ['components/extendui/select.tsx']
  },
  {
    name: 'select-01',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-select', '@radix-ui/react-icons'],
    files: ['components/extendui/demo/select-01.tsx','components/extendui/select.tsx']
  },
  {
    name: 'command',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-dialog', '@radix-ui/react-icons', 'cmdk'],
    files: ['components/extendui/command.tsx', 'components/ui/dialog.tsx']
  },
  {
    name: 'command-01',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-dialog', '@radix-ui/react-icons', 'cmdk'],
    files: ['components/extendui/demo/command-01.tsx', 'components/extendui/command.tsx', 'components/ui/dialog.tsx']
  },
  {
    name: 'calendar',
    type: 'registry:ui',
    dependencies: ['react-day-picker'],
    files: ['components/extendui/calendar.tsx', 'components/extendui/button.tsx' ]
  },
  {
    name: 'date-picker-01',
    type: 'registry:ui',
    dependencies: ['react-day-picker'],
    files: ['components/extendui/demo/date-picker-01.tsx', 'components/extendui/calendar.tsx', 'components/extendui/button.tsx' ]
  },

];