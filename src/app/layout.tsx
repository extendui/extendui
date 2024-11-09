import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
        <ReactQueryProvider>
          <ThemeProvider>
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
          <Toaster richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
