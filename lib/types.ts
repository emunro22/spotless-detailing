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
  durationMinutes: number | null;
  interior: string[];
  exterior: string[];
  popular: boolean;
  showOnHomepage: boolean;
  homepageTag: string | null;
  isMaintenanceCallout: boolean;
  sortOrder: number;
  homepageSortOrder: number;
  isActive: boolean;
};

export type BookingStatus = 'confirmed' | 'completed' | 'cancelled';

export type Booking = {
  id: number;
  serviceId: number;
  serviceName: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  vehicle: string;
  notes: string | null;
  bookingDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  status: BookingStatus;
  createdAt: string;
};

export type CleaningService = {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
  sortOrder: number;
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
