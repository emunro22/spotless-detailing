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
  url: 'https://sl-detailing.co.uk',
  hours: 'Mon–Sat 8:00–18:00',
  founded: '2024',
} as const;

export const SERVICE_AREAS = [
  'Uddingston',
  'Bothwell',
  'Viewpark',
  'Bellshill',
  'Cambuslang',
  'Rutherglen',
  'Blantyre',
  'Holytown',
  'Bargeddie',
  'Baillieston',
  'Mount Vernon',
  'Hamilton',
  'Motherwell',
  'Wishaw',
  'East Kilbride',
  'Coatbridge',
  'Airdrie',
  'Glasgow',
  'Chapelhall',
  'Tollcross',
  'Shettleston',
  'Parkhead',
  'Bishopbriggs',
  'Newton Mearns',
  'Bearsden',
  'Giffnock',
  'Paisley',
  'Clydebank',
  'Milngavie',
  'Renfrew',
  'Lanark',
  'Kirkintilloch',
  'Carluke',
  'Larkhall',
];

export interface CleaningService {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
}

export const CLEANING_SERVICES: CleaningService[] = [
  {
    slug: 'pressure-washing',
    name: 'Pressure Washing',
    shortName: 'Pressure Washing',
    tagline: 'High-performance surface cleaning',
    description:
      'Professional pressure washing for driveways, patios, paths, decking and external surfaces. We remove years of dirt, algae, moss and grime — restoring surfaces to their original condition.',
    features: [
      'Driveways — block paving, tarmac, concrete, gravel',
      'Patios & slabs — natural stone, porcelain, flagstone',
      'Decking — composite and timber',
      'Paths, steps and walkways',
      'Walls, fencing and retaining walls',
      'Re-sanding of block paving joints',
    ],
    bestFor: 'Homeowners and businesses wanting surfaces restored to like-new condition.',
  },
  {
    slug: 'commercial-cleaning',
    name: 'Commercial Cleaning',
    shortName: 'Commercial',
    tagline: 'First impressions matter',
    description:
      'Professional exterior cleaning for restaurants, hotels, offices, retail units and commercial premises. We keep your business looking sharp and inviting — scheduled around your hours.',
    features: [
      'Restaurant & hospitality frontage cleaning',
      'Shopfront and retail unit washing',
      'Office building exterior cleaning',
      'Car park and forecourt pressure washing',
      'Signage and canopy cleaning',
      'Scheduled maintenance contracts available',
    ],
    bestFor: 'Restaurants, hotels, shops and offices that need to look their best.',
  },
  {
    slug: 'domestic-cleaning',
    name: 'Domestic Cleaning',
    shortName: 'Domestic',
    tagline: 'Your home, spotless outside',
    description:
      'Complete exterior cleaning for your home. From render and roughcast washing to driveway and patio cleaning — we handle everything outside so you don\'t have to.',
    features: [
      'Render, roughcast and harling cleaning',
      'UPVC fascia, soffit and cladding washing',
      'Conservatory roof and panel cleaning',
      'Driveway and patio pressure washing',
      'Garden furniture and BBQ cleaning',
      'Wheelie bin cleaning',
    ],
    bestFor: 'Homeowners wanting the full exterior of their property refreshed.',
  },
  {
    slug: 'building-washing',
    name: 'Building Washing',
    shortName: 'Building Wash',
    tagline: 'Facades restored, professionally',
    description:
      'Specialist building and facade cleaning for commercial and residential properties. Soft wash and pressure wash techniques tailored to the surface — stonework, render, cladding and more.',
    features: [
      'Soft wash for delicate surfaces',
      'Render and roughcast cleaning',
      'Stonework and masonry restoration',
      'Cladding and composite panel washing',
      'Algae, lichen and biological growth removal',
      'Multi-storey building access available',
    ],
    bestFor: 'Property managers, landlords and businesses maintaining building exteriors.',
  },
  {
    slug: 'roof-cleaning',
    name: 'Roof Cleaning',
    shortName: 'Roof Clean',
    tagline: 'Moss-free, streak-free roofs',
    description:
      'Professional roof cleaning and moss removal. Soft wash techniques protect your tiles while removing years of moss, algae and discolouration — extending roof life and improving kerb appeal.',
    features: [
      'Moss and algae removal',
      'Soft wash treatment — safe for all tile types',
      'Ridge tile repointing where needed',
      'Biocide treatment to prevent regrowth',
      'Gutter clearing included',
      'Before and after photos provided',
    ],
    bestFor: 'Homeowners with moss-covered or discoloured roofs wanting to restore kerb appeal.',
  },
  {
    slug: 'gutter-cleaning',
    name: 'Gutter Cleaning',
    shortName: 'Gutters',
    tagline: 'Clear gutters, no blockages',
    description:
      'Thorough gutter clearing and downpipe flushing. We remove leaves, moss and debris to prevent water damage, damp and overflow — with before and after images for your records.',
    features: [
      'Full gutter clearing and debris removal',
      'Downpipe flushing to clear blockages',
      'Fascia and soffit wipe-down',
      'Before and after photos provided',
      'Minor repairs flagged and reported',
      'Scheduled seasonal maintenance available',
    ],
    bestFor: 'Any property needing gutters cleared to prevent water damage and damp.',
  },
  {
    slug: 'driveway-cleaning',
    name: 'Driveway Cleaning',
    shortName: 'Driveways',
    tagline: 'Block paving, tarmac, concrete — restored',
    description:
      'Specialist driveway cleaning and restoration. Pressure washing tailored to your surface type — with optional re-sanding for block paving and sealant application to protect the finish.',
    features: [
      'Block paving deep clean and re-sand',
      'Tarmac and concrete pressure washing',
      'Oil and stain removal',
      'Weed and moss removal from joints',
      'Optional sealant application',
      'Edging and kerb cleaning',
    ],
    bestFor: 'Homeowners wanting their driveway looking like new again.',
  },
  {
    slug: 'golf-course-cleaning',
    name: 'Golf Course & Grounds Cleaning',
    shortName: 'Golf & Grounds',
    tagline: 'Pristine facilities, always',
    description:
      'Professional cleaning for golf courses, sports clubs and leisure facilities. Clubhouse exteriors, paths, car parks, signage and outdoor furniture — keeping your grounds immaculate.',
    features: [
      'Clubhouse and pavilion exterior washing',
      'Path and walkway pressure cleaning',
      'Car park and entrance forecourt cleaning',
      'Outdoor furniture and seating areas',
      'Signage and notice board cleaning',
      'Scheduled maintenance contracts',
    ],
    bestFor: 'Golf courses, sports clubs and leisure facilities maintaining high standards.',
  },
];

