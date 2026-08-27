import { cache } from 'react';
import { sql, sqlLive } from './db';
import type { Service, CleaningService, GalleryImage, SiteSettings, Booking, BookingStatus, BookingType } from './types';

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
  duration_minutes: number | null;
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
    durationMinutes: row.duration_minutes,
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

export async function getBookableServices(): Promise<Service[]> {
  const rows = (await sql`
    SELECT * FROM services
    WHERE is_active = TRUE AND duration_minutes IS NOT NULL
    ORDER BY sort_order ASC
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
      starting_price, price_label, duration, duration_minutes,
      interior, exterior,
      popular, show_on_homepage, homepage_tag,
      is_maintenance_callout, sort_order, homepage_sort_order, is_active
    ) VALUES (
      ${data.slug}, ${data.name}, ${data.shortName}, ${data.tagline}, ${data.description},
      ${data.startingPrice}, ${data.priceLabel}, ${data.duration}, ${data.durationMinutes},
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
      duration_minutes = ${data.durationMinutes},
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
  focal_x: number;
  focal_y: number;
};

function mapGallery(row: GalleryRow): GalleryImage {
  return {
    id: row.id,
    url: row.url,
    alt: row.alt,
    tall: row.tall,
    sortOrder: row.sort_order,
    showInPreview: row.show_in_preview,
    focalX: row.focal_x,
    focalY: row.focal_y,
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
    INSERT INTO gallery_images (url, alt, tall, sort_order, show_in_preview, focal_x, focal_y)
    VALUES (${data.url}, ${data.alt}, ${data.tall}, ${data.sortOrder}, ${data.showInPreview}, ${data.focalX ?? 50}, ${data.focalY ?? 50})
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
      show_in_preview = ${merged.showInPreview},
      focal_x = ${merged.focalX},
      focal_y = ${merged.focalY}
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

// ---- Bookings ----------------------------------------------------

type BookingRow = {
  id: number;
  service_id: number | null;
  service_name: string | null;
  service_label: string | null;
  booking_type: BookingType;
  customer_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  vehicle: string | null;
  notes: string | null;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  created_at: string;
};

function mapBooking(row: BookingRow): Booking {
  return {
    id: row.id,
    serviceId: row.service_id,
    serviceName:
      row.booking_type === 'personal' ? 'Blocked time' : row.service_name ?? row.service_label ?? 'Detailing job',
    bookingType: row.booking_type,
    customerName: row.customer_name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    vehicle: row.vehicle,
    notes: row.notes,
    bookingDate: typeof row.booking_date === 'string' ? row.booking_date : new Date(row.booking_date).toISOString().slice(0, 10),
    startTime: row.start_time.slice(0, 5),
    endTime: row.end_time.slice(0, 5),
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function getBookingById(id: number): Promise<Booking | null> {
  const rows = (await sqlLive`
    SELECT b.*, b.booking_date::text AS booking_date, s.name AS service_name
    FROM bookings b
    LEFT JOIN services s ON s.id = b.service_id
    WHERE b.id = ${id}
  `) as BookingRow[];
  return rows[0] ? mapBooking(rows[0]) : null;
}

export async function getBookingsForDate(date: string): Promise<Booking[]> {
  const rows = (await sqlLive`
    SELECT b.*, b.booking_date::text AS booking_date, s.name AS service_name
    FROM bookings b
    LEFT JOIN services s ON s.id = b.service_id
    WHERE b.booking_date = ${date} AND b.status != 'cancelled'
    ORDER BY b.start_time ASC
  `) as BookingRow[];
  return rows.map(mapBooking);
}

export async function getBookingsInRange(from: string, to: string): Promise<Booking[]> {
  const rows = (await sqlLive`
    SELECT b.*, b.booking_date::text AS booking_date, s.name AS service_name
    FROM bookings b
    LEFT JOIN services s ON s.id = b.service_id
    WHERE b.booking_date >= ${from} AND b.booking_date <= ${to}
    ORDER BY b.booking_date ASC, b.start_time ASC
  `) as BookingRow[];
  return rows.map(mapBooking);
}

export async function getPastBookings(before: string, limit = 200): Promise<Booking[]> {
  const rows = (await sqlLive`
    SELECT b.*, b.booking_date::text AS booking_date, s.name AS service_name
    FROM bookings b
    LEFT JOIN services s ON s.id = b.service_id
    WHERE b.booking_date < ${before}
    ORDER BY b.booking_date DESC, b.start_time DESC
    LIMIT ${limit}
  `) as BookingRow[];
  return rows.map(mapBooking);
}

export type BookingInput = {
  serviceId: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  vehicle: string;
  notes: string | null;
  bookingDate: string;
  startTime: string;
  endTime: string;
};

export async function createBooking(data: BookingInput): Promise<Booking> {
  const rows = (await sqlLive`
    INSERT INTO bookings (
      service_id, customer_name, email, phone, address, vehicle, notes,
      booking_date, start_time, end_time
    ) VALUES (
      ${data.serviceId}, ${data.customerName}, ${data.email}, ${data.phone}, ${data.address}, ${data.vehicle}, ${data.notes},
      ${data.bookingDate}, ${data.startTime}, ${data.endTime}
    )
    RETURNING id
  `) as { id: number }[];
  const booking = await getBookingById(rows[0].id);
  if (!booking) throw new Error('Failed to load created booking');
  return booking;
}

export type AdminBookingInput = {
  bookingType: BookingType;
  serviceId: number | null;
  serviceLabel: string | null;
  customerName: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  vehicle: string | null;
  notes: string | null;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
};

// Used by the admin calendar's "Add booking" form — unlike createBooking()
// (the public self-serve flow, which always has full contact details and a
// catalog service), this covers manually-logged jobs and blocked/personal
// time, where most fields are legitimately unknown.
export async function createAdminBooking(data: AdminBookingInput): Promise<Booking> {
  const rows = (await sqlLive`
    INSERT INTO bookings (
      service_id, service_label, booking_type, customer_name, email, phone, address, vehicle, notes,
      booking_date, start_time, end_time, status
    ) VALUES (
      ${data.serviceId}, ${data.serviceLabel}, ${data.bookingType}, ${data.customerName}, ${data.email}, ${data.phone}, ${data.address}, ${data.vehicle}, ${data.notes},
      ${data.bookingDate}, ${data.startTime}, ${data.endTime}, ${data.status}
    )
    RETURNING id
  `) as { id: number }[];
  const booking = await getBookingById(rows[0].id);
  if (!booking) throw new Error('Failed to load created booking');
  return booking;
}

export async function updateBookingStatus(id: number, status: BookingStatus): Promise<void> {
  await sqlLive`UPDATE bookings SET status = ${status} WHERE id = ${id}`;
}

export async function deleteBooking(id: number): Promise<void> {
  await sqlLive`DELETE FROM bookings WHERE id = ${id}`;
}

// ---- Review requests --------------------------------------------

export type ReviewCandidate = {
  id: number;
  customerName: string;
  email: string;
  serviceName: string;
  bookingDate: string;
};

function mapReviewCandidate(row: {
  id: number;
  customer_name: string;
  email: string;
  service_name: string | null;
  service_label: string | null;
  booking_date: string;
}): ReviewCandidate {
  return {
    id: row.id,
    customerName: row.customer_name,
    email: row.email,
    serviceName: row.service_name ?? row.service_label ?? 'your detail',
    bookingDate: row.booking_date,
  };
}

// Jobs booked for `date` that haven't had a review request sent — used by
// the daily 9pm cron.
export async function getJobsForReviewRequest(date: string): Promise<ReviewCandidate[]> {
  const rows = (await sqlLive`
    SELECT b.id, b.customer_name, b.email, b.booking_date::text, s.name AS service_name, b.service_label
    FROM bookings b
    LEFT JOIN services s ON s.id = b.service_id
    WHERE b.booking_type = 'job'
      AND b.status IN ('confirmed', 'completed')
      AND b.booking_date = ${date}
      AND b.email IS NOT NULL
      AND b.review_requested_at IS NULL
  `) as Parameters<typeof mapReviewCandidate>[0][];
  return rows.map(mapReviewCandidate);
}

export async function markReviewRequested(id: number): Promise<void> {
  await sqlLive`UPDATE bookings SET review_requested_at = NOW() WHERE id = ${id}`;
}
