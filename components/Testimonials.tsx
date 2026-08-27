'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronDown } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import { SectionHeader } from './Services';

const INITIAL_COUNT = 6;

export default function Testimonials() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? TESTIMONIALS : TESTIMONIALS.slice(0, INITIAL_COUNT);

  return (
    <section className="relative py-24 md:py-32">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side, rgba(56,189,248,0.25), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="What people say"
          title={
            <>
              Glasgow drivers, leaving{' '}
              <span className="gradient-text italic">five stars.</span>
            </>
          }
        />

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {visible.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-3xl glass border-gradient p-7 md:p-8 hover:border-cyan/30 transition-all"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-cyan/15" strokeWidth={1.5} />

              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-cyan text-cyan" />
                ))}
              </div>

              <blockquote className="text-cream/85 leading-relaxed text-pretty">
                “{t.quote}”
              </blockquote>

              <figcaption className="mt-6 pt-6 border-t border-cream/5">
                <div className="font-display font-semibold text-cream">{t.name}</div>
                <div className="text-xs text-cream/50 mt-0.5">
                  Verified Google review · {t.date}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {TESTIMONIALS.length > INITIAL_COUNT && (
          <div className="mt-10 md:mt-12 text-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-sm font-medium text-cream hover:border-cyan/40 hover:text-cyan transition-all border-gradient"
            >
              {expanded ? 'Show fewer reviews' : `Show all ${TESTIMONIALS.length} reviews`}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}