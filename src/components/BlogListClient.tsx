'use client';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import type { BlogPost } from '@/lib/blog';

type Props = {
  posts: Omit<BlogPost, 'content'>[];
};

export default function BlogListClient({ posts }: Props) {
  const { t, language } = useLanguage();
  return (
    <div className="relative z-10 py-24 px-6">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <h1 className="text-white font-bold text-2xl">{t.blog}</h1>
        <div className="space-y-4">
          {posts.length === 0 && (
            <p className="text-white/70">No posts yet.</p>
          )}
          {posts.map((post) => {
            const title = language === 'en' ? (post.localized?.en?.title ?? post.title) : (post.localized?.es?.title ?? post.title);
            const desc = language === 'en' ? (post.localized?.en?.description ?? post.description) : (post.localized?.es?.description ?? post.description);
            return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block backdrop-blur-2xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <h2 className="text-white text-xl font-semibold mb-1">{title}</h2>
              {desc && (
                <p className="text-white/70 text-sm">{desc}</p>
              )}
            </Link>
          );})}
        </div>
      </div>
    </div>
  );
}
