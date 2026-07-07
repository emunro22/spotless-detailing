import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { BUSINESS, SERVICE_AREAS, CLEANING_SERVICES } from '@/lib/constants';
import {
  findCleaningPage,
  getAllCleaningSlugs,
} from '@/lib/seo-pages';
import CleaningContactForm from '@/components/CleaningContactForm';
import FAQ from '@/components/FAQ';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCleaningSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = findCleaningPage(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/cleaning/${slug}`,
  });
}

export default async function CleaningSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = findCleaningPage(slug);
  if (!page) notFound();

  return (
    <>
      {/* Header */}
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
            {page.type === 'area'
              ? 'Commercial & Domestic Cleaning'
              : 'Cleaning Services'}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
            {page.h1}
          </h1>
          <p className="mt-6 text-base md:text-lg text-cream/65 leading-relaxed max-w-2xl mx-auto">
            {page.description}
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

      {/* Intro */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <p className="text-base md:text-lg text-cream/70 leading-relaxed">
            {page.intro}
          </p>
        </div>
      </section>

      {/* Cleaning Services */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Cleaning{' '}
              <span className="gradient-text italic">services.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLEANING_SERVICES.slice(0, 6).map((service) => (
              <Link
                key={service.slug}
                href="/cleaning"
                className="group rounded-2xl glass border-gradient p-6 hover:border-cyan/30 transition-all"
              >
                <div className="text-xs uppercase tracking-[0.16em] text-cyan-glow/80 mb-2">
                  {service.tagline}
                </div>
                <h3 className="font-display text-lg font-semibold text-cream mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-cream/55 leading-relaxed mb-4">
                  {service.bestFor}
                </p>
                <ul className="space-y-1.5">
                  {service.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-cream/60"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      {page.type === 'service' && (
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Areas we{' '}
                <span className="gradient-text italic">cover.</span>
              </h2>
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
      )}

      {/* Area-specific FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <FAQ
          faqs={page.faqs}
          jsonLdId={`faq-jsonld-cleaning-${page.slug}`}
          eyebrow={`${page.h1.replace('Pressure Washing & Cleaning in ', '')} FAQs`}
          title={
            <>
              Questions from{' '}
              <span className="gradient-text italic">
                {page.h1.replace('Pressure Washing & Cleaning in ', '')} customers.
              </span>
            </>
          }
        />
      )}

      {/* Contact Form */}
      <section id="quote" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-5">
                Get a{' '}
                <span className="gradient-text italic">free quote.</span>
              </h2>
              <p className="text-cream/60 leading-relaxed mb-6">
                Tell us about the job and we&apos;ll come back with a free,
                no-obligation quote.
              </p>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-cyan" />
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
                  <MapPin className="w-4 h-4 text-cyan" />
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
            <div className="lg:col-span-7">
              <CleaningContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
