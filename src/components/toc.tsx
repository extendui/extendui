'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { useMounted } from '@/hooks/use-mounted';
import { type TableOfContents } from '@/lib/toc';
import { cn } from '@/lib/utils';

import { ScrollArea } from './ui/scroll-area';
type TocProps = {
  toc: TableOfContents;
};

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const observer = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    const elements = itemIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -65% 0px',
        threshold: 0.1,
      },
    );

    elements.forEach((el) => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [itemIds]);

  return activeId;
}

type TreeProps = {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
  itemIds: string[];
};

function Tree({ tree, level = 1, activeItem, itemIds }: TreeProps) {
  const activeIndex = itemIds.indexOf(activeItem!);
  const progress = (activeIndex + 1) / itemIds.length;

  return tree?.items?.length && level < 3 ? (
    <div className="relative">
      {level == 1 && (
        <motion.div
          className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-accent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: progress }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}

      <ul className={cn('m-0 list-none text-base', { 'pl-4': level !== 1 })}>
        {tree.items.map((item) => {
          const itemId = item.url?.split('#')[1];
          const isActive = itemId === activeItem;

          return (
            <motion.li
              key={itemId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href={item.url}
                className={cn(
                  `block border-l-2 border-transparent px-4 py-2 transition-colors`,
                  isActive ? 'text-accent' : 'text-muted-foreground',
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(itemId);
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                {item.title}
              </a>

              {item.items?.length ? (
                <Tree
                  tree={item}
                  level={level + 1}
                  activeItem={activeItem}
                  itemIds={itemIds}
                />
              ) : null}
            </motion.li>
          );
        })}
      </ul>
    </div>
  ) : null;
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [
              item.url,
              ...(item.items?.map((subItem) => subItem.url) || []),
            ])
            .filter(Boolean)
            .map((id) => id?.split('#')[1])
        : [],
    [toc],
  );

  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!mounted || !toc?.items?.length) {
    return null;
  }

  return (
    <aside className="sticky top-5 ml-8 h-[calc(100vh-14rem)] w-64">
      <ScrollArea className="h-full pb-4">
        <nav aria-label="Table of contents">
          <p className="mb-2 text-lg font-semibold">On This Page</p>
          <Tree tree={toc} activeItem={activeHeading} itemIds={itemIds} />
        </nav>
      </ScrollArea>
    </aside>
  );
}
