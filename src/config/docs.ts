import { type MainNavItem, type SidebarNavItem } from '@/types/nav.types';

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Components',
      href: '/docs/components/button',
    },
    {
      title: 'Documentation',
      href: '/docs',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Installation',
          href: '/docs/installation',
          items: [],
        },
        {
          title: 'Introduction',
          href: '/docs',
          items: [],
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'Banner',
          href: '/docs/components/banner',
          items: [
            { title: 'Base', href: '/docs/components/banner', items: [] },
            {
              title: 'Extended',
              href: '/docs/components/banner-extended',
              items: [],
            },
            {
              title: 'Motion',
              href: '/docs/components/banner-motion',
              items: [],
            },
          ],
        },
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
            {
              title: 'Motion',
              href: '/docs/components/button-motion',
              items: [],
            },
          ],
        },

        {
          title: 'Command',
          href: '/docs/components/command',
          items: [
            { title: 'Base', href: '/docs/components/command', items: [] },
            {
              title: 'Extended',
              href: '/docs/components/command-extended',
              items: [],
            },
          ],
        },
        {
          title: 'Date Picker',
          href: '/docs/components/date-picker',
          items: [],
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
          title: 'Select',
          href: '/docs/components/select',
          items: [
            { title: 'Base', href: '/docs/components/select', items: [] },
            {
              title: 'Extended',
              href: '/docs/components/select-extended',
              items: [],
            },
          ],
        },
        {
          title: 'Stepper',
          href: '/docs/components/stepper',
          items: [
            { title: 'Base', href: '/docs/components/stepper', items: [] },
          ],
        }
      ],
    },
    {
      title: 'Blocks',
      items: [
        {
          title: 'Cards',
          href: '/docs/blocks/pricing-card',
          items: [
            {
              title: 'Credit Card',
              href: '/docs/blocks/cards/credit-card',
              items: [],
            },
            {
              title: 'Pricing Card',
              href: '/docs/blocks/cards/pricing-card',
              items: [],
            },
          ],
        },
        {
          title: 'Dialogs',
          href: '/docs/blocks/alert-dialogs',
          items: [
            {
              title: 'Alert Dialogs',
              href: '/docs/blocks/dialogs/alert-dialogs',
              items: [],
            },
          ],
        },
        {
          title: 'File Upload',
          href: '/docs/blocks/file-upload',
          items: [],
        },
        {
          title: 'Forms',
          href: '/docs/blocks/forms',
          items: [
            {
              title: 'Sign In',
              href: '/docs/blocks/forms/sign-in',
              items: [],
            },
          ],
        },
      ],
    },
  ],
};
