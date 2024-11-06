import { type MetadataRoute } from 'next'

import { docsConfig } from '@/config/docs'



export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = 'https://www.extend-ui.com'

  const pages = docsConfig.sidebarNav.map((page) => 
      page.items.map((item) => {
        return {
          url: `${baseUrl}${item.href}`,
          lastModified: new Date(),
        }
      })
  )
  
  

  console.log(pages);
  


  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },

  ]
}