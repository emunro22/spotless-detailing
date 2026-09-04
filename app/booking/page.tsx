import { buildMetadata } from '@/lib/seo';
import { getBookableServices } from '@/lib/queries';
import BookingForm from '@/components/BookingForm';

export const metadata = buildMetadata({
  title: 'Book Your Detail | Spotless Detailing Glasgow',
  description:
    'Book your mobile car detailing slot in Glasgow. See live availability, pick a time, we\'ll come to you.',
  path: '/booking',
});

export const dynamic = 'force-dynamic';

export default async function BookingPage() {
  const services = await getBookableServices();

  return (
    <section className="relative pt-36 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 hex-overlay opacity-50 pointer-events-none" />
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side, rgba(56,189,248,0.35), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-2xl px-5 md:px-8">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
            Book your detail
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-balance">
            Pick a slot.{' '}
            <span className="gradient-text italic">Done.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-cream/65 max-w-xl mx-auto leading-relaxed">
            Live availability. Pick a service, a date and a time that suits, and
            you're booked in instantly with an email confirmation.
          </p>
        </div>

        <div className="mt-14 md:mt-16">
          <BookingForm services={services} />
        </div>
      </div>
    </section>
  );
}
