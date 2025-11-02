import { EmbedGenerator } from '@/components/EmbedGenerator';
import { Metadata } from 'next';
import { siteMetadata } from '@/lib/config';

type Props = {
  params: Promise<{ params: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Función para generar metadatos dinámicos
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // Await searchParams since it's a Promise in Next.js 15
  const search = await searchParams;
  
  // Extraer parámetros de la URL
  const title = search.title as string || siteMetadata.title;
  const description = search.description as string || siteMetadata.description;
  const image = search.image as string || `${siteMetadata.url}avatar.jpg`;
  const color = search.color as string || '#a855f7';

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
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

// Generar rutas estáticas para combinaciones comunes
export async function generateStaticParams() {
  // Generar algunas combinaciones comunes para pre-renderizar
  return [
    { params: ['default'] },
    { params: ['music'] },
    { params: ['bio'] },
    { params: ['contact'] },
  ];
}
