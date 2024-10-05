'use client';

import { Button } from '@/components/ui/button';
import { useEngineSettingsStore } from '@/zustand/stores/useEngineSettings';
import { ChevronRight, Loader2Icon } from 'lucide-react';

export default function ButtonExample() {
  const loading = useEngineSettingsStore((state) => state.loading);
  const variant = useEngineSettingsStore((state) => state.variant);
  const size = useEngineSettingsStore((state) => state.size);
  const backgroundColor = useEngineSettingsStore(
    (state) => state.backgroundColor,
  );

  const getButtonStyle = () => {
    if (variant !== 'default' || !backgroundColor) {
      return {};
    }

    const predefinedColors = {
      primary: 'bg-primary hover:bg-primary/90',
      red: 'bg-destructive hover:bg-destructive/90 text-white',
      blue: 'bg-blue-500 hover:bg-blue-600 text-white',
      green: 'bg-green-500 hover:bg-green-600 text-white',
      yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      purple: 'bg-purple-500 hover:bg-purple-600 text-white',
    };

    if (backgroundColor in predefinedColors) {
      return {
        className:
          predefinedColors[backgroundColor as keyof typeof predefinedColors],
      };
    }

    // For custom colors, use inline style and set text color to white
    return {
      style: {
        backgroundColor,
        color: backgroundColor === 'hsl(var(--primary))' ? 'black' : 'white',
        ':hover': { backgroundColor: backgroundColor + 'e6' },
      },
    };
  };

  const buttonStyle = getButtonStyle();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => console.log('clicked')}
      disabled={loading}
      {...buttonStyle}
    >
      {loading ? (
        <div className="flex items-center">
          <span>Loading...</span>
          <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
        </div>
      ) : size === 'icon' ? (
        <ChevronRight />
      ) : (
        'Button'
      )}
    </Button>
  );
}
