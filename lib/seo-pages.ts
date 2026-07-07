import { AREA_FACTS, hashIndex, proximityPhrase, type AreaFact } from './area-data';

export interface SeoFaq {
  q: string;
  a: string;
}

export interface SeoPage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  type: 'area' | 'service';
  faqs?: SeoFaq[];
  character?: string;
}

// ---------------------------------------------------------------------------
// Area-page content generation — every area page pulls from real facts about
// that area (county, proximity to base, local character) through several
// rotating sentence templates, so no two area pages share the same wording.
// ---------------------------------------------------------------------------

const VALETING_INTRO_TEMPLATES: ((f: AreaFact, p: string) => string)[] = [
  (f, p) =>
    `Looking for professional car valeting in ${f.name}? Spotless Detailing is a fully mobile service covering ${f.name} — ${p} — and the rest of ${f.county}. ${f.name} is ${f.character}, and we bring everything needed for a safe wash, full valet or deep clean straight to your driveway. No dropping the car off, no waiting around — just book a slot that suits you.`,
  (f, p) =>
    `${f.name} — ${f.character} — is one of the towns we cover most for mobile car valeting. We're based in Uddingston, ${p}, so getting to you in ${f.name} is never a problem. Whether it's a quick safe wash to keep things fresh or a full deep clean and ceramic coating, our van comes fully stocked so nothing needs to leave your driveway.`,
  (f, p) =>
    `If your car's overdue a proper clean and you're based in ${f.name}, we can help. Spotless Detailing covers ${f.name} and the rest of ${f.county} as part of our regular mobile valeting round — ${p}. We bring the water, the products and the equipment, so all you need to do is point us to the car.`,
  (f, p) =>
    `From a 90-minute safe wash to a full multi-hour deep clean, Spotless Detailing offers mobile car valeting across ${f.name} and the wider ${f.county} area. ${f.name} is ${f.character}, and it's ${p} from our Uddingston base — so we're regularly on the road there. Book online or give us a call and we'll confirm a slot.`,
  (f, p) =>
    `Spotless Detailing is a mobile car valeting service working regularly in ${f.name}. We're based in Uddingston — ${p} — and cover ${f.name}, ${f.character}, along with the rest of ${f.county}. Safe wash, full valet, deep clean, polishing and ceramic coating are all available at your home or workplace, no trip to a car wash required.`,
];

const VALETING_DESC_TEMPLATES: ((f: AreaFact) => string)[] = [
  (f) => `Professional mobile car valeting and detailing in ${f.name}. Safe wash from £30, full valet from £60, deep clean from £120. We come to you — book today.`,
  (f) => `Mobile car valeting and detailing covering ${f.name} and ${f.county}. Safe wash, full valet, deep clean and ceramic coating — all at your door.`,
  (f) => `Spotless Detailing brings mobile car valeting to ${f.name} — safe wash, full valet, deep clean and paint protection, straight to your driveway.`,
  (f) => `Car valeting in ${f.name} without the trip to a car wash. Mobile safe wash, valet and deep clean from £30 — fully insured, fully mobile.`,
];

const CLEANING_INTRO_TEMPLATES: ((f: AreaFact, p: string) => string)[] = [
  (f, p) =>
    `Need professional cleaning services in ${f.name}? Spotless Detailing offers commercial and domestic pressure washing across ${f.name} — ${p} — and the rest of ${f.county}. ${f.name} is ${f.character}, and our team handles everything from driveway and patio cleaning to full building washes, with before-and-after photos provided as standard.`,
  (f, p) =>
    `${f.name} — ${f.character} — is one of the towns we regularly work in for pressure washing and exterior cleaning. Based in Uddingston, ${p}, we bring commercial-grade equipment to driveways, patios, restaurant frontages and commercial premises across ${f.name} and ${f.county}.`,
  (f, p) =>
    `If your driveway, patio or building exterior in ${f.name} needs a proper clean, Spotless Detailing can help. We cover ${f.name} and the wider ${f.county} area as part of our regular pressure washing round — ${p} — and every job is fully insured with before-and-after photos as standard.`,
  (f, p) =>
    `From block paving and patios to full building facades, Spotless Detailing provides commercial and domestic cleaning across ${f.name} and ${f.county}. ${f.name} is ${f.character}, and it's ${p} from our Uddingston base, so we're regularly working in the area.`,
  (f, p) =>
    `Spotless Detailing is a pressure washing and exterior cleaning service working regularly in ${f.name}. We're based in Uddingston — ${p} — and cover ${f.name}, ${f.character}, along with the rest of ${f.county}. Driveways, patios, commercial premises and building exteriors are all part of what we do, with free quotes and before-and-after photos as standard.`,
];

const CLEANING_DESC_TEMPLATES: ((f: AreaFact) => string)[] = [
  (f) => `Professional pressure washing and cleaning services in ${f.name}. Driveways, patios, commercial premises, restaurants, buildings. Free quotes — call today.`,
  (f) => `Commercial and domestic pressure washing covering ${f.name} and ${f.county}. Driveways, patios, building exteriors — free quotes, fully insured.`,
  (f) => `Spotless Detailing brings professional exterior cleaning to ${f.name} — driveways, patios, commercial premises and full building washes.`,
  (f) => `Pressure washing and exterior cleaning in ${f.name}. Before-and-after photos as standard. Free, no-obligation quotes — get in touch today.`,
];

const VALETING_FAQ_POOL: ((f: AreaFact, p: string) => SeoFaq)[] = [
  (f, p) => ({ q: `Do you cover ${f.name}?`, a: `Yes — ${f.name} is one of the areas we cover regularly, ${p}. Get in touch with your postcode and we'll confirm your nearest available slot.` }),
  (f, p) => ({ q: `How quickly can you get to ${f.name}?`, a: `We're based in Uddingston, so ${f.name} is ${p}. Most bookings in ${f.name} can be confirmed within a few days, sooner if we have availability.` }),
  (f) => ({ q: `Do I need to bring my car anywhere?`, a: `No — we're fully mobile, so we come to you in ${f.name} with everything needed: water, power and all our own equipment. Just point us to a spot on your driveway.` }),
  (f) => ({ q: `What car valeting services do you offer in ${f.name}?`, a: `The full range — safe wash, full valet, deep clean, polishing and ceramic coating — all available to customers in ${f.name} and the rest of ${f.county}.` }),
  (f) => ({ q: `Is driveway access needed in ${f.name}?`, a: `Driveway access makes things easiest, but we can also work on-street in ${f.name} if there's a suitable space and water access nearby — just let us know when booking.` }),
  (f) => ({ q: `How do I book a valet in ${f.name}?`, a: `Use the booking page, WhatsApp or give us a call. We'll confirm a fixed price and an available slot for ${f.name} within the day.` }),
];

const CLEANING_FAQ_POOL: ((f: AreaFact, p: string) => SeoFaq)[] = [
  (f, p) => ({ q: `Do you offer cleaning services in ${f.name}?`, a: `Yes — ${f.name} is part of our regular cleaning round, ${p}. Contact us with your postcode and we'll confirm availability.` }),
  (f) => ({ q: `What can you clean in ${f.name}?`, a: `Driveways, patios, render, building exteriors, commercial premises and more — anything from a single domestic driveway to a full commercial contract in ${f.name} and ${f.county}.` }),
  (f) => ({ q: `Do you work with commercial premises in ${f.name}?`, a: `Yes — we clean restaurants, offices, retail units and commercial forecourts in ${f.name}, with scheduled maintenance contracts available around your business hours.` }),
  (f) => ({ q: `Will pressure washing damage older surfaces in ${f.name}?`, a: `No — we assess each surface first and use soft wash techniques for delicate render or stonework, saving higher pressure for robust surfaces like concrete and block paving.` }),
  (f, p) => ({ q: `How quickly can you get to ${f.name}?`, a: `We're based in Uddingston, so ${f.name} is ${p}. Most jobs are quoted and scheduled within a few days.` }),
  (f) => ({ q: `Do you provide quotes before starting work in ${f.name}?`, a: `Always — every job in ${f.name} gets a free, no-obligation quote before any work begins, with before-and-after photos provided once complete.` }),
];

