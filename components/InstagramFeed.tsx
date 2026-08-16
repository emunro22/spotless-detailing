'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from './Services';
import { BUSINESS } from '@/lib/constants';

// Specific posts to feature — add/remove permalinks here to change what shows.
const POSTS = [
  'https://www.instagram.com/p/DZR0gHGgAln/',
  'https://www.instagram.com/p/DZAffc6AGtn/',
];

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

export default function InstagramFeed() {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="relative py-24 md:py-32 bg-midnight-900">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <SectionHeader
            eyebrow="On Instagram"
            title={
              <>
                Follow the{' '}
                <span className="gradient-text italic">latest details.</span>
              </>
            }
            subtitle="Fresh before-and-afters, posted as soon as we finish them."
            align="left"
          />
          <Link
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 text-sm text-cyan hover:text-cyan-glow transition-colors group"
          >
            <Instagram className="w-4 h-4" />
            @_sl_detailing
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl">
          {POSTS.map((url) => (
            <div
              key={url}
              className="flex justify-center overflow-hidden rounded-2xl glass border-gradient p-2"
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: 12,
                  margin: 0,
                  maxWidth: 400,
                  minWidth: 270,
                  padding: 0,
                  width: '100%',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
