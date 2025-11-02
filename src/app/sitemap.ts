import { siteMetadata } from '@/lib/config';
export default function sitemap() {
  const baseUrl = siteMetadata.url;
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: baseUrl + 'projects/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
