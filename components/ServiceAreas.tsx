'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';
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
          subtitle="We cover Uddingston and everywhere within 15 miles — for both car detailing and commercial & domestic cleaning. If your postcode isn't listed, message us."
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/cleaning"
            className="group inline-flex items-center gap-2 glass rounded-full px-5 py-3 border-gradient hover:border-cyan/40 transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan" />
            <span className="text-sm text-cream/80 font-medium">
              We also offer commercial & domestic pressure washing in all areas
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
