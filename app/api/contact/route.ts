import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { emailTemplate, emailRow as row, escapeHtml, EMAIL_COLORS } from '@/lib/email';

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
      ${row('Phone', `<a href="tel:${body.phone}" style="color:${EMAIL_COLORS.accent};text-decoration:none;">${body.phone}</a>`)}
      ${row('Email', `<a href="mailto:${body.email}" style="color:${EMAIL_COLORS.accent};text-decoration:none;">${body.email}</a>`)}
      ${row('Location', escapeHtml(body.postcode))}
      ${row('Vehicle', escapeHtml(body.vehicle))}
      ${row('Service', `<span style="color:${EMAIL_COLORS.accent};font-weight:600;">${escapeHtml(body.service)}</span>`)}
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
      subject: `New enquiry: ${body.name}, ${body.service}`,
      html: emailTemplate('New Website Lead', `You've received a new booking request from your website.`, adminContent),
    });

    // Send to Customer
    await resend.emails.send({
      from: `Spotless Detailing <${fromAddress}>`,
      to: [body.email],
      subject: 'We’ve received your enquiry',
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