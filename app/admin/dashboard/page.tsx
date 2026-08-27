import Link from 'next/link';
import { Wrench, Images, Settings, Plus, CalendarDays } from 'lucide-react';
import {
  getAllServicesAdmin,
  getAllGalleryImages,
  getAllSettings,
  getBookingsForDate,
} from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const today = new Date().toISOString().slice(0, 10);
  const [services, gallery, settings, todaysBookings] = await Promise.all([
    getAllServicesAdmin(),
    getAllGalleryImages(),
    getAllSettings(),
    getBookingsForDate(today),
  ]);

  const stats = [
    {
      label: 'Jobs today',
      value: todaysBookings.length,
      sub: todaysBookings.length ? `next at ${todaysBookings[0].startTime}` : 'nothing booked',
      href: '/admin/bookings',
      icon: CalendarDays,
    },
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
      sub: 'hero, stats, contact',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-2">
            Dashboard
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Welcome back.
          </h1>
          <p className="mt-3 text-sm md:text-base text-cream/60">
            Manage services, gallery images and site content from here.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 md:px-5 py-2.5 text-xs md:text-sm font-semibold bg-cyan text-midnight-900 hover:bg-cyan-glow shadow-glow-cyan transition-all self-start"
        >
          <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
          New service
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group glass border-gradient rounded-2xl p-4 md:p-5 hover:border-cyan/30 transition-all"
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5 text-cyan/60 mb-2 md:mb-3" />
              <div className="font-display text-2xl md:text-4xl font-bold tracking-tight">
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-cream/70 mt-1 font-medium">
                {s.label}
              </div>
              <div className="text-[10px] md:text-xs text-cream/40 mt-0.5">
                {s.sub}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
