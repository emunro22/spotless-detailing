import { cache } from 'react';
import { sql } from './db';
import type { Service, CleaningService, GalleryImage, SiteSettings } from './types';

// ---- Service row mapping ----------------------------------------

type ServiceRow = {
  id: number;
  slug: string;
  name: string;
  short_name: string;
  tagline: string;
  description: string;
  starting_price: number;
  price_label: string | null;
  duration: string;
  interior: string[];
  exterior: string[];
  popular: boolean;
  show_on_homepage: boolean;
  homepage_tag: string | null;
  is_maintenance_callout: boolean;
  sort_order: number;
  homepage_sort_order: number;
  is_active: boolean;
};

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortName: row.short_name,
    tagline: row.tagline,
    description: row.description,
    startingPrice: row.starting_price,
    priceLabel: row.price_label,
    duration: row.duration,
    interior: row.interior,
    exterior: row.exterior,
    popular: row.popular,
    showOnHomepage: row.show_on_homepage,
    homepageTag: row.homepage_tag,
    isMaintenanceCallout: row.is_maintenance_callout,
    sortOrder: row.sort_order,
    homepageSortOrder: row.homepage_sort_order,
    isActive: row.is_active,
  };
}

// ---- Services: public reads ------------------------------------

export async function getAllServices(): Promise<Service[]> {
  const rows = (await sql`
    SELECT * FROM services
    WHERE is_active = TRUE
    ORDER BY sort_order ASC
  `) as ServiceRow[];
  return rows.map(mapService);
}

export async function getHomepageServices(): Promise<Service[]> {
  const rows = (await sql`
    SELECT * FROM services
    WHERE is_active = TRUE AND show_on_homepage = TRUE
    ORDER BY homepage_sort_order ASC, sort_order ASC
  `) as ServiceRow[];
  return rows.map(mapService);
}

// ---- Services: admin reads + writes ---------------------------

export async function getAllServicesAdmin(): Promise<Service[]> {
  const rows = (await sql`SELECT * FROM services ORDER BY sort_order ASC`) as ServiceRow[];
  return rows.map(mapService);
}

export async function getServiceById(id: number): Promise<Service | null> {
  const rows = (await sql`SELECT * FROM services WHERE id = ${id}`) as ServiceRow[];
  return rows[0] ? mapService(rows[0]) : null;
}

export type ServiceInput = Omit<Service, 'id'>;

export async function createService(data: ServiceInput): Promise<Service> {
  const rows = (await sql`
    INSERT INTO services (
      slug, name, short_name, tagline, description,
      starting_price, price_label, duration,
      interior, exterior,
      popular, show_on_homepage, homepage_tag,
      is_maintenance_callout, sort_order, homepage_sort_order, is_active
    ) VALUES (
      ${data.slug}, ${data.name}, ${data.shortName}, ${data.tagline}, ${data.description},
      ${data.startingPrice}, ${data.priceLabel}, ${data.duration},
      ${JSON.stringify(data.interior)}, ${JSON.stringify(data.exterior)},
      ${data.popular}, ${data.showOnHomepage}, ${data.homepageTag},
      ${data.isMaintenanceCallout}, ${data.sortOrder}, ${data.homepageSortOrder}, ${data.isActive}
    )
    RETURNING *
  `) as ServiceRow[];
  return mapService(rows[0]);
}

export async function updateService(id: number, data: ServiceInput): Promise<Service> {
  const rows = (await sql`
    UPDATE services SET
      slug = ${data.slug},
      name = ${data.name},
      short_name = ${data.shortName},
      tagline = ${data.tagline},
      description = ${data.description},
      starting_price = ${data.startingPrice},
      price_label = ${data.priceLabel},
      duration = ${data.duration},
      interior = ${JSON.stringify(data.interior)},
      exterior = ${JSON.stringify(data.exterior)},
      popular = ${data.popular},
      show_on_homepage = ${data.showOnHomepage},
      homepage_tag = ${data.homepageTag},
      is_maintenance_callout = ${data.isMaintenanceCallout},
      sort_order = ${data.sortOrder},
      homepage_sort_order = ${data.homepageSortOrder},
      is_active = ${data.isActive},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `) as ServiceRow[];
  if (!rows[0]) throw new Error('Service not found');
  return mapService(rows[0]);
}

export async function deleteService(id: number): Promise<void> {
  await sql`DELETE FROM services WHERE id = ${id}`;
}

// ---- Cleaning services -------------------------------------------

type CleaningServiceRow = {
  id: number;
  slug: string;
  name: string;
  short_name: string;
  tagline: string;
  description: string;
  features: string[];
  best_for: string;
  sort_order: number;
  is_active: boolean;
};

function mapCleaningService(row: CleaningServiceRow): CleaningService {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortName: row.short_name,
    tagline: row.tagline,
    description: row.description,
    features: row.features,
    bestFor: row.best_for,
    sortOrder: row.sort_order,
    isActive: row.is_active,
  };
}

