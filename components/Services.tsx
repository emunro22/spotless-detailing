'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import { SERVICES, type Service } from '@/lib/constants';

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Services & Pricing"
          title={
            <>
              Pick the level of <span className="gradient-text italic">spotless</span>{' '}
              you want.
            </>
          }
          subtitle="Every service is fully mobile, we bring our own water, power, kit and ceramic-grade products to your driveway."
        />

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.filter((s) => s.startingPrice > 0).map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>

        {/* Maintenance plan callout */}
        <MaintenanceCallout />

        <p className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-cream/40">
          Pricing is subject to vehicle size & condition · Fixed quote confirmed before any work
        </p>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const allItems = [...(service.interior ?? []), ...service.exterior];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`relative group rounded-3xl p-7 md:p-8 border-gradient overflow-hidden transition-all ${
        service.popular
          ? 'glass-strong shadow-glow-cyan'
          : 'glass hover:border-cyan/30'
      }`}
    >
      {service.popular && (
        <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-cyan/15 border border-cyan/30 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan">
          Most Popular
        </div>
      )}

      <div className="text-xs uppercase tracking-[0.18em] text-cyan-glow/80 mb-3">
        {service.tagline}
      </div>
      <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-cream">
        {service.name}
      </h3>

      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-xs text-cream/50 uppercase tracking-wider">from</span>
        <span className="font-display text-5xl font-bold gradient-text">
          £{service.startingPrice}
        </span>
        <span className="text-sm text-cream/50">· {service.duration}</span>
      </div>

      <p className="mt-5 text-sm text-cream/65 leading-relaxed">
        {service.description}
      </p>

      <div className="my-7 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      {service.interior && (
        <div className="mb-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-cream/50 mb-3">
            Interior
          </div>
          <ul className="space-y-2">
            {service.interior.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </ul>
        </div>
      )}

      <div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-cream/50 mb-3">
          Exterior
        </div>
        <ul className="space-y-2">
          {service.exterior.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
      </div>

      <Link
        href="/booking"
        className="mt-8 group/btn inline-flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-cream/5 hover:bg-cyan hover:text-midnight-900 text-cream font-semibold transition-all"
      >
        <span>Book {service.shortName}</span>
        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-cream/80">
      <span className="mt-0.5 w-4 h-4 rounded-full bg-cyan/15 flex items-center justify-center flex-shrink-0">
        <Check className="w-2.5 h-2.5 text-cyan" strokeWidth={3} />
      </span>
      <span className="leading-snug">{children}</span>
    </li>
  );
}

function MaintenanceCallout() {
  const maintenance = SERVICES.find((s) => s.slug === 'maintenance-plan')!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-6 md:mt-8 relative rounded-3xl glass-strong border-gradient overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 90% 50%, rgba(56,189,248,0.4), transparent 60%)',
        }}
      />
      <div className="relative grid md:grid-cols-3 gap-6 p-7 md:p-10 items-center">
        <div className="md:col-span-2">
          <div className="text-xs uppercase tracking-[0.18em] text-cyan-glow/80 mb-3">
            {maintenance.tagline}
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-cream">
            Maintenance Plan
          </h3>
          <p className="mt-3 text-sm md:text-base text-cream/70 leading-relaxed max-w-2xl">
            {maintenance.description}
          </p>
        </div>
        <div className="flex md:justify-end">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cyan text-midnight-900 font-semibold shadow-glow-cyan hover:shadow-glow-cyan-lg transition-all"
          >
            Get a bespoke quote
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-cream/65 leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
