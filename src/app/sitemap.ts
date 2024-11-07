import { type MetadataRoute } from 'next';

import { docsConfig } from '@/config/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.extend-ui.com';

  const seenUrls = new Set<string>();

  const pages = [
    ...docsConfig.sidebarNav
      .flatMap((nav) =>
        nav.items.flatMap((item) => {
          const itemPages = [
            {
              url: baseUrl + item.href,
              lastModified: new Date(),
            },
          ];
          seenUrls.add(itemPages[0].url);

          const nestedPages = item.items
            .map((nestedItem) => {
              const nestedPage = {
                url: baseUrl + nestedItem.href,
                lastModified: new Date(),
              };
              if (!seenUrls.has(nestedPage.url)) {
                seenUrls.add(nestedPage.url);
                return nestedPage;
              }
              return null;
            })
            .filter(Boolean);

          return [itemPages[0], ...nestedPages];
        }),
      )
      .filter((page) => page),
  ].filter((page) => page !== null);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...pages,
  ];
}
