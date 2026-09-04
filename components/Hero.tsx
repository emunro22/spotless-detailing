'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import type { GalleryImage, Service, SiteSettings } from '@/lib/types';

interface HeroProps {
  homepageServices: Service[];
  settings: SiteSettings;
  galleryImages: GalleryImage[];
}

export default function Hero({ homepageServices, settings, galleryImages }: HeroProps) {
  return (
    <section className="relative pb-20 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-midnight-900" />
      <div className="absolute inset-0 hex-overlay opacity-30 pointer-events-none" />

      {/* Slideshow sits directly beneath the fixed navbar, full bleed, with the
          copy stacked underneath it rather than sitting on top of the photos. */}
      <div className="relative pt-[72px] md:pt-[80px]">
        <HeroSlideshow images={galleryImages} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 w-full">
        <div className="pt-8 md:pt-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border-gradient"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-cyan opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-cream/80">
              Mobile · Glasgow &amp; Surrounds
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold tracking-tight text-balance text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95]"
          >
            That{' '}
            <span className="gradient-text italic">new&nbsp;car</span>
            <br />
            feeling. <span className="text-cream/40">On your driveway.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base md:text-lg text-cream/70 leading-relaxed"
          >
            Premium mobile car detailing across Glasgow. Specialising in deep
            cleans and paint protection, and we come to you on a schedule that
            suits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
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
              <div className="w-8 h-8 rounded-lg bg-cyan/15 border border-cyan/25 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-cyan" />
              </div>
              <div>
                <div className="text-sm font-semibold text-cream">
                  Commercial &amp; Domestic Cleaning
                </div>
                <div className="text-xs text-cream/50">
                  Pressure washing · Buildings · Driveways · Restaurants
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan/60 group-hover:text-cyan group-hover:translate-x-1 transition-all ml-2" />
            </Link>
          </motion.div>
        </div>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
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

// Full-bleed band of recent work. Fixed height so the page never jumps while
// images load, with the bottom edge fading into the dark page behind it.
function HeroSlideshow({ images }: { images: GalleryImage[] }) {
  const slides = images.length > 0 ? images : null;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides]);

  if (!slides) return null;

  const current = slides[index];

  return (
    <div className="relative w-full h-[38svh] min-h-[240px] max-h-[420px] sm:h-[46vh] sm:max-h-none lg:h-[56vh] overflow-hidden bg-midnight-800">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={current.url}
            alt={current.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: `${current.focalX}% ${current.focalY}%` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom fade so the band melts into the copy below it */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,16,31,0) 0%, rgba(4,16,31,0.75) 55%, #04101F 100%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-4 md:bottom-5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-midnight-900/80 border border-cyan/20 px-3.5 py-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-cyan opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan" />
            </span>
            <span className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.16em] text-cream/90">
              Recent work
            </span>
          </div>

          {slides.length > 1 && (
            <div className="flex items-center gap-1.5">
              {slides.slice(0, 8).map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1 rounded-full transition-all ${
                    i === index ? 'w-5 bg-cyan' : 'w-1.5 bg-cream/35'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
