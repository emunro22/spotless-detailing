import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getPastJobsPendingReviewRequest, markReviewRequested } from '@/lib/queries';
import { reviewRequestEmailHtml } from '@/lib/email';
import { BUSINESS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

// Preview: who would get a "how did we do" email if we sent the historical
// batch right now.
export async function GET() {
  const candidates = await getPastJobsPendingReviewRequest();
  return NextResponse.json({ count: candidates.length, jobs: candidates });
}

// Actually send the historical batch — deliberately a separate, admin-
// triggered action rather than something that fires automatically.
export async function POST() {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Email sending is not configured (RESEND_API_KEY missing).' }, { status: 400 });
  }

  const candidates = await getPastJobsPendingReviewRequest();
  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromAddress = `${BUSINESS.name} <enquiries@sl-detailing.co.uk>`;

  let sent = 0;
  const failed: string[] = [];

  for (const job of candidates) {
    try {
      await resend.emails.send({
        from: fromAddress,
        to: [job.email],
        subject: `How did we do? — ${BUSINESS.name}`,
        html: reviewRequestEmailHtml(job.customerName),
      });
      await markReviewRequested(job.id);
      sent++;
    } catch (err) {
      console.error(`Failed to send review request for booking ${job.id}:`, err);
      failed.push(job.email);
    }
  }

  return NextResponse.json({ sent, total: candidates.length, failed });
}
