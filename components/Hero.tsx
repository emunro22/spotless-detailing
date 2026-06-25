'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Sparkles } from 'lucide-react';
import type { Service, SiteSettings } from '@/lib/types';

interface HeroProps {
  homepageServices: Service[];
  settings: SiteSettings;
}

export default function Hero({ homepageServices, settings }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] pt-28 pb-20 md:pt-32 md:pb-24 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-midnight-900" />
      <div className="absolute inset-0 hex-overlay opacity-60" />
      <div className="absolute inset-0 bg-radial-glow" />

      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side, rgba(56,189,248,0.55), transparent 70%)',
        }}
      />

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-midnight-900 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-7 border-gradient"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-cyan opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan" />
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-cream/80">
                Mobile · Glasgow & Surrounds
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display font-bold tracking-tight text-balance text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95]"
            >
              That{' '}
              <span className="gradient-text italic">new&nbsp;car</span>
              <br />
              feeling.{' '}
              <span className="text-cream/40">On your driveway.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 max-w-xl text-base md:text-lg text-cream/70 leading-relaxed"
            >
              Premium mobile car detailing across Glasgow. Specialising in deep
              cleans and paint protection — we come to you on a schedule that
              suits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/booking"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-cyan text-midnight-900 font-semibold shadow-glow-cyan hover:shadow-glow-cyan-lg hover:bg-cyan-glow transition-all"
              >
                Book Your Detail
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full glass text-cream font-medium hover:border-cyan/40 hover:text-cyan transition-all border-gradient"
              >
                See Pricing
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="/cleaning"
                className="group inline-flex items-center gap-3 glass rounded-2xl px-5 py-3.5 border-gradient hover:border-cyan/40 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan/15 border border-cyan/25 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-cream">
                    Commercial & Domestic Cleaning
                  </div>
                  <div className="text-xs text-cream/50">
                    Pressure washing · Buildings · Driveways · Restaurants
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan/60 group-hover:text-cyan group-hover:translate-x-1 transition-all ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 grid grid-cols-3 gap-4 max-w-md"
            >
              <Stat
                value={settings.stats_rating || '5.0'}
                label="Avg. rating"
                prefix={<Star className="w-3.5 h-3.5 fill-cyan text-cyan" />}
              />
              <Stat value={settings.stats_vehicles || '1000s'} label="Vehicles detailed" />
              <Stat value={settings.stats_mobile || '100%'} label="Mobile service" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <HeroVisual
              src={settings.hero_cover_url || '/images/gallery-1.jpg'}
              label={settings.hero_cover_label || 'Recent detail'}
              title={settings.hero_cover_title || 'Range Rover Sport SVR'}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {homepageServices.map((service) => (
            <PriceTag
              key={service.id}
              service={service.shortName}
              price={
                service.startingPrice > 0
                  ? `£${service.startingPrice}`
                  : service.priceLabel || 'POA'
              }
              tag={service.homepageTag || service.tagline}
              highlight={service.popular}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  prefix,
}: {
  value: string;
  label: string;
  prefix?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        {prefix}
        <div className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-cream">
          {value}
        </div>
      </div>
      <div className="text-xs text-cream/50 mt-1 uppercase tracking-[0.16em]">
        {label}
      </div>
    </div>
  );
}

function PriceTag({
  service,
  price,
  tag,
  highlight,
}: {
  service: string;
  price: string;
  tag: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href="/services"
      className={`relative group rounded-2xl p-5 transition-all overflow-hidden border-gradient ${
        highlight ? 'glass-strong' : 'glass hover:border-cyan/30'
      }`}
    >
      {highlight && (
        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.18em] text-cyan font-medium">
          Popular
        </span>
      )}
      <div className="text-xs uppercase tracking-[0.16em] text-cyan-glow/80 mb-2">
        {tag}
      </div>
      <div className="font-display text-xl md:text-2xl font-semibold text-cream tracking-tight">
        {service}
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-[11px] text-cream/50 uppercase tracking-wider">
          from
        </span>
        <span className="font-display text-2xl md:text-3xl font-bold text-cyan">
          {price}
        </span>
      </div>
    </Link>
  );
}

function HeroVisual({ src, label, title }: { src: string; label: string; title: string }) {
  return (
    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass border-gradient">
      <Image
        src={src}
        alt={title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,16,31,0.45) 0%, rgba(4,16,31,0.05) 35%, rgba(4,16,31,0.05) 60%, rgba(4,16,31,0.85) 100%)',
        }}
      />

      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-32 opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(56,189,248,0.55), transparent 70%)',
        }}
      />

      <div className="absolute top-5 left-5 glass rounded-2xl px-3.5 py-2.5 border-gradient">
        <div className="flex items-center gap-2">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-cyan opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan" />
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-cream/90">
            {label}
          </span>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-cyan-glow/80 mb-1.5">
            Featured detail
          </div>
          <div className="font-display text-xl md:text-2xl font-semibold text-cream tracking-tight">
            {title}
          </div>
        </div>
        <div className="glass rounded-full p-2.5 border-gradient">
          <MapPin className="w-4 h-4 text-cyan" />
        </div>
      </div>
    </div>
  );
}
