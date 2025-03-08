import Link from 'next/link';
import React, { type ReactNode } from 'react';

import { CommandMenu } from '@/components/command-menu';
import { Button } from '@/components/extendui/button';
import { cn } from '@/lib/utils';

import Logo from './logo';
import MobileSidebar from './mobile-sidebar';
import { ModeToggle } from './mode-toggle';

type Props = {
  navLinks: { name: string; href: string }[];
  socialLinks: { name: string; href: string; icon?: ReactNode }[];
};

export const Navbar = ({ navLinks, socialLinks }: Props) => {
  return (
    <header
      className="sticky top-0 z-40 shadow-xl w-full border-b border-border bg-background/40 backdrop-blur-lg supports-backdrop-blur:bg-background/90"
    >
      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileSidebar navLinks={navLinks} />
            <Logo className="max-md:hidden" />
            <nav className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-200',
                    link.name === 'Templates' &&
                    'cursor-not-allowed text-muted-foreground',
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <CommandMenu />
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button variant="ghost" size="icon">
                  {link.icon}
                </Button>
              </Link>
            ))}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};