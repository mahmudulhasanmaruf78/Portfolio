# Mahmudul Hasan Maruf - Portfolio

A modern, responsive portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Forms:** React Hook Form + Zod
- **Email:** Nodemailer over SMTP

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

On Windows PowerShell, script execution policy may block `npm.ps1`. If that happens, run scripts through `npm.cmd` instead:

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
npm.cmd run type-check
```

## Project Structure & Updating Data

All personal portfolio data lives in `lib/data/` so content can be updated without touching most UI code:

- `lib/constants.ts`: Global constants like name, social links, and site metadata.
- `lib/data/profile.ts`: Bio, tagline, CGPA, and core stats.
- `lib/data/projects.ts`: Featured and side projects.
- `lib/data/certificates.ts`: Certifications and achievements.
- `lib/data/education.ts`: Academic history.
- `lib/data/skills.ts`: Technical skills categorized by level.
- `lib/data/learning.ts`: Current study topics and future roadmap.

To add a new project, append a new object to the `projects` array in `lib/data/projects.ts`, add the project screenshot to `/public`, and reference it in `coverImage` and `gallery`.

## Missing Assets

Replace the placeholder assets and placeholder data before final deployment:

- `/public/resume.pdf` - Your actual PDF resume.
- `/public/favicon.ico` - A 32x32 browser tab icon.
- `/public/og-image.png` - A 1200x630 social preview image.
- `/placeholder-project.svg` references in `lib/data/projects.ts` - Real project screenshots.
- `/placeholder-cert.jpg` references in `lib/data/certificates.ts` - Real certificate images.

## Contact Form

The contact form posts to `/api/contact`. It validates input with Zod, uses a hidden honeypot field for lightweight spam protection, and sends email through Nodemailer.

Copy `.env.example` to `.env.local` and configure:

```bash
CONTACT_TO_EMAIL=mahmudulhasanmaruf78@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here
```

## Deployment

The easiest deployment path is [Vercel](https://vercel.com/new).

1. Push the code to GitHub.
2. Import the repository in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to the production URL.
4. Configure the contact form environment variables.
5. Deploy.

## Validation

CI runs the same basic checks expected locally:

```bash
npm run lint
npm run build
npm run type-check
```

Run `build` before standalone `type-check` in fresh environments because Next.js generates `.next/types` during build.
