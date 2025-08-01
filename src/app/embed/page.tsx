import { EmbedGenerator } from '@/components/EmbedGenerator';
import { Metadata } from 'next';
import { siteMetadata } from '@/lib/config';
export async function generateMetadata({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const params = await searchParams;
  const title = params.title as string || siteMetadata.title;
  const description = params.description as string || siteMetadata.description;
  const image = params.image as string || siteMetadata.image;
  const color = params.color as string || '#a855f7';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    other: {
      'theme-color': color,
    },
  };
}
export default function EmbedPage() {
  return <EmbedGenerator />;
}
