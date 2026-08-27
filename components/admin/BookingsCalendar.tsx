'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Phone, MapPin, Car, Loader2, Check, X as XIcon, Plus } from 'lucide-react';
import type { Booking, Service } from '@/lib/types';
import AddBookingModal from './AddBookingModal';

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function dateKey(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function todayKey(): string {
  const now = new Date();
  return dateKey(now.getFullYear(), now.getMonth(), now.getDate());
}

// Grid of 42 cells (6 weeks, Monday-first) covering the visible month plus
// leading/trailing days from adjacent months so the calendar reads naturally.
function buildGrid(year: number, month: number) {
  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const firstWeekday = (firstOfMonth.getUTCDay() + 6) % 7; // Monday = 0

  const cells: { year: number; month: number; day: number; inMonth: boolean }[] = [];

  const prevDaysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let i = firstWeekday - 1; i >= 0; i--) {
    const day = prevDaysInMonth - i;
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    cells.push({ year: y, month: m, day, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ year, month, day: d, inMonth: true });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const last = cells[cells.length - 1];
    const nextDay = last.day + 1;
    const overflow = new Date(Date.UTC(last.year, last.month, nextDay));
    cells.push({
      year: overflow.getUTCFullYear(),
      month: overflow.getUTCMonth(),
      day: overflow.getUTCDate(),
      inMonth: false,
    });
    if (cells.length >= 42) break;
  }
  return cells;
}

const MONTH_LABEL = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });

