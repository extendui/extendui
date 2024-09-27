import GitHubIcon from '@/components/icons/github';
import { Navbar } from '../_components/navbar';
import XIcon from '@/components/icons/x';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar
        navLinks={[
          { name: 'Components', href: '/components/button' },
          { name: 'Templates', href: '#' },
        ]}
        socialLinks={[
          {
            name: 'GitHub',
            href: 'https://github.com/extendui/extendui',
            icon: <GitHubIcon className="fill-dark h-4 w-4 dark:fill-white" />,
          },
          {
            name: 'Twitter',
            href: 'https://x.com/extendui_pro',
            icon: <XIcon className="fill-dark h-4 w-4 dark:fill-white" />,
          },
        ]}
      />
      {children}
    </>
  );
}
