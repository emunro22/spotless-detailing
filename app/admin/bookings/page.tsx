import BookingsCalendar from '@/components/admin/BookingsCalendar';
import ReviewRequestsPanel from '@/components/admin/ReviewRequestsPanel';
import { getAllServicesAdmin } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function AdminBookingsPage() {
  const services = await getAllServicesAdmin();

  return (
    <div className="max-w-4xl">
      <div className="mb-6 md:mb-8">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-2">
          Bookings
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
          Jobs
        </h1>
        <p className="mt-2 md:mt-3 text-sm md:text-base text-cream/60">
          Tap a day to see what's booked. Cyan dots are jobs, amber dots are blocked/personal time.
        </p>
      </div>
      <ReviewRequestsPanel />
      <BookingsCalendar services={services} />
    </div>
  );
}
