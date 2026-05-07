// lib/constants.ts
// Single source of truth for business info, services, pricing, areas served.

export const BUSINESS = {
  name: 'Spotless Detailing',
  legalName: 'Spotless Detailing & Valeting',
  tagline: 'Mobile Detailing & Valeting',
  description:
    'Premium mobile car detailing and valeting in Glasgow. Safe wash, deep clean, ceramic protection — we come to you.',
  city: 'Glasgow',
  region: 'Scotland',
  country: 'United Kingdom',
  countryCode: 'GB',
  phone: '+44 7955 733053',
  phoneDisplay: '07955 733053',
  email: 'Spotlessdetailing19@gmail.com', // TODO: confirm
  whatsapp: 'https://wa.me/447955733053',
  instagram: 'https://www.instagram.com/_sl_detailing/',
  url: 'https://sl-detailing.co.uk', // TODO: confirm production URL
  hours: 'Mon–Sat 8:00–18:00',
  founded: '2024',
} as const;

export const SERVICE_AREAS = [
  'Glasgow',
  'East Kilbride',
  'Paisley',
  'Bearsden',
  'Bishopbriggs',
  'Clydebank',
  'Newton Mearns',
  'Giffnock',
  'Hamilton',
  'Motherwell',
  'Cumbernauld',
  'Renfrew',
  'Rutherglen',
  'Cambuslang',
  'Milngavie',
  'Lenzie',
] as const;

export type ServiceSlug = 'safe-wash' | 'valet' | 'deep-clean' | 'maintenance-plan';

export interface Service {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  tagline: string;
  startingPrice: number;
  priceLabel: string;
  duration: string;
  description: string;
  interior?: string[];
  exterior: string[];
  bestFor: string;
  popular?: boolean;
}

export const SERVICES: Service[] = [
  {
    slug: 'safe-wash',
    name: 'Safe Wash',
    shortName: 'Safe Wash',
    tagline: 'Swirl-free exterior refresh',
    startingPrice: 30,
    priceLabel: 'from £30',
    duration: '60–90 min',
    description:
      'A swirl-free exterior wash using prewash, snow foam and the two-bucket method — finished with ceramic sealant and dressed tyres.',
    exterior: [
      'Safe wash (prewash, snow foam, two-bucket method)',
      'Wheels, tyres and arches cleaned',
      'Ceramic sealant applied',
      'Paint dried with plush microfibre',
      'Tyres dressed',
    ],
    bestFor: 'Regular upkeep between deeper details.',
  },
  {
    slug: 'valet',
    name: 'Full Valet',
    shortName: 'Valet',
    tagline: 'Inside and out, restored',
    startingPrice: 60,
    priceLabel: 'from £60',
    duration: '2–3 hours',
    description:
      'A complete inside-and-out clean. Interior hoover, surfaces wiped, glass polished, scent sprayed — exterior safe-washed and dressed.',
    interior: [
      'Thoroughly hoovered',
      'All surfaces cleaned',
      'Glass cleaned',
      'Scent sprayed',
    ],
    exterior: [
      'Wheels and tyres cleaned',
      'Safe wash',
      'Paint dried',
      'Tyres dressed',
    ],
    bestFor: 'Anyone wanting a sharp, fresh-feeling car without going full deep clean.',
    popular: true,
  },
  {
    slug: 'deep-clean',
    name: 'Deep Clean',
    shortName: 'Deep Clean',
    tagline: 'New-car feeling. Restored.',
    startingPrice: 120,
    priceLabel: 'from £120',
    duration: '4–6 hours',
    description:
      'Our flagship detail. Steam-cleaned interior, shampooed seats and carpets, decontaminated paint, ceramic sealant — finished to showroom standard.',
    interior: [
      'Thoroughly hoovered',
      'Surfaces steam cleaned',
      'Seats, carpets and mats shampooed',
      'Door shuts deeply cleaned',
      'Glass cleaned',
      'Carpets striped',
      'Luxury scent sprayed',
    ],
    exterior: [
      'Safe wash (prewash, snow foam, two-bucket method)',
      'Wheels, tyres and arches deeply cleaned',
      'Decontamination of whole exterior (wheels and paint)',
      'Ceramic sealant applied',
      'Paint dried',
      'Tyres dressed',
    ],
    bestFor: 'A neglected car, a pre-sale prep, or that proper "new car" feeling.',
  },
  {
    slug: 'maintenance-plan',
    name: 'Maintenance Plan',
    shortName: 'Maintenance',
    tagline: 'Keep that new-car feeling',
    startingPrice: 0,
    priceLabel: 'Bespoke',
    duration: 'Recurring',
    description:
      "After your car has received our Deep Clean or Protection package it's eligible for our Maintenance Plan — those standards repeated each visit, for a fraction of the cost.",
    exterior: [
      'Same showroom standards as Deep Clean',
      'Visit schedule that suits you (weekly / fortnightly / monthly)',
      'Reduced rate for ongoing customers',
      'Priority booking',
    ],
    bestFor: 'Customers who want their car kept perfect on a schedule.',
  },
];

