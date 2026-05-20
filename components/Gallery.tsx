'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from './Services';
import type { GalleryImage } from '@/lib/types';

interface GalleryProps {
  images: GalleryImage[];
  preview?: boolean;
}

export default function Gallery({ images, preview = false }: GalleryProps) {
  const items = preview ? images.slice(0, 5) : images;

  return (
    <section className="relative py-24 md:py-32 bg-midnight-900">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <SectionHeader
            eyebrow="Recent Work"
            title={
              <>
                The work speaks{' '}
                <span className="gradient-text italic">for itself.</span>
              </>
            }
            subtitle="A selection of recent details — from daily-drivers to high-end SUVs, hot hatches to fleet vehicles. Every vehicle gets the same standard."
            align="left"
          />
          {preview && (
            <Link
              href="/gallery"
              className="self-start md:self-auto inline-flex items-center gap-2 text-sm text-cyan hover:text-cyan-glow transition-colors group"
            >
              View full gallery
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {items.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border border-cream/5 bg-midnight-700 ${
                img.tall ? 'row-span-2' : ''
              } ${i === 0 ? 'col-span-2' : ''}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-cyan-glow font-medium">
                  <span className="w-1 h-1 rounded-full bg-cyan" />
                  Spotless work
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
