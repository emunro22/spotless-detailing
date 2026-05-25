import Gallery from '@/components/Gallery';
import CTAWrapper from '@/components/CTAWrapper';
import { buildMetadata } from '@/lib/seo';
import { getAllGalleryImages } from '@/lib/queries';

export const metadata = buildMetadata({
  title: 'Gallery — Recent Detailing Work in Glasgow',
  description:
    'A selection of recent details by Spotless Detailing — from daily-drivers to high-end SUVs across Glasgow.',
  path: '/gallery',
});

export const revalidate = 60;

export default async function GalleryPage() {
  const images = await getAllGalleryImages();
  return (
    <>
      <section className="pt-36 pb-8 md:pt-40 text-center">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
            Recent Work
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-balance">
            The work speaks{' '}
            <span className="gradient-text italic">for itself.</span>
          </h1>
        </div>
      </section>
      <Gallery images={images} />
      <CTAWrapper />
    </>
  );
}
