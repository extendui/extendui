import { Github, Twitter } from 'lucide-react';
import { Navbar } from '../_components/navbar';

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
            { name: 'Components', href: '/components' },
            { name: 'Templates', href: '/templates' },
          ]}
          socialLinks={[
            {
              name: 'GitHub',
              href: 'https://github.com/extendui/extendui',
              icon: <Github className="h-[1.2rem] w-[1.2rem]" />,
            },
            {
              name: 'Twitter',
              href: 'https://x.com/extendui_pro',
              icon: <Twitter className="h-[1.2rem] w-[1.2rem]" />,
            },
          ]}
        />
        {children}
      </div>
    </>
  );
}
