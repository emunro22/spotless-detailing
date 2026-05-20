import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getAllServicesAdmin } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function ServicesAdminPage() {
  const services = await getAllServicesAdmin();

  return (
    <div className="max-w-6xl">
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-2">
            Services
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Manage services
          </h1>
          <p className="mt-2 md:mt-3 text-sm md:text-base text-cream/60 hidden sm:block">
            Add, edit, delete and reorder the services shown on your site.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 bg-cyan hover:bg-cyan-glow text-midnight-900 font-semibold rounded-full px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm transition-all shadow-glow-cyan flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New service</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block glass border-gradient rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] uppercase tracking-[0.16em] text-cream/50 border-b border-cream/10">
            <tr>
              <th className="px-5 py-3 font-medium">Service</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Duration</th>
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Homepage</th>
              <th className="px-5 py-3 font-medium">Popular</th>
              <th className="px-5 py-3 font-medium">Active</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr
                key={s.id}
                className="border-b border-cream/5 last:border-0 hover:bg-cream/[0.02]"
              >
                <td className="px-5 py-4">
                  <div className="font-medium text-cream">{s.name}</div>
                  <div className="text-xs text-cream/50">{s.tagline}</div>
                </td>
                <td className="px-5 py-4 text-cyan font-medium whitespace-nowrap">
                  {s.startingPrice > 0 ? `From £${s.startingPrice}` : s.priceLabel}
                </td>
                <td className="px-5 py-4 text-cream/60 text-xs">{s.duration}</td>
                <td className="px-5 py-4 text-cream/60">{s.sortOrder}</td>
                <td className="px-5 py-4">
                  {s.showOnHomepage ? (
                    <span className="inline-flex items-center gap-1 text-xs text-cyan">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                      Yes
                    </span>
                  ) : (
                    <span className="text-cream/30 text-xs">—</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  {s.popular ? (
                    <span className="inline-block bg-cyan/15 text-cyan text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 border border-cyan/30">
                      Popular
                    </span>
                  ) : (
                    <span className="text-cream/30 text-xs">—</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  {s.isActive ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-red-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      Hidden
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/services/${s.id}/edit`}
                    className="text-sm text-cyan hover:text-cyan-glow font-medium"
                  >
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-cream/50">
                  No services yet.{' '}
                  <Link href="/admin/services/new" className="text-cyan hover:underline">
                    Create one →
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {services.map((s) => (
          <Link
            key={s.id}
            href={`/admin/services/${s.id}/edit`}
            className="block glass border-gradient rounded-2xl p-4 hover:border-cyan/30 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-cream">{s.name}</div>
                <div className="text-xs text-cream/50 mt-0.5">{s.tagline}</div>
              </div>
              <span
                className={`inline-block w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                  s.isActive ? 'bg-emerald-400' : 'bg-red-400'
                }`}
                aria-label={s.isActive ? 'Live' : 'Hidden'}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-cream/5 text-xs">
              <span className="text-cyan font-medium">
                {s.startingPrice > 0 ? `From £${s.startingPrice}` : s.priceLabel}
              </span>
              <span className="text-cream/40">·</span>
              <span className="text-cream/50">Order {s.sortOrder}</span>
              {s.showOnHomepage && (
                <>
                  <span className="text-cream/40">·</span>
                  <span className="inline-flex items-center gap-1 text-cyan/80">
                    <span className="w-1 h-1 rounded-full bg-cyan" /> Homepage
                  </span>
                </>
              )}
              {s.popular && (
                <span className="inline-block bg-cyan/15 text-cyan text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 border border-cyan/30">
                  Popular
                </span>
              )}
              <span className="ml-auto text-cyan font-medium">Edit →</span>
            </div>
          </Link>
        ))}
        {services.length === 0 && (
          <div className="glass border-gradient rounded-2xl p-8 text-center text-cream/50 text-sm">
            No services yet.{' '}
            <Link href="/admin/services/new" className="text-cyan hover:underline">
              Create one →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}