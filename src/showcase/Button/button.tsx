'use client';

import { Button } from '@/components/ui/button';
import { getContrastYIQ } from '@/hooks/use-getContrast';
import { useEngineSettingsStore } from '@/zustand/stores/useEngineSettings';
import { ChevronRight } from 'lucide-react';

export default function ButtonExample() {
  const loading = useEngineSettingsStore((state) => state.loading);
  const variant = useEngineSettingsStore((state) => state.variant);
  const size = useEngineSettingsStore((state) => state.size);
  const backgroundColor = useEngineSettingsStore(
    (state) => state.backgroundColor,
  );
  const tooltipText = useEngineSettingsStore((state) => state.tooltipText);

  const getButtonStyle = () => {
    if (variant !== 'default' || !backgroundColor) {
      return {};
    }

    if (backgroundColor === 'hsl(var(--primary))') return {};

    const textColor = getContrastYIQ(backgroundColor);

    return {
      style: {
        backgroundColor,
        color: textColor,
        borderColor: 'transparent',
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
      loading={loading}
      tooltipText={tooltipText}
      {...buttonStyle}
    >
      {size === 'icon' ? (
        <ChevronRight />
      ) : (
        'Button'
      )}
    </Button>

  );
}