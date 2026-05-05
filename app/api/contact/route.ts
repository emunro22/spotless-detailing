import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

// Design Constants based on your screenshots
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
      <td style="padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); color:${COLORS.textMuted}; font-size:10px; text-transform:uppercase; letter-spacing:2px; width:120px; font-weight:600;">
        ${label}
      </td>
      <td style="padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); color:${COLORS.textMain}; font-size:14px; font-weight:400;">
        ${value}
      </td>
    </tr>
  `;
}

// Reusable Email Wrapper
const emailTemplate = (title: string, subtitle: string, content: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:${COLORS.bg};font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${COLORS.bg};padding:40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background-color:${COLORS.card};border-radius:20px;overflow:hidden;border:1px solid ${COLORS.border};box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
          
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 30px 40px; background: linear-gradient(to bottom, rgba(56,189,248,0.05), transparent);">
              <div style="color:${COLORS.accent}; font-size:12px; letter-spacing:3px; text-transform:uppercase; font-weight:700; margin-bottom:8px;">
                ${title}
              </div>
              <div style="color:${COLORS.textMain}; font-size:28px; font-weight:700; letter-spacing:-0.5px;">
                Spotless Detailing<span style="color:${COLORS.accent};">.</span>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 40px 40px 40px;">
              <p style="color:${COLORS.textMain}; font-size:16px; line-height:1.6; margin-bottom:30px; opacity:0.9;">
                ${subtitle}
              </p>
              <table width="100%" cellspacing="0" cellpadding="0">
                ${content}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:30px 40px; background-color:rgba(0,0,0,0.2); border-top:1px solid ${COLORS.border}; text-align:center;">
              <p style="color:${COLORS.textMuted}; font-size:12px; margin:0;">
                Mobile Glasgow & Surrounds • ${new Date().getFullYear()}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    if (body.website) return NextResponse.json({ ok: true });

    if (!body.name || !body.email || !body.phone || !body.postcode || !body.vehicle || !body.service) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) return NextResponse.json({ ok: true, skipped: true });
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromAddress = 'enquiries@sl-detailing.co.uk';
    const toAddress = process.env.RESEND_TO ?? 'Spotlessdetailing19@gmail.com';

    // 1. Internal Notification Content
    const adminContent = `
      ${row('Customer', escapeHtml(body.name))}
      ${row('Phone', `<a href="tel:${body.phone}" style="color:${COLORS.accent};text-decoration:none;">${body.phone}</a>`)}
      ${row('Email', `<a href="mailto:${body.email}" style="color:${COLORS.accent};text-decoration:none;">${body.email}</a>`)}
      ${row('Location', escapeHtml(body.postcode))}
      ${row('Vehicle', escapeHtml(body.vehicle))}
      ${row('Service', `<span style="color:${COLORS.accent};font-weight:600;">${escapeHtml(body.service)}</span>`)}
      ${body.message ? row('Message', escapeHtml(body.message).replace(/\n/g, '<br/>')) : ''}
    `;

    // 2. Customer Confirmation Content
    const customerContent = `
      ${row('Service', escapeHtml(body.service))}
      ${row('Vehicle', escapeHtml(body.vehicle))}
      ${row('Status', '<span style="color:#10B981;">Received & Pending</span>')}
    `;

    // Send to Admin
    await resend.emails.send({
      from: `Spotless Detailing <${fromAddress}>`,
      to: [toAddress],
      replyTo: body.email,
      subject: `New enquiry: ${body.name} — ${body.service}`,
      html: emailTemplate('New Website Lead', `You've received a new booking request from your website.`, adminContent),
    });

    // Send to Customer
    await resend.emails.send({
      from: `Spotless Detailing <${fromAddress}>`,
      to: [body.email],
      subject: 'We’ve received your enquiry — Spotless Detailing',
      html: emailTemplate(
        'Booking Request', 
        `Hi ${body.name}, thanks for reaching out. We've received your request for a ${body.service} and we'll check our diary and get back to you shortly.`, 
        customerContent
      ),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}