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

export const metadata = buildMetadata({
  title: 'Spotless Detailing | Mobile Car Detailing & Valeting Glasgow',
  description:
    'Premium mobile car detailing in Glasgow. Safe wash from £30, full valet from £60, deep clean from £120. Ceramic protection, two-bucket safe wash, mobile to your driveway.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <WhyChooseUs />
      <Gallery preview />
      <Testimonials />
      <ServiceAreas />
      <FAQ />
      <CTA />
    </>
  );
}
