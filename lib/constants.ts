// lib/constants.ts
// Single source of truth for business info, services, pricing, areas served.

export const BUSINESS = {
  name: 'Spotless Detailing',
  legalName: 'Spotless Detailing & Valeting',
  tagline: 'Mobile Detailing & Valeting',
  description:
    'Premium mobile car detailing across Glasgow. Specialising in deep cleans and paint protection.',
  city: 'Glasgow',
  region: 'Scotland',
  country: 'United Kingdom',
  countryCode: 'GB',
  phone: '+44 7955 733053',
  phoneDisplay: '07955 733053',
  email: 'enquiries@spotlessdetailing.co.uk', // TODO: confirm
  whatsapp: 'https://wa.me/447955733053',
  instagram: 'https://www.instagram.com/_sl_detailing/',
  url: 'https://spotlessdetailing.co.uk', // TODO: confirm production URL
  hours: 'Mon–Sat 8:00–18:00',
  founded: '2024',
} as const;

export const SERVICE_AREAS = [
  'Glasgow',
  'Paisley',
  'Bishopbriggs',
  'Newton Mearns',
  'Hamilton',
  'East Kilbride',
  'Bearsden',
  'Clydebank',
  'Giffnock',
  'Motherwell',
  'Rutherglen',
  'Cambuslang',
  'Milngavie',
  'Renfrew',
  'Lanark',
  'Wishaw',
];

export type ServiceSlug =
  | 'safe-wash'
  | 'valet'
  | 'deep-clean'
  | 'polishing-package'
  | 'protection-package'
  | 'maintenance-plan';

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
      'A swirl-free exterior wash using prewash, snow foam and the two-bucket method — finished with a hydrophobic sealant and dressed tyres.',
    exterior: [
      'Safe wash (prewash, snow foam, two-bucket method)',
      'Wheels, tyres and arches cleaned',
      'Hydrophobic sealant applied',
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
    duration: '1.5–2.5 hours',
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
  },
  {
    slug: 'deep-clean',
    name: 'Deep Clean',
    shortName: 'Deep Clean',
    tagline: 'New-car feeling. Restored.',
    startingPrice: 120,
    priceLabel: 'from £120',
    duration: '3–8 hours',
    description:
      'Our flagship detail. Steam-cleaned interior, shampooed seats and carpets, decontaminated paint — finished to showroom standard.',
    interior: [
      'Thoroughly hoovered',
      'Surfaces steam cleaned',
      'Seats, carpets and mats shampooed',
      'Door shuts deeply cleaned',
      'Glass cleaned',
      'Carpets stripped',
      'Luxury scent sprayed',
    ],
    exterior: [
      'Safe wash (prewash, snow foam, two-bucket method)',
      'Wheels, tyres and arches deeply cleaned',
      'Decontamination of whole exterior (wheels and paint)',
      'Hydrophobic sealant applied',
      'Paint dried',
      'Tyres dressed',
    ],
    bestFor: 'A neglected car, a pre-sale prep, or that proper "new car" feeling.',
    popular: true,
  },
  {
    slug: 'polishing-package',
    name: 'Polishing Package',
    shortName: 'Polishing',
    tagline: 'Paint correction & gloss restoration',
    startingPrice: 0,
    priceLabel: 'POA',
    duration: 'Job-dependent',
    description:
      'Restore the gloss, depth and clarity of your paintwork. A multi-stage decontamination and machine polish — optionally locked in with a professional-grade ceramic coating.',
    exterior: [
      'Full exterior safe wash',
      'Chemical decontamination',
      'Clay bar treatment to remove embedded contaminants',
      'Paint polishing stage to achieve required finish',
      'Final panel wipe for a pure, oil-free surface',
      'Optional extra — lock in the new finish with a professional-grade ceramic coating',
    ],
    bestFor: 'Cars with swirl marks, holograms or dull paint — bringing the finish back to better than new.',
  },
  {
    slug: 'protection-package',
    name: 'Protection Package',
    shortName: 'Protection',
    tagline: 'Long-term ceramic coating',
    startingPrice: 0,
    priceLabel: 'POA',
    duration: 'Job-dependent',
    description:
      'A full paint correction and machine polish locked in with a durable ceramic coating. 2, 3 or 5 year coatings available — choose the level of protection that suits.',
    exterior: [
      'Full exterior safe wash',
      'Chemical decontamination',
      'Clay bar treatment to remove embedded contaminants',
      'Machine polishing process to remove required defects',
      'Final panel wipe for a pure, oil-free surface',
      'Application of your choice of professional-grade ceramic coating — 2, 3 or 5 year coatings available',
    ],
    bestFor: 'Long-term, easy-clean paint protection. Years of hydrophobic, dirt-shedding gloss.',
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
      "After your car has had our Deep Clean, Polishing or Protection package, it's eligible for our Maintenance Plan — those standards repeated each visit, on a schedule that suits you, for a fraction of the cost.",
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
    q: 'What vehicles do you detail?',
    a: 'Cars, vans, trucks, caravans, taxis, bikes, quads — all vehicle types. We also offer fleet washing for businesses, with professional invoices supplied.',
  },
  {
    q: 'Do you come to me?',
    a: 'Yes — we\'re fully mobile. We come to you on a schedule that suits — at your home, at your workplace, at your convenience.',
  },
  {
    q: 'How long does a deep clean take?',
    a: 'A full Deep Clean is typically 3–8 hours depending on vehicle size and condition. Valets are 1.5–2.5 hours and a Safe Wash is 60–90 minutes. Polishing and Protection packages are job-dependent.',
  },
  {
    q: 'How is the price calculated?',
    a: 'All vehicles are subject to price adjustments based on vehicle size and condition. Please make your best effort to accurately describe your vehicle to allow for an accurate quote. We always confirm a fixed price before any work begins.',
  },
  {
    q: 'Can you tailor a package to my needs?',
    a: 'Yes — we can tailor bespoke packages to suit many budgets and applications, ensuring every customer receives a service that fits their needs without compromising on quality.',
  },
  {
    q: 'How do I pay?',
    a: 'Bank transfer or cash on completion. Maintenance Plan customers can be invoiced. Business customers receive professional invoices.',
  },
  {
    q: 'How do I book?',
    a: 'Use the booking page, the contact form, WhatsApp or just call. We\'ll confirm a slot and a fixed quote within the day.',
  },
];

// Real Google reviews — preserved verbatim with original phrasing
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
  'ceramic coating Glasgow',
  'paint protection Glasgow',
  'deep clean car Glasgow',
  'car interior cleaning Glasgow',
  'best car detailer Glasgow',
  'fleet washing Glasgow',
];