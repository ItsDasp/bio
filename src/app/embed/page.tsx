import { EmbedGenerator } from '@/components/EmbedGenerator';
import { Metadata } from 'next';
import { siteMetadata } from '@/lib/config';

export async function generateMetadata({ searchParams }: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}): Promise<Metadata> {
  const params = await searchParams;
  const title = Array.isArray(params.title) ? params.title[0] : params.title ?? siteMetadata.title;
  const description = Array.isArray(params.description) ? params.description[0] : params.description ?? siteMetadata.description;
  const image = Array.isArray(params.image) ? params.image[0] : params.image ?? siteMetadata.image;
  const color = Array.isArray(params.color) ? params.color[0] : params.color ?? '#a855f7';

  return {
    metadataBase: new URL('https://xdasp.me'),
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