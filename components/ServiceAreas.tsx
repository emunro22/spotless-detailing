'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SERVICE_AREAS } from '@/lib/constants';
import { SectionHeader } from './Services';

export default function ServiceAreas() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Where we cover"
          title={
            <>
              Mobile across{' '}
              <span className="gradient-text italic">Greater Glasgow.</span>
            </>
          }
          subtitle="We cover Glasgow city and the surrounding towns. If your postcode isn't listed, message us — we travel further than people think."
        />

        <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-2.5 md:gap-3 max-w-4xl mx-auto">
          {SERVICE_AREAS.map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="group flex items-center gap-2 glass border-gradient rounded-full px-4 py-2.5 hover:border-cyan/40 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan group-hover:scale-110 transition-transform" />
              <span className="text-sm text-cream/85 font-medium">{area}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
