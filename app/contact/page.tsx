import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { buildMetadata } from '@/lib/seo';
import { BUSINESS } from '@/lib/constants';

export const metadata = buildMetadata({
  title: 'Contact — Get a Quote · Spotless Detailing Glasgow',
  description:
    'Get a same-day quote for mobile detailing in Glasgow. Call, WhatsApp, email or use the contact form.',
  path: '/contact',
});

export default function ContactPage() {
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

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
            Get in touch
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-balance">
            Same-day{' '}
            <span className="gradient-text italic">quote.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-cream/65 leading-relaxed">
            Tell us about your car and where you're based — we'll come back
            with a fixed quote and available slots.
          </p>
        </div>

        <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-3xl glass border-gradient p-7 md:p-8">
              <h3 className="font-display text-xl font-semibold mb-5 text-cream">
                Direct contact
              </h3>
              <div className="space-y-4">
                <ContactRow
                  icon={Phone}
                  label="Phone"
                  value={BUSINESS.phoneDisplay}
                  href={`tel:${BUSINESS.phone}`}
                />
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={BUSINESS.email}
                  href={`mailto:${BUSINESS.email}`}
                />
                <ContactRow
                  icon={MessageCircle}
                  label="WhatsApp"
                  value="Send a message"
                  href={BUSINESS.whatsapp}
                  external
                />
                <ContactRow
                  icon={Instagram}
                  label="Instagram"
                  value="@spotlessdetailing"
                  href={BUSINESS.instagram}
                  external
                />
              </div>

              <div className="my-7 h-px bg-cream/5" />

              <div className="space-y-4">
                <ContactRow
                  icon={MapPin}
                  label="Location"
                  value={`Mobile · ${BUSINESS.city}`}
                />
                <ContactRow
                  icon={Clock}
                  label="Hours"
                  value={BUSINESS.hours}
                />
              </div>

              <div className="mt-7 p-5 rounded-2xl bg-cyan/8 border border-cyan/15">
                <h4 className="font-semibold text-sm text-cream mb-2">
                  Prefer to book online?
                </h4>
                <p className="text-sm text-cream/65 leading-relaxed mb-4">
                  Pick a date and a service straight from our calendar.
                </p>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center w-full px-5 py-3 rounded-full bg-cyan text-midnight-900 font-semibold text-sm hover:bg-cyan-glow transition-colors"
                >
                  Open booking calendar
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-cyan" strokeWidth={1.6} />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-[0.16em] text-cream/50 font-medium">
          {label}
        </div>
        <div className="text-sm text-cream font-medium mt-0.5 truncate">
          {value}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="flex items-center gap-3.5 hover:text-cyan transition-colors group"
      >
        {inner}
      </a>
    );
  }

  return <div className="flex items-center gap-3.5">{inner}</div>;
}
