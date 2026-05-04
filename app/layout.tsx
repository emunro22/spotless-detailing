import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BUSINESS, SEO_KEYWORDS } from '@/lib/constants';
import { localBusinessJsonLd } from '@/lib/seo';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const body = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#04101F',
};

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: `${BUSINESS.name} | Mobile Car Detailing & Valeting Glasgow`,
    template: `%s | ${BUSINESS.name} Glasgow`,
  },
  description:
    'Premium mobile car detailing and valeting in Glasgow. Safe wash from £30, valet from £60, deep clean from £120 — we come to you.',
  keywords: [...SEO_KEYWORDS],
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} | Mobile Detailing & Valeting Glasgow`,
    description:
      'Premium mobile car detailing in Glasgow. Safe wash, full valet, deep clean and ceramic protection — we come to you.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: BUSINESS.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BUSINESS.name} | Mobile Detailing Glasgow`,
    description:
      'Premium mobile car detailing in Glasgow. We come to you.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: BUSINESS.url },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <head>
        <Script
          id="ld-json-business"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
      </head>
      <body className="bg-midnight-800 text-cream font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
