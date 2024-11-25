import { type Registry } from './schema';

export const ui: Registry = [
  {
    name: 'button',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-slot', '@radix-ui/react-tooltip'],
    files: ['components/ui/button.tsx'],
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
];