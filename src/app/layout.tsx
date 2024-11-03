import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { Toaster } from 'sonner';

import { siteConfig } from '@/config/site';
import { ReactQueryProvider } from '@/providers/reactQueryProvider';
import { ThemeProvider } from '@/providers/themeProvider';

import '@/styles/globals.css';
import '@/styles/mdx.css';

import Footer from './_components/footer';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'extendui',
      url: siteConfig.links.github,
    },
  ],
  creator: 'extendui',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    title: 'extendui_pro',
    card: 'summary_large_image',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ReactQueryProvider>
          <ThemeProvider>
            {children}
            <Footer />
          </ThemeProvider>
          <Toaster richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
