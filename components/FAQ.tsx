'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Script from 'next/script';
import { FAQS } from '@/lib/constants';
import { faqJsonLd } from '@/lib/seo';
import { SectionHeader } from './Services';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 bg-midnight-900">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Common questions"
          title={
            <>
              Everything you might want to{' '}
              <span className="gradient-text italic">ask first.</span>
            </>
          }
        />

        <div className="mt-12 md:mt-16 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`rounded-2xl border-gradient transition-all ${
                  isOpen ? 'glass-strong' : 'glass hover:border-cyan/20'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-base md:text-lg text-cream pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-6 text-sm md:text-base text-cream/70 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
