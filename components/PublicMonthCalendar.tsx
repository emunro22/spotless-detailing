'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_LABEL = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function dateKey(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

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
    const overflow = new Date(Date.UTC(last.year, last.month, last.day + 1));
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

type DayStatus = 'available' | 'full' | 'closed' | 'past';

export default function PublicMonthCalendar({
  serviceId,
  selected,
  onSelect,
}: {
  serviceId: number | '';
  selected: string;
  onSelect: (date: string) => void;
}) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [days, setDays] = useState<Record<string, DayStatus>>({});
  const [loading, setLoading] = useState(true);

  const grid = useMemo(() => buildGrid(year, month), [year, month]);
  const todayKey = dateKey(now.getFullYear(), now.getMonth(), now.getDate());

  useEffect(() => {
    if (!serviceId) return;
    let cancelled = false;
    setLoading(true);
    fetch(`/api/booking/month-availability?serviceId=${serviceId}&year=${year}&month=${month + 1}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setDays(data.days || {});
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [serviceId, year, month]);

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

  const canGoBack = year > now.getFullYear() || month > now.getMonth();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-display text-base font-semibold text-cream">
          {MONTH_LABEL.format(new Date(Date.UTC(year, month, 1)))}
        </div>
        <div className="flex items-center gap-2">
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-cream/40" />}
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            disabled={!canGoBack}
            aria-label="Previous month"
            className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-cyan/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            aria-label="Next month"
            className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-cyan/30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl glass border-gradient overflow-hidden">
        <div className="grid grid-cols-7 border-b border-cream/10">
          {WEEKDAY_LABELS.map((w) => (
            <div
              key={w}
              className="py-2 text-center text-[10px] uppercase tracking-[0.14em] text-cream/40 font-medium"
            >
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {grid.map((cell, i) => {
            const key = dateKey(cell.year, cell.month, cell.day);
            const status: DayStatus | undefined = cell.inMonth ? days[key] : undefined;
            const isToday = key === todayKey;
            const isSelected = key === selected;
            const disabled = !cell.inMonth || !status || status === 'closed' || status === 'past' || status === 'full';

            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => onSelect(key)}
                className={`relative aspect-square p-1 flex flex-col items-center justify-center gap-1 border-b border-r border-cream/5 transition-colors ${
                  !cell.inMonth ? 'bg-black/10' : ''
                } ${isSelected ? 'ring-1 ring-inset ring-cyan/60 bg-cyan/10' : disabled ? '' : 'hover:bg-cream/[0.04]'}`}
              >
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs sm:text-sm font-medium ${
                    isToday
                      ? 'bg-cyan text-midnight-900'
                      : !cell.inMonth
                        ? 'text-cream/20'
                        : status === 'available'
                          ? 'text-cream'
                          : 'text-cream/25'
                  }`}
                >
                  {cell.day}
                </span>
                {cell.inMonth && status && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      status === 'available'
                        ? 'bg-cyan'
                        : status === 'full'
                          ? 'bg-red-400/70'
                          : 'bg-transparent'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3 text-xs text-cream/50">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400/70" /> Fully booked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cream/20" /> Closed
        </span>
      </div>
    </div>
  );
}
