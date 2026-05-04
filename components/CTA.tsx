'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export default function CTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl glass-strong border-gradient p-10 md:p-16 lg:p-20 text-center"
        >
          {/* Background ornaments */}
          <div className="absolute inset-0 hex-overlay opacity-40 pointer-events-none" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-50 pointer-events-none"
            style={{
              background:
                'radial-gradient(closest-side, rgba(56,189,248,0.35), transparent 70%)',
            }}
          />

          <div className="relative">
            <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
              Ready to feel new again
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.05]">
              Book the{' '}
              <span className="gradient-text italic">spotless treatment.</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-cream/65 max-w-xl mx-auto leading-relaxed">
              Glasgow-based, fully mobile, fixed quotes. Your driveway, your
              schedule, our standard.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <Link
                href="/booking"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-cyan text-midnight-900 font-semibold shadow-glow-cyan hover:shadow-glow-cyan-lg hover:bg-cyan-glow transition-all"
              >
                Book Online
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full glass text-cream font-medium hover:border-cyan/40 hover:text-cyan transition-all border-gradient"
              >
                <Phone className="w-4 h-4" />
                Call {BUSINESS.phoneDisplay}
              </a>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full glass text-cream font-medium hover:border-cyan/40 hover:text-cyan transition-all border-gradient"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
