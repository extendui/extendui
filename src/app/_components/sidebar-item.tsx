'use client';

import { cn } from '@/lib/utils';
import { SidebarNavItem } from '@/types/nav.types';
import Link from 'next/link';

type Props = {
  items: SidebarNavItem[];
  pathname: string | null;
};

export default function SidebarItem({ items, pathname }: Props) {
  return items?.length ? (
    <div className="text-md grid grid-flow-row auto-rows-max">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground',
              item.disabled && 'cursor-not-allowed opacity-60',
              pathname === item.href
                ? 'font-medium text-foreground'
                : 'text-muted-foreground',
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
            aria-disabled={item.disabled}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-emerald-400 px-1.5 py-0.5 text-xs leading-none text-white no-underline group-hover:no-underline dark:text-black">
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              'group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground',
              item.disabled && 'cursor-not-allowed opacity-60',
            )}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-emerald-400 px-1.5 py-0.5 text-xs leading-none text-white no-underline group-hover:no-underline dark:text-black">
                {item.label}
              </span>
            )}
          </span>
        ),
      )}
    </div>
  ) : null;
}
