import BookingsList from '@/components/admin/BookingsList';

export const dynamic = 'force-dynamic';

export default function AdminBookingsPage() {
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
          Everything booked through the site, filtered by date range.
        </p>
      </div>
      <BookingsList />
    </div>
  );
}
