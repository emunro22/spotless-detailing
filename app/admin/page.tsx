import Link from 'next/link';
import { Wrench, Images, Settings, Plus, Upload, ImagePlus } from 'lucide-react';
import {
  getAllServicesAdmin,
  getAllGalleryImages,
  getAllSettings,
} from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [services, gallery, settings] = await Promise.all([
    getAllServicesAdmin(),
    getAllGalleryImages(),
    getAllSettings(),
  ]);

  const stats = [
    {
      label: 'Total services',
      value: services.length,
      sub: `${services.filter((s) => s.isActive).length} active`,
      href: '/admin/services',
      icon: Wrench,
    },
    {
      label: 'On homepage',
      value: services.filter((s) => s.showOnHomepage).length,
      sub: 'cards in hero row',
      href: '/admin/services',
      icon: Wrench,
    },
    {
      label: 'Gallery images',
      value: gallery.length,
      sub: `${gallery.filter((g) => g.showInPreview).length} on homepage`,
      href: '/admin/gallery',
      icon: Images,
    },
    {
      label: 'Settings',
      value: Object.keys(settings).length,
      sub: 'hero image, stats, contact',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-2">
          Dashboard
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          Welcome back.
        </h1>
        <p className="mt-3 text-cream/60">
          Manage services, gallery images and site content from here.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group glass border-gradient rounded-2xl p-5 hover:border-cyan/30 transition-all"
            >
              <Icon className="w-5 h-5 text-cyan/60 mb-3" />
              <div className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                {s.value}
              </div>
              <div className="text-sm text-cream/70 mt-1 font-medium">
                {s.label}
              </div>
              <div className="text-xs text-cream/40 mt-0.5">{s.sub}</div>
            </Link>
          );
        })}
      </div>

      <h2 className="font-display text-xl font-semibold mb-4">Quick actions</h2>
      <div className="flex flex-wrap gap-3 mb-12">
        <QuickAction href="/admin/services/new" icon={Plus} label="New service" primary />
        <QuickAction href="/admin/gallery" icon={ImagePlus} label="Upload images" />
        <QuickAction href="/admin/settings" icon={Upload} label="Change hero cover" />
      </div>

      <h2 className="font-display text-xl font-semibold mb-4">Recent services</h2>
      <div className="glass border-gradient rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] uppercase tracking-[0.16em] text-cream/50 border-b border-cream/10">
            <tr>
              <th className="px-5 py-3 font-medium">Service</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Homepage</th>
              <th className="px-5 py-3 font-medium">Active</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-cream/5 last:border-0">
                <td className="px-5 py-3.5">
                  <div className="font-medium text-cream">{s.name}</div>
                  <div className="text-xs text-cream/50">{s.tagline}</div>
                </td>
                <td className="px-5 py-3.5 text-cyan font-medium">
                  {s.startingPrice > 0 ? `From £${s.startingPrice}` : s.priceLabel}
                </td>
                <td className="px-5 py-3.5">
                  {s.showOnHomepage ? (
                    <span className="text-cyan">✓</span>
                  ) : (
                    <span className="text-cream/30">—</span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  {s.isActive ? (
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                  ) : (
                    <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
                  )}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link
                    href={`/admin/services/${s.id}/edit`}
                    className="text-sm text-cyan hover:text-cyan-glow"
                  >
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  label,
  primary,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
        primary
          ? 'bg-cyan text-midnight-900 hover:bg-cyan-glow shadow-glow-cyan'
          : 'glass border-gradient hover:border-cyan/30 text-cream'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
