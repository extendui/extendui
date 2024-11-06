import { type MainNavItem, type SidebarNavItem } from '@/types/nav.types';

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
          href: '/docs/#',
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
          title: 'Button',
          href: '/docs/components/button',
          items: [
            { title: 'Base', href: '/docs/components/button', items: [] },
            {
              title: 'Extended',
              href: '/docs/components/button-extended',
              items: [],
            },
          ],
        },
        {
          title: 'Input',
          href: '/docs/components/input',
          items: [
            { title: 'Base', href: '/docs/components/input', items: [] },
            {
              title: 'Extended',
              href: '/docs/components/input-extended',
              items: [],
            },
          ],
        },
        {
          title: 'Date Picker',
          href: '/docs/components/date-picker',
          items: [
            { title: 'Base', href: '/docs/components/date-picker', items: [] },
          ],
        },
      ],
    },
    {
      title: 'Blocks',
      items: [
        {
          title: 'Cards',
          items: [
            {
              title: 'Pricing Card',
              href: '/docs/blocks/pricing-card',
              items: [],
            },
            {
              title: 'Credit Card',
              href: '/docs/blocks/credit-card',
              items: [],
            },
            {
              title: 'File Upload',
              href: '/docs/blocks/file-upload',
              items: [],
            },
          ],
        },
      ],
    },
  ],
};
