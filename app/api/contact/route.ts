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

    // Env check
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set');
      return NextResponse.json({ ok: true, skipped: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromAddress =
      process.env.RESEND_FROM ??
      `enquiries@${new URL(BUSINESS.url).hostname}`;

    const toAddress =
      process.env.RESEND_TO ?? 'Spotlessdetailing19@gmail.com';

    // =========================
    // MAIN EMAIL (TO YOU)
    // =========================
    const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#04101F;font-family:Arial;">
  <table width="100%" style="padding:40px 20px;background:#04101F;">
    <tr>
      <td align="center">
        <table width="600" style="background:#0B1A2E;border-radius:16px;padding:32px;">
          <tr>
            <td>
              <h2 style="color:#38BDF8;margin:0;">New Enquiry</h2>
              <p style="color:#F5F7FA;">Spotless Detailing</p>

              <table width="100%">
                ${row('Name', escapeHtml(body.name))}
                ${row('Phone', escapeHtml(body.phone))}
                ${row('Email', escapeHtml(body.email))}
                ${row('Postcode', escapeHtml(body.postcode))}
                ${row('Vehicle', escapeHtml(body.vehicle))}
                ${row('Service', escapeHtml(body.service))}
                ${
                  body.message
                    ? row(
                        'Message',
                        escapeHtml(body.message).replace(/\n/g, '<br/>')
                      )
                    : ''
                }
              </table>

              <p style="color:#888;font-size:12px;text-align:center;margin-top:20px;">
                ${new Date().toLocaleString('en-GB')}
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
      subject: `New enquiry — ${body.name}`,
      html,
    });

    // =========================
    // CONFIRMATION EMAIL (TO CUSTOMER)
    // =========================
    const customerHtml = `
      <p>Hi ${escapeHtml(body.name)},</p>
      <p>Thanks for your enquiry — we’ll get back to you shortly.</p>
      <p><strong>Service:</strong> ${escapeHtml(body.service)}</p>
      <p><strong>Vehicle:</strong> ${escapeHtml(body.vehicle)}</p>
      <br/>
      <p>— Spotless Detailing</p>
    `;

    await resend.emails.send({
      from: `Spotless Detailing <${fromAddress}>`,
      to: [body.email],
      subject: 'Thanks for your enquiry — Spotless Detailing',
      html: customerHtml,
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