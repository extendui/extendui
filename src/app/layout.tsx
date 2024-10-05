import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/providers/themeProvider';
import '@/styles/globals.css';
import '@/styles/mdx.css';
import { GeistSans } from 'geist/font/sans';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extend UI',
  description: 'Extend UI is a design system and component library',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-website.com',
    siteName: 'Extend UI',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@your_twitter_handle',
  },
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
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
