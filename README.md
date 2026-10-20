# Medical Consultation Website — Stage 1

A professional medical consultation website for a single doctor, built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Next.js 13** (App Router) with TypeScript
- **Tailwind CSS** with a custom medical theme
- **Supabase** for authentication and (future) database, storage, and backend
- **shadcn/ui** component library
- **Lucide React** for icons

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Environment Configuration

Copy `.env.example` to `.env` and fill in your Supabase project credentials:

```bash
cp .env.example .env
```

Required environment variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon (public) key |

These are already configured in the hosted Bolt environment. For local development, use the values from your Supabase dashboard (Settings > API).

**Never** put the Supabase service-role key, database password, or any other secret in frontend code. The service-role key is only for server-side/edge-function use and should not be committed to source.

## Local Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

## Build

```bash
npm run build
```

## Type Check

```bash
npm run typecheck
```

## Project Structure

```
app/
  layout.tsx              # Root layout with header, footer, auth provider
  page.tsx                # Homepage
  about/page.tsx          # About the doctor
  contact/page.tsx        # Contact form
  help/page.tsx           # Help & FAQ
  privacy-policy/page.tsx # Privacy policy (draft)
  terms/page.tsx          # Terms of use (draft)
  login/page.tsx          # Login page
  signup/page.tsx         # Signup page
  forgot-password/page.tsx# Password reset request
  auth/callback/page.tsx  # Auth callback handler
  book-appointment/
    online/page.tsx       # Online consultation booking entry
    clinic/page.tsx       # Clinic consultation booking entry
  globals.css             # Global styles + medical theme

components/
  site/
    site-header.tsx       # Navigation header with auth-aware menu
    site-footer.tsx       # Footer with contact info and legal links
    booking-entry.tsx     # Booking entry point component
    sections/
      hero-section.tsx           # Homepage hero
      services-section.tsx       # Service cards with pricing
      practice-areas-section.tsx # Areas of practice grid
      about-preview-section.tsx  # Doctor preview
      anatomy-section.tsx        # Interactive anatomy hotspots
      final-cta-section.tsx      # Final appointment CTA
  ui/                     # shadcn/ui components

lib/
  supabase/
    client.ts             # Browser Supabase client
    server.ts             # Server Supabase client
    middleware.ts         # Session refresh middleware
  auth/
    auth-context.tsx      # Client-side auth context provider
    server.ts             # Server-side auth helpers

middleware.ts             # Next.js middleware (session refresh)
```

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, services, practice areas, about preview, anatomy, CTA |
| `/about` | About the doctor (placeholders for unverified info) |
| `/contact` | Contact form (email delivery in later stage) |
| `/help` | FAQ and support links (ticket system in later stage) |
| `/privacy-policy` | Privacy policy (draft) |
| `/terms` | Terms of use (draft) |
| `/login` | Email/password login |
| `/signup` | Email/password signup |
| `/forgot-password` | Password reset request |
| `/book-appointment/online` | Online consultation booking (coming soon) |
| `/book-appointment/clinic` | Clinic consultation booking (coming soon) |

## Supabase Configuration

The project uses an existing Supabase project. The Supabase URL and anon key are pre-configured.

### Supabase Dashboard Settings to Review

1. **Authentication > Providers > Email**: Ensure Email provider is enabled.
2. **Authentication > Email Templates**: Review the confirmation email and password reset templates.
3. **Authentication > URL Configuration**: Set the Site URL to your deployed domain. Add `http://localhost:3000` for local development.
4. **Email Confirmation**: If email confirmation is enabled, new users will receive a confirmation link. If disabled, users can sign in immediately after signup. The code handles both cases.

## Testing Authentication

### Signup
1. Go to `/signup`
2. Enter your name, email, and a password (min 6 characters)
3. If email confirmation is enabled, you'll see a "Check Your Email" screen. Click the confirmation link in your email, then sign in.
4. If email confirmation is disabled, you'll be signed in immediately and redirected.

### Login
1. Go to `/login`
2. Enter your email and password
3. You'll be redirected to your intended destination (or the homepage)

### Logout
1. Click "Sign Out" in the header navigation

### Password Reset
1. Go to `/forgot-password`
2. Enter your email address
3. Check your email for a password reset link
4. Click the link to be redirected back to the site

### Booking Redirect Flow
1. While logged out, click "Book an Appointment" on the homepage
2. You'll be taken to the booking page with a notice to sign in
3. Click "Sign In" — you'll be redirected to login with the booking page as the redirect destination
4. After signing in, you'll be returned to the booking page

## Stage 1 Scope

This is Stage 1 of a multi-stage build. The following are **not yet implemented**:

- Appointment scheduling and slot management
- Razorpay payments, webhooks, and refunds
- Patient dashboard or admin dashboard
- Daily video consultation rooms
- Prescriptions or patient-document uploads
- Support-ticket database
- Automated reminders
- Amazon SES transactional email
- Google sign-in (email/password only for now)

## License

All content is placeholder until verified. No medical claims should be inferred from this website until credentials and qualifications are confirmed.
