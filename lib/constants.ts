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

export const GOOGLE_REVIEW_URL = 'https://g.page/r/CWfwxrdKm-4AECE/review';

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

export const CLEANING_FAQS = [
  {
    q: 'What areas do you cover for cleaning?',
    a: 'We cover Uddingston and everywhere within 15 miles, including Glasgow, Hamilton, Motherwell, East Kilbride, Coatbridge, Airdrie, Rutherglen, Cambuslang and the surrounding areas. Get in touch with your postcode and we\'ll confirm.',
  },
  {
    q: 'What types of properties do you clean?',
    a: 'We clean everything from domestic driveways and patios to commercial premises, restaurants, offices, golf courses and multi-storey buildings. No job too big or small.',
  },
  {
    q: 'Do you offer regular cleaning contracts?',
    a: 'Yes. We offer scheduled maintenance contracts for commercial clients. Weekly, fortnightly or monthly visits to keep your premises looking their best, with professional invoices supplied.',
  },
  {
    q: 'Will pressure washing damage my surfaces?',
    a: 'No. We tailor our approach to the surface, using soft wash for delicate materials like render and stonework, and higher pressure for robust surfaces like concrete and block paving. We always assess before we start.',
  },
  {
    q: 'How long does a driveway clean take?',
    a: 'A standard domestic driveway takes 2-4 hours depending on size and condition. Larger commercial jobs are quoted individually. We always confirm a timeframe before starting.',
  },
  {
    q: 'Do I need to be home?',
    a: 'Not necessarily, as long as we have access to the area being cleaned and a water supply. We\'ll arrange everything beforehand so you can carry on with your day.',
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
      'A swirl-free exterior wash using prewash, snow foam and the two-bucket method, finished with a hydrophobic sealant and dressed tyres.',
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
    name: 'Valet',
    shortName: 'Valet',
    tagline: 'Inside and out, restored',
    startingPrice: 60,
    priceLabel: 'from £60',
    duration: '2 hours',
    description:
      'A complete inside-and-out clean. Interior hoover, surfaces wiped, glass polished, scent sprayed, exterior safe-washed and dressed.',
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
    duration: '4 hours',
    description:
      'Our flagship detail. Steam-cleaned interior, shampooed seats and carpets, decontaminated paint, finished to showroom standard.',
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
      'Restore the gloss, depth and clarity of your paintwork. A multi-stage decontamination and machine polish, optionally locked in with a professional-grade ceramic coating.',
    exterior: [
      'Full exterior safe wash',
      'Chemical decontamination',
      'Clay bar treatment to remove embedded contaminants',
      'Paint polishing stage to achieve required finish',
      'Final panel wipe for a pure, oil-free surface',
      'Optional extra: lock in the new finish with a professional-grade ceramic coating',
    ],
    bestFor: 'Cars with swirl marks, holograms or dull paint, bringing the finish back to better than new.',
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
      'A full paint correction and machine polish locked in with a durable ceramic coating. 2, 3 or 5 year coatings available, so you can choose the level of protection that suits.',
    exterior: [
      'Full exterior safe wash',
      'Chemical decontamination',
      'Clay bar treatment to remove embedded contaminants',
      'Machine polishing process to remove required defects',
      'Final panel wipe for a pure, oil-free surface',
      'Application of your choice of professional-grade ceramic coating (2, 3 or 5 year coatings available)',
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
      "After your car has had our Deep Clean, Polishing or Protection package, it's eligible for our Maintenance Plan: those standards repeated each visit, on a schedule that suits you, for a fraction of the cost.",
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
    a: 'We are a mobile detailer based in Glasgow and cover the surrounding areas: East Kilbride, Paisley, Bearsden, Newton Mearns, Hamilton and most of Greater Glasgow. Get in touch with your postcode and we\'ll confirm.',
  },
  {
    q: 'What vehicles do you detail?',
    a: 'Cars, vans, trucks, caravans, taxis, bikes, quads and every other vehicle type. We also offer fleet washing for businesses, with professional invoices supplied.',
  },
  {
    q: 'Do you come to me?',
    a: 'Yes, we\'re fully mobile. We come to you on a schedule that suits, at your home, at your workplace, at your convenience.',
  },
  {
    q: 'How long does a deep clean take?',
    a: 'A full Deep Clean takes around 4 hours depending on vehicle size and condition. A Valet is 2 hours and a Safe Wash is 60–90 minutes. Polishing and Protection packages are job-dependent.',
  },
  {
    q: 'How is the price calculated?',
    a: 'All vehicles are subject to price adjustments based on vehicle size and condition. Please make your best effort to accurately describe your vehicle to allow for an accurate quote. We always confirm a fixed price before any work begins.',
  },
  {
    q: 'Can you tailor a package to my needs?',
    a: 'Yes. We can tailor bespoke packages to suit many budgets and applications, ensuring every customer receives a service that fits their needs without compromising on quality.',
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

// Real Google reviews, kept close to the original wording
export const TESTIMONIALS = [
  {
    name: 'Sue Taylor',
    date: 'This week',
    quote:
      '10/10 always! Amazing service, easy to book in and always the most pristine results. Thank you Spotless Detailing, you’re the best.',
    rating: 5,
  },
  {
    name: 'Jennifer Whiteford',
    date: 'This week',
    quote:
      'Really happy with the service! Great communication, really friendly and professional, and the car looks amazing. They also managed to fix a scratch that I can’t even see now. Would definitely recommend!',
    rating: 5,
  },
  {
    name: 'Declan Scott',
    date: 'This week',
    quote:
      'Nathan did an excellent job applying a ceramic coating to my brand-new car. He was able to accommodate me at very short notice, and the quality of his work was outstanding. Professional, friendly, and clearly takes pride in what he does. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Lachlan Mackinnon',
    date: 'a week ago',
    quote:
      'Had our car ceramic coated. Fantastic job, what a difference to the finish of the car, it looks brilliant. Nathan’s attitude and advice is second to none, wouldn’t hesitate to recommend him for this job.',
    rating: 5,
  },
  {
    name: 'Rosie McInulty',
    date: 'a week ago',
    quote:
      'Fantastic service from Spotless Detailing! The attention to detail was brilliant, and everything was done to such a high standard. Really friendly, professional service and you can tell they take pride in their work. I couldn’t be happier with the result and would 100% recommend Spotless Detailing to anyone!',
    rating: 5,
  },
  {
    name: 'Sophie MacPhail',
    date: 'a week ago',
    quote:
      'We’ve been using Spotless Detailing for a number of years and can never fault them! Nathan always makes an exceptional job of our cars. They look like they have just came out the showroom each time. Cannot thank him enough and wouldn’t go anywhere else!',
    rating: 5,
  },
  {
    name: 'Gary Maxwell',
    date: 'a week ago',
    quote:
      'Turned up bang on time and done a fantastic job. Highly recommend.',
    rating: 5,
  },
  {
    name: 'Leeanne Henderson',
    date: 'a week ago',
    quote:
      'Just had my first valet done by Nathan at Spotless Detailing after being recommended by a friend, and what a job. Outstanding service from start to finish, excellent communication, turned up when he said he would and carried out the job to a really high standard.',
    rating: 5,
  },
  {
    name: 'Shannon Purdie',
    date: '2 weeks ago',
    quote:
      'I’ve been booking Nathan for around a year now, and he’s always excellent. Reliable, thorough, and my car always looks spotless afterwards. Highly recommend.',
    rating: 5,
  },
  {
    name: 'Ben Fitzgerald',
    date: 'a month ago',
    quote:
      'My business has been using Nathan and the team at Spotless Detailing coming up to a year now, booked every 3 weeks. On time, every time. They are reliable, trustworthy and very professional, and the vans and personal vehicles come back brilliant every visit.',
    rating: 5,
  },
  {
    name: 'Fr. Sean Wyllie',
    date: 'a month ago',
    quote:
      'Top quality every time.',
    rating: 5,
  },
  {
    name: 'Matthew McCulloch',
    date: 'a month ago',
    quote:
      'Can’t recommend these lads enough! Service is incredible and the cars are left spotless every time.',
    rating: 5,
  },
  {
    name: 'poulty7',
    date: 'a month ago',
    quote:
      'Really happy with the service from Spotless Detailing. Our car came back looking brand new inside and out, and you can tell they took their time with the details.',
    rating: 5,
  },
  {
    name: 'Envirocycle Glasgow',
    date: '2 months ago',
    quote:
      'Nathan and his team have looked after our work and personal fleet for over 4 years now on a weekly basis, and his workmanship is nothing short of outstanding.',
    rating: 5,
  },
  {
    name: 'kyle scott',
    date: '2 months ago',
    quote:
      'Reliable with no fuss. Leaves an excellent job with attention to detail.',
    rating: 5,
  },
  {
    name: 'Emma Smith',
    date: '2 months ago',
    quote:
      'We have been using Spotless Detailing for sometime now and have never had a single issue. From SUVs and vans to supercars, the work is always carried out to an extremely high standard.',
    rating: 5,
  },
  {
    name: 'Ross Kirkland',
    date: '2 months ago',
    quote:
      'I’ve been using Nathan for a while now and have always been extremely impressed with him and his workmanship. He is always on time and never stops until the job is done. I have passed him on to friends and family and they have all been delighted.',
    rating: 5,
  },
  {
    name: 'Craig Matthews',
    date: '3 months ago',
    quote:
      'Great job carried out by Nathan, would 100% recommend.',
    rating: 5,
  },
  {
    name: 'Liam Mccormick',
    date: '3 months ago',
    quote:
      'Nathan at Spotless Detailing has been second to none. I’m booked onto the 4 week maintenance package and every visit the service is flawless. From the customer service to the attention to detail, Nathan always goes above and beyond.',
    rating: 5,
  },
  {
    name: 'Aidan Healy',
    date: '8 months ago',
    quote:
      'Done a brilliant job with my car. Looks brand new. The attention to detail and value for money is outstanding. Nathan is friendly, professional, and works hard. Can’t recommend him highly enough and will certainly be using his services again.',
    rating: 5,
  },
  {
    name: 'Cerys Hanlon',
    date: '8 months ago',
    quote:
      'Excellent service and easy to book. Amazing attention to detail and value for money. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Jill McInulty',
    date: '8 months ago',
    quote:
      'Great effort, thorough attention to detail and value for money.',
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
    name: 'Yvonne Hughes',
    date: 'a year ago',
    quote:
      'What an amazing job, my car is like new and that’s not easy on a 7 year old car! Delighted with the job and you’re a pleasure to deal with Nathan! See you next time!',
    rating: 5,
  },
  {
    name: 'stephen given',
    date: 'a year ago',
    quote:
      'Absolutely delighted with job done on my car by Nathan. Great service and cracking lad. Highly recommended.',
    rating: 5,
  },
  {
    name: 'Amanda Gilfedder',
    date: '2 years ago',
    quote:
      'I am absolutely delighted with my car. My husband has the monthly maintenance plan and is always delighted with the results. This was my first time having my car cleaned with Spotless Detailing and it literally looks brand new. Nathan’s attention to detail is second to none.',
    rating: 5,
  },
  {
    name: 'Sarah Orr',
    date: '2 years ago',
    quote:
      'Very pleased with the results of my car. Would highly recommend.',
    rating: 5,
  },
  {
    name: 'Sinnead Connelly',
    date: '2 years ago',
    quote:
      'Would deffos recommend! My car was looking amazing!',
    rating: 5,
  },
  {
    name: 'Kian Gallagher',
    date: '2 years ago',
    quote:
      'Done a great job of my car, would recommend.',
    rating: 5,
  },
  {
    name: 'AnneMarie Clelland',
    date: '2 years ago',
    quote:
      'Top class job by Nathan. Thank you.',
    rating: 5,
  },
  {
    name: 'Paul Buggy',
    date: '2 years ago',
    quote:
      'Absolutely top class job and a very friendly young man who certainly put in a shift for very decent prices. Would highly recommend anyone using these services, and I will certainly use them again.',
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