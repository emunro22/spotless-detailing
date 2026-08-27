'use client';

import { useEffect, useState } from 'react';
import { Star, Loader2, Send } from 'lucide-react';
import type { ReviewCandidate } from '@/lib/queries';

export default function ReviewRequestsPanel() {
  const [jobs, setJobs] = useState<ReviewCandidate[] | null>(null);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('/api/admin/bookings/review-requests')
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs || []));
  }, []);

  async function handleSend() {
    if (!jobs || jobs.length === 0) return;
    if (
      !confirm(
        `Send a "how did we do?" review-request email to ${jobs.length} past customer${jobs.length === 1 ? '' : 's'}? This can't be undone.`
      )
    ) {
      return;
    }

    setSending(true);
    setError('');
    setResult('');

    const res = await fetch('/api/admin/bookings/review-requests', { method: 'POST' });
    const data = await res.json().catch(() => ({}));
    setSending(false);

    if (!res.ok) {
      setError(data.error || 'Could not send review requests.');
      return;
    }

    setResult(`Sent ${data.sent} of ${data.total}.`);
    setJobs([]);
  }

  if (jobs === null) return null;
  if (jobs.length === 0 && !result) return null;

  return (
    <div className="glass border-gradient rounded-2xl p-5 mb-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-cyan/15 border border-cyan/25 flex items-center justify-center flex-shrink-0">
            <Star className="w-4 h-4 text-cyan" />
          </div>
          <div>
            <div className="text-sm font-semibold text-cream">
              {result || `${jobs.length} past customer${jobs.length === 1 ? '' : 's'} haven't been asked for a review`}
            </div>
            <div className="text-xs text-cream/50 mt-0.5">
              {result
                ? 'Review requests sent.'
                : "One-off email linking to your Google review page — from the imported calendar history."}
            </div>
            {!result && jobs.length > 0 && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-xs text-cyan hover:text-cyan-glow mt-1.5 underline-offset-2 hover:underline"
              >
                {expanded ? 'Hide list' : 'Show who'}
              </button>
            )}
            {expanded && (
              <ul className="mt-2 space-y-1 text-xs text-cream/60">
                {jobs.map((j) => (
                  <li key={j.id}>
                    {j.customerName} · {j.email} · {j.serviceName} · {j.bookingDate}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {!result && jobs.length > 0 && (
          <button
            onClick={handleSend}
            disabled={sending}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-cyan text-midnight-900 hover:bg-cyan-glow disabled:opacity-50 shadow-glow-cyan transition-all flex-shrink-0"
          >
            {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            {sending ? 'Sending…' : 'Send now'}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-3 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
