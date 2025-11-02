import type { Metadata } from 'next';
import { getPostSlugs, getPostBySlug, markdownToHtml } from '@/lib/blog';
import AccessibilityProvider from '@/components/AccessibilityProvider';
import BlogArticle from '@/components/BlogArticle';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  return {
    title: post?.meta.title ?? params.slug,
    description: post?.meta.description ?? '',
  };
}

async function BlogPostContent({ slug }: { slug: string }) {
  const data = getPostBySlug(slug);
  if (!data) return null;
  const esMd = data.sections['es'] ?? data.markdown;
  const enMd = data.sections['en'] ?? '';
  const [esHtml, enHtml] = await Promise.all([
    markdownToHtml(esMd),
    enMd ? markdownToHtml(enMd) : Promise.resolve(''),
  ]);
  return (
    <div className="relative z-10 py-24 px-6">
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <BlogArticle title={data.meta.title} description={data.meta.description} localized={data.meta.localized} esHtml={esHtml} enHtml={enHtml} />
        </div>
      </div>
    </div>
  );
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <AccessibilityProvider>
      <BlogPostContent slug={params.slug} />
    </AccessibilityProvider>
  );
}
