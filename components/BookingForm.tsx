'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import type { Service } from '@/lib/types';
import PublicMonthCalendar from './PublicMonthCalendar';

interface BookingFormProps {
  services: Service[];
}

type FormState = 'idle' | 'loading' | 'success' | 'error';
type SlotInfo = { time: string; available: boolean };

export default function BookingForm({ services }: BookingFormProps) {
  const [serviceId, setServiceId] = useState<number | ''>(services[0]?.id ?? '');
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState('');
  const [startTime, setStartTime] = useState('');

  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState<{ service: string; date: string; time: string } | null>(null);

  useEffect(() => {
    setStartTime('');
    setSlots([]);
    if (!serviceId || !date) return;

    let cancelled = false;
    setSlotsLoading(true);
    setSlotsError('');

    fetch(`/api/booking/availability?serviceId=${serviceId}&date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          setSlotsError(data.error);
          return;
        }
        const daySlots: SlotInfo[] = data.slots || [];
        setSlots(daySlots);
        if (daySlots.length === 0) {
          setSlotsError('Closed that day, try another date.');
        } else if (!daySlots.some((s) => s.available)) {
          setSlotsError('Fully booked that day, try another date.');
        }
      })
      .catch(() => {
        if (!cancelled) setSlotsError('Could not load availability. Please try again.');
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [serviceId, date]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const selectedService = services.find((s) => s.id === serviceId);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, serviceId, date, startTime }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body.error ?? 'Something went wrong. Please try again.');
      }

      setConfirmed({
        service: selectedService?.name || '',
        date: new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        }),
        time: startTime,
      });
      setState('success');
      form.reset();
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (state === 'success' && confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl glass-strong border-gradient p-10 md:p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-cyan/15 border border-cyan/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-cyan" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream mb-3">
          Booking confirmed.
        </h3>
        <p className="text-cream/65 max-w-md mx-auto leading-relaxed">
          {confirmed.service} on {confirmed.date} at {confirmed.time}. A confirmation email is on
          its way to you.
        </p>
        <button
          onClick={() => {
            setState('idle');
            setConfirmed(null);
            setDate('');
          }}
          className="mt-7 text-sm text-cyan hover:text-cyan-glow underline-offset-4 hover:underline transition-colors"
        >
          Book another slot
        </button>
      </motion.div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="rounded-3xl glass-strong border-gradient p-10 md:p-12 text-center">
        <p className="text-cream/70">
          Online booking is temporarily unavailable, please{' '}
          <Link href="/contact" className="text-cyan hover:text-cyan-glow underline">
            get in touch
          </Link>{' '}
          to arrange a slot.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl glass-strong border-gradient p-7 md:p-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Label htmlFor="serviceId">Service</Label>
          <select
            id="serviceId"
            value={serviceId}
            onChange={(e) => setServiceId(Number(e.target.value))}
            required
            className={selectCls}
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.priceLabel || `from £${s.startingPrice}`} · {s.duration}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-cream/40">
            Need Polishing, Protection or a Maintenance Plan? Those are bespoke, so{' '}
            <Link href="/contact" className="text-cyan hover:text-cyan-glow underline">
              get in touch
            </Link>{' '}
            for a quote instead.
          </p>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="date">Date</Label>
          <PublicMonthCalendar serviceId={serviceId} selected={date} onSelect={setDate} />
        </div>

        {date && (
          <div className="sm:col-span-2">
            <Label htmlFor="startTime">Available times</Label>
            {slotsLoading ? (
              <div className="flex items-center gap-2 text-cream/50 text-sm py-3">
                <Loader2 className="w-4 h-4 animate-spin" />
                Checking availability…
              </div>
            ) : slots.length === 0 ? (
              <div className="flex items-center gap-2 text-cream/50 text-sm py-3">
                <Clock className="w-4 h-4" />
                {slotsError}
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setStartTime(slot.time)}
                      title={slot.available ? undefined : 'Already booked'}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                        !slot.available
                          ? 'bg-transparent border-cream/5 text-cream/25 line-through cursor-not-allowed'
                          : startTime === slot.time
                            ? 'bg-cyan text-midnight-900 border-cyan'
                            : 'bg-midnight-700 border-cream/10 text-cream hover:border-cyan/40'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                {slotsError && (
                  <p className="mt-2 text-xs text-cream/40">{slotsError}</p>
                )}
              </>
            )}
          </div>
        )}

        {startTime && (
          <>
            <Field label="Name" name="name" required placeholder="Your full name" />
            <Field label="Phone" name="phone" type="tel" required placeholder="07 ..." />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="sm:col-span-2"
            />
            <Field
              label="Address"
              name="address"
              required
              placeholder="Where should we come to?"
              className="sm:col-span-2"
            />
            <Field
              label="Vehicle"
              name="vehicle"
              required
              placeholder="Range Rover Sport"
              className="sm:col-span-2"
            />

            <div className="sm:col-span-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Anything we should know? Parking, access, specific concerns…"
                className={inputCls + ' resize-none'}
              />
            </div>

            {/* Honeypot, bots fill this, humans don't see it */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
          </>
        )}
      </div>

      {state === 'error' && (
        <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {startTime && (
        <button
          type="submit"
          disabled={state === 'loading'}
          className="mt-7 group w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-cyan text-midnight-900 font-semibold shadow-glow-cyan hover:shadow-glow-cyan-lg hover:bg-cyan-glow transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Booking...
            </>
          ) : (
            'Confirm booking'
          )}
        </button>
      )}
    </form>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs uppercase tracking-[0.16em] text-cream/60 mb-2 font-medium"
    >
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  className = '',
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-cyan ml-1">*</span>}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputCls}
      />
    </div>
  );
}

const inputCls =
  'w-full bg-midnight-700 border border-cream/10 rounded-xl px-4 py-3.5 text-cream placeholder-cream/30 focus:outline-none focus:border-cyan/40 focus:ring-2 focus:ring-cyan/15 transition-all';

const selectCls =
  'w-full bg-midnight-700 border border-cream/10 rounded-xl px-4 py-3.5 text-cream focus:outline-none focus:border-cyan/40 focus:ring-2 focus:ring-cyan/15 transition-all';
