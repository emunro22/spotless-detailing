'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';

export default function SettingsForm({ initial }: { initial: Record<string, string> }) {
  const router = useRouter();
  const [settings, setSettings] = useState({
    stats_rating: initial.stats_rating || '5.0',
    stats_vehicles: initial.stats_vehicles || '1000s',
    stats_mobile: initial.stats_mobile || '100%',
    business_phone: initial.business_phone || '',
    business_phone_tel: initial.business_phone_tel || '',
    business_email: initial.business_email || '',
    business_whatsapp: initial.business_whatsapp || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function update(key: keyof typeof settings, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    setMessage('');

    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });

    setSaving(false);

    if (!res.ok) {
      setError('Save failed');
      return;
    }

    setMessage('Saved. The live site will update within 60 seconds.');
    router.refresh();
  }

  return (
    <div className="space-y-6 pb-24">
      <Card title="Hero stats">
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Avg. rating">
            <input
              type="text"
              value={settings.stats_rating}
              onChange={(e) => update('stats_rating', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Vehicles detailed">
            <input
              type="text"
              value={settings.stats_vehicles}
              onChange={(e) => update('stats_vehicles', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Mobile service">
            <input
              type="text"
              value={settings.stats_mobile}
              onChange={(e) => update('stats_mobile', e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
      </Card>

      <Card title="Business contact">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Phone (display)" hint="e.g. 07955 733053 — shown to visitors">
            <input
              type="text"
              value={settings.business_phone}
              onChange={(e) => update('business_phone', e.target.value)}
              className={inputCls}
              placeholder="07955 733053"
            />
          </Field>
          <Field
            label="Phone (for tel: links)"
            hint="International format, e.g. +44 7955 733053"
          >
            <input
              type="text"
              value={settings.business_phone_tel}
              onChange={(e) => update('business_phone_tel', e.target.value)}
              className={inputCls}
              placeholder="+44 7955 733053"
            />
          </Field>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Email">
            <input
              type="email"
              value={settings.business_email}
              onChange={(e) => update('business_email', e.target.value)}
              className={inputCls}
              placeholder="enquiries@spotlessdetailing.co.uk"
            />
          </Field>
          <Field
            label="WhatsApp link"
            hint="Full URL — e.g. https://wa.me/447955733053"
          >
            <input
              type="text"
              value={settings.business_whatsapp}
              onChange={(e) => update('business_whatsapp', e.target.value)}
              className={inputCls}
              placeholder="https://wa.me/447955733053"
            />
          </Field>
        </div>
      </Card>

      {message && (
        <div className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400">
          {message}
        </div>
      )}
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 md:-mx-6 lg:-mx-10 px-4 md:px-6 lg:px-10 py-4 bg-midnight-900/95 backdrop-blur border-t border-cream/10 z-10">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan hover:bg-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed text-midnight-900 font-semibold rounded-full px-6 py-3 transition-all shadow-glow-cyan"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving…' : 'Save settings'}
        </button>
      </div>
    </div>
  );
}

const inputCls =
  'w-full bg-midnight-900 border border-cream/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan/40 transition-colors';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass border-gradient rounded-2xl p-4 md:p-6 lg:p-7 space-y-4">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.16em] text-cream/60 mb-1.5">
        {label}
      </span>
      {children}
      {hint && <span className="block text-xs text-cream/40 mt-1.5">{hint}</span>}
    </label>
  );
}