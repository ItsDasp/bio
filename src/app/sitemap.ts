import { siteMetadata } from '@/lib/config';
import { getAllPosts } from '@/lib/blog';

export default function sitemap() {
  const base = siteMetadata.url.endsWith('/') ? siteMetadata.url : siteMetadata.url + '/';
  const posts = getAllPosts();
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: base + 'projects/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: base + 'blog/' + p.slug + '/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
