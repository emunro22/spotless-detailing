'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const TIME_SLOTS = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'];

function isoDateOffset(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

export default function BookingForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>(
    SERVICES.find((s) => s.popular)?.name ?? SERVICES[0].name,
  );
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const minDate = useMemo(() => isoDateOffset(1), []);
  const maxDate = useMemo(() => isoDateOffset(60), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!selectedDate || !selectedTime) {
      setError('Please pick a date and a time.');
      setSubmitting(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      postcode: String(formData.get('postcode') ?? ''),
      vehicle: String(formData.get('vehicle') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl glass-strong border-gradient p-10 md:p-14 text-center"
      >
        <CheckCircle2 className="w-14 h-14 mx-auto text-cyan mb-6" />
        <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-cream">
          Booking received
        </h3>
        <p className="text-cream/70 leading-relaxed max-w-md mx-auto">
          Thanks — we've sent a confirmation to your email and will be in touch
          shortly to confirm your slot.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] opacity-0"
        aria-hidden="true"
      />

      <fieldset>
        <Legend step={1} title="Choose your service" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SERVICES.map((s) => {
            const active = selectedService === s.name;
            return (
              <label
                key={s.slug}
                className={`relative cursor-pointer rounded-2xl p-5 border-gradient transition-all ${
                  active ? 'glass-strong shadow-glow-cyan' : 'glass hover:border-cyan/30'
                }`}
              >
                <input
                  type="radio"
                  name="service"
                  value={s.name}
                  checked={active}
                  onChange={() => setSelectedService(s.name)}
                  className="sr-only"
                />
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-display text-lg font-semibold text-cream tracking-tight">
                    {s.name}
                  </div>
                  <div className="text-cyan text-sm font-medium whitespace-nowrap">
                    {s.priceLabel}
                  </div>
                </div>
                <div className="text-xs text-cream/55 mt-1.5">{s.tagline}</div>
                {active && (
                  <CheckCircle2 className="absolute top-4 right-4 w-4 h-4 text-cyan" />
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <Legend step={2} title="Pick a date & time" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs uppercase tracking-wider text-cream/60 mb-2 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Preferred date
            </label>
            <input
              type="date"
              required
              min={minDate}
              max={maxDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl glass border-gradient text-cream focus:border-cyan/50 focus:outline-none transition-all"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-cream/60 mb-2 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> Preferred time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((t) => {
                const active = selectedTime === t;
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-3 rounded-xl text-sm font-semibold border-gradient transition-all ${
                      active
                        ? 'bg-cyan text-midnight-900 shadow-glow-cyan'
                        : 'glass text-cream hover:border-cyan/30'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <p className="text-xs text-cream/40 mt-3">
          Slots are bookable up to 60 days ahead. We'll confirm by email.
        </p>
      </fieldset>

      <fieldset>
        <Legend step={3} title="Your details" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="name" label="Full name" required />
          <Input name="email" type="email" label="Email" required />
          <Input name="phone" type="tel" label="Phone" required />
          <Input name="postcode" label="Postcode" required />
          <div className="md:col-span-2">
            <Input name="vehicle" label="Vehicle (make & model)" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-cream/60 mb-2">
              Anything else? (optional)
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full px-4 py-3 rounded-xl glass border-gradient text-cream placeholder:text-cream/30 focus:border-cyan/50 focus:outline-none transition-all resize-none"
              placeholder="e.g. condition of car, access notes, parking..."
            />
          </div>
        </div>
      </fieldset>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cyan text-midnight-900 font-semibold shadow-glow-cyan hover:shadow-glow-cyan-lg hover:bg-cyan-glow transition-all disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {submitting ? 'Sending...' : 'Request booking'}
          {!submitting && (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          )}
        </button>
        <p className="text-xs text-cream/45 leading-relaxed">
          We'll confirm your slot by email — usually within a few hours.
        </p>
      </div>
    </form>
  );
}

function Legend({ step, title }: { step: number; title: string }) {
  return (
    <legend className="text-xs uppercase tracking-[0.22em] text-cyan mb-5 flex items-center gap-2.5 font-semibold">
      <span className="w-6 h-6 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan text-[11px] font-bold">
        {step}
      </span>
      {title}
    </legend>
  );
}

function Input({
  name,
  label,
  type = 'text',
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-cream/60 mb-2">
        {label}
        {required && ' *'}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full px-4 py-3 rounded-xl glass border-gradient text-cream placeholder:text-cream/30 focus:border-cyan/50 focus:outline-none transition-all"
      />
    </div>
  );
}