import { ThemeProvider } from '@/providers/themeProvider';
import '@/styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { Navbar } from './_components/Navbar/navbar';
import Layout from './_components/Layout/layout';
import Sidebar from './_components/Sidebar/sidebar';
import { Github, Twitter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Extend UI',
  description: 'Extend UI is design website',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ThemeProvider>
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
                  icon: <Github className='h-[1.2rem] w-[1.2rem]' />,
                },
                {
                  name: 'Twitter',
                  href: 'https://x.com/extendui_pro',
                  icon: <Twitter className="h-[1.2rem] w-[1.2rem]" />,
                },
              ]}
            />
            <Layout sidebar={<Sidebar items={[]} />} children={children} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
