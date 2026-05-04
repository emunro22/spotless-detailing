import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Gallery — Recent Detailing Work in Glasgow',
  description:
    'A look at recent mobile detailing and valeting work across Glasgow — Range Rovers, Mercedes G-Class, Teslas and everyday daily-drivers.',
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
            Every car here was detailed by us at customer driveways and our Glasgow studio.
          </p>
        </div>
      </section>
      <Gallery />
      <Testimonials />
      <CTA />
    </>
  );
}
