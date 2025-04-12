import { type MetadataRoute } from 'next';

import { docsConfig } from '@/config/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.extend-ui.com';
  const seenUrls = new Set<string>();

  // Add the homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];

  // Safely handle the sidebar navigation
  if (docsConfig?.sidebarNav?.length) {
    docsConfig.sidebarNav.forEach((nav) => {
      // Handle top level items
      if (nav.items?.length) {
        nav.items.forEach((item) => {
          if (item.href && !seenUrls.has(baseUrl + item.href)) {
            routes.push({
              url: baseUrl + item.href,
              lastModified: new Date(),
            });
            seenUrls.add(baseUrl + item.href);
          }

          // Handle nested items
          if (item.items?.length) {
            item.items.forEach((nestedItem) => {
              if (nestedItem.href && !seenUrls.has(baseUrl + nestedItem.href)) {
                routes.push({
                  url: baseUrl + nestedItem.href,
                  lastModified: new Date(),
                });
                seenUrls.add(baseUrl + nestedItem.href);
              }
            });
          }
        });
      }
    });
  }

  return routes;
}
