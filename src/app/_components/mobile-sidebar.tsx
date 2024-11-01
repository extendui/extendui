'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/extendedui/button/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { docsConfig } from '@/config/docs';

import Logo from './logo';
import Sidebar from './sidebar';

type Props = {
  navLinks: { name: string; href: string }[];
};
export default function MobileSidebar({ navLinks }: Props) {
  const [isOpen, setIsOpen] = useState(false); // Add state for sheet open/close

  const handleLinkClick = () => {
    setIsOpen(false); // Close the sheet on link click
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button size="icon" variant={null} className="justify-start">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="h-full sm:max-w-xs xl:hidden"
        aria-describedby={undefined}
      >
        <SheetTitle className="flex items-center justify-between">
          <Logo />
        </SheetTitle>
        <div className="mt-6 flex flex-col items-start justify-start gap-4 px-2 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={
                link.name === 'Templates'
                  ? 'relative cursor-not-allowed text-muted-foreground'
                  : 'relative text-zinc-600 duration-200 hover:text-zinc-900 dark:text-zinc-200'
              }
              onClick={handleLinkClick}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <Sidebar config={docsConfig} props={handleLinkClick} />
      </SheetContent>
    </Sheet>
  );
}
