'use client';
import { useLanguage } from '@/hooks/useLanguage';

type Localized = { es?: { title?: string; description?: string }; en?: { title?: string; description?: string } };
type Props = {
  title: string;
  description?: string;
  localized?: Localized;
  esHtml: string;
  enHtml?: string;
};

export default function BlogArticle({ title, description, localized, esHtml, enHtml }: Props) {
  const { language } = useLanguage();
  const html = language === 'en' ? (enHtml || esHtml) : esHtml;
  const titleToShow = language === 'en' ? (localized?.en?.title ?? title) : (localized?.es?.title ?? title);
  const descToShow = language === 'en' ? (localized?.en?.description ?? description) : (localized?.es?.description ?? description);
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4">{titleToShow}</h1>
      {descToShow && <p className="text-white/70 mb-6">{descToShow}</p>}
      <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