export async function getAllCleaningServices(): Promise<CleaningService[]> {
  const rows = (await sql`
    SELECT * FROM cleaning_services
    WHERE is_active = TRUE
    ORDER BY sort_order ASC
  `) as CleaningServiceRow[];
  return rows.map(mapCleaningService);
}

export async function getAllCleaningServicesAdmin(): Promise<CleaningService[]> {
  const rows = (await sql`SELECT * FROM cleaning_services ORDER BY sort_order ASC`) as CleaningServiceRow[];
  return rows.map(mapCleaningService);
}

export async function getCleaningServiceById(id: number): Promise<CleaningService | null> {
  const rows = (await sql`SELECT * FROM cleaning_services WHERE id = ${id}`) as CleaningServiceRow[];
  return rows[0] ? mapCleaningService(rows[0]) : null;
}

export type CleaningServiceInput = Omit<CleaningService, 'id'>;

export async function createCleaningService(data: CleaningServiceInput): Promise<CleaningService> {
  const rows = (await sql`
    INSERT INTO cleaning_services (
      slug, name, short_name, tagline, description, features, best_for, sort_order, is_active
    ) VALUES (
      ${data.slug}, ${data.name}, ${data.shortName}, ${data.tagline}, ${data.description},
      ${JSON.stringify(data.features)}, ${data.bestFor}, ${data.sortOrder}, ${data.isActive}
    )
    RETURNING *
  `) as CleaningServiceRow[];
  return mapCleaningService(rows[0]);
}

export async function updateCleaningService(
  id: number,
  data: CleaningServiceInput
): Promise<CleaningService> {
  const rows = (await sql`
    UPDATE cleaning_services SET
      slug = ${data.slug},
      name = ${data.name},
      short_name = ${data.shortName},
      tagline = ${data.tagline},
      description = ${data.description},
      features = ${JSON.stringify(data.features)},
      best_for = ${data.bestFor},
      sort_order = ${data.sortOrder},
      is_active = ${data.isActive},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `) as CleaningServiceRow[];
  if (!rows[0]) throw new Error('Cleaning service not found');
  return mapCleaningService(rows[0]);
}

export async function deleteCleaningService(id: number): Promise<void> {
  await sql`DELETE FROM cleaning_services WHERE id = ${id}`;
}

// ---- Gallery ---------------------------------------------------

type GalleryRow = {
  id: number;
  url: string;
  alt: string;
  tall: boolean;
  sort_order: number;
  show_in_preview: boolean;
};

function mapGallery(row: GalleryRow): GalleryImage {
  return {
    id: row.id,
    url: row.url,
    alt: row.alt,
    tall: row.tall,
    sortOrder: row.sort_order,
    showInPreview: row.show_in_preview,
  };
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  const rows = (await sql`SELECT * FROM gallery_images ORDER BY sort_order ASC`) as GalleryRow[];
  return rows.map(mapGallery);
}

export async function getPreviewGalleryImages(): Promise<GalleryImage[]> {
  const rows = (await sql`
    SELECT * FROM gallery_images
    WHERE show_in_preview = TRUE
    ORDER BY sort_order ASC
  `) as GalleryRow[];
  return rows.map(mapGallery);
}

export type GalleryInput = Omit<GalleryImage, 'id'>;

export async function addGalleryImage(data: GalleryInput): Promise<GalleryImage> {
  const rows = (await sql`
    INSERT INTO gallery_images (url, alt, tall, sort_order, show_in_preview)
    VALUES (${data.url}, ${data.alt}, ${data.tall}, ${data.sortOrder}, ${data.showInPreview})
    RETURNING *
  `) as GalleryRow[];
  return mapGallery(rows[0]);
}

export async function updateGalleryImage(
  id: number,
  data: Partial<Omit<GalleryImage, 'id' | 'url'>>
): Promise<GalleryImage> {
  const existing = (await sql`SELECT * FROM gallery_images WHERE id = ${id}`) as GalleryRow[];
  if (!existing[0]) throw new Error('Image not found');
  const current = mapGallery(existing[0]);
  const merged = { ...current, ...data };
  const rows = (await sql`
    UPDATE gallery_images SET
      alt = ${merged.alt},
      tall = ${merged.tall},
      sort_order = ${merged.sortOrder},
      show_in_preview = ${merged.showInPreview}
    WHERE id = ${id}
    RETURNING *
  `) as GalleryRow[];
  return mapGallery(rows[0]);
}

export async function deleteGalleryImage(id: number): Promise<GalleryImage | null> {
  const rows = (await sql`DELETE FROM gallery_images WHERE id = ${id} RETURNING *`) as GalleryRow[];
  return rows[0] ? mapGallery(rows[0]) : null;
}

// ---- Settings --------------------------------------------------

export const getAllSettings = cache(async function getAllSettings(): Promise<SiteSettings> {
  const rows = (await sql`SELECT key, value FROM site_settings`) as { key: string; value: string }[];
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
});

export async function updateSettings(settings: Record<string, string>): Promise<void> {
  for (const [key, value] of Object.entries(settings)) {
    await sql`
      INSERT INTO site_settings (key, value)
      VALUES (${key}, ${value})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
    `;
  }
}
