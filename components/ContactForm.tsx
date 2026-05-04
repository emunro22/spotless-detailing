'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong. Please try again.');
      }

      setState('success');
      form.reset();
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (state === 'success') {
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
          Message received.
        </h3>
        <p className="text-cream/65 max-w-md mx-auto leading-relaxed">
          Thanks for getting in touch. We'll come back to you with a quote and
          available slots within the day.
        </p>
        <button
          onClick={() => setState('idle')}
          className="mt-7 text-sm text-cyan hover:text-cyan-glow underline-offset-4 hover:underline transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl glass-strong border-gradient p-7 md:p-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" required placeholder="Your full name" />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          placeholder="07 ..."
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="sm:col-span-2"
        />
        <Field
          label="Postcode"
          name="postcode"
          required
          placeholder="G12 8QQ"
        />
        <Field
          label="Vehicle"
          name="vehicle"
          required
          placeholder="Range Rover Sport"
        />

        <div className="sm:col-span-2">
          <Label htmlFor="service">Service</Label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className="w-full bg-midnight-700 border border-cream/10 rounded-xl px-4 py-3.5 text-cream focus:outline-none focus:border-cyan/40 focus:ring-2 focus:ring-cyan/15 transition-all"
          >
            <option value="" disabled>
              Pick a service
            </option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name} · {s.priceLabel}
              </option>
            ))}
            <option value="Not sure">Not sure — recommend something</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about the car and any specific concerns — pet hair, kid spills, paint defects, etc."
            className="w-full bg-midnight-700 border border-cream/10 rounded-xl px-4 py-3.5 text-cream placeholder-cream/30 focus:outline-none focus:border-cyan/40 focus:ring-2 focus:ring-cyan/15 transition-all resize-none"
          />
        </div>

        {/* Honeypot — bots fill this, humans don't see it */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {state === 'error' && (
        <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="mt-7 group w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-cyan text-midnight-900 font-semibold shadow-glow-cyan hover:shadow-glow-cyan-lg hover:bg-cyan-glow transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Enquiry
            <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-cream/40 text-center">
        We'll get back to you the same day with a quote and available slots.
      </p>
    </form>
  );
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
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
        className="w-full bg-midnight-700 border border-cream/10 rounded-xl px-4 py-3.5 text-cream placeholder-cream/30 focus:outline-none focus:border-cyan/40 focus:ring-2 focus:ring-cyan/15 transition-all"
      />
    </div>
  );
}
