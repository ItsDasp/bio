import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Header } from '@/components/Header';
import { MusicProvider } from '@/contexts/MusicContext';
import { GlobalMiniPlayer } from '@/components/GlobalMiniPlayer';
import { siteMetadata } from '@/lib/config';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  metadataBase: new URL('https://xdasp.me'),
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  icons: {
    icon: [
      { url: '/avatar.jpg', type: 'image/jpeg' },
      { url: '/favicon.ico', type: 'image/x-icon' },
      
    ],
    shortcut: '/avatar.jpeg',
    apple: '/avatar.jpeg',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteMetadata.url,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.image,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.image],
    creator: '@xdasp_',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-google-verification-code',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <MusicProvider>
          <Header />
          {children}
          <GlobalMiniPlayer />
        </MusicProvider>
      </body>
    </html>
  );
}
