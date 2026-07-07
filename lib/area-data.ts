// lib/area-data.ts
// Real, defensible facts about each service area — used to give every
// /cleaning/[area] and /valeting/[area] page genuinely distinct content
// instead of one template with the town name swapped in.

export type Proximity = 'core' | 'near' | 'far';

export interface AreaFact {
  name: string;
  slug: string;
  county: string;
  proximity: Proximity;
  /** One factual, non-promotional sentence fragment about the area (no trailing period). */
  character: string;
}

export const AREA_FACTS: AreaFact[] = [
  { name: 'Uddingston', slug: 'uddingston', county: 'South Lanarkshire', proximity: 'core', character: 'our home base, right on the edge of Glasgow\'s east end' },
  { name: 'Bothwell', slug: 'bothwell', county: 'South Lanarkshire', proximity: 'core', character: 'an affluent conservation village of sandstone villas overlooked by Bothwell Castle' },
  { name: 'Viewpark', slug: 'viewpark', county: 'North Lanarkshire', proximity: 'core', character: 'a residential community of postwar and modern housing just along the road from Uddingston' },
  { name: 'Bellshill', slug: 'bellshill', county: 'North Lanarkshire', proximity: 'core', character: 'a busy town with a mix of traditional streets and newer housing developments' },
  { name: 'Cambuslang', slug: 'cambuslang', county: 'South Lanarkshire', proximity: 'core', character: 'a town on Glasgow\'s south-eastern edge with a busy high street and estates old and new' },
  { name: 'Rutherglen', slug: 'rutherglen', county: 'South Lanarkshire', proximity: 'core', character: 'one of Scotland\'s oldest burghs, bordering Glasgow\'s southside' },
  { name: 'Blantyre', slug: 'blantyre', county: 'South Lanarkshire', proximity: 'core', character: 'best known as the birthplace of David Livingstone, with terraced streets and newer estates' },
  { name: 'Holytown', slug: 'holytown', county: 'North Lanarkshire', proximity: 'near', character: 'a village between Motherwell and Bellshill of mostly bungalows and residential streets' },
  { name: 'Bargeddie', slug: 'bargeddie', county: 'North Lanarkshire', proximity: 'near', character: 'a small village between Coatbridge and Glasgow, largely newer-build housing' },
  { name: 'Baillieston', slug: 'baillieston', county: 'Glasgow', proximity: 'near', character: 'an eastern Glasgow suburb with a traditional high street and surrounding residential estates' },
  { name: 'Mount Vernon', slug: 'mount-vernon', county: 'Glasgow', proximity: 'near', character: 'a leafy residential suburb on Glasgow\'s east side near the M8/M73 interchange' },
  { name: 'Hamilton', slug: 'hamilton', county: 'South Lanarkshire', proximity: 'near', character: 'the county town of South Lanarkshire, with a busy centre and residential estates of every era' },
  { name: 'Motherwell', slug: 'motherwell', county: 'North Lanarkshire', proximity: 'near', character: 'a town built on its steelmaking heritage, now a mix of town-centre flats and suburban housing' },
  { name: 'Wishaw', slug: 'wishaw', county: 'North Lanarkshire', proximity: 'far', character: 'a town neighbouring Motherwell with traditional streets and newer housing estates' },
  { name: 'East Kilbride', slug: 'east-kilbride', county: 'South Lanarkshire', proximity: 'far', character: 'one of Scotland\'s post-war New Towns, laid out in distinct neighbourhoods with driveways and garden space' },
  { name: 'Coatbridge', slug: 'coatbridge', county: 'North Lanarkshire', proximity: 'near', character: 'a town built on its ironworking history — once known as the "Iron Burgh" — now largely residential' },
  { name: 'Airdrie', slug: 'airdrie', county: 'North Lanarkshire', proximity: 'far', character: 'a town with a compact centre and residential streets stretching out on all sides' },
  { name: 'Glasgow', slug: 'glasgow', county: 'Glasgow', proximity: 'near', character: 'Scotland\'s largest city, everything from West End tenements to suburban semis and new-build flats' },
  { name: 'Chapelhall', slug: 'chapelhall', county: 'North Lanarkshire', proximity: 'far', character: 'a small village near Airdrie, mostly residential' },
  { name: 'Tollcross', slug: 'tollcross', county: 'Glasgow', proximity: 'near', character: 'a Glasgow east-end neighbourhood known for Tollcross Park and the International Swimming Centre' },
  { name: 'Shettleston', slug: 'shettleston', county: 'Glasgow', proximity: 'near', character: 'a traditional Glasgow east-end neighbourhood of tenements and terraced housing' },
  { name: 'Parkhead', slug: 'parkhead', county: 'Glasgow', proximity: 'near', character: 'the Glasgow east-end neighbourhood best known as home to Celtic Park' },
  { name: 'Bishopbriggs', slug: 'bishopbriggs', county: 'East Dunbartonshire', proximity: 'far', character: 'a commuter town just north of Glasgow, mostly semi-detached and detached housing' },
  { name: 'Newton Mearns', slug: 'newton-mearns', county: 'East Renfrewshire', proximity: 'far', character: 'an affluent suburb south of Glasgow known for larger detached homes and driveways' },
  { name: 'Bearsden', slug: 'bearsden', county: 'East Dunbartonshire', proximity: 'far', character: 'an affluent suburb north-west of Glasgow where the Antonine Wall once ran' },
  { name: 'Giffnock', slug: 'giffnock', county: 'East Renfrewshire', proximity: 'far', character: 'a suburb south of Glasgow with tree-lined streets and sizeable family homes' },
  { name: 'Paisley', slug: 'paisley', county: 'Renfrewshire', proximity: 'far', character: 'the county town of Renfrewshire, one of Scotland\'s largest towns with a dense mix of tenements, terraces and estates' },
  { name: 'Clydebank', slug: 'clydebank', county: 'West Dunbartonshire', proximity: 'far', character: 'a town on the Clyde built on shipbuilding heritage, now mostly residential estates' },
  { name: 'Milngavie', slug: 'milngavie', county: 'East Dunbartonshire', proximity: 'far', character: 'a town at the start of the West Highland Way, with a compact centre and surrounding suburbs' },
  { name: 'Renfrew', slug: 'renfrew', county: 'Renfrewshire', proximity: 'far', character: 'a town on the Clyde close to Glasgow Airport, with a mix of older streets and newer estates' },
  { name: 'Lanark', slug: 'lanark', county: 'South Lanarkshire', proximity: 'far', character: 'the South Lanarkshire county town near the historic New Lanark mills, at the outer edge of our coverage' },
  { name: 'Kirkintilloch', slug: 'kirkintilloch', county: 'East Dunbartonshire', proximity: 'far', character: 'a town on the Forth and Clyde Canal to the north-east of Glasgow' },
  { name: 'Carluke', slug: 'carluke', county: 'South Lanarkshire', proximity: 'far', character: 'a town historically known for fruit growing, with traditional streets and newer estates' },
  { name: 'Larkhall', slug: 'larkhall', county: 'South Lanarkshire', proximity: 'far', character: 'a town south of Hamilton with a traditional high street and surrounding housing estates' },
];

export function findAreaFact(slug: string): AreaFact | undefined {
  return AREA_FACTS.find((a) => a.slug === slug);
}

/** Deterministic small integer from a string — same input always maps to the same output, no Math.random(). */
export function hashIndex(input: string, mod: number): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % mod;
}

const PROXIMITY_PHRASE: Record<Proximity, string[]> = {
  core: [
    'just minutes from our Uddingston base',
    'right on our doorstep',
    'a short hop from where we\'re based in Uddingston',
  ],
  near: [
    'a short drive from our Uddingston base',
    'well within our regular coverage area',
    'one of the areas we visit most often',
  ],
  far: [
    'towards the edge of our 15-mile coverage area',
    'a bit further out, but well within reach',
    'one of the outer towns we regularly cover',
  ],
};

export function proximityPhrase(fact: AreaFact): string {
  const options = PROXIMITY_PHRASE[fact.proximity];
  return options[hashIndex(fact.slug + fact.proximity, options.length)];
}
