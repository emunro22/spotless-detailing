'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Wrench, Images, Settings, LogOut, ExternalLink } from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <aside className="w-64 min-h-screen border-r border-cream/10 bg-midnight-800/50 backdrop-blur p-6 flex flex-col sticky top-0">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-[0.18em] text-cyan font-medium mb-1.5">
          Spotless Detailing
        </div>
        <div className="font-display text-xl font-semibold">Admin</div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? 'bg-cyan/15 text-cyan border border-cyan/20'
                  : 'text-cream/70 hover:text-cream hover:bg-cream/5 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-cream/10">
        <Link
          href="/"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 text-xs text-cream/50 hover:text-cyan transition-colors mb-4"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View live site
        </Link>
        <div className="text-xs text-cream/40 mb-2 truncate">{email}</div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-xs text-cream/60 hover:text-cream transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
