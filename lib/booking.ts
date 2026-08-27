import type { Booking } from './types';

// Mon–Sat 8:00–18:00 (matches BUSINESS.hours in lib/constants.ts). Sunday closed.
export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 18;
export const SLOT_INTERVAL_MINUTES = 30;
export const BOOKING_BUFFER_MINUTES = 30; // gap between jobs for pack-up/travel

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function toTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

export function isClosedDay(dateStr: string): boolean {
  // dateStr is YYYY-MM-DD, parsed as UTC midnight to avoid TZ drift on the day-of-week.
  const day = new Date(`${dateStr}T00:00:00Z`).getUTCDay();
  return day === 0; // Sunday
}

/**
 * Available start times (HH:MM, 30-min grid) for a service of `durationMinutes`
 * on `dateStr`, given the day's existing (non-cancelled) bookings.
 */
export function getAvailableSlots(
  dateStr: string,
  durationMinutes: number,
  existingBookings: Pick<Booking, 'startTime' | 'endTime'>[],
  now: Date = new Date()
): string[] {
  if (isClosedDay(dateStr)) return [];

  const openMinutes = OPEN_HOUR * 60;
  const closeMinutes = CLOSE_HOUR * 60;
  const latestStart = closeMinutes - durationMinutes;
  if (latestStart < openMinutes) return [];

  const busy = existingBookings.map((b) => ({
    start: toMinutes(b.startTime) - BOOKING_BUFFER_MINUTES,
    end: toMinutes(b.endTime) + BOOKING_BUFFER_MINUTES,
  }));

  const isToday = dateStr === now.toISOString().slice(0, 10);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const slots: string[] = [];
  for (let start = openMinutes; start <= latestStart; start += SLOT_INTERVAL_MINUTES) {
    if (isToday && start <= nowMinutes) continue;
    const end = start + durationMinutes;
    const overlaps = busy.some((b) => start < b.end && end > b.start);
    if (!overlaps) slots.push(toTimeString(start));
  }
  return slots;
}

export function addMinutes(time: string, minutes: number): string {
  return toTimeString(toMinutes(time) + minutes);
}
