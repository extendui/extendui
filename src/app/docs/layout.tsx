import React from 'react';
import { Icons } from '@/components/icons/icons';
import { Navbar } from '../_components/navbar';
import { docsConfig } from '@/config/docs';
import Sidebar from '../_components/sidebar';
import Layout from '../_components/layout';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar
        navLinks={[
          { name: 'Components', href: '/docs/components/button' },
          { name: 'Templates', href: '#' },
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
      <Layout sidebar={<Sidebar config={docsConfig} />} children={children} />
    </>
  );
}
