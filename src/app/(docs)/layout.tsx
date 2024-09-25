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
      <div className="bg-gradient dark:bg-gradient-dark min-h-screen bg-repeat">
        <Navbar
          logo="Extend UI"
          navLinks={[
            { name: 'Components', href: '/components/components' },
            { name: 'Templates', href: '/templates' },
          ]}
          socialLinks={[
            {
              name: 'GitHub',
              href: 'https://github.com/extendui/extendui',
              icon: (
                <GitHubIcon className="fill-dark h-4 w-4 dark:fill-white" />
              ),
            },
            {
              name: 'Twitter',
              href: 'https://x.com/extendui_pro',
              icon: <XIcon className="fill-dark h-4 w-4 dark:fill-white" />,
            },
          ]}
        />
        {children}
      </div>
    </>
  );
}
