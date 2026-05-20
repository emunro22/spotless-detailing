'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, X, Save } from 'lucide-react';
import type { Service } from '@/lib/types';

interface ServiceFormProps {
  service?: Service;
}

export default function ServiceForm({ service }: ServiceFormProps) {
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
    startingPrice: service?.startingPrice ?? 0,
    priceLabel: service?.priceLabel || '',
    duration: service?.duration || '',
    popular: service?.popular || false,
    showOnHomepage: service?.showOnHomepage || false,
    homepageTag: service?.homepageTag || '',
    isMaintenanceCallout: service?.isMaintenanceCallout || false,
    sortOrder: service?.sortOrder ?? 100,
    homepageSortOrder: service?.homepageSortOrder ?? 0,
    isActive: service?.isActive ?? true,
  });

  const [interior, setInterior] = useState<string[]>(service?.interior || []);
  const [exterior, setExterior] = useState<string[]>(service?.exterior || ['']);
  const [hasInterior, setHasInterior] = useState<boolean>(
    !!(service?.interior && service.interior.length > 0)
  );

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const cleanExterior = exterior.map((i) => i.trim()).filter(Boolean);
    const cleanInterior = hasInterior
      ? interior.map((i) => i.trim()).filter(Boolean)
      : null;

    const payload = {
      ...form,
      priceLabel: form.priceLabel.trim() || null,
      homepageTag: form.homepageTag.trim() || null,
      interior: cleanInterior && cleanInterior.length > 0 ? cleanInterior : null,
      exterior: cleanExterior,
    };

    const url = isEdit ? `/api/admin/services/${service!.id}` : '/api/admin/services';
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

    router.push('/admin/services');
    router.refresh();
  }

  async function handleDelete() {
    if (!service) return;
    if (!confirm(`Delete "${service.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/services/${service.id}`, {
      method: 'DELETE',
    });
    setDeleting(false);
    if (!res.ok) {
      setError('Delete failed');
      return;
    }
    router.push('/admin/services');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card title="Basics">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Service name" hint="e.g. Safe Wash, Full Valet">
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              required
              className={inputCls}
            />
          </Field>
          <Field label="Short name" hint="Used on homepage cards, e.g. Valet">
            <input
              type="text"
              value={form.shortName}
              onChange={(e) => update('shortName', e.target.value)}
              required
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="URL slug" hint="lowercase-with-hyphens, e.g. deep-clean">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
            required
            pattern="[a-z0-9-]+"
            className={inputCls}
          />
        </Field>

        <Field label="Tagline" hint="Small uppercase line above name on services page">
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => update('tagline', e.target.value)}
            required
            className={inputCls}
            placeholder="Swirl-free exterior refresh"
          />
        </Field>

        <Field label="Description" hint="Paragraph below the price">
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            required
            rows={3}
            className={inputCls}
          />
        </Field>
      </Card>

      <Card title="Pricing">
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Starting price (£)" hint="0 = show price label instead">
            <input
              type="number"
              min={0}
              value={form.startingPrice}
              onChange={(e) => update('startingPrice', Number(e.target.value))}
              className={inputCls}
            />
          </Field>
          <Field label="Price label" hint="Used when starting price is 0, e.g. POA, Bespoke">
            <input
              type="text"
              value={form.priceLabel}
              onChange={(e) => update('priceLabel', e.target.value)}
              className={inputCls}
              placeholder="POA"
            />
          </Field>
          <Field label="Duration" hint="e.g. 60–90 min, 3–8 hours">
            <input
              type="text"
              value={form.duration}
              onChange={(e) => update('duration', e.target.value)}
              className={inputCls}
              placeholder="60–90 min"
            />
          </Field>
        </div>
      </Card>

      <Card title="What's included">
        <div className="flex items-center gap-4 mb-4">
          <ToggleField
            checked={hasInterior}
            onChange={setHasInterior}
            label="Has interior list"
          />
          <p className="text-xs text-cream/50">
            Turn on for services that have separate interior + exterior lists (Valet, Deep Clean).
          </p>
        </div>

        {hasInterior && (
          <Field
            label="Interior items"
            hint={
              <span>
                One per row. Shows as bulleted list under <strong>Interior</strong>.
              </span>
            }
          >
            <ItemList items={interior} onChange={setInterior} placeholder="Thoroughly hoovered" />
          </Field>
        )}

        <Field
          label={hasInterior ? 'Exterior items' : 'Included items'}
          hint={
            <span>
              One per row. Shows as bulleted list under{' '}
              <strong>{hasInterior ? 'Exterior' : 'What’s included'}</strong>.
            </span>
          }
        >
          <ItemList items={exterior} onChange={setExterior} placeholder="Full exterior safe wash" />
        </Field>
      </Card>

      <Card title="Display">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Homepage tag" hint="Short uppercase label for hero row card, e.g. Refresh">
            <input
              type="text"
              value={form.homepageTag}
              onChange={(e) => update('homepageTag', e.target.value)}
              className={inputCls}
              placeholder="Refresh"
            />
          </Field>
          <Field label="Sort order" hint="Lower numbers appear first on services page">
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => update('sortOrder', Number(e.target.value))}
              className={inputCls}
            />
          </Field>
        </div>
        <Field label="Homepage sort order" hint="Lower numbers appear first in homepage 4-card row">
          <input
            type="number"
            value={form.homepageSortOrder}
            onChange={(e) => update('homepageSortOrder', Number(e.target.value))}
            className={inputCls}
          />
        </Field>

        <div className="grid md:grid-cols-3 gap-3 pt-2">
          <Checkbox
            checked={form.showOnHomepage}
            onChange={(v) => update('showOnHomepage', v)}
            label="Show on homepage"
            hint="In the 4-card row under hero"
          />
          <Checkbox
            checked={form.popular}
            onChange={(v) => update('popular', v)}
            label="Most popular"
            hint="Shows the POPULAR pill"
          />
          <Checkbox
            checked={form.isActive}
            onChange={(v) => update('isActive', v)}
            label="Live on site"
            hint="Uncheck to hide without deleting"
          />
        </div>

        <div className="pt-3">
          <Checkbox
            checked={form.isMaintenanceCallout}
            onChange={(v) => update('isMaintenanceCallout', v)}
            label="Render as Maintenance callout"
            hint="Use the special full-width callout layout instead of a card. Only one service should have this."
          />
        </div>
      </Card>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 sticky bottom-4">
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-cyan hover:bg-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed text-midnight-900 font-semibold rounded-full px-6 py-3 transition-all shadow-glow-cyan"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create service'}
          </button>
        </div>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 disabled:opacity-50 px-4 py-2 rounded-full border border-red-500/20 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? 'Deleting…' : 'Delete service'}
          </button>
        )}
      </div>
    </form>
  );
}

// ---- Helpers ----------------------------------------------------

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

function ToggleField({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-cyan w-4 h-4"
      />
      <span className="text-sm text-cream">{label}</span>
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
            className="text-cream/40 hover:text-red-400 p-2 transition-colors"
            aria-label="Remove item"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="inline-flex items-center gap-2 text-sm text-cyan hover:text-cyan-glow"
      >
        <Plus className="w-4 h-4" />
        Add item
      </button>
    </div>
  );
}
