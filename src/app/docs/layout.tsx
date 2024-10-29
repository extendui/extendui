import { type Metadata } from 'next';
import React from 'react';

import { Icons } from '@/components/icons/icons';
import { docsConfig } from '@/config/docs';
import { siteConfig } from '@/config/site';

import Layout from '../_components/layout';
import { Navbar } from '../_components/navbar';
import Sidebar from '../_components/sidebar';

export const metadata: Metadata = {
  title: `Docs | ${siteConfig.name}`,
  description: `Read docs about ${siteConfig.keywords.join(', ')}`,
  openGraph: {
    title: `Dpcs | ${siteConfig.name}`,
    description: `Read docs about ${siteConfig.keywords.join(', ')}`,
    type: 'website',
    url: `${siteConfig.url}/docs`,
  },
};

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
            href: siteConfig.links.github,
            icon: (
              <Icons.gitHub className="fill-dark h-4 w-4 dark:fill-white" />
            ),
          },
          {
            name: 'Twitter',
            href: siteConfig.links.twitter,
            icon: (
              <Icons.twitter className="fill-dark h-4 w-4 dark:fill-white" />
            ),
          },
        ]}
      />
      <Layout sidebar={<Sidebar config={docsConfig} />}>{children}</Layout>
    </>
  );
}
