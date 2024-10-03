'use client';

import { Button } from '@/components/ui/button';
import { useEngineSettingsStore } from '@/zustand/stores/useEngineSettings';
import { ChevronRight, Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ButtonExample() {
  const loading = useEngineSettingsStore((state) => state.loading);
  const variant = useEngineSettingsStore((state) => state.variant);
  const size = useEngineSettingsStore((state) => state.size);
  const backgroundColor = useEngineSettingsStore(
    (state) => state.backgroundColor,
  );

  const bgColorClasses = {
    primary: 'bg-primary hover:bg-primary/90',
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => console.log('clicked')}
      disabled={loading}
      className={cn(
        variant === 'default' &&
          bgColorClasses[backgroundColor as keyof typeof bgColorClasses],
      )}
    >
      {loading ? '' : size === 'icon' ? <ChevronRight /> : 'Button'}
      {loading && (
        <div className="flex items-center">
          <span>Loading...</span>
          <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
        </div>
      )}
    </Button>
  );
}
