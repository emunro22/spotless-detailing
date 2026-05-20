'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Save, Upload, Loader2 } from 'lucide-react';

export default function SettingsForm({ initial }: { initial: Record<string, string> }) {
  const router = useRouter();
  const [settings, setSettings] = useState({
    hero_cover_url: initial.hero_cover_url || '/images/gallery-1.jpg',
    hero_cover_label: initial.hero_cover_label || 'Recent detail',
    hero_cover_title: initial.hero_cover_title || '',
    stats_rating: initial.stats_rating || '5.0',
    stats_vehicles: initial.stats_vehicles || '1000s',
    stats_mobile: initial.stats_mobile || '100%',
    business_phone: initial.business_phone || '',
    business_email: initial.business_email || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  function update(key: keyof typeof settings, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    setUploading(false);

    if (!res.ok) {
      setError('Upload failed');
      return;
    }

    const { url } = await res.json();
    update('hero_cover_url', url);
    setMessage('Image uploaded. Click Save to apply.');
    if (fileRef.current) fileRef.current.value = '';
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
    <div className="space-y-6">
      <Card title="Hero cover image">
        <div className="grid md:grid-cols-[1fr,1.2fr] gap-6 items-start">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-midnight-700 border border-cream/10">
            {settings.hero_cover_url && (
              <Image
                src={settings.hero_cover_url}
                alt="Current hero cover"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
            )}
          </div>
          <div className="space-y-4">
            <label
              className={`flex items-center justify-center gap-3 border-2 border-dashed rounded-xl px-6 py-8 cursor-pointer transition-colors ${
                uploading
                  ? 'border-cyan/40 bg-cyan/5'
                  : 'border-cream/15 hover:border-cyan/40 hover:bg-cyan/5'
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                disabled={uploading}
                className="hidden"
              />
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 text-cyan animate-spin" />
                  <span className="text-sm text-cyan">Uploading…</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 text-cream/60" />
                  <span className="text-sm text-cream/70">Upload new cover image</span>
                </>
              )}
            </label>

            <Field label="Cover label" hint="Small pill at top-left of hero image">
              <input
                type="text"
                value={settings.hero_cover_label}
                onChange={(e) => update('hero_cover_label', e.target.value)}
                className={inputCls}
                placeholder="Recent detail"
              />
            </Field>
            <Field label="Cover title" hint="Vehicle name shown at bottom of hero image">
              <input
                type="text"
                value={settings.hero_cover_title}
                onChange={(e) => update('hero_cover_title', e.target.value)}
                className={inputCls}
                placeholder="Range Rover Sport SVR"
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card title="Hero stats">
        <div className="grid md:grid-cols-3 gap-4">
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
          <Field label="Phone">
            <input
              type="text"
              value={settings.business_phone}
              onChange={(e) => update('business_phone', e.target.value)}
              className={inputCls}
              placeholder="07955 733053"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={settings.business_email}
              onChange={(e) => update('business_email', e.target.value)}
              className={inputCls}
              placeholder="enquiries@spotlessdetailing.co.uk"
            />
          </Field>
        </div>
        <p className="text-xs text-cream/50 mt-1">
          Note: phone and email are stored here for future use. They aren&rsquo;t yet wired
          into the public footer/CTA — those still use hardcoded values from{' '}
          <code className="text-cyan">lib/constants.ts</code>. Ask Euan to wire them up
          when you&rsquo;re ready.
        </p>
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

      <div className="sticky bottom-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-cyan hover:bg-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed text-midnight-900 font-semibold rounded-full px-6 py-3 transition-all shadow-glow-cyan"
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
    <div className="glass border-gradient rounded-2xl p-6 md:p-7 space-y-4">
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
