import { buildMetadata } from '@/lib/seo';
import { BUSINESS } from '@/lib/constants';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `How ${BUSINESS.legalName} collects, uses and protects your personal data.`,
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <section className="relative pt-36 pb-24 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 hex-overlay opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-5">
          Legal
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-balance">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-cream/50">Last updated: 30 August 2026</p>

        <div className="mt-10 space-y-8 text-sm md:text-base text-cream/70 leading-relaxed">
          <p>
            {BUSINESS.legalName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy. This
            policy explains what personal data we collect when you use{' '}
            {BUSINESS.url.replace('https://', '')}, why we collect it, and the
            choices you have.
          </p>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Who we are
            </h2>
            <p>
              {BUSINESS.legalName}, a mobile car detailing and cleaning
              business based in {BUSINESS.city}, {BUSINESS.country}. You can
              contact us at{' '}
              <a href={`mailto:${BUSINESS.email}`} className="text-cyan hover:underline">
                {BUSINESS.email}
              </a>{' '}
              or {BUSINESS.phoneDisplay}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              What we collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-cream">Booking &amp; enquiry details</strong> —
                name, phone number, email address, vehicle or property details,
                and address/postcode, submitted through our booking, contact
                or cleaning enquiry forms.
              </li>
              <li>
                <strong className="text-cream">Communications</strong> — messages
                you send us by email, WhatsApp or phone, including
                review-request follow-ups sent after a completed booking.
              </li>
              <li>
                <strong className="text-cream">Usage data</strong> — if
                analytics is enabled, anonymised or pseudonymised data about
                how visitors use the site (pages viewed, device type,
                approximate location), collected only after you consent via
                the cookie banner.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Why we collect it
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to enquiries and provide accurate quotes.</li>
              <li>To schedule, confirm and carry out bookings.</li>
              <li>To send booking confirmations and, after a completed job, a one-off request for a review.</li>
              <li>To understand how the site is used and improve it, where you have given analytics consent.</li>
              <li>To meet our legal and accounting obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Who we share it with
            </h2>
            <p>
              We do not sell your data. We share it only with the service
              providers that run the site and our booking system on our
              behalf — our hosting provider, database provider and
              transactional email provider — solely to deliver the service
              you&apos;ve requested. Where analytics is enabled, an
              analytics provider processes anonymised usage data.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Cookies
            </h2>
            <p>
              We use strictly necessary cookies to run the site, and — only
              if you accept them via the cookie banner — analytics cookies to
              understand site traffic. You can withdraw consent at any time
              by clearing your browser&apos;s site data and revisiting the
              banner.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              How long we keep it
            </h2>
            <p>
              We keep booking and enquiry records for as long as needed to
              provide our services and meet our accounting and legal
              obligations, and delete or anonymise them when no longer
              needed.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Your rights
            </h2>
            <p>
              Under UK GDPR you have the right to ask what personal data we
              hold about you, request a copy of it, ask us to correct or
              delete it, or object to how it&apos;s used. To exercise any of
              these rights, contact us at{' '}
              <a href={`mailto:${BUSINESS.email}`} className="text-cyan hover:underline">
                {BUSINESS.email}
              </a>
              . If you&apos;re unhappy with how we&apos;ve handled your data,
              you can complain to the UK Information Commissioner&apos;s
              Office (ico.org.uk).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-cream mb-3">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. Changes will be
              posted on this page with an updated date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
