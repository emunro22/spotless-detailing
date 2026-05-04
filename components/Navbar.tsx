'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'glass-strong border-b border-cyan/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setOpen(false)}
          aria-label={`${BUSINESS.name} home`}
        >
          <Logo />
          <div className="leading-tight">
            <div className="font-display font-semibold text-base md:text-lg tracking-tight text-cream">
              spotless
              <span className="text-cyan"> detailing</span>
            </div>
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-cyan-glow/70 font-medium">
              Mobile · Glasgow
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-cream/80 hover:text-cyan transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="flex items-center gap-2 text-sm text-cream/70 hover:text-cyan transition-colors"
          >
            <Phone className="w-4 h-4" />
            {BUSINESS.phoneDisplay}
          </a>
          <Link
            href="/booking"
            className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-cyan text-midnight-900 font-semibold text-sm hover:bg-cyan-glow transition-all shadow-glow-cyan hover:shadow-glow-cyan-lg"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="lg:hidden relative w-11 h-11 rounded-full glass flex items-center justify-center text-cream"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden absolute top-full inset-x-0 glass-strong border-b border-cyan/10"
          >
            <nav className="px-5 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3.5 text-base font-medium text-cream/85 hover:text-cyan hover:bg-cyan/5 rounded-xl transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-cyan/10 my-3" />
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center gap-3 px-4 py-3 text-cream/70 hover:text-cyan transition-colors"
              >
                <Phone className="w-4 h-4" />
                {BUSINESS.phoneDisplay}
              </motion.a>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/booking"
                  onClick={() => setOpen(false)}
                  className="block w-full mt-2 text-center px-5 py-3.5 rounded-2xl bg-cyan text-midnight-900 font-semibold shadow-glow-cyan"
                >
                  Book Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Logo() {
  return (
    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-glow via-cyan to-cyan-deep flex items-center justify-center shadow-glow-cyan">
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-midnight-900"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.5C12 2.5 5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.5 12 2.5z" />
        <ellipse cx="9.5" cy="11.5" rx="1.6" ry="2.2" fill="#fff" opacity="0.65" />
      </svg>
      <span className="absolute inset-0 rounded-full bg-cyan/30 ripple" aria-hidden="true" />
    </div>
  );
}
