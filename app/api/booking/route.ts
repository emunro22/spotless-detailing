import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  website?: string;
}

const COLORS = {
  bg: '#04101F',
  card: '#0B1A2E',
  accent: '#38BDF8',
  textMain: '#F5F7FA',
  textMuted: 'rgba(245, 247, 250, 0.5)',
  border: 'rgba(56, 189, 248, 0.15)',
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); color:${COLORS.textMuted}; font-size:10px; text-transform:uppercase; letter-spacing:2px; width:130px; font-weight:600; vertical-align:top;">
        ${label}
      </td>
      <td style="padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); color:${COLORS.textMain}; font-size:14px; font-weight:400;">
        ${value}
      </td>
    </tr>
  `;
}

const emailTemplate = (title: string, subtitle: string, content: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:${COLORS.bg};font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${COLORS.bg};padding:40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background-color:${COLORS.card};border-radius:20px;overflow:hidden;border:1px solid ${COLORS.border};box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
          <tr>
            <td style="padding:40px 40px 30px 40px; background: linear-gradient(to bottom, rgba(56,189,248,0.05), transparent);">
              <div style="color:${COLORS.accent}; font-size:12px; letter-spacing:3px; text-transform:uppercase; font-weight:700; margin-bottom:8px;">${title}</div>
              <div style="color:${COLORS.textMain}; font-size:28px; font-weight:700; letter-spacing:-0.5px;">
                Spotless Detailing<span style="color:${COLORS.accent};">.</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px 40px;">
              <p style="color:${COLORS.textMain}; font-size:16px; line-height:1.6; margin-bottom:30px; opacity:0.9;">${subtitle}</p>
              <table width="100%" cellspacing="0" cellpadding="0">${content}</table>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 40px; background-color:rgba(0,0,0,0.2); border-top:1px solid ${COLORS.border}; text-align:center;">
              <p style="color:${COLORS.textMuted}; font-size:12px; margin:0;">Mobile Glasgow & Surrounds • ${new Date().getFullYear()}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

async function getGoogleAccessToken(): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google token exchange failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

async function createCalendarEvent(opts: {
  title: string;
  description: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
}): Promise<{ htmlLink?: string; id?: string }> {
  const accessToken = await getGoogleAccessToken();
  const eventBody = {
    summary: opts.title,
    description: opts.description,
    location: opts.location,
    start: { dateTime: `${opts.date}T${opts.startTime}:00`, timeZone: 'Europe/London' },
    end: { dateTime: `${opts.date}T${opts.endTime}:00`, timeZone: 'Europe/London' },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 60 },
        { method: 'email', minutes: 24 * 60 },
      ],
    },
  };
  const res = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(eventBody),
    },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Calendar insert failed (${res.status}): ${text}`);
  }
  return res.json();
}

function formatHumanDate(date: string, time: string): string {
  const [y, m, d] = date.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const formatted = dt.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
  return `${formatted} at ${time}`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingPayload;
    if (body.website) return NextResponse.json({ ok: true });

    if (!body.name || !body.email || !body.phone || !body.postcode ||
        !body.vehicle || !body.service || !body.date || !body.time) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) return NextResponse.json({ ok: true, skipped: true });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromAddress = 'enquiries@sl-detailing.co.uk';
    const toAddress = process.env.RESEND_TO ?? 'Spotlessdetailing19@gmail.com';

    const [hh, mm] = body.time.split(':').map(Number);
    const endHour = hh + 2;
    const endTime = `${String(endHour).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    const humanDate = formatHumanDate(body.date, body.time);

    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN) {
      try {
        await createCalendarEvent({
          title: `${body.service} — ${body.name}`,
          description: [
            `Customer: ${body.name}`,
            `Phone: ${body.phone}`,
            `Email: ${body.email}`,
            `Vehicle: ${body.vehicle}`,
            body.message ? `\nNotes: ${body.message}` : '',
          ].filter(Boolean).join('\n'),
          location: `${body.postcode}, Glasgow`,
          date: body.date,
          startTime: body.time,
          endTime,
        });
      } catch (err) {
        console.error('[booking] calendar insert failed:', err);
      }
    }

    const adminContent = `
      ${row('Customer', escapeHtml(body.name))}
      ${row('Phone', `<a href="tel:${escapeHtml(body.phone)}" style="color:${COLORS.accent};text-decoration:none;">${escapeHtml(body.phone)}</a>`)}
      ${row('Email', `<a href="mailto:${escapeHtml(body.email)}" style="color:${COLORS.accent};text-decoration:none;">${escapeHtml(body.email)}</a>`)}
      ${row('Service', `<span style="color:${COLORS.accent};font-weight:600;">${escapeHtml(body.service)}</span>`)}
      ${row('Date & Time', `<span style="color:${COLORS.accent};font-weight:600;">${escapeHtml(humanDate)}</span>`)}
      ${row('Vehicle', escapeHtml(body.vehicle))}
      ${row('Postcode', escapeHtml(body.postcode))}
      ${body.message ? row('Notes', escapeHtml(body.message).replace(/\n/g, '<br/>')) : ''}
    `;

    await resend.emails.send({
      from: `Spotless Detailing <${fromAddress}>`,
      to: [toAddress],
      replyTo: body.email,
      subject: `New booking: ${body.name} — ${body.service} (${humanDate})`,
      html: emailTemplate('New Booking',
        `New booking from your website — added to your Google Calendar automatically. Reply directly to the customer to confirm.`,
        adminContent),
    });

    const customerContent = `
      ${row('Service', escapeHtml(body.service))}
      ${row('Date & Time', `<span style="color:${COLORS.accent};font-weight:600;">${escapeHtml(humanDate)}</span>`)}
      ${row('Vehicle', escapeHtml(body.vehicle))}
      ${row('Status', '<span style="color:#FCD34D;">Awaiting Confirmation</span>')}
    `;

    await resend.emails.send({
      from: `Spotless Detailing <${fromAddress}>`,
      to: [body.email],
      subject: 'Booking received — Spotless Detailing',
      html: emailTemplate('Booking Received',
        `Hi ${escapeHtml(body.name)}, thanks for booking with Spotless Detailing. We've received your request and will be in touch shortly to confirm your slot.`,
        customerContent),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[booking] error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}