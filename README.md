# Mahmudul Hasan Maruf - Portfolio

A modern, responsive portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Forms:** React Hook Form + Zod

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure & Updating Data

All of your personal data is stored in the `lib/data/` directory. You can easily update your portfolio by modifying these files without touching any UI code:

- `lib/constants.ts`: Global constants like your name, social links, and site metadata.
- `lib/data/profile.ts`: Your bio, tagline, CGPA, and core stats.
- `lib/data/projects.ts`: Your featured and side projects.
- `lib/data/certificates.ts`: Your certifications and achievements.
- `lib/data/education.ts`: Your academic history.
- `lib/data/skills.ts`: Your technical skills categorized by level.
- `lib/data/learning.ts`: What you are currently studying and your future roadmap.

**To add a new project:**
Open `lib/data/projects.ts` and append a new object to the `projects` array following the existing type structure. Add your project screenshot to the `/public` folder and reference it in the `coverImage` property.

## 🖼️ Missing Assets (TODO)

Make sure to replace the placeholder assets in the `/public` folder with your actual files:
- `/public/resume.pdf` - Your actual PDF resume.
- `/public/favicon.ico` - A 32x32 icon for the browser tab.
- `/public/og-image.png` - A 1200x630 image for social media link previews.
- Replace any `/placeholder-project.svg` or `/placeholder-cert.jpg` references in the data files with real screenshots.

## 📧 Contact Form

The contact form is currently routed to `/api/contact/route.ts`. To make it fully functional and send real emails to your inbox, you need to:
1. Open `app/api/contact/route.ts`.
2. Uncomment the `nodemailer` code.
3. Add your SMTP credentials to a `.env.local` file (or Vercel Environment Variables).

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Go to Vercel and import your repository.
3. Configure your Environment Variables (for the contact form).
4. Click Deploy!
