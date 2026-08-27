import { NextResponse } from 'next/server';
import { getBookableServices, getBookingsInRange } from '@/lib/queries';
import { getDaySlots, isClosedDay } from '@/lib/booking';
import type { Booking } from '@/lib/types';

export const dynamic = 'force-dynamic';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

// Per-day availability for a whole month — 'available' | 'full' | 'closed' | 'past'.
// No customer details, just a status per date, so this is safe to expose publicly.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const serviceId = Number(searchParams.get('serviceId'));
  const year = Number(searchParams.get('year'));
  const month = Number(searchParams.get('month')); // 1-12

  if (!serviceId || !year || !month || month < 1 || month > 12) {
    return NextResponse.json({ error: 'serviceId, year and month are required' }, { status: 400 });
  }

  const services = await getBookableServices();
  const service = services.find((s) => s.id === serviceId);
  if (!service || !service.durationMinutes) {
    return NextResponse.json({ error: 'Service is not available for online booking' }, { status: 400 });
  }

  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const from = `${year}-${pad(month)}-01`;
  const to = `${year}-${pad(month)}-${pad(daysInMonth)}`;

  const bookings = (await getBookingsInRange(from, to)).filter((b) => b.status !== 'cancelled');
  const byDate: Record<string, Pick<Booking, 'startTime' | 'endTime'>[]> = {};
  for (const b of bookings) {
    (byDate[b.bookingDate] ||= []).push(b);
  }

  const today = new Date().toISOString().slice(0, 10);
  const days: Record<string, 'available' | 'full' | 'closed' | 'past'> = {};

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${pad(month)}-${pad(d)}`;
    if (dateStr < today) {
      days[dateStr] = 'past';
    } else if (isClosedDay(dateStr)) {
      days[dateStr] = 'closed';
    } else {
      const slots = getDaySlots(dateStr, service.durationMinutes, byDate[dateStr] || []);
      days[dateStr] = slots.some((s) => s.available) ? 'available' : 'full';
    }
  }

  return NextResponse.json({ days });
}
