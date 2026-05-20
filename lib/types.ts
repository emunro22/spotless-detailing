export type Service = {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  startingPrice: number;
  priceLabel: string | null;
  duration: string;
  interior: string[] | null;
  exterior: string[];
  popular: boolean;
  showOnHomepage: boolean;
  homepageTag: string | null;
  isMaintenanceCallout: boolean;
  sortOrder: number;
  homepageSortOrder: number;
  isActive: boolean;
};

export type GalleryImage = {
  id: number;
  url: string;
  alt: string;
  tall: boolean;
  sortOrder: number;
  showInPreview: boolean;
};

export type SiteSettings = Record<string, string>;
