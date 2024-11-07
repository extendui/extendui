import { type MetadataRoute } from 'next'

import { docsConfig } from '@/config/docs'



export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = 'https://www.extend-ui.com'

 const seenUrls = new Set<string>();

 const pages = [
   
    ...docsConfig.sidebarNav.flatMap(nav => 
      nav.items.flatMap(item => {
        const itemPages = [
          {
            url: baseUrl + item.href,
            lastModified: new Date(),
          }
        ];
        seenUrls.add(itemPages[0].url);

        const nestedPages = item.items.map(nestedItem => {
          const nestedPage = {
            url: baseUrl + nestedItem.href,
            lastModified: new Date(),
          };
          if (!seenUrls.has(nestedPage.url)) {
            seenUrls.add(nestedPage.url);
            return nestedPage;
          }
          return null; // Prevent duplication
        }).filter(Boolean);// Remove null values

  return [itemPages[0], ...nestedPages]; // Ensure itemPages is always included
      })
    ).filter(page => page) // Remove any undefined pages
  ].filter(page => page !== null); // Final filter to



  

  console.log(pages);
  


  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
   ...pages
  ]
}