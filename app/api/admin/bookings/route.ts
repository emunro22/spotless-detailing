import { NextResponse } from 'next/server';
import { getBookingsInRange, getPastBookings, createAdminBooking, type AdminBookingInput } from '@/lib/queries';
import type { BookingType } from '@/lib/types';

export const dynamic = 'force-dynamic';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDaysStr(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const explicitFrom = searchParams.get('from');
  const explicitTo = searchParams.get('to');

  if (explicitFrom && explicitTo) {
    const bookings = await getBookingsInRange(explicitFrom, explicitTo);
    return NextResponse.json(bookings);
  }

  const range = searchParams.get('range') || 'today';

  if (range === 'past') {
    const bookings = await getPastBookings(todayStr());
    return NextResponse.json(bookings);
  }

  const from = todayStr();
  const to = range === '7' ? addDaysStr(7) : range === '30' ? addDaysStr(30) : todayStr();

  const bookings = await getBookingsInRange(from, to);
  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const bookingType: BookingType = body.bookingType === 'personal' ? 'personal' : 'job';
    const customerName = String(body.customerName || '').trim();
    const bookingDate = String(body.bookingDate || '');
    const startTime = String(body.startTime || '');
    const endTime = String(body.endTime || '');

    if (!customerName || !/^\d{4}-\d{2}-\d{2}$/.test(bookingDate) || !startTime || !endTime) {
      return NextResponse.json({ error: 'Name, date, start time and end time are required.' }, { status: 400 });
    }
    if (endTime <= startTime) {
      return NextResponse.json({ error: 'End time must be after start time.' }, { status: 400 });
    }

    const data: AdminBookingInput = {
      bookingType,
      serviceId: bookingType === 'job' && body.serviceId ? Number(body.serviceId) : null,
      serviceLabel: bookingType === 'job' ? (body.serviceLabel ? String(body.serviceLabel).trim() : null) : null,
      customerName,
      email: bookingType === 'job' && body.email ? String(body.email).trim() : null,
      phone: bookingType === 'job' && body.phone ? String(body.phone).trim() : null,
      address: bookingType === 'job' && body.address ? String(body.address).trim() : null,
      vehicle: bookingType === 'job' && body.vehicle ? String(body.vehicle).trim() : null,
      notes: body.notes ? String(body.notes).trim() : null,
      bookingDate,
      startTime,
      endTime,
      status: bookingDate < new Date().toISOString().slice(0, 10) ? 'completed' : 'confirmed',
    };

    const booking = await createAdminBooking(data);
    return NextResponse.json(booking, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Create failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
