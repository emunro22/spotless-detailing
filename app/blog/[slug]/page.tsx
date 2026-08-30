import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, Phone } from 'lucide-react';
import { buildMetadata, blogPostingJsonLd } from '@/lib/seo';
import { BUSINESS } from '@/lib/constants';
import { findBlogPost, getAllBlogSlugs } from '@/lib/blog-posts';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | Spotless Detailing`,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <script
        id={`blogposting-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostingJsonLd({
              title: post.title,
              description: post.description,
              slug: post.slug,
              date: post.date,
            })
          ),
        }}
      />

      <section className="relative pt-36 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 hex-overlay opacity-50 pointer-events-none" />
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(closest-side, rgba(56,189,248,0.35), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
            {post.category}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] text-balance">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-5 text-sm text-cream/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <section className="relative py-8 md:py-12">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <div className="space-y-10">
            {post.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-cream mb-4">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-4">
                  {section.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className="text-base text-cream/70 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-cyan font-medium hover:text-cyan-glow transition-colors"
          >
            See our full range of services
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center rounded-3xl glass border-gradient p-10 md:p-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            Ready to book{' '}
            <span className="gradient-text italic">your detail?</span>
          </h2>
          <p className="mt-4 text-cream/60 leading-relaxed max-w-xl mx-auto">
            Tell us about your car — we&apos;ll come back with a fixed quote
            and available slots, no obligation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-cyan text-midnight-900 font-semibold shadow-glow-cyan hover:shadow-glow-cyan-lg hover:bg-cyan-glow transition-all"
            >
              Book Your Detail
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full glass text-cream font-medium hover:border-cyan/40 hover:text-cyan transition-all border-gradient"
            >
              <Phone className="w-4 h-4" />
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
