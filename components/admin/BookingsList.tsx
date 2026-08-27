'use client';

import { useEffect, useState, useCallback } from 'react';
import { Phone, MapPin, Car, Loader2, Check, X as XIcon } from 'lucide-react';
import type { Booking } from '@/lib/types';

const TABS = [
  { key: 'today', label: 'Today' },
  { key: '7', label: 'Next 7 days' },
  { key: '30', label: 'Next 30 days' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function BookingsList() {
  const [tab, setTab] = useState<TabKey>('today');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const load = useCallback((range: TabKey) => {
    setLoading(true);
    fetch(`/api/admin/bookings?range=${range}`)
      .then((res) => res.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load(tab);
  }, [tab, load]);

  async function setStatus(id: number, status: 'completed' | 'cancelled') {
    setUpdating(id);
    await fetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setUpdating(null);
    load(tab);
  }

  const today = new Date().toISOString().slice(0, 10);
  const grouped = groupByDate(bookings);

  return (
    <div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              tab === t.key
                ? 'bg-cyan text-midnight-900 border-cyan'
                : 'bg-transparent border-cream/15 text-cream/70 hover:border-cyan/30'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-cream/50 py-10 justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading jobs…
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 text-cream/50">
          No jobs booked in this window.
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan font-medium mb-3">
                {formatDateHeading(date, today)}
              </div>
              <div className="space-y-3">
                {items.map((b) => (
                  <BookingCard
                    key={b.id}
                    booking={b}
                    updating={updating === b.id}
                    onComplete={() => setStatus(b.id, 'completed')}
                    onCancel={() => setStatus(b.id, 'cancelled')}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BookingCard({
  booking,
  updating,
  onComplete,
  onCancel,
}: {
  booking: Booking;
  updating: boolean;
  onComplete: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="glass border-gradient rounded-2xl p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <div className="font-display text-lg font-semibold text-cream">
            {booking.startTime}
          </div>
          <div className="text-xs text-cream/40">– {booking.endTime}</div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="text-sm font-medium text-cream">{booking.customerName}</div>
        <div className="text-sm text-cyan">{booking.serviceName}</div>
        <div className="flex items-center gap-1.5 text-xs text-cream/60">
          <Car className="w-3.5 h-3.5 flex-shrink-0" />
          {booking.vehicle}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-cream/60">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          {booking.address}
        </div>
        <a
          href={`tel:${booking.phone}`}
          className="flex items-center gap-1.5 text-xs text-cream/60 hover:text-cyan transition-colors w-fit"
        >
          <Phone className="w-3.5 h-3.5 flex-shrink-0" />
          {booking.phone}
        </a>
        {booking.notes && (
          <div className="text-xs text-cream/50 pt-1 border-t border-cream/5 mt-2">
            {booking.notes}
          </div>
        )}
      </div>

      {booking.status === 'confirmed' && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={onComplete}
            disabled={updating}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/15 disabled:opacity-50 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            Mark completed
          </button>
          <button
            onClick={onCancel}
            disabled={updating}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/15 disabled:opacity-50 transition-colors"
          >
            <XIcon className="w-3.5 h-3.5" />
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Booking['status'] }) {
  const styles = {
    confirmed: 'bg-cyan/10 border-cyan/25 text-cyan',
    completed: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
    cancelled: 'bg-red-500/10 border-red-500/25 text-red-400',
  } as const;
  return (
    <span
      className={`text-[10px] uppercase tracking-[0.14em] font-semibold px-2.5 py-1 rounded-full border ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function groupByDate(bookings: Booking[]): Record<string, Booking[]> {
  return bookings.reduce<Record<string, Booking[]>>((acc, b) => {
    (acc[b.bookingDate] ||= []).push(b);
    return acc;
  }, {});
}

function formatDateHeading(date: string, today: string): string {
  if (date === today) return `Today · ${formatDate(date)}`;
  return formatDate(date);
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