export const FAQS = [
  {
    q: 'Where do you operate?',
    a: 'We are a mobile detailer based in Glasgow and cover the surrounding areas — East Kilbride, Paisley, Bearsden, Newton Mearns, Hamilton and most of Greater Glasgow. Get in touch with your postcode and we\'ll confirm.',
  },
  {
    q: 'Do you come to me?',
    a: 'Yes — we\'re fully mobile. We bring our own water and power, so all we need is a flat, accessible spot to work. Driveways, car parks and workplaces are all fine.',
  },
  {
    q: 'How long does a deep clean take?',
    a: 'A full Deep Clean is typically 4–6 hours depending on vehicle size and condition. Valets are 2–3 hours and a Safe Wash is 60–90 minutes.',
  },
  {
    q: 'Why is the price "from"?',
    a: 'Pricing is subject to vehicle size and condition. A small hatchback that\'s reasonably tidy will be at our starting price; a heavily soiled 7-seater takes longer and costs a bit more. We always confirm a fixed price before any work begins.',
  },
  {
    q: 'What does the ceramic sealant actually do?',
    a: 'It bonds to the paint to give a slick, hydrophobic layer that beads water, repels dirt and dramatically improves wash-after-wash gloss. It is not a permanent ceramic coating, but it is a serious upgrade on a normal wax.',
  },
  {
    q: 'How do I pay?',
    a: 'Bank transfer or card on completion. Maintenance Plan customers can be invoiced monthly.',
  },
  {
    q: 'How do I book?',
    a: 'Use the booking page, the contact form, WhatsApp or just call. We\'ll confirm a slot and a fixed quote within the day.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Aidan Healy',
    date: '5 months ago',
    quote:
      'Done a brilliant job with my car. Looks brand new. The attention to detail & value for money is outstanding. Nathan is friendly, professional, and works hard. Can\u2019t recommend him highly enough and will certainly be using his services again.',
    rating: 5,
  },
  {
    name: 'Cerys Hanlon',
    date: '5 months ago',
    quote:
      'Excellent service and easy to book. Amazing attention to detail and value for money. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Aidan Craig',
    date: 'a year ago',
    quote:
      'Nathan did an excellent job detailing my car! He was meticulous and thorough, leaving my vehicle looking brand new inside and out. His attention to detail and professionalism really stood out. I highly recommend Nathan to anyone looking for top-notch car detailing services.',
    rating: 5,
  },
  {
    name: 'Craig Lannigan',
    date: 'a year ago',
    quote:
      'Highly recommend for anyone looking for valet or detailing work on their car. I got my mrs this as her car was badly needing it and the results were insane both inside and outside the car. Great mobile service provided by a top guy!',
    rating: 5,
  },
  {
    name: 'Amanda Gilfedder',
    date: '2 years ago',
    quote:
      'I am absolutely delighted with my car. My husband has the monthly maintenance plan and is always delighted with the results. This was my first time having my car cleaned with Spotless Detailing and it literally looks brand new. Nathan\u2019s attention to detail is second to none.',
    rating: 5,
  },
  {
    name: 'Yvonne Hughes',
    date: 'a year ago',
    quote:
      'What an amazing job, my car is like new and that\u2019s not easy on a 7 year old car! Delighted with the job and you\u2019re a pleasure to deal with Nathan! See you next time!',
    rating: 5,
  },
];

// 10 high-intent SEO keywords for Glasgow mobile car detailing.
// Used in metadata, structured data, on-page copy.
export const SEO_KEYWORDS = [
  'mobile car detailing Glasgow',
  'car valeting Glasgow',
  'car detailing Glasgow',
  'mobile valeting Glasgow',
  'ceramic sealant Glasgow',
  'deep clean car Glasgow',
  'car interior cleaning Glasgow',
  'best car detailer Glasgow',
  'professional car wash Glasgow',
  'mobile car wash Glasgow',
];
