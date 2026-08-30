import { buildMetadata } from '@/lib/seo';
import { BUSINESS } from '@/lib/constants';

export const metadata = buildMetadata({
  title: 'Terms & Conditions',
  description: `The terms and conditions for booking services with ${BUSINESS.legalName}.`,
  path: '/terms',
});

export default function TermsPage() {
  return (
    <section className="relative pt-36 pb-24 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 hex-overlay opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
          Legal
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-balance">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm text-cream/50">Last updated: 30 August 2026</p>

        <div className="mt-10 space-y-8 text-sm md:text-base text-cream/70 leading-relaxed">
          <p>
            These terms apply whenever you book a service with{' '}
            {BUSINESS.legalName} (&quot;we&quot;, &quot;us&quot;). By booking,
            you agree to them.
          </p>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Quotes &amp; pricing
            </h2>
            <p>
              Prices shown on the site are starting prices and can vary with
              vehicle or property size and condition. We always confirm a
              fixed price before any work begins — no work starts without
              your agreement to the quoted price.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Bookings &amp; access
            </h2>
            <p>
              You&apos;re responsible for describing your vehicle or property
              accurately when booking, and for providing safe access and a
              water supply where required. As a mobile service, we&apos;ll
              agree a time and location with you in advance.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Cancellations &amp; rescheduling
            </h2>
            <p>
              We ask for as much notice as possible if you need to cancel or
              reschedule, so the slot can be offered to another customer. We
              may need to reschedule in the event of severe weather or
              circumstances outside our control, and will always aim to give
              you advance notice.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Payment
            </h2>
            <p>
              Payment is due on completion by bank transfer or cash, unless
              you&apos;re on a Maintenance Plan or are a business customer
              with an agreed invoicing arrangement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Our liability
            </h2>
            <p>
              We take care to protect your vehicle or property throughout
              every job. We&apos;ll flag any pre-existing damage or condition
              issues (such as already-weak paint or delicate surfaces) before
              starting work. We&apos;re not liable for pre-existing damage,
              or for issues arising from conditions we couldn&apos;t
              reasonably have been aware of. Nothing in these terms limits
              liability that cannot lawfully be limited.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Satisfaction
            </h2>
            <p>
              If you&apos;re not happy with a job, tell us within 48 hours
              and we&apos;ll do our best to put it right.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Contact
            </h2>
            <p>
              Questions about these terms? Reach us at{' '}
              <a href={`mailto:${BUSINESS.email}`} className="text-cyan hover:underline">
                {BUSINESS.email}
              </a>{' '}
              or {BUSINESS.phoneDisplay}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
