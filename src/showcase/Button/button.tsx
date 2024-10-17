'use client';

import { Button } from '@/components/ui/button';
import { getContrastYIQ } from '@/hooks/use-getContrast';
import { useEngineSettingsStore } from '@/zustand/stores/useEngineSettings';
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

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

    if (backgroundColor === 'hsl(var(--primary))' || 'primary') return {};

    console.log(backgroundColor);

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

  const buttonExampleCode = `
import { Button } from '@/components/ui/button';

function ExampleButton() {
return <Button variant={'${variant}'} size={'${size}'} loading={${loading}} disabled={${loading}} tooltipText={'${tooltipText}'}>Button</Button>;
}
`;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => toast.success('Clicked')}
      disabled={loading}
      loading={loading}
      tooltipText={tooltipText}
      {...buttonStyle}
    >
      {size === 'icon' ? <ChevronRight /> : 'Button'}
    </Button>
  );
}
