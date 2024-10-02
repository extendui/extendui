'use client';

import SidebarItem from './sidebar-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DocsConfig } from '@/config/docs';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type Props = {
  config: DocsConfig;
};

export default function Sidebar({ config }: Props) {
  const pathname = usePathname();
  const items = useMemo(() => config.sidebarNav, [config.sidebarNav]);

  return (
    <ScrollArea className="h-full">
      <div className="w-full">
        {items.map((item, index) => (
          <div key={index} className={cn('pb-4')}>
            <h4 className="mb-1 rounded-md px-2 py-1 text-lg font-semibold">
              {item.title}
            </h4>
            {item?.items?.length && (
              <SidebarItem items={item.items} pathname={pathname} />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
