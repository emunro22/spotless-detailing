import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { BUSINESS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  vehicle: string;
  service: string;
  message?: string;
  website?: string;
}

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
      <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(245,247,250,0.5);font-size:11px;text-transform:uppercase;letter-spacing:1.5px;width:110px;">
        ${label}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#F5F7FA;font-size:14px;">
        ${value}
      </td>
    </tr>
  `;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    // Honeypot
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    // Validation
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
      console.warn('RESEND_API_KEY not set');
      return NextResponse.json({ ok: true, skipped: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // ✅ FORCE correct sender (prevents your previous bug)
    const fromAddress = 'enquiries@sl-detailing.co.uk';

    // ✅ Send enquiries to your Gmail
    const toAddress =
      process.env.RESEND_TO ?? 'Spotlessdetailing19@gmail.com';

    // =========================
    // MAIN EMAIL (TO YOU)
    // =========================
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
            <td style="padding:32px;border-bottom:1px solid rgba(56,189,248,0.12);">
              <div style="color:#38BDF8;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">
                New Enquiry
              </div>
              <div style="color:#F5F7FA;font-size:24px;font-weight:700;padding-top:6px;">
                Spotless Detailing
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="color:#F5F7FA;font-size:15px;line-height:1.6;">
                You have a new enquiry from your website.
              </p>

              <table width="100%">
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
            <td style="padding:20px 32px 32px 32px;">
              <p style="color:rgba(245,247,250,0.4);font-size:12px;text-align:center;">
                ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
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

    // Send to YOU
    await resend.emails.send({
      from: `Spotless Detailing <${fromAddress}>`,
      to: [toAddress],
      replyTo: body.email,
      subject: `New enquiry — ${body.name} (${body.service})`,
      html,
    });

    // =========================
    // CUSTOMER CONFIRMATION
    // =========================
    await resend.emails.send({
      from: `Spotless Detailing <${fromAddress}>`,
      to: [body.email],
      subject: 'Thanks for your enquiry — Spotless Detailing',
      html: `
        <p>Hi ${escapeHtml(body.name)},</p>
        <p>Thanks for your enquiry — we’ll get back to you shortly.</p>
        <p><strong>Service:</strong> ${escapeHtml(body.service)}</p>
        <p><strong>Vehicle:</strong> ${escapeHtml(body.vehicle)}</p>
        <br/>
        <p>— Spotless Detailing</p>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}