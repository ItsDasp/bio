import { EmbedGenerator } from '@/components/EmbedGenerator';
import { Metadata } from 'next';
import { siteMetadata } from '@/lib/config';

export const metadata: Metadata = {
  title: `${siteMetadata.title} - Embed Generator`,
  description: 'Generate custom embeds for social media platforms',
  openGraph: {
    title: `${siteMetadata.title} - Embed Generator`,
    description: 'Generate custom embeds for social media platforms',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteMetadata.title} - Embed Generator`,
    description: 'Generate custom embeds for social media platforms',
  },
};

export default function EmbedPage() {
  return <EmbedGenerator />;
}