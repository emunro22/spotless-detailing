'use client';

import { usePathname } from 'next/navigation';
import CookieConsent from './CookieConsent';

export default function LayoutShell({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="min-h-screen">{children}</main>
      {footer}
      <CookieConsent />
    </>
  );
}
