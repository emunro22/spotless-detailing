# Spotless Detailing — Glasgow

Mobile car detailing & valeting site. Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + Resend, deployed on Vercel.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in Resend keys
npm run dev
```

Site lives on `http://localhost:3000`.

## Stack

- **Next.js 14** (App Router) with React Server Components by default; client components used only where interactivity / animation is needed.
- **TypeScript** strict mode.
- **Tailwind CSS** with brand tokens defined in `tailwind.config.ts`.
- **Framer Motion** for entrance animations and the mobile menu drawer.
- **Resend** for the contact form (table-based HTML email for cross-client compatibility).
- **next/font** with Bricolage Grotesque (display) + DM Sans (body) — both self-hosted via Google Fonts proxy, no FOUT.
- **lucide-react** for icons.

## Project structure

```
app/
  layout.tsx          # root layout, fonts, JSON-LD, navbar/footer
  page.tsx            # home (composes all sections)
  services/page.tsx
  gallery/page.tsx
  about/page.tsx
  contact/page.tsx
  booking/page.tsx    # placeholder for Google Calendar embed
  thank-you/page.tsx
  api/contact/route.ts
  sitemap.ts          # /sitemap.xml
  robots.ts           # /robots.txt
  globals.css

components/
  Navbar.tsx          # sticky, hamburger on mobile
  Footer.tsx
  Hero.tsx            # hero with hexagon LED motif
  Services.tsx        # service/pricing cards + maintenance callout
  Process.tsx         # 4-step "how it works"
  WhyChooseUs.tsx     # 6 feature cards
  Gallery.tsx         # bento image grid
  Testimonials.tsx
  ServiceAreas.tsx
  FAQ.tsx             # accordion + FAQPage JSON-LD
  ContactForm.tsx
  CTA.tsx

lib/
  constants.ts        # business info, services, pricing, areas, FAQs, testimonials, SEO keywords
  seo.ts              # buildMetadata helper, LocalBusiness + AutomotiveBusiness JSON-LD, FAQ JSON-LD
```

## Setup checklist

### 1. Replace placeholders in `lib/constants.ts`

Search for `TODO` comments. You need to set:
- `BUSINESS.phone` and `BUSINESS.phoneDisplay`
- `BUSINESS.email`
- `BUSINESS.whatsapp` (full URL like `https://wa.me/447XXXXXXXXX`)
- `BUSINESS.instagram`
- `BUSINESS.url` (your production domain — defaults assume `spotlessdetailing.co.uk`)

### 2. Add brand assets to `/public`

| File                       | Use                                |
| -------------------------- | ---------------------------------- |
| `/public/favicon.ico`      | Browser favicon                    |
| `/public/apple-touch-icon.png` | iOS home-screen icon (180×180) |
| `/public/og-image.jpg`     | Social share image (1200×630)      |
| `/public/logo.png`         | Logo for structured data           |
| `/public/images/gallery-1.jpg` … `gallery-5.jpg` | Gallery photos |

The gallery component currently expects 5 images named `gallery-1.jpg` through `gallery-5.jpg`. Drop in the customer photos you sent (Range Rover SVR, black Range Rover Sport, G-Wagon, Range Rover Vogue, Tesla) renamed in that order. To add more, edit `IMAGES` in `components/Gallery.tsx`.

### 3. Set up Resend

1. Verify your domain on [resend.com](https://resend.com).
2. Generate an API key.
3. Drop the key + sender/recipient addresses into `.env.local`.
4. On Vercel, add the same three vars to **Project → Settings → Environment Variables**.

### 4. Connect Google Calendar booking

The booking page (`app/booking/page.tsx`) currently shows a "connecting next" placeholder. To go live:

1. In your Google Calendar, create an **Appointment Schedule** (Settings → Appointment schedules) with the services as offerings.
2. Copy the public booking URL — looks like `https://calendar.google.com/calendar/appointments/schedules/AcZssZ...`.
3. In `app/booking/page.tsx`, find the comment block marked `TODO: Replace this whole placeholder block` and swap it for:

```tsx
<iframe
  src="https://calendar.google.com/calendar/appointments/schedules/YOUR_SCHEDULE_ID?gv=true"
  style={{ border: 0 }}
  width="100%"
  height="100%"
  frameBorder={0}
  title="Book a slot with Spotless Detailing"
/>
```

If you want a more bespoke setup (writing into the calendar from a custom form using the Google Calendar API), let me know — that's a separate route handler and OAuth setup.

### 5. Deploy to Vercel

```bash
git init && git add . && git commit -m "Initial commit"
# push to GitHub, then import in Vercel
```

After first deploy, point your custom domain at the Vercel project and check:
- `https://yourdomain.co.uk/sitemap.xml` resolves
- `https://yourdomain.co.uk/robots.txt` resolves
- The contact form sends a test email
- Lighthouse score on mobile (should be ≥ 95 across the board)

## SEO

- 10 high-intent Glasgow keywords in `lib/constants.ts`, applied to root metadata.
- Per-page metadata via `buildMetadata()` in `lib/seo.ts`.
- JSON-LD: `LocalBusiness` + `AutomotiveBusiness` (root layout) and `FAQPage` (FAQ component).
- `sitemap.xml` and `robots.txt` auto-generated.
- All images use `next/image` for responsive serving + AVIF/WebP.
- Open Graph + Twitter Card metadata.
- Canonical URLs on every page.

## Notes for future me

- `border-gradient` utility in `globals.css` does the subtle cyan border-glow on cards. Apply by adding the class.
- Hero uses the hexagon LED motif from the actual brand studio photos as inline SVG — no asset needed.
- Mobile menu locks body scroll when open (`useEffect` in `Navbar.tsx`).
- Honeypot field in contact form (`name="website"`).
