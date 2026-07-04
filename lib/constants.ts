// lib/constants.ts

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Education', href: '/education' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Learning', href: '/learning' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
]

export const SOCIAL_LINKS = {
  github: 'https://github.com/mahmudulhasanmaruf78',
  linkedin: 'https://linkedin.com/in/mahmudulhasanmaruf78',
  email: 'mahmudulhasanmaruf78@gmail.com',
}

export const SITE_META = {
  name: 'Mahmudul Hasan Maruf',
  title: 'Mahmudul Hasan Maruf - CS&E Student & Aspiring Web Developer',
  description:
    'Final year Computer Science & Engineering student at AIUB. Building web experiences with React, Next.js, and TypeScript. Open to internships and junior developer roles.',
  // Set NEXT_PUBLIC_SITE_URL in production so sitemap, robots, and OG tags use the canonical URL.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  ogImage: '/og-image.png',
}
