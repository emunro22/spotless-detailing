import Image from 'next/image';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Gallery — Recent Detailing Work in Glasgow',
  description:
    'A look at recent mobile detailing work across Glasgow — cars, vans, trucks, fleet washing for businesses with professional invoices supplied.',
  path: '/gallery',
});

export default function GalleryPage() {
  return (
    <>
      <section className="relative pt-36 pb-10 md:pt-40 md:pb-12 overflow-hidden">
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
            Gallery
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-balance">
            Real cars. Real{' '}
            <span className="gradient-text italic">spotless</span> work.
          </h1>
          <p className="mt-6 text-base md:text-lg text-cream/65 max-w-2xl mx-auto leading-relaxed">
            A selection of recent details — from daily-drivers to high-end SUVs,
            hot hatches to fleet vehicles. Every vehicle gets the same standard.
          </p>
        </div>
      </section>

      <Gallery />

      <FleetSection />

      <Testimonials />
      <CTA />
    </>
  );
}

function FleetSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
              Fleet Washing
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
              From a single van to a{' '}
              <span className="gradient-text italic">full fleet.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-cream/65 leading-relaxed">
              Cars, vans, trucks, caravans, taxis, bikes, quads — all vehicle
              types welcome. We offer fleet washing for businesses across
              Glasgow, with professional invoices supplied and bespoke
              scheduling to fit around your operations.
            </p>
            <p className="mt-4 text-sm text-cream/55 leading-relaxed">
              Tailored packages to suit any budget — get in touch with your
              fleet size and we&apos;ll put together a quote.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass border-gradient">
              <Image
                src="/images/fleet-1.jpg"
                alt="Heavy recovery truck cleaned by Spotless Detailing fleet service"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass border-gradient mt-8 md:mt-12">
              <Image
                src="/images/fleet-2.jpg"
                alt="Citroen Relay vans washed by Spotless Detailing fleet service"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}