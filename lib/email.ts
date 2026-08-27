import { BUSINESS, GOOGLE_REVIEW_URL } from './constants';

export const EMAIL_COLORS = {
  bg: '#04101F',
  card: '#0B1A2E',
  accent: '#38BDF8',
  textMain: '#F5F7FA',
  textMuted: 'rgba(245, 247, 250, 0.5)',
  border: 'rgba(56, 189, 248, 0.15)',
};

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function emailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); color:${EMAIL_COLORS.textMuted}; font-size:10px; text-transform:uppercase; letter-spacing:2px; width:120px; font-weight:600;">
        ${label}
      </td>
      <td style="padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); color:${EMAIL_COLORS.textMain}; font-size:14px; font-weight:400;">
        ${value}
      </td>
    </tr>
  `;
}

// Shared HTML email chrome — logo header, body slot, footer. Used by both the
// contact form and booking confirmation emails so there's one template.
export function emailTemplate(title: string, subtitle: string, content: string) {
  const logoUrl = `${BUSINESS.url}/logo.png`;
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:${EMAIL_COLORS.bg};font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${EMAIL_COLORS.bg};padding:40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background-color:${EMAIL_COLORS.card};border-radius:20px;overflow:hidden;border:1px solid ${EMAIL_COLORS.border};box-shadow: 0 20px 40px rgba(0,0,0,0.4);">

          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 30px 40px; background: linear-gradient(to bottom, rgba(56,189,248,0.05), transparent);">
              <img src="${logoUrl}" alt="${BUSINESS.name}" width="44" height="44" style="border-radius:50%;display:block;margin-bottom:16px;" />
              <div style="color:${EMAIL_COLORS.accent}; font-size:12px; letter-spacing:3px; text-transform:uppercase; font-weight:700; margin-bottom:8px;">
                ${title}
              </div>
              <div style="color:${EMAIL_COLORS.textMain}; font-size:28px; font-weight:700; letter-spacing:-0.5px;">
                ${BUSINESS.name}<span style="color:${EMAIL_COLORS.accent};">.</span>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 40px 40px 40px;">
              <p style="color:${EMAIL_COLORS.textMain}; font-size:16px; line-height:1.6; margin-bottom:30px; opacity:0.9;">
                ${subtitle}
              </p>
              <table width="100%" cellspacing="0" cellpadding="0">
                ${content}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:30px 40px; background-color:rgba(0,0,0,0.2); border-top:1px solid ${EMAIL_COLORS.border}; text-align:center;">
              <p style="color:${EMAIL_COLORS.textMuted}; font-size:12px; margin:0;">
                Mobile Glasgow & Surrounds &bull; ${new Date().getFullYear()}
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
}

// "How did we do?" review-request email — sent after a job, links straight
// to the Google review page. First name only, kept short and low-pressure.
export function reviewRequestEmailHtml(customerName: string): string {
  const firstName = customerName.trim().split(/\s+/)[0] || 'there';
  const content = `
    <tr>
      <td style="padding: 10px 0 30px 0; text-align: center;">
        <a href="${GOOGLE_REVIEW_URL}" style="display:inline-block; background-color:${EMAIL_COLORS.accent}; color:${EMAIL_COLORS.bg}; font-weight:700; font-size:15px; text-decoration:none; padding:16px 32px; border-radius:999px;">
          Leave a quick review
        </a>
      </td>
    </tr>
  `;
  return emailTemplate(
    'How did we do?',
    `Hi ${escapeHtml(firstName)}, thanks again for booking with ${BUSINESS.name}! If you've got 30 seconds, a quick review really helps us out.`,
    content
  );
}
