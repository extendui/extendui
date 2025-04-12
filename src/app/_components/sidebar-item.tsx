'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import {
  type NavItemWithChildren,
  type SidebarNavItem,
} from '@/types/nav.types';

type Props = {
  items: SidebarNavItem['items'];
  pathname: string | null;
  onClickProp?: () => void;
};

export default function SidebarItem({ items, pathname, onClickProp }: Props) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleAccordion = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const renderItem = (item: NavItemWithChildren, index: number) => {
    const hasSubItems = item.items && item.items.length > 0;

    const itemClasses = cn(
      ' group flex w-full items-center text-base rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:no-underline hover:text-foreground',
      item.disabled && 'cursor-not-allowed opacity-60',
      pathname === item.href
        ? 'font-medium text-foreground'
        : 'text-muted-foreground',
    );

    if (hasSubItems) {
      return (
        <Accordion
          key={index}
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
        >
          <AccordionItem value={`item-${index}`} className="border-none">
            <AccordionTrigger
              onClick={() => toggleAccordion(`item-${index}`)}
              className={itemClasses}
            >
              {item.title}
              {item.label && (
                <span className="bg-accent ml-2 rounded-md px-1.5 py-0.5 text-base leading-none text-white no-underline group-hover:no-underline dark:text-black">
                  {item.label}
                </span>
              )}
            </AccordionTrigger>
            <AccordionContent>
              {item.items?.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subItem.href!}
                  className={cn(
                    'group hover:bg-muted hover:text-foreground flex w-full items-center rounded-md border border-transparent px-4 py-1 text-base',
                    subItem.disabled && 'cursor-not-allowed opacity-60',
                    pathname === subItem.href
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground',
                  )}
                  onClick={onClickProp}
                >
                  {subItem.title}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    } else {
      return (
        <Link
          key={index}
          href={item.href || '#'}
          className={cn(itemClasses)}
          onClick={onClickProp}
        >
          {item.title}
          {item.label && (
            <span className="bg-accent ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none text-white no-underline group-hover:no-underline dark:text-black">
              {item.label}
            </span>
          )}
        </Link>
      );
    }
  };

  return items?.length ? (
    <div className="mr-4 grid grid-flow-row auto-rows-max text-base">
      {items.map((item, index) => renderItem(item, index))}
    </div>
  ) : null;
}
