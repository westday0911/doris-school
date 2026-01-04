import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/member/', '/auth/'],
    },
    sitemap: 'https://doris-ai-academy.com/sitemap.xml',
  };
}

