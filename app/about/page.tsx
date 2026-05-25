import Image from 'next/image';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServiceAreas from '@/components/ServiceAreas';
import CTAWrapper from '@/components/CTAWrapper';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About — Spotless Detailing Glasgow',
  description:
    'Meet Spotless Detailing — Glasgow\'s mobile car detailing specialists. A passion for cars and the craft of making them look their absolute best.',
  path: '/about',
});

export const revalidate = 60;

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
                A passion turned into a{' '}
                <span className="gradient-text italic">profession.</span>
              </h1>
              <div className="mt-7 space-y-5 text-base md:text-lg text-cream/70 leading-relaxed max-w-2xl">
                <p>
                  At the heart of our detailing service is a genuine passion
                  for cars and the craft of making them look their absolute
                  best. Founded at a young age and driven by a deep love for
                  vehicles, this business was built from the ground up with
                  dedication, ambition and a desire to stand out in the
                  detailing scene.
                </p>
                <p>
                  Whether it&apos;s a quick refresh or a full transformation,
                  every job is approached with the same level of care,
                  precision and attention to detail.
                </p>
                <p>
                  What truly sets us apart is the pride we take in our work
                  and the relationships we build along the way. Every vehicle
                  is treated as if it were our own and every customer is
                  valued. We don&apos;t just aim to deliver outstanding
                  results — we aim to create an experience that keeps you
                  coming back.
                </p>
                <p>
                  We enjoy every detail of the process and every service we
                  provide, constantly pushing ourselves to improve, grow and
                  make a name in the detailing industry. This isn&apos;t just
                  a job — it&apos;s a passion turned into a profession.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass border-gradient">
                <Image
                  src="/images/gallery-1.jpg"
                  alt="Blue Range Rover Sport SVR detailed by Spotless Detailing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-cyan-glow/80 mb-1.5">
                    Spotless work
                  </div>
                  <div className="font-display text-xl font-semibold text-cream">
                    Every detail given the time it deserves.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <ServiceAreas />
      <CTAWrapper />
    </>
  );
}