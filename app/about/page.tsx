import Image from 'next/image';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServiceAreas from '@/components/ServiceAreas';
import CTA from '@/components/CTA';
import { buildMetadata } from '@/lib/seo';
import { BUSINESS } from '@/lib/constants';

export const metadata = buildMetadata({
  title: 'About — Spotless Detailing Glasgow',
  description:
    'Meet Spotless Detailing — Glasgow\'s mobile car detailing specialists. Showroom-level finishes brought to your driveway.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-36 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 hex-overlay opacity-50 pointer-events-none" />
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(closest-side, rgba(56,189,248,0.35), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
                About
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-balance">
                Detailing for people who notice the{' '}
                <span className="gradient-text italic">small things.</span>
              </h1>
              <div className="mt-7 space-y-5 text-base md:text-lg text-cream/70 leading-relaxed max-w-2xl">
                <p>
                  {BUSINESS.name} is a {BUSINESS.city}-based mobile detailer.
                  We started because we were tired of seeing supermarket
                  valets, swirl marks, dripping wet door shuts and "finished"
                  cars with crumbs still in the seat rails.
                </p>
                <p>
                  Every car gets the same approach: a real prewash, snow foam
                  dwell, two-bucket method, decontaminated paint and a ceramic
                  sealant. Inside — steam clean, shampooed seats, hand-finished
                  glass, scent. Range Rovers and Tesla Model Ys get the same
                  care as the daily-driver Corsa.
                </p>
                <p>
                  We come to you. Driveway. Office car park. Whatever works.
                  You hand us the keys, you get them back with a car that feels
                  brand new.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass border-gradient">
                <Image
                  src="/images/gallery-1.jpg"
                  alt="Range Rover Sport detailed in Spotless Detailing studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-cyan-glow/80 mb-1.5">
                    The Glasgow studio
                  </div>
                  <div className="font-display text-xl font-semibold text-cream">
                    Where details get the time they deserve.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <ServiceAreas />
      <CTA />
    </>
  );
}
