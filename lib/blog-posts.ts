// lib/blog-posts.ts
// Research-stage content for organic search — hand-authored, same pattern as
// lib/seo-pages.ts. No CMS/MDX: just typed data rendered by app/blog/[slug].

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'ceramic-coating-vs-wax',
    title: 'Ceramic Coating vs Wax: Which Is Right for Your Car?',
    description:
      'Ceramic coating or wax — durability, cost, gloss and maintenance compared, so you can pick the right paint protection for your car.',
    category: 'Paint Protection',
    date: '2026-08-10',
    readTime: '5 min read',
    excerpt:
      'Wax is cheap and easy but fades in weeks. Ceramic coating costs more upfront but protects for years. Here\'s how to actually decide between them.',
    sections: [
      {
        paragraphs: [
          'Every car owner asking about paint protection eventually lands on the same question: wax or ceramic coating? Both leave paint glossy and both shed water — but that\'s where the similarity ends. The right choice depends on how long you want the protection to last and how much you\'re willing to spend upfront.',
        ],
      },
      {
        heading: 'Wax: cheap, easy, short-lived',
        paragraphs: [
          'A traditional wax is a sacrificial layer of carnauba or synthetic polymer sitting on top of the clear coat. It\'s inexpensive, quick to apply, and gives paint a warm, deep gloss that a lot of enthusiasts still prefer.',
          'The downside is durability. Wax breaks down under UV light, rain and washing, and most waxes are gone within 6–10 weeks. That means reapplying every couple of months to keep the protection — and the look — up.',
        ],
      },
      {
        heading: 'Ceramic coating: more upfront, years of protection',
        paragraphs: [
          'A ceramic coating is a liquid polymer that chemically bonds to the clear coat rather than sitting on top of it. Once cured, it forms a hard, glossy layer that resists UV fade, bird droppings, tree sap and light chemical staining far better than wax — and it doesn\'t wash away.',
          'Our Protection Package applies a full paint correction and machine polish first, then locks the finish in with a 2, 3 or 5 year ceramic coating, so the gloss you\'re paying for is still there years later, not weeks later.',
          'The trade-off is cost and prep. Ceramic coating needs the paint properly decontaminated and corrected before application, so it\'s a bigger job than a wax top-up — but it\'s a one-off job, not a recurring one.',
        ],
      },
      {
        heading: 'So which one?',
        paragraphs: [
          'If you enjoy the ritual of detailing your own car every couple of months and want that classic wax look, wax still has a place. If you want the car to stay protected and glossy without thinking about it again for years, ceramic coating is the better investment — especially if the car is a daily driver parked outside.',
          'Not sure which fits your car and budget? Get in touch and we\'ll talk through what\'s realistic for your paintwork.',
        ],
      },
    ],
  },
  {
    slug: 'how-often-should-you-detail-your-car',
    title: 'How Often Should You Get Your Car Detailed?',
    description:
      "How often to wash, valet and deep clean your car depending on mileage, parking and how you use it — a realistic maintenance schedule.",
    category: 'Maintenance',
    date: '2026-07-22',
    readTime: '4 min read',
    excerpt:
      'There\'s no single right answer — it depends on your mileage, where the car sleeps at night, and whether it\'s carrying kids, dogs or a daily commute.',
    sections: [
      {
        paragraphs: [
          '"How often should I get my car detailed?" is one of the most common questions we get asked, and the honest answer is: it depends on how the car is used. Here\'s a realistic breakdown by scenario.',
        ],
      },
      {
        heading: 'Daily commuters, parked outside',
        paragraphs: [
          'A car parked outside and driven daily picks up road grime, bird droppings and UV exposure constantly. A Safe Wash every 2–4 weeks keeps the paint protected between bigger cleans, with a full Valet or Deep Clean every 3–4 months to keep the interior fresh.',
        ],
      },
      {
        heading: 'Family cars, kids and pets',
        paragraphs: [
          'Interiors take the real punishment here — crumbs, mud, pet hair and spilled drinks. A Full Valet every 6–8 weeks stops things building up, with an occasional Deep Clean (steam-cleaned interior, shampooed seats and carpets) once or twice a year to properly reset the cabin.',
        ],
      },
      {
        heading: 'Weekend and low-mileage cars',
        paragraphs: [
          'Cars that mostly sit — weekend cars, garaged cars, second vehicles — need less frequent washing but benefit most from a one-off Polishing or Protection Package, since they\'re not accumulating grime fast enough to justify frequent valets. A ceramic coating on a low-mileage car can look showroom-fresh for years with just occasional safe washes in between.',
        ],
      },
      {
        heading: 'The simple rule',
        paragraphs: [
          'If it\'s starting to look dull, feel gritty under a hand, or the inside just doesn\'t feel clean anymore — it\'s time. Our Maintenance Plan exists for exactly this: once a car has had a Deep Clean, Polishing or Protection package, we keep it at that standard on a recurring schedule that suits you, at a lower rate than one-off bookings.',
        ],
      },
    ],
  },
  {
    slug: 'full-valet-vs-deep-clean',
    title: "Full Valet vs Deep Clean: What's Actually Included",
    description:
      "What's the real difference between a Full Valet and a Deep Clean? A breakdown of what each service includes so you know exactly what you're booking.",
    category: 'Services',
    date: '2026-06-15',
    readTime: '4 min read',
    excerpt:
      "Both leave your car clean, but they're not the same job. Here's exactly what's included in each, so you can book the right one first time.",
    sections: [
      {
        paragraphs: [
          'Full Valet and Deep Clean are the two services people mix up most when booking. Both cover the interior and exterior, but the level of work — and what problems each one actually solves — is quite different.',
        ],
      },
      {
        heading: 'Full Valet',
        paragraphs: [
          'A Full Valet (from £60, 1.5–2.5 hours) is a complete inside-and-out clean for a car that\'s generally in good shape but needs freshening up. Inside, that\'s a thorough hoover, all surfaces cleaned, glass polished and a scent finish. Outside, it\'s a full safe wash with wheels and tyres cleaned, paint dried and tyres dressed.',
          'It\'s the right call for regular upkeep — a car that gets washed and valeted every couple of months and just needs to look sharp again, not restored.',
        ],
      },
      {
        heading: 'Deep Clean',
        paragraphs: [
          'A Deep Clean (from £120, 3–8 hours) is our flagship service, built for a car that\'s been neglected, is being prepped for sale, or just needs that "new car" feeling back. Interior work steps up to steam cleaning, shampooed seats and carpets, deeply cleaned door shuts, stripped carpets and a luxury scent finish. Exterior includes full decontamination of the wheels and paint alongside the safe wash and hydrophobic sealant.',
          'It takes considerably longer because it\'s solving problems a Full Valet isn\'t designed to touch — embedded dirt in carpets, contamination on the paint, grime built up in door shuts over months or years.',
        ],
      },
      {
        heading: 'Which one do you need?',
        paragraphs: [
          "If your car has been valeted reasonably recently and just needs a refresh, book a Full Valet. If it's been a while — six months, a year, longer — or you're prepping it for sale or just bought it secondhand, a Deep Clean is worth the extra time and cost.",
          'Still not sure? Message us with a few photos and we\'ll recommend the right service before you book — see the full breakdown on our services page.',
        ],
      },
    ],
  },
];

export function findBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