export default function BookingsCalendar({ services }: { services: Service[] }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState<string>(todayKey());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const grid = useMemo(() => buildGrid(year, month), [year, month]);

  const load = useCallback(() => {
    setLoading(true);
    const from = `${grid[0].year}-${pad(grid[0].month + 1)}-${pad(grid[0].day)}`;
    const lastCell = grid[grid.length - 1];
    const to = `${lastCell.year}-${pad(lastCell.month + 1)}-${pad(lastCell.day)}`;
    fetch(`/api/admin/bookings?from=${from}&to=${to}`)
      .then((res) => res.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [grid]);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: number, status: 'completed' | 'cancelled') {
    setUpdating(id);
    await fetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setUpdating(null);
    load();
  }

  const byDate = useMemo(() => {
    const map: Record<string, Booking[]> = {};
    for (const b of bookings) {
      (map[b.bookingDate] ||= []).push(b);
    }
    for (const list of Object.values(map)) {
      list.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [bookings]);

  function goToday() {
    setYear(now.getFullYear());
    setMonth(now.getMonth());
    setSelected(todayKey());
  }

  function shiftMonth(delta: number) {
    let m = month + delta;
    let y = year;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setMonth(m);
    setYear(y);
  }

  const selectedBookings = byDate[selected] || [];
  const tKey = todayKey();

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
          {MONTH_LABEL.format(new Date(Date.UTC(year, month, 1)))}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan text-midnight-900 hover:bg-cyan-glow shadow-glow-cyan transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
          <button
            onClick={goToday}
            className="px-3 py-1.5 rounded-full text-xs font-medium border border-cream/15 text-cream/70 hover:border-cyan/30 hover:text-cyan transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => shiftMonth(-1)}
            aria-label="Previous month"
            className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-cyan/30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => shiftMonth(1)}
            aria-label="Next month"
            className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-cyan/30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-cream/50 text-xs mb-3">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Loading…
        </div>
      )}

      <div className="rounded-2xl glass border-gradient overflow-hidden">
        <div className="grid grid-cols-7 border-b border-cream/10">
          {WEEKDAY_LABELS.map((w) => (
            <div
              key={w}
              className="py-2 text-center text-[10px] md:text-xs uppercase tracking-[0.14em] text-cream/40 font-medium"
            >
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {grid.map((cell, i) => {
            const key = dateKey(cell.year, cell.month, cell.day);
            const dayBookings = byDate[key] || [];
            const isToday = key === tKey;
            const isSelected = key === selected;
            const jobs = dayBookings.filter((b) => b.bookingType === 'job' && b.status !== 'cancelled');
            const personal = dayBookings.filter((b) => b.bookingType === 'personal');

            return (
              <button
                key={i}
                onClick={() => setSelected(key)}
                className={`relative aspect-square sm:aspect-[4/3] p-1.5 sm:p-2 text-left border-b border-r border-cream/5 transition-colors ${
                  cell.inMonth ? 'bg-transparent' : 'bg-black/10'
                } ${isSelected ? 'ring-1 ring-inset ring-cyan/60 bg-cyan/5' : 'hover:bg-cream/[0.03]'}`}
              >
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[11px] sm:text-xs font-medium ${
                    isToday
                      ? 'bg-cyan text-midnight-900'
                      : cell.inMonth
                        ? 'text-cream/80'
                        : 'text-cream/25'
                  }`}
                >
                  {cell.day}
                </span>

                {/* Desktop: event chips */}
                <div className="hidden sm:block mt-1 space-y-0.5">
                  {jobs.slice(0, 2).map((b) => (
                    <div
                      key={b.id}
                      className="truncate text-[10px] leading-tight px-1 py-0.5 rounded bg-cyan/15 text-cyan-glow"
                    >
                      {b.startTime} {b.customerName}
                    </div>
                  ))}
                  {personal.slice(0, jobs.length >= 2 ? 0 : 1).map((b) => (
                    <div
                      key={b.id}
                      className="truncate text-[10px] leading-tight px-1 py-0.5 rounded bg-amber-500/15 text-amber-400"
                    >
                      {b.customerName}
                    </div>
                  ))}
                  {jobs.length + personal.length > 2 && (
                    <div className="text-[10px] text-cream/40 px-1">
                      +{jobs.length + personal.length - 2} more
                    </div>
                  )}
                </div>

                {/* Mobile: dots */}
                <div className="sm:hidden flex flex-wrap gap-0.5 mt-1">
                  {jobs.slice(0, 4).map((b) => (
                    <span key={b.id} className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  ))}
                  {personal.slice(0, 4).map((b) => (
                    <span key={b.id} className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xs uppercase tracking-[0.18em] text-cyan font-medium mb-3">
          {new Date(`${selected}T00:00:00`).toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
          {selected === tKey && ' · Today'}
        </div>

        {selectedBookings.length === 0 ? (
          <div className="text-sm text-cream/40 py-8 text-center rounded-2xl border border-dashed border-cream/10">
            Nothing booked this day.
          </div>
        ) : (
          <div className="space-y-3">
            {selectedBookings.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                updating={updating === b.id}
                onComplete={() => setStatus(b.id, 'completed')}
                onCancel={() => setStatus(b.id, 'cancelled')}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddBookingModal
          defaultDate={selected}
          services={services}
          onClose={() => setShowAddModal(false)}
          onCreated={() => {
            setShowAddModal(false);
            load();
          }}
        />
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
  const isPersonal = booking.bookingType === 'personal';

  return (
    <div className={`glass rounded-2xl p-4 md:p-5 ${isPersonal ? 'border border-amber-500/20' : 'border-gradient'}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <div className="font-display text-lg font-semibold text-cream">{booking.startTime}</div>
          <div className="text-xs text-cream/40">– {booking.endTime}</div>
        </div>
        {isPersonal ? (
          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold px-2.5 py-1 rounded-full border bg-amber-500/10 border-amber-500/25 text-amber-400">
            Blocked
          </span>
        ) : (
          <StatusBadge status={booking.status} />
        )}
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="text-sm font-medium text-cream">{booking.customerName}</div>
        {!isPersonal && <div className="text-sm text-cyan">{booking.serviceName}</div>}
        {booking.vehicle && (
          <div className="flex items-center gap-1.5 text-xs text-cream/60">
            <Car className="w-3.5 h-3.5 flex-shrink-0" />
            {booking.vehicle}
          </div>
        )}
        {booking.address && (
          <div className="flex items-center gap-1.5 text-xs text-cream/60">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {booking.address}
          </div>
        )}
        {booking.phone && (
          <a
            href={`tel:${booking.phone}`}
            className="flex items-center gap-1.5 text-xs text-cream/60 hover:text-cyan transition-colors w-fit"
          >
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            {booking.phone}
          </a>
        )}
        {booking.notes && (
          <div className="text-xs text-cream/50 pt-1 border-t border-cream/5 mt-2 whitespace-pre-line">
            {booking.notes}
          </div>
        )}
      </div>

      {!isPersonal && booking.status === 'confirmed' && (
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
