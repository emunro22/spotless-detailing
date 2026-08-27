'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { Service } from '@/lib/types';

interface AddBookingModalProps {
  defaultDate: string;
  services: Service[];
  onClose: () => void;
  onCreated: () => void;
}

export default function AddBookingModal({ defaultDate, services, onClose, onCreated }: AddBookingModalProps) {
  const [bookingType, setBookingType] = useState<'job' | 'personal'>('job');
  const [serviceId, setServiceId] = useState<string>('');
  const [serviceLabel, setServiceLabel] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:00');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const res = await fetch('/api/admin/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingType,
        serviceId: serviceId || null,
        serviceLabel: bookingType === 'job' && !serviceId ? serviceLabel : null,
        customerName,
        phone,
        email,
        address,
        vehicle,
        notes,
        bookingDate: date,
        startTime,
        endTime,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Could not save this booking.');
      return;
    }

    onCreated();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-midnight-900/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl glass-strong border-gradient p-6 md:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-semibold">Add to calendar</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-cyan/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <TypeButton active={bookingType === 'job'} onClick={() => setBookingType('job')}>
              Job
            </TypeButton>
            <TypeButton active={bookingType === 'personal'} onClick={() => setBookingType('personal')}>
              Blocked / personal
            </TypeButton>
          </div>

          {bookingType === 'job' ? (
            <>
              <Field label="Customer name" required>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={inputCls}
                  placeholder="Jane Smith"
                />
              </Field>

              <Field label="Service">
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className={inputCls}
                >
                  <option value="">Other / not listed</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>

              {!serviceId && (
                <Field label="Service description" hint="Shown instead of a catalog service">
                  <input
                    type="text"
                    value={serviceLabel}
                    onChange={(e) => setServiceLabel(e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Van interior detail"
                  />
                </Field>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Phone">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Vehicle">
                  <input
                    type="text"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Address / postcode">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>
            </>
          ) : (
            <Field label="What is this?" required hint="e.g. Day off, Haircut, Sales meeting">
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className={inputCls}
                placeholder="Day off"
              />
            </Field>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Date" required>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Start" required>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="End" required>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className={inputCls + ' resize-none'}
            />
          </Field>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 bg-cyan hover:bg-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed text-midnight-900 font-semibold rounded-full px-6 py-3 transition-all shadow-glow-cyan"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Saving…' : 'Add to calendar'}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputCls =
  'w-full bg-midnight-900 border border-cream/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan/40 transition-colors';

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.16em] text-cream/60 mb-1.5">
        {label}
        {required && <span className="text-cyan ml-1">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-cream/40 mt-1.5">{hint}</span>}
    </label>
  );
}

function TypeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
        active
          ? 'bg-cyan text-midnight-900 border-cyan'
          : 'bg-midnight-900 border-cream/10 text-cream/70 hover:border-cyan/30'
      }`}
    >
      {children}
    </button>
  );
}
