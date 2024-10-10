'use client';

import { Button } from '@/components/ui/button';
import { getContrastYIQ } from '@/hooks/use-getContrast';
import { cn } from '@/lib/utils';
import { useEngineSettingsStore } from '@/zustand/stores/useEngineSettings';
import { ChevronRight, Loader2 } from 'lucide-react';

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

    if (backgroundColor === 'hsl(var(--primary))' || 'primary') return {};

    const textColor = getContrastYIQ(backgroundColor);

    return {
      style: {
        backgroundColor,
        color: textColor,
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
          <Loader2 className={cn('ml-2 h-4 w-4 animate-spin')} />
        </div>
      ) : size === 'icon' ? (
        <ChevronRight />
      ) : (
        'Button'
      )}
    </Button>
  );
}
