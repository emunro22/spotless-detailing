import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getJobsForReviewRequest, markReviewRequested } from '@/lib/queries';
import { reviewRequestEmailHtml } from '@/lib/email';
import { BUSINESS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

function ukLocalHour(): number {
  const formatted = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: 'numeric',
    hour12: false,
  }).format(new Date());
  return Number(formatted);
}

function ukTodayStr(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
}

// Triggered by Vercel Cron at 20:00 and 21:00 UTC (vercel.json) to cover both
// BST and GMT, actually sends only when it's 9pm in the UK right now, so it
// runs at the correct local time year-round regardless of which invocation
// fires. Safe to invoke twice: the second no-ops once review_requested_at is set.
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (ukLocalHour() !== 21) {
    return NextResponse.json({ skipped: true, reason: 'not 9pm UK time yet' });
  }

  const candidates = await getJobsForReviewRequest(ukTodayStr());

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ skipped: true, reason: 'RESEND_API_KEY not configured', wouldSend: candidates.length });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromAddress = `${BUSINESS.name} <enquiries@sl-detailing.co.uk>`;
  let sent = 0;

  for (const job of candidates) {
    try {
      await resend.emails.send({
        from: fromAddress,
        to: [job.email],
        subject: `How did we do? ${BUSINESS.name} would love a review`,
        html: reviewRequestEmailHtml(job.customerName),
      });
      await markReviewRequested(job.id);
      sent++;
    } catch (err) {
      console.error(`Failed to send review request for booking ${job.id}:`, err);
    }
  }

  return NextResponse.json({ sent, total: candidates.length });
}