function pickFaqs(
  pool: ((f: AreaFact, p: string) => SeoFaq)[],
  fact: AreaFact,
  proximity: string,
  salt: string,
  count = 3
): SeoFaq[] {
  const offset = hashIndex(fact.slug + salt, pool.length);
  return Array.from({ length: count }, (_, i) => pool[(offset + i) % pool.length](fact, proximity));
}

function buildAreaPage(
  fact: AreaFact,
  vertical: 'valeting' | 'cleaning'
): SeoPage {
  const p = proximityPhrase(fact);
  const introTemplates = vertical === 'valeting' ? VALETING_INTRO_TEMPLATES : CLEANING_INTRO_TEMPLATES;
  const descTemplates = vertical === 'valeting' ? VALETING_DESC_TEMPLATES : CLEANING_DESC_TEMPLATES;
  const faqPool = vertical === 'valeting' ? VALETING_FAQ_POOL : CLEANING_FAQ_POOL;

  const introIdx = hashIndex(fact.slug + vertical + 'intro', introTemplates.length);
  const descIdx = hashIndex(fact.slug + vertical + 'desc', descTemplates.length);

  const titlePrefix = vertical === 'valeting' ? 'Car Valeting' : 'Pressure Washing & Cleaning';
  const h1Prefix = vertical === 'valeting' ? 'Car Valeting & Detailing in' : 'Pressure Washing & Cleaning in';

  return {
    slug: fact.slug,
    title: `${titlePrefix} ${fact.name} | Mobile Detailing & Valeting — Spotless Detailing`,
    h1: `${h1Prefix} ${fact.name}`,
    description: descTemplates[descIdx](fact),
    intro: introTemplates[introIdx](fact, p),
    type: 'area',
    character: fact.character,
    faqs: pickFaqs(faqPool, fact, p, vertical + 'faq'),
  };
}

// ---------------------------------------------------------------------------
// Valeting area pages — one per SERVICE_AREAS entry
// ---------------------------------------------------------------------------
export const VALETING_AREA_PAGES: SeoPage[] = AREA_FACTS.map((fact) =>
  buildAreaPage(fact, 'valeting')
);

