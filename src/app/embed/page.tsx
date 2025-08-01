import { EmbedGenerator } from '@/components/EmbedGenerator';
import { Metadata } from 'next';
import { siteMetadata } from '@/lib/config';

const siteUrl = "https://xdasp.me";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const title = Array.isArray(searchParams.title) ? searchParams.title[0] : searchParams.title || siteMetadata.title;
  const description = Array.isArray(searchParams.description) ? searchParams.description[0] : searchParams.description || siteMetadata.description;
  const image = Array.isArray(searchParams.image) ? searchParams.image[0] : searchParams.image || siteMetadata.image;
  const color = Array.isArray(searchParams.color) ? searchParams.color[0] : searchParams.color || '#a855f7';

  return {
    metadataBase: new URL(siteUrl),  // Aquí se define la base para URLs absolutas
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
