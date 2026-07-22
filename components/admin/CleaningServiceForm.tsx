'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, X, Save } from 'lucide-react';
import type { CleaningService } from '@/lib/types';

interface CleaningServiceFormProps {
  service?: CleaningService;
}

export default function CleaningServiceForm({ service }: CleaningServiceFormProps) {
  const router = useRouter();
  const isEdit = !!service;
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    slug: service?.slug || '',
    name: service?.name || '',
    shortName: service?.shortName || '',
    tagline: service?.tagline || '',
    description: service?.description || '',
    bestFor: service?.bestFor || '',
    sortOrder: service?.sortOrder ?? 100,
    isActive: service?.isActive ?? true,
  });

  const [features, setFeatures] = useState<string[]>(service?.features || ['']);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const cleanFeatures = features.map((i) => i.trim()).filter(Boolean);

    const payload = {
      ...form,
      features: cleanFeatures,
    };

    const url = isEdit
      ? `/api/admin/cleaning-services/${service!.id}`
      : '/api/admin/cleaning-services';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Save failed');
      return;
    }

    router.push('/admin/cleaning-services');
    router.refresh();
  }

  async function handleDelete() {
    if (!service) return;
    if (!confirm(`Delete "${service.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/cleaning-services/${service.id}`, {
      method: 'DELETE',
    });
    setDeleting(false);
    if (!res.ok) {
      setError('Delete failed');
      return;
    }
    router.push('/admin/cleaning-services');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-24">
      <Card title="Basics">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Service name" hint="e.g. Commercial Cleaning">
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              required
              className={inputCls}
            />
          </Field>
          <Field label="Short name" hint="Used in nav/footer links, e.g. Commercial">
            <input
              type="text"
              value={form.shortName}
              onChange={(e) => update('shortName', e.target.value)}
              required
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="URL slug" hint="lowercase-with-hyphens, e.g. commercial-cleaning">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
            required
            pattern="[a-z0-9-]+"
            className={inputCls}
          />
        </Field>

        <Field label="Tagline" hint="Small uppercase line above name on the card">
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => update('tagline', e.target.value)}
            required
            className={inputCls}
            placeholder="First impressions matter"
          />
        </Field>

        <Field label="Description" hint="Paragraph shown on the cleaning services card">
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            required
            rows={3}
            className={inputCls}
          />
        </Field>

        <Field label="Best for" hint="Short line describing who this service suits">
          <input
            type="text"
            value={form.bestFor}
            onChange={(e) => update('bestFor', e.target.value)}
            required
            className={inputCls}
            placeholder="Restaurants, hotels, shops and offices that need to look their best."
          />
        </Field>
      </Card>

      <Card title="Features">
        <Field
          label="Feature items"
          hint="One per row. Shown as a bulleted list on the service card."
        >
          <ItemList items={features} onChange={setFeatures} placeholder="Shopfront and retail unit washing" />
        </Field>
      </Card>

      <Card title="Display">
        <Field label="Sort order" hint="Lower numbers appear first on the cleaning page">
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => update('sortOrder', Number(e.target.value))}
            className={inputCls}
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          <Checkbox
            checked={form.isActive}
            onChange={(v) => update('isActive', v)}
            label="Live on site"
            hint="Uncheck to hide without deleting"
          />
        </div>
      </Card>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 md:-mx-6 lg:-mx-10 px-4 md:px-6 lg:px-10 py-4 bg-midnight-900/95 backdrop-blur border-t border-cream/10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 z-10">
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center justify-center gap-2 text-sm text-red-400 hover:text-red-300 disabled:opacity-50 px-4 py-3 sm:py-2 rounded-full border border-red-500/20 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? 'Deleting…' : 'Delete service'}
          </button>
        )}
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 bg-cyan hover:bg-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed text-midnight-900 font-semibold rounded-full px-6 py-3 transition-all shadow-glow-cyan sm:ml-auto"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create service'}
        </button>
      </div>
    </form>
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
  hint?: React.ReactNode;
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

function Checkbox({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer p-3 rounded-xl border border-cream/10 hover:border-cyan/20 transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 accent-cyan w-4 h-4 flex-shrink-0"
      />
      <span>
        <span className="block text-sm text-cream font-medium">{label}</span>
        {hint && <span className="block text-xs text-cream/50 mt-0.5">{hint}</span>}
      </span>
    </label>
  );
}

function ItemList({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onChange(items.map((it, idx) => (idx === i ? e.target.value : it)))}
            className={inputCls + ' flex-1'}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="text-cream/40 hover:text-red-400 p-2 transition-colors flex-shrink-0"
            aria-label="Remove item"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="inline-flex items-center gap-2 text-sm text-cyan hover:text-cyan-glow py-1"
      >
        <Plus className="w-4 h-4" />
        Add item
      </button>
    </div>
  );
}