// ---------------------------------------------------------------------------
// Valeting service-type pages — generic SEO landing pages
// ---------------------------------------------------------------------------
export const VALETING_SERVICE_PAGES: SeoPage[] = [
  {
    slug: 'near-me',
    title: 'Car Valeting Near Me | Mobile Valet Glasgow — Spotless Detailing',
    h1: 'Car Valeting Near Me — Glasgow & Surrounding Areas',
    description:
      'Looking for car valeting near you? Spotless Detailing offers mobile car valeting across Glasgow and Lanarkshire. Safe wash from £30. We come to you.',
    intro: 'Searching for car valeting near you? Spotless Detailing is a fully mobile car valeting and detailing service based in Uddingston, covering Glasgow and everywhere within 15 miles. We come to your home or workplace on a schedule that suits — no need to drive anywhere. From a quick safe wash to a full deep clean and ceramic coating, we offer a complete range of services at competitive prices.',
    type: 'service',
  },
  {
    slug: 'car-valeting-near-me',
    title: 'Car Valeting Near Me | Professional Mobile Valet — Spotless Detailing',
    h1: 'Professional Car Valeting Near You',
    description:
      'Professional car valeting near you in Glasgow. Mobile service, premium products, swirl-free results. Safe wash from £30, valet from £60. Book today.',
    intro: 'Need a professional car valet near you? Spotless Detailing brings premium car valeting directly to your door across Glasgow, Lanarkshire and the surrounding areas. We use professional-grade products, the two-bucket method and swirl-free techniques to deliver results that go beyond a standard car wash. Whether you need a quick exterior refresh or a thorough interior and exterior valet, we have a package to suit.',
    type: 'service',
  },
  {
    slug: 'mobile-valeting-near-me',
    title: 'Mobile Valeting Near Me | Spotless Detailing Glasgow',
    h1: 'Mobile Valeting Near You — We Come to Your Door',
    description:
      'Mobile car valeting near you in Glasgow. Fully equipped, fully insured. We bring everything to your driveway. Book your mobile valet today.',
    intro: 'Looking for mobile valeting near you? Spotless Detailing is a fully mobile service — we bring all equipment, water and products to your home or workplace. No need to drop your car off or wait at a hand car wash. We cover Glasgow, Uddingston, Rutherglen, Hamilton, East Kilbride, Motherwell and everywhere within 15 miles. Convenient, professional and always on your schedule.',
    type: 'service',
  },
  {
    slug: 'quick-valet',
    title: 'Quick Valet Glasgow | Fast Car Valet from £30 — Spotless Detailing',
    h1: 'Quick Car Valet — Fresh Results, Fast Turnaround',
    description:
      'Quick car valet in Glasgow from £30. Exterior safe wash in 60-90 minutes. Mobile service — we come to you. Book your quick valet today.',
    intro: 'Short on time but want your car looking sharp? Our quick valet — the Safe Wash — is a thorough exterior clean using prewash, snow foam and the two-bucket method, finished with a hydrophobic sealant and dressed tyres. Done in 60-90 minutes on your driveway. It is the perfect way to maintain your car between deeper details without the hassle of driving to a car wash.',
    type: 'service',
  },
  {
    slug: 'full-valet',
    title: 'Full Valet Glasgow | Interior & Exterior from £60 — Spotless Detailing',
    h1: 'Full Car Valet — Inside & Out, Restored',
    description:
      'Full car valet in Glasgow from £60. Complete interior and exterior clean. Hoovered, wiped, glass polished, safe washed. Mobile to your door.',
    intro: 'Our Full Valet gives your car a complete refresh inside and out. Interior is thoroughly hoovered, all surfaces cleaned, glass polished and scent sprayed. The exterior gets a full safe wash with dressed tyres. Done in 1.5-2.5 hours at your home or workplace. Ideal for anyone wanting a sharp, fresh-feeling car without going full deep clean.',
    type: 'service',
  },
  {
    slug: 'deep-clean-valet',
    title: 'Deep Clean Valet Glasgow | Full Detail from £120 — Spotless Detailing',
    h1: 'Deep Clean Valet — New-Car Feeling, Restored',
    description:
      'Deep clean car valet in Glasgow from £120. Steam cleaned interior, shampooed seats, decontaminated paint. Our flagship mobile detail.',
    intro: 'The Deep Clean is our flagship detail. Steam-cleaned interior, shampooed seats and carpets, decontaminated paint — finished to showroom standard. This is the service for neglected cars, pre-sale prep or anyone wanting that proper new-car feeling. Typically 3-8 hours depending on vehicle size and condition. We bring everything to your driveway.',
    type: 'service',
  },
  {
    slug: 'car-detailing',
    title: 'Car Detailing Glasgow | Professional Mobile Detailing — Spotless Detailing',
    h1: 'Professional Car Detailing in Glasgow',
    description:
      'Professional car detailing in Glasgow. Mobile service, premium products. Deep cleans, polishing, ceramic coating. Book your detail today.',
    intro: 'Spotless Detailing offers professional car detailing across Glasgow and the surrounding areas. Detailing goes beyond a standard valet — it is a thorough, methodical process that restores your car to its best possible condition. From paint decontamination and machine polishing to ceramic coating and interior steam cleaning, we offer the full range of detailing services, all delivered mobile to your door.',
    type: 'service',
  },
  {
    slug: 'mobile-car-detailing',
    title: 'Mobile Car Detailing Glasgow | We Come to You — Spotless Detailing',
    h1: 'Mobile Car Detailing — Premium Results at Your Door',
    description:
      'Mobile car detailing in Glasgow. Fully equipped van, professional products. We detail your car at your home or workplace. Book today.',
    intro: 'Why take your car to a detailer when the detailer can come to you? Spotless Detailing is a fully mobile car detailing service covering Glasgow, Uddingston, Rutherglen, Cambuslang, Hamilton, East Kilbride and everywhere within 15 miles. Our fully equipped van carries everything needed to deliver a showroom-standard detail on your driveway or at your workplace.',
    type: 'service',
  },
  {
    slug: 'ceramic-coating',
    title: 'Ceramic Coating Glasgow | Professional Application — Spotless Detailing',
    h1: 'Ceramic Coating — Long-Term Paint Protection',
    description:
      'Professional ceramic coating in Glasgow. 2, 3 or 5 year coatings available. Full paint correction included. Mobile service. Get a quote today.',
    intro: 'Protect your paintwork with a professional-grade ceramic coating. Our Protection Package includes a full paint correction and machine polish, locked in with a durable ceramic coating of your choice — 2, 3 or 5 year options available. The result is years of hydrophobic, dirt-shedding gloss that makes maintenance easy and keeps your car looking its best for longer.',
    type: 'service',
  },
  {
    slug: 'paint-protection',
    title: 'Paint Protection Glasgow | Ceramic Coating & Polishing — Spotless Detailing',
    h1: 'Paint Protection — Polishing & Ceramic Coating',
    description:
      'Paint protection services in Glasgow. Machine polishing, paint correction and ceramic coating. Restore and protect your paintwork. Mobile service.',
    intro: 'Our paint protection services combine machine polishing and ceramic coating to restore and protect your paintwork. Whether your paint has swirl marks, holograms or has just lost its depth, our Polishing Package brings back the gloss — and our Protection Package locks it in with a durable ceramic coating for years of easy-clean protection.',
    type: 'service',
  },
  {
    slug: 'interior-car-cleaning',
    title: 'Interior Car Cleaning Glasgow | Deep Clean & Steam — Spotless Detailing',
    h1: 'Interior Car Cleaning — Deep Clean & Steam Cleaned',
    description:
      'Interior car cleaning in Glasgow. Steam cleaning, seat shampooing, carpet extraction. Remove pet hair, stains, odours. Mobile to your door.',
    intro: 'Need your car interior deep cleaned? Our interior cleaning goes far beyond a quick hoover. We steam clean surfaces, shampoo seats and carpets, strip and clean floor mats, detail door shuts and leave your car smelling fresh. Ideal for removing pet hair, food stains, coffee spills and lingering odours. Available as part of our Deep Clean package or as a standalone interior service.',
    type: 'service',
  },
  {
    slug: 'mini-valet',
    title: 'Mini Valet Glasgow | Quick Exterior Wash from £30 — Spotless Detailing',
    h1: 'Mini Valet — Quick, Affordable, Swirl-Free',
    description:
      'Mini valet in Glasgow from £30. Quick exterior safe wash, swirl-free. Snow foam, two-bucket method, hydrophobic sealant. Mobile service.',
    intro: 'Our mini valet — the Safe Wash — is a quick, affordable exterior clean that delivers swirl-free results every time. Using prewash, snow foam and the two-bucket method, we safely remove dirt and contaminants before applying a hydrophobic sealant and dressing the tyres. Done in 60-90 minutes. The perfect regular maintenance wash between deeper details.',
    type: 'service',
  },
];

