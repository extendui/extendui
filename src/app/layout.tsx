import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { Toaster } from '@/components/ui/sonner';
import { siteConfig } from '@/config/site';
import { CSPostHogProvider } from '@/providers/postHogProvider';
import { ReactQueryProvider } from '@/providers/reactQueryProvider';
import { ThemeProvider } from '@/providers/themeProvider';

import '@/styles/globals.css';
import '@/styles/mdx.css';

import Footer from './_components/footer';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
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
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Extend UI - Reusable components built with shadcn/ui',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    title: 'extendui_pro',
    card: 'summary_large_image',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

function generateSiteStructure() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ExtendUI',
    url: 'https://extend-ui.com',
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://extend-ui.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://www.extend-ui.com/docs/installation',
      'https://github.com/extendui',
      'https://x.com/extendui_pro',
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateSiteStructure()),
          }}
        />
      </head>
      <body>
        <CSPostHogProvider>
          <ReactQueryProvider>
            <ThemeProvider>
              {children}
              <Footer />
              <SpeedInsights />
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}