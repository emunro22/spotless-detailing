// lib/seo.ts
import type { Metadata } from 'next';
import { BUSINESS, SEO_KEYWORDS, SERVICES, SERVICE_AREAS } from './constants';

export function buildMetadata({
  title,
  description,
  path = '',
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${BUSINESS.url}${path}`;
  const ogImage = image ?? `${BUSINESS.url}/og-image.jpg`;

  return {
    metadataBase: new URL(BUSINESS.url),
    title,
    description,
    keywords: [...SEO_KEYWORDS],
    authors: [{ name: BUSINESS.name }],
    creator: BUSINESS.name,
    publisher: BUSINESS.name,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: BUSINESS.name }],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}

// JSON-LD: AutoDetailing local business + services + FAQ.
// Inject in root layout.
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    '@id': `${BUSINESS.url}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: BUSINESS.url,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    image: `${BUSINESS.url}/og-image.jpg`,
    logo: `${BUSINESS.url}/logo.png`,
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.countryCode,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [BUSINESS.instagram].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Car Detailing Services',
      itemListElement: SERVICES.filter((s) => s.startingPrice > 0).map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
        },
        priceCurrency: 'GBP',
        price: s.startingPrice,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: s.startingPrice,
          priceCurrency: 'GBP',
          minPrice: s.startingPrice,
        },
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '24',
    },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
