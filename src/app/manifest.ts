import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Extend UI',
    short_name: 'Extend UI',
    description:
      'Beautifully designed landing page components built with React & Tailwind CSS.',

    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#059669',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
