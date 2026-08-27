import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getBookableServices, getBookingsForDate, createBooking } from '@/lib/queries';
import { getAvailableSlots, addMinutes } from '@/lib/booking';
import { emailTemplate, emailRow as row, escapeHtml } from '@/lib/email';
import { BUSINESS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

interface BookingPayload {
  serviceId: number;
  date: string;
  startTime: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  vehicle: string;
  notes?: string;
  website?: string; // honeypot
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingPayload;

    if (body.website) return NextResponse.json({ ok: true });

    if (
      !body.serviceId ||
      !body.date ||
      !body.startTime ||
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.address ||
      !body.vehicle
    ) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const services = await getBookableServices();
    const service = services.find((s) => s.id === Number(body.serviceId));
    if (!service || !service.durationMinutes) {
      return NextResponse.json({ error: 'Service is not available for online booking.' }, { status: 400 });
    }

    // Re-check the slot is still free right before inserting (race-safety).
    const existing = await getBookingsForDate(body.date);
    const available = getAvailableSlots(body.date, service.durationMinutes, existing);
    if (!available.includes(body.startTime)) {
      return NextResponse.json({ error: 'That slot is no longer available. Please pick another time.' }, { status: 409 });
    }

    const endTime = addMinutes(body.startTime, service.durationMinutes);

    const booking = await createBooking({
      serviceId: service.id,
      customerName: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      vehicle: body.vehicle,
      notes: body.notes || null,
      bookingDate: body.date,
      startTime: body.startTime,
      endTime,
    });

    const dateLabel = new Date(`${booking.bookingDate}T00:00:00`).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const timeLabel = `${booking.startTime} – ${booking.endTime}`;

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromAddress = 'enquiries@sl-detailing.co.uk';
      const toAddress = process.env.RESEND_TO ?? 'Spotlessdetailing19@gmail.com';

      const detailsContent = `
        ${row('Service', escapeHtml(service.name))}
        ${row('Date', escapeHtml(dateLabel))}
        ${row('Time', escapeHtml(timeLabel))}
        ${row('Vehicle', escapeHtml(booking.vehicle))}
        ${row('Address', escapeHtml(booking.address))}
        ${booking.notes ? row('Notes', escapeHtml(booking.notes).replace(/\n/g, '<br/>')) : ''}
      `;

      const customerContent = `
        ${detailsContent}
        ${row('Status', '<span style="color:#10B981;">Confirmed</span>')}
      `;

      const adminContent = `
        ${detailsContent}
        ${row('Customer', escapeHtml(booking.customerName))}
        ${row('Phone', `<a href="tel:${booking.phone}" style="color:#38BDF8;text-decoration:none;">${booking.phone}</a>`)}
        ${row('Email', `<a href="mailto:${booking.email}" style="color:#38BDF8;text-decoration:none;">${booking.email}</a>`)}
      `;

      await Promise.all([
        resend.emails.send({
          from: `${BUSINESS.name} <${fromAddress}>`,
          to: [booking.email],
          subject: `Booking confirmed — ${service.name} on ${dateLabel}`,
          html: emailTemplate(
            'Booking Confirmed',
            `Hi ${escapeHtml(booking.customerName)}, you're booked in. Here are the details of your appointment.`,
            customerContent
          ),
        }),
        resend.emails.send({
          from: `${BUSINESS.name} <${fromAddress}>`,
          to: [toAddress],
          replyTo: booking.email,
          subject: `New booking: ${booking.customerName} — ${service.name} on ${dateLabel}`,
          html: emailTemplate('New Booking', `A new job has been booked through the website.`, adminContent),
        }),
      ]);
    }

    return NextResponse.json({ ok: true, booking });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
