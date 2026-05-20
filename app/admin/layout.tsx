import { getSession } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Spotless Admin',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-midnight-900 text-cream">
      {session ? (
        <div className="flex flex-col lg:flex-row">
          <AdminSidebar email={session.email} />
          <main className="flex-1 min-h-screen p-4 md:p-6 lg:p-10 overflow-x-hidden">
            {children}
          </main>
        </div>
      ) : (
        children
      )}
    </div>
  );
}