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
          label: 'soon',
          disabled: true,
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
          disabled: true,
          items: [],
        },
        {
          title: 'Button',
          href: '/docs/components/button',
          items: [
            { title: 'Base', href: '/docs/components/button', items: [] },
            { title: 'Extended', href: '/docs/components/button-extended', items: [] },
          ],
        },
        {
          title: 'Input',
          href: '/docs/components/input',
          items: [
            { title: 'Base', href: '/docs/components/input', items: [] },
          ],
        },
      ],
    },
  ],
};
