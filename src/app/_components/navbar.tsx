'use client';

import Link from 'next/link';
import React, { type ReactNode, useEffect, useRef, useState } from 'react';

import { CommandMenu } from '@/components/command-menu';
import { Button } from '@/components/extendui/button';

import Logo from './logo';
import MobileSidebar from './mobile-sidebar';
import { ModeToggle } from './mode-toggle';

type Props = {
  navLinks: { name: string; href: string }[];
  socialLinks: { name: string; href: string; icon?: ReactNode }[];
};

export const Navbar = ({ navLinks, socialLinks }: Props) => {
  const ref = useRef<HTMLElement>(null);

  const [isIntersecting, setIntersecting] = useState<boolean | undefined>(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry?.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 h-16 backdrop-blur duration-200 ${
          isIntersecting
            ? 'border-transparent bg-zinc-900/0'
            : 'bg-zinc-900/500 border-zinc-800'
        }`}
      >
        <div className="mx-auto flex w-screen max-w-11xl items-center justify-between p-5 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-4">
            <MobileSidebar navLinks={navLinks} />
            <Logo className="max-md:hidden" />
            <div className="flex items-center justify-center gap-4 max-md:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={
                    link.name === 'Templates'
                      ? 'relative cursor-not-allowed text-muted-foreground max-md:hidden'
                      : 'relative text-zinc-600 duration-200 hover:text-zinc-900 dark:text-zinc-200'
                  }
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 max-md:w-full">
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
