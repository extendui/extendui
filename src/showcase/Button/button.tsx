'use client';

import { Button } from '@/components/ui/button';
import { useEngineSettingsStore } from '@/zustand/stores/useEngineSettings';
import { ChevronRight, Loader2Icon } from 'lucide-react';

export default function ButtonExample() {
  const loading = useEngineSettingsStore((state) => state.loading);
  const variant = useEngineSettingsStore((state) => state.variant);
  const size = useEngineSettingsStore((state) => state.size);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => console.log('clicked')}
        disabled={loading}
      >
        {size === 'icon' ? <ChevronRight /> : 'Button'}
        {loading && <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
    </>
  );
}