export const CLEANING_FAQS = [
  {
    q: 'What areas do you cover for cleaning?',
    a: 'We cover Uddingston and everywhere within 15 miles — including Glasgow, Hamilton, Motherwell, East Kilbride, Coatbridge, Airdrie, Rutherglen, Cambuslang and the surrounding areas. Get in touch with your postcode and we\'ll confirm.',
  },
  {
    q: 'What types of properties do you clean?',
    a: 'We clean everything from domestic driveways and patios to commercial premises, restaurants, offices, golf courses and multi-storey buildings. No job too big or small.',
  },
  {
    q: 'Do you offer regular cleaning contracts?',
    a: 'Yes — we offer scheduled maintenance contracts for commercial clients. Weekly, fortnightly or monthly visits to keep your premises looking their best, with professional invoices supplied.',
  },
  {
    q: 'Will pressure washing damage my surfaces?',
    a: 'No. We tailor our approach to the surface — using soft wash for delicate materials like render and stonework, and higher pressure for robust surfaces like concrete and block paving. We always assess before we start.',
  },
  {
    q: 'How long does a driveway clean take?',
    a: 'A standard domestic driveway takes 2-4 hours depending on size and condition. Larger commercial jobs are quoted individually. We always confirm a timeframe before starting.',
  },
  {
    q: 'Do I need to be home?',
    a: 'Not necessarily — as long as we have access to the area being cleaned and a water supply. We\'ll arrange everything beforehand so you can carry on with your day.',
  },
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
  'pressure washing Glasgow',
  'commercial cleaning Glasgow',
  'driveway cleaning Glasgow',
  'patio cleaning Glasgow',
];