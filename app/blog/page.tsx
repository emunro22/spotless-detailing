import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { BLOG_POSTS } from '@/lib/blog-posts';
import { SectionHeader } from '@/components/Services';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'Car Detailing Advice & Guides | Spotless Detailing Blog',
  description:
    'Ceramic coating vs wax, how often to detail your car, and what\'s actually included in each of our services. Practical detailing advice from Spotless Detailing.',
  path: '/blog',
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogIndexPage() {
  return (
    <>
      <section className="relative pt-36 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 hex-overlay opacity-50 pointer-events-none" />
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(closest-side, rgba(56,189,248,0.35), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
            Blog
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
            Detailing advice,{' '}
            <span className="gradient-text italic">worth reading.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-cream/65 leading-relaxed max-w-2xl mx-auto">
            Practical guides on paint protection, maintenance schedules and
            what&apos;s actually included in each of our services, so you know
            exactly what to book.
          </p>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Latest posts"
            title={
              <>
                From the{' '}
                <span className="gradient-text italic">workshop.</span>
              </>
            }
            align="left"
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl glass border-gradient p-6 hover:border-cyan/30 transition-all"
              >
                <div className="text-xs uppercase tracking-[0.16em] text-cyan-glow/80 mb-3">
                  {post.category}
                </div>
                <h2 className="font-display text-lg font-semibold text-cream mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-cream/55 leading-relaxed mb-5 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-cream/45">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-sm text-cyan font-medium">
                  Read more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
