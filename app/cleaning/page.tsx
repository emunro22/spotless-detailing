import Link from 'next/link';
import { MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import CleaningContactForm from '@/components/CleaningContactForm';
import { buildMetadata } from '@/lib/seo';
import { BUSINESS, SERVICE_AREAS, CLEANING_FAQS } from '@/lib/constants';
import { getAllCleaningServices } from '@/lib/queries';

export const revalidate = 60;

export const metadata = buildMetadata({
  title:
    'Commercial & Domestic Cleaning | Pressure Washing Glasgow — Spotless Detailing',
  description:
    'Professional pressure washing and exterior cleaning for homes and businesses across Glasgow. Driveways, patios, buildings, restaurants, golf courses. Free quotes.',
  path: '/cleaning',
});

export default async function CleaningPage() {
  const cleaningServices = await getAllCleaningServices();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 hex-overlay opacity-50 pointer-events-none" />
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(closest-side, rgba(56,189,248,0.35), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
            Commercial & Domestic Cleaning
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-balance">
            Pressure washing &{' '}
            <span className="gradient-text italic">exterior cleaning.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-cream/65 leading-relaxed max-w-2xl mx-auto">
            Professional cleaning for homes and businesses across Glasgow &
            Lanarkshire. Driveways, patios, buildings, restaurants, golf courses
            — we handle it all.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="#quote"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-cyan text-midnight-900 font-semibold shadow-glow-cyan hover:shadow-glow-cyan-lg hover:bg-cyan-glow transition-all"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full glass text-cream font-medium hover:border-cyan/40 hover:text-cyan transition-all border-gradient"
            >
              <Phone className="w-4 h-4" />
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-4">
              Our Services
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              What we{' '}
              <span className="gradient-text italic">clean.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cleaningServices.map((service) => (
              <div
                key={service.slug}
                className="rounded-2xl glass border-gradient p-6 md:p-7 hover:border-cyan/30 transition-all"
              >
                <div className="text-xs uppercase tracking-[0.16em] text-cyan-glow/80 mb-2">
                  {service.tagline}
                </div>
                <h3 className="font-display text-xl font-semibold text-cream mb-3">
                  {service.name}
                </h3>
                <p className="text-sm text-cream/60 leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.slice(0, 4).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-cream/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Covered */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-4">
              Where We Cover
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Covering{' '}
              <span className="gradient-text italic">
                15 miles from Uddingston.
              </span>
            </h2>
            <p className="mt-5 text-base text-cream/60 max-w-2xl mx-auto">
              We cover Uddingston and everywhere within 15 miles for all
              commercial and domestic cleaning services.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 max-w-4xl mx-auto">
            {SERVICE_AREAS.map((area) => (
              <Link
                key={area}
                href={`/cleaning/${area.toLowerCase().replace(/\s+/g, '-')}`}
                className="group flex items-center gap-2 glass border-gradient rounded-full px-4 py-2.5 hover:border-cyan/40 transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan group-hover:scale-110 transition-transform" />
                <span className="text-sm text-cream/85 font-medium">
                  {area}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-4">
              FAQ
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Common questions.
            </h2>
          </div>
          <div className="space-y-4">
            {CLEANING_FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl glass border-gradient overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-cream font-medium text-sm md:text-base list-none">
                  {faq.q}
                  <span className="text-cyan ml-4 text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm text-cream/65 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="quote" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-4">
                Get a Quote
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-5">
                Tell us about{' '}
                <span className="gradient-text italic">the job.</span>
              </h2>
              <p className="text-cream/60 leading-relaxed mb-8">
                Whether it&apos;s a domestic driveway or a commercial building,
                get in touch and we&apos;ll come back with a free, no-obligation
                quote.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-cyan" strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-cream/50 font-medium">
                      Phone
                    </div>
                    <a
                      href={`tel:${BUSINESS.phone}`}
                      className="text-sm text-cream font-medium hover:text-cyan transition-colors"
                    >
                      {BUSINESS.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-cyan" strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-cream/50 font-medium">
                      Coverage
                    </div>
                    <div className="text-sm text-cream font-medium">
                      15 miles from Uddingston
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <CleaningContactForm services={cleaningServices} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 hex-overlay opacity-40 pointer-events-none" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(closest-side, rgba(56,189,248,0.4), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to get your property{' '}
            <span className="gradient-text italic">spotless?</span>
          </h2>
          <p className="mt-5 text-cream/60 max-w-xl mx-auto">
            Call us today for a free, no-obligation quote. We cover all of
            Glasgow and Lanarkshire.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-cyan text-midnight-900 font-semibold shadow-glow-cyan hover:shadow-glow-cyan-lg hover:bg-cyan-glow transition-all"
            >
              <Phone className="w-4 h-4" />
              Call {BUSINESS.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full glass text-cream font-medium hover:border-cyan/40 hover:text-cyan transition-all border-gradient"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
