import { NextResponse } from 'next/server';
import { getBookableServices, getBookingsForDate } from '@/lib/queries';
import { getDaySlots } from '@/lib/booking';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const serviceId = Number(searchParams.get('serviceId'));
  const date = searchParams.get('date');

  if (!serviceId || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'serviceId and date (YYYY-MM-DD) are required' }, { status: 400 });
  }

  const services = await getBookableServices();
  const service = services.find((s) => s.id === serviceId);
  if (!service || !service.durationMinutes) {
    return NextResponse.json({ error: 'Service is not available for online booking' }, { status: 400 });
  }

  // Existing bookings (jobs and blocked/personal time) determine what's taken —
  // only start/end times are used here, no customer details are exposed.
  const existing = await getBookingsForDate(date);
  const slots = getDaySlots(date, service.durationMinutes, existing);

  return NextResponse.json({ slots, durationMinutes: service.durationMinutes });
}
