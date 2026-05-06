import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { BUSINESS, SERVICE_AREAS, SERVICES } from '@/lib/constants';
import Image from 'next/image';              


export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-cyan/10 bg-midnight-900">
      <div className="absolute inset-0 hex-overlay opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
                
                <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-glow-cyan">
                  <Image
                    src="/logo.png"
                    alt="Spotless Detailing logo"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="font-display text-lg font-semibold tracking-tight">
                Spotless<span className="text-cyan"> Detailing</span>
              </div>
            </div>
            <p className="text-sm text-cream/60 leading-relaxed max-w-xs">
              {BUSINESS.description}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-cream/70 hover:text-cyan hover:border-cyan/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-cream/70 hover:text-cyan hover:border-cyan/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="font-display font-semibold text-sm uppercase tracking-[0.18em] text-cream/90 mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-cream/60 hover:text-cyan transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div className="md:col-span-3">
            <h4 className="font-display font-semibold text-sm uppercase tracking-[0.18em] text-cream/90 mb-5">
              Areas Covered
            </h4>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-cream/60">
              {SERVICE_AREAS.slice(0, 10).map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-cream/40">
              Plus all of Greater Glasgow & Lanarkshire.
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="font-display font-semibold text-sm uppercase tracking-[0.18em] text-cream/90 mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="flex items-start gap-2.5 text-cream/70 hover:text-cyan transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan" />
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-start gap-2.5 text-cream/70 hover:text-cyan transition-colors break-all"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan" />
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-cream/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan" />
                <span>
                  Mobile · {BUSINESS.city}
                  <br />
                  <span className="text-xs text-cream/50">{BUSINESS.hours}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-cream/40">
            Crafted by{' '}
            <a
              href="https://munrostudio.co.uk"
              target="_blank"
              rel="noreferrer"
              className="text-cream/60 hover:text-cyan transition-colors"
            >
              MunroStudio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
