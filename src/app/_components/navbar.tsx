'use client';

import Link from 'next/link';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { ModeToggle } from './mode-toggle';
import { CodeXml } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
        <div className="container mx-auto flex items-center justify-between p-5">
          <div className="flex justify-between gap-4">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-zinc-900 duration-200 dark:text-zinc-200"
            >
              <CodeXml className="text-emerald-400" />
              <div className="mr-4 flex items-center justify-center gap-1 font-bold">
                Extend <span className="text-emerald-400">UI</span>
                <Badge variant="outline" className="bg-muted">
                  Beta
                </Badge>
              </div>
            </Link>
            <div className="flex items-center justify-center gap-4 max-sm:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-600 duration-200 hover:text-zinc-900 dark:text-zinc-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
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
