import { MainNavItem, SidebarNavItem } from '@/types/nav.types';

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Components',
      href: '/docs/components/button',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
          label: 'Soon',
          items: [],
        },
        {
          title: 'Installation',
          href: '/docs/installation',
          items: [],
        },
        {
          title: 'CLI',
          href: '/docs/cli',
          items: [],
        },
      ],
    },
    {
      title: 'Installation',
      items: [
        {
          title: 'Next.js',
          href: '/docs/installation/next',
          items: [],
        },
        {
          title: 'Manual',
          href: '/docs/installation/manual',
          items: [],
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'Accordion',
          href: '/docs/components/accordion',
          items: [],
        },
        {
          title: 'Button',
          href: '/docs/components/button',
          items: [],
        },
      ],
    },
  ],
};
