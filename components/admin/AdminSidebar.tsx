'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Wrench,
  Images,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Close drawer on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const currentPage = NAV.find((item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-midnight-900/95 backdrop-blur border-b border-cream/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-glow-cyan flex-shrink-0">
              <Image src="/logo.png" alt="Spotless" fill className="object-cover" />
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-[10px] uppercase tracking-[0.18em] text-cyan font-medium">
                Admin
              </div>
              <div className="font-display text-sm font-semibold truncate">
                {currentPage?.label || 'Spotless Detailing'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-cream flex-shrink-0"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-midnight-900/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <aside
            className="absolute top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-midnight-800 border-l border-cream/10 p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan font-medium mb-1.5">
                  Spotless Detailing
                </div>
                <div className="font-display text-xl font-semibold">Admin</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <NavLinks pathname={pathname} />

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
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 min-h-screen border-r border-cream/10 bg-midnight-800/50 backdrop-blur p-6 flex-col sticky top-0">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.18em] text-cyan font-medium mb-1.5">
            Spotless Detailing
          </div>
          <div className="font-display text-xl font-semibold">Admin</div>
        </div>

        <NavLinks pathname={pathname} />

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
    </>
  );
}

function NavLinks({ pathname }: { pathname: string }) {
  return (
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
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all ${
              active
                ? 'bg-cyan/15 text-cyan border border-cyan/20'
                : 'text-cream/70 hover:text-cream hover:bg-cream/5 border border-transparent'
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}