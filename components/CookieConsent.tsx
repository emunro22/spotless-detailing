'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'cookie-consent';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function loadGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || document.getElementById('ga4-script')) return;

  const loader = document.createElement('script');
  loader.id = 'ga4-script';
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(loader);

  const config = document.createElement('script');
  config.id = 'ga4-config';
  config.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(config);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {}

    if (stored === 'accepted') {
      loadGoogleAnalytics();
    } else if (stored !== 'declined') {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {}
    loadGoogleAnalytics();
    setVisible(false);
  }

  function decline() {
    try {
      localStorage.setItem(CONSENT_KEY, 'declined');
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-sm z-50 rounded-2xl glass-strong border-gradient p-5 shadow-glow-cyan">
      <p className="text-sm text-cream/80 leading-relaxed">
        We use cookies to run this site and, with your permission, to
        understand site traffic. See our{' '}
        <Link href="/privacy-policy" className="text-cyan hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-2.5">
        <button
          onClick={accept}
          className="flex-1 px-4 py-2.5 rounded-full bg-cyan text-midnight-900 text-sm font-semibold hover:bg-cyan-glow transition-colors"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 px-4 py-2.5 rounded-full glass text-cream text-sm font-medium hover:border-cyan/40 transition-colors border-gradient"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
