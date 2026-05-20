import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import WhyChooseUs from '@/components/WhyChooseUs';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import ServiceAreas from '@/components/ServiceAreas';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import { buildMetadata } from '@/lib/seo';
import {
  getAllServices,
  getHomepageServices,
  getPreviewGalleryImages,
  getAllSettings,
} from '@/lib/queries';

export const metadata = buildMetadata({
  title: 'Spotless Detailing | Mobile Car Detailing & Valeting Glasgow',
  description:
    'Premium mobile car detailing in Glasgow. Safe wash from £30, full valet from £60, deep clean from £120. Ceramic protection, two-bucket safe wash, mobile to your driveway.',
  path: '/',
});

// Revalidate every 60s — admin edits show up shortly after saving.
export const revalidate = 60;

export default async function HomePage() {
  const [services, homepageServices, galleryImages, settings] = await Promise.all([
    getAllServices(),
    getHomepageServices(),
    getPreviewGalleryImages(),
    getAllSettings(),
  ]);

  return (
    <>
      <Hero homepageServices={homepageServices} settings={settings} />
      <Services services={services} />
      <Process />
      <WhyChooseUs />
      <Gallery images={galleryImages} preview />
      <Testimonials />
      <ServiceAreas />
      <FAQ />
      <CTA />
    </>
  );
}
