import { NextResponse } from 'next/server';
import { getBookingsInRange } from '@/lib/queries';

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
  const range = searchParams.get('range') || 'today';

  const from = todayStr();
  const to = range === '7' ? addDaysStr(7) : range === '30' ? addDaysStr(30) : todayStr();

  const bookings = await getBookingsInRange(from, to);
  return NextResponse.json(bookings);
}
