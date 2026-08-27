import { NextResponse } from 'next/server';
import { updateBookingStatus, deleteBooking } from '@/lib/queries';
import type { BookingStatus } from '@/lib/types';

export const dynamic = 'force-dynamic';

const VALID_STATUSES: BookingStatus[] = ['confirmed', 'completed', 'cancelled'];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  if (!VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  await updateBookingStatus(Number(id), body.status);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteBooking(Number(id));
  return NextResponse.json({ ok: true });
}