// ---------------------------------------------------------------------------
// Cleaning area pages — one per SERVICE_AREAS entry
// ---------------------------------------------------------------------------
export const CLEANING_AREA_PAGES: SeoPage[] = AREA_FACTS.map((fact) =>
  buildAreaPage(fact, 'cleaning')
);

// ---------------------------------------------------------------------------
// Cleaning service-type pages
// ---------------------------------------------------------------------------
export const CLEANING_SERVICE_PAGES: SeoPage[] = [
  {
    slug: 'commercial-cleaning',
    title: 'Commercial Cleaning Glasgow | Pressure Washing for Business — Spotless Detailing',
    h1: 'Commercial Cleaning & Pressure Washing',
    description:
      'Commercial pressure washing and cleaning in Glasgow. Restaurants, offices, retail, car parks. Scheduled contracts available. Free quotes.',
    intro: 'Keep your business premises looking professional with our commercial cleaning services. We provide pressure washing and exterior cleaning for restaurants, hotels, offices, retail units, car parks and forecourts across Glasgow and the surrounding areas. Scheduled maintenance contracts available — we work around your business hours to minimise disruption.',
    type: 'service',
  },
  {
    slug: 'domestic-cleaning',
    title: 'Domestic Cleaning Glasgow | Home Exterior Pressure Washing — Spotless Detailing',
    h1: 'Domestic Exterior Cleaning & Pressure Washing',
    description:
      'Domestic pressure washing in Glasgow. Driveways, patios, render, fascias, gutters. Your home exterior, professionally cleaned. Free quotes.',
    intro: 'Give your home a complete exterior refresh with our domestic cleaning services. We clean driveways, patios, render, roughcast, fascias, soffits, conservatories and more. Using professional equipment and techniques tailored to each surface, we restore your home exterior to its best — without any risk of damage. Fully insured and available across Glasgow and Lanarkshire.',
    type: 'service',
  },
  {
    slug: 'pressure-washing-services',
    title: 'Pressure Washing Services Glasgow | Professional & Affordable — Spotless Detailing',
    h1: 'Professional Pressure Washing Services',
    description:
      'Professional pressure washing services in Glasgow. Driveways, patios, decking, commercial premises. Affordable rates. Free quotes.',
    intro: 'Our professional pressure washing services cover everything from domestic driveways and patios to large commercial forecourts and building facades. We use commercial-grade equipment and adjust pressure and technique to suit every surface — ensuring thorough cleaning without damage. Available across Glasgow, Uddingston and everywhere within 15 miles.',
    type: 'service',
  },
  {
    slug: 'restaurant-cleaning',
    title: 'Restaurant Cleaning Glasgow | Exterior & Kitchen Extract — Spotless Detailing',
    h1: 'Restaurant & Hospitality Exterior Cleaning',
    description:
      'Restaurant exterior cleaning in Glasgow. Frontage, signage, outdoor seating, bin areas, car parks. Keep your restaurant looking its best.',
    intro: 'First impressions matter in hospitality. We provide professional exterior cleaning for restaurants, cafes, takeaways and hotels across Glasgow and Lanarkshire. Frontage washing, signage cleaning, outdoor seating areas, bin stores, car parks and more — scheduled around your opening hours so there is no disruption to your business.',
    type: 'service',
  },
  {
    slug: 'building-cleaning',
    title: 'Building Cleaning Glasgow | Facade & Exterior Washing — Spotless Detailing',
    h1: 'Building & Facade Cleaning',
    description:
      'Building and facade cleaning in Glasgow. Render, cladding, stonework, commercial and residential. Soft wash and pressure wash. Free quotes.',
    intro: 'Professional building and facade cleaning for commercial and residential properties. We use a combination of soft wash and pressure wash techniques tailored to the surface — whether it is render, roughcast, cladding, stonework or masonry. We remove algae, lichen, atmospheric staining and biological growth to restore your building exterior. Multi-storey access available.',
    type: 'service',
  },
  {
    slug: 'driveway-cleaning-service',
    title: 'Driveway Cleaning Glasgow | Block Paving & Tarmac — Spotless Detailing',
    h1: 'Driveway Cleaning — Block Paving, Tarmac & Concrete',
    description:
      'Professional driveway cleaning in Glasgow. Block paving, tarmac, concrete. Re-sanding, sealing, weed removal. Free quotes.',
    intro: 'Transform your driveway with our professional driveway cleaning service. We clean block paving, tarmac, concrete and natural stone driveways using commercial-grade pressure washing equipment. Our service includes weed and moss removal, oil stain treatment, and optional re-sanding and sealant application for block paving. Available across Glasgow and Lanarkshire.',
    type: 'service',
  },
  {
    slug: 'patio-cleaning',
    title: 'Patio Cleaning Glasgow | Slabs, Stone & Decking — Spotless Detailing',
    h1: 'Patio & Decking Cleaning',
    description:
      'Patio cleaning in Glasgow. Natural stone, porcelain, flagstone, composite decking. Pressure washing with care. Free quotes.',
    intro: 'Revive your outdoor living space with our professional patio and decking cleaning. We clean natural stone, porcelain, flagstone, concrete slabs, composite and timber decking — adjusting pressure and technique to suit the material. Remove years of algae, moss and grime to enjoy your garden again.',
    type: 'service',
  },
  {
    slug: 'cleaning-near-me',
    title: 'Pressure Washing Near Me | Cleaning Services Glasgow — Spotless Detailing',
    h1: 'Pressure Washing & Cleaning Near You',
    description:
      'Looking for pressure washing near you? Professional cleaning services across Glasgow and Lanarkshire. Driveways, patios, commercial premises. Free quotes.',
    intro: 'Searching for professional pressure washing and cleaning near you? Spotless Detailing covers Glasgow, Uddingston, Rutherglen, Cambuslang, Hamilton, East Kilbride, Motherwell and everywhere within 15 miles. We offer commercial and domestic exterior cleaning services — from driveway and patio pressure washing to full building cleans and commercial maintenance contracts.',
    type: 'service',
  },
  {
    slug: 'commercial-cleaning-near-me',
    title: 'Commercial Cleaning Near Me | Business Pressure Washing — Spotless Detailing',
    h1: 'Commercial Cleaning & Pressure Washing Near You',
    description:
      'Commercial cleaning near you in Glasgow. Restaurants, offices, retail premises. Scheduled maintenance available. Free quotes.',
    intro: 'Need commercial cleaning near your business? We provide professional exterior cleaning and pressure washing for businesses across Glasgow and Lanarkshire. Restaurants, offices, retail units, car parks, golf courses and more. We offer one-off cleans and scheduled maintenance contracts — working around your business hours.',
    type: 'service',
  },
  {
    slug: 'roof-cleaning-service',
    title: 'Roof Cleaning Glasgow | Moss Removal & Soft Wash — Spotless Detailing',
    h1: 'Roof Cleaning & Moss Removal',
    description:
      'Professional roof cleaning in Glasgow. Moss removal, soft wash, biocide treatment. Safe for all tile types. Improve kerb appeal. Free quotes.',
    intro: 'Restore your roof with our professional roof cleaning and moss removal service. We use soft wash techniques that are safe for all tile types — removing years of moss, algae and discolouration without damaging your roof. Includes biocide treatment to prevent regrowth, gutter clearing and optional ridge tile repointing. Before and after photos provided.',
    type: 'service',
  },
  {
    slug: 'gutter-cleaning-service',
    title: 'Gutter Cleaning Glasgow | Clearing & Downpipe Flushing — Spotless Detailing',
    h1: 'Gutter Cleaning & Downpipe Flushing',
    description:
      'Gutter cleaning in Glasgow. Full clearing, downpipe flushing, fascia wipe-down. Prevent water damage and damp. Free quotes.',
    intro: 'Blocked gutters cause water damage, damp and overflow. Our gutter cleaning service includes full clearing of debris, downpipe flushing to remove blockages, and a fascia and soffit wipe-down. We provide before and after photos and flag any minor repairs needed. Scheduled seasonal maintenance available to keep your gutters flowing year-round.',
    type: 'service',
  },
  {
    slug: 'jet-washing',
    title: 'Jet Washing Glasgow | Professional Jet Wash Service — Spotless Detailing',
    h1: 'Professional Jet Washing Services',
    description:
      'Professional jet washing in Glasgow. Driveways, patios, commercial premises, paths, walls. Affordable rates, professional results. Free quotes.',
    intro: 'Our professional jet washing service delivers powerful cleaning results for driveways, patios, paths, walls, car parks and commercial premises. Using commercial-grade equipment, we remove ingrained dirt, algae, moss, oil stains and biological growth — restoring surfaces to like-new condition. Available for domestic and commercial customers across Glasgow and Lanarkshire.',
    type: 'service',
  },
];

// ---------------------------------------------------------------------------
// Helpers — all slugs for generateStaticParams & sitemap
// ---------------------------------------------------------------------------
export function getAllValetingSlugs(): string[] {
  return [
    ...VALETING_AREA_PAGES.map((p) => p.slug),
    ...VALETING_SERVICE_PAGES.map((p) => p.slug),
  ];
}

export function getAllCleaningSlugs(): string[] {
  return [
    ...CLEANING_AREA_PAGES.map((p) => p.slug),
    ...CLEANING_SERVICE_PAGES.map((p) => p.slug),
  ];
}

export function findValetingPage(slug: string): SeoPage | undefined {
  return (
    VALETING_AREA_PAGES.find((p) => p.slug === slug) ??
    VALETING_SERVICE_PAGES.find((p) => p.slug === slug)
  );
}

export function findCleaningPage(slug: string): SeoPage | undefined {
  return (
    CLEANING_AREA_PAGES.find((p) => p.slug === slug) ??
    CLEANING_SERVICE_PAGES.find((p) => p.slug === slug)
  );
}
