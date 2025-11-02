import { getAllPosts } from '@/lib/blog';
import AccessibilityProvider from '@/components/AccessibilityProvider';
import BlogListClient from '@/components/BlogListClient';

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <AccessibilityProvider>
      <BlogListClient posts={posts} />
    </AccessibilityProvider>
  );
}
