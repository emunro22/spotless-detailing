import Link from 'next/link';
import { Calendar, Phone, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { buildMetadata } from '@/lib/seo';
import { BUSINESS } from '@/lib/constants';

export const metadata = buildMetadata({
  title: 'Book Your Detail — Spotless Detailing Glasgow',
  description:
    'Book your mobile car detailing slot in Glasgow. Pick a service, pick a time, we\'ll come to you.',
  path: '/booking',
});

export default function BookingPage() {
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

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
            Book your detail
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-balance">
            Pick a slot.{' '}
            <span className="gradient-text italic">Done.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-cream/65 max-w-2xl mx-auto leading-relaxed">
            Below is our live availability. Pick a service and a time that
            suits — we'll confirm the slot and a fixed quote within the day.
          </p>
        </div>

        {/* Google Calendar embed placeholder.
            Once you connect Calendar (using "Appointment schedules" feature),
            replace the placeholder block with the embed iframe. */}
        <div className="mt-12 md:mt-16">
          <div className="rounded-3xl glass-strong border-gradient p-1 md:p-2 overflow-hidden">
            <div className="aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden bg-midnight-700 flex items-center justify-center relative">
              {/* TODO: Replace this whole placeholder block with the Google Calendar appointment-scheduling iframe.
                  Example:
                  <iframe
                    src="https://calendar.google.com/calendar/appointments/schedules/YOUR_SCHEDULE_ID?gv=true"
                    style={{ border: 0 }}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                  />
              */}
              <div className="text-center px-6 max-w-md">
                <div className="w-16 h-16 rounded-full bg-cyan/15 border border-cyan/25 flex items-center justify-center mx-auto mb-5">
                  <Calendar className="w-7 h-7 text-cyan" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-cream mb-2.5">
                  Booking calendar — connecting next
                </h3>
                <p className="text-sm text-cream/60 leading-relaxed mb-6">
                  Live Google Calendar booking is being set up. In the meantime,
                  use the form below or message us directly — we'll always come
                  back the same day.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`tel:${BUSINESS.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cyan text-midnight-900 font-semibold text-sm shadow-glow-cyan hover:bg-cyan-glow transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Call us
                  </a>
                  <a
                    href={BUSINESS.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full glass text-cream font-medium text-sm hover:border-cyan/40 hover:text-cyan transition-all border-gradient"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form fallback */}
        <div className="mt-14 md:mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-cream tracking-tight">
              Or send us your details
            </h2>
            <p className="mt-2 text-sm text-cream/60">
              We'll come back with availability the same day.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
