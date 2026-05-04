import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { BUSINESS } from '@/lib/constants';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  vehicle: string;
  service: string;
  message?: string;
  website?: string; // honeypot
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    // Honeypot
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.postcode ||
      !body.vehicle ||
      !body.service
    ) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set.');
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500 }
      );
    }

    const fromAddress = process.env.RESEND_FROM ?? `enquiries@${new URL(BUSINESS.url).hostname}`;
    const toAddress = process.env.RESEND_TO ?? BUSINESS.email;

    // Table-based HTML for cross-client compatibility
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>New enquiry — Spotless Detailing</title>
</head>
<body style="margin:0;padding:0;background-color:#04101F;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#04101F;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#0B1A2E;border-radius:16px;overflow:hidden;border:1px solid rgba(56,189,248,0.15);">
          <tr>
            <td style="padding:32px 32px 24px 32px;border-bottom:1px solid rgba(56,189,248,0.12);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;color:#38BDF8;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">
                    New Enquiry
                  </td>
                </tr>
                <tr>
                  <td style="font-family:Georgia,serif;color:#F5F7FA;font-size:24px;font-weight:700;padding-top:6px;letter-spacing:-0.5px;">
                    Spotless Detailing
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="font-family:Arial,Helvetica,sans-serif;color:#F5F7FA;font-size:15px;line-height:1.6;margin:0 0 24px 0;">
                You have a new enquiry from the Spotless Detailing website.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${row('Name', escapeHtml(body.name))}
                ${row('Phone', `<a href="tel:${escapeHtml(body.phone)}" style="color:#38BDF8;text-decoration:none;">${escapeHtml(body.phone)}</a>`)}
                ${row('Email', `<a href="mailto:${escapeHtml(body.email)}" style="color:#38BDF8;text-decoration:none;">${escapeHtml(body.email)}</a>`)}
                ${row('Postcode', escapeHtml(body.postcode))}
                ${row('Vehicle', escapeHtml(body.vehicle))}
                ${row('Service', escapeHtml(body.service))}
                ${
                  body.message
                    ? row('Message', escapeHtml(body.message).replace(/\n/g, '<br/>'))
                    : ''
                }
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 32px 32px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="font-family:Arial,Helvetica,sans-serif;color:rgba(245,247,250,0.4);font-size:12px;line-height:1.5;margin:0;text-align:center;">
                Sent from spotlessdetailing.co.uk · ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const { data, error } = await resend.emails.send({
      from: `Spotless Detailing <${fromAddress}>`,
      to: [toAddress],
      replyTo: body.email,
      subject: `New enquiry — ${body.name} (${body.service})`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-family:Arial,Helvetica,sans-serif;color:rgba(245,247,250,0.5);font-size:11px;text-transform:uppercase;letter-spacing:1.5px;width:110px;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-family:Arial,Helvetica,sans-serif;color:#F5F7FA;font-size:14px;line-height:1.5;">
        ${value}
      </td>
    </tr>
  `;
}
