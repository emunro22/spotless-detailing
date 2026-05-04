import Services from '@/components/Services';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Services & Pricing — Mobile Detailing Glasgow',
  description:
    'Safe wash from £30, full valet from £60, deep clean from £120 and bespoke maintenance plans. Mobile car detailing across Glasgow.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services & Pricing"
        title={
          <>
            Detailing tiers, fully{' '}
            <span className="gradient-text italic">transparent.</span>
          </>
        }
        description="Pick the level of detail you need. Pricing is from-rates, with a fixed quote confirmed before any work — based on vehicle size and condition."
      />
      <Services />
      <Process />
      <FAQ />
      <CTA />
    </>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
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
          {eyebrow}
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-balance">
          {title}
        </h1>
        <p className="mt-6 text-base md:text-lg text-cream/65 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
