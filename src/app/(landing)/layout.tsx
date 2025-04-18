import React from 'react';

import { Icons } from '@/components/icons/icons';
import { SiteBanner } from '@/components/site-banner';

import { Navbar } from '../_components/navbar';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteBanner />
      <Navbar
        navLinks={[
          { name: 'Components', href: 'docs/components/button' },
          { name: 'Pricing', href: '/pricing' },
        ]}
        socialLinks={[
          {
            name: 'GitHub',
            href: 'https://github.com/extendui/extendui',
            icon: (
              <Icons.gitHub className="fill-dark h-4 w-4 dark:fill-white" />
            ),
          },
          {
            name: 'Twitter',
            href: 'https://x.com/extendui_pro',
            icon: (
              <Icons.twitter className="fill-dark h-4 w-4 dark:fill-white" />
            ),
          },
        ]}
      />
      {children}
    </>
  );
}
