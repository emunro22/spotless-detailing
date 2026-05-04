import Link from 'next/link';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Thank You — Spotless Detailing',
  description: 'Your enquiry has been received. We\'ll come back to you the same day.',
  path: '/thank-you',
});

export default function ThankYouPage() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 hex-overlay opacity-50 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side, rgba(56,189,248,0.4), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-2xl px-5 md:px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-cyan/15 border border-cyan/30 flex items-center justify-center mx-auto mb-6 shadow-glow-cyan">
          <CheckCircle2 className="w-10 h-10 text-cyan" strokeWidth={1.5} />
        </div>
        <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
          Enquiry received
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
          Thanks — we'll be in{' '}
          <span className="gradient-text italic">touch shortly.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-cream/65 leading-relaxed max-w-xl mx-auto">
          We've got your details. Expect a reply the same day with a fixed
          quote and a couple of available slots.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-cream font-medium hover:border-cyan/40 hover:text-cyan transition-all border-gradient"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </section>
  );
}
