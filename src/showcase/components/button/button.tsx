'use client';

import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/extendui/button/button';
import { getContrastYIQ } from '@/hooks/use-getContrast';
import { useEngineSettingsStore } from '@/zustand/stores/useEngineSettings';

export default function ButtonExample() {
  const loading = useEngineSettingsStore((state) => state.loading);
  const variant = useEngineSettingsStore((state) => state.variant);
  const size = useEngineSettingsStore((state) => state.size);
  const backgroundColor = useEngineSettingsStore(
    (state) => state.backgroundColor,
  );
  const tooltipText = useEngineSettingsStore((state) => state.tooltipText);

  const getButtonStyle = () => {
    if (variant !== 'default') {
      return {};
    }

    if (
      backgroundColor === 'hsl(var(--primary))' ||
      backgroundColor === 'primary'
    )
      return {};
    const textColor = getContrastYIQ(backgroundColor);

    return {
      style: {
        backgroundColor,
        color: textColor,
        borderColor: 'transparent',
      },
    };
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => toast.success('Clicked')}
      disabled={loading}
      loading={loading}
      tooltipText={tooltipText}
      {...getButtonStyle()}
    >
      {size === 'icon' ? <ChevronRight /> : 'Button'}
    </Button>
  );
}
