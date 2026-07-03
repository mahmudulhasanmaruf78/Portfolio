// lib/data/certificates.ts

export type Certificate = {
  id: string
  title: string
  issuer: string
  date: string
  credentialUrl: string
  category: string
  description: string
}

export const certificates: Certificate[] = [
  {
    id: 'meta-frontend',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta / Coursera',
    date: 'March 2024',
    credentialUrl: 'https://coursera.org/verify/professional-cert/example',
    category: 'Web Development',
    description:
      '9-course series covering HTML, CSS, JavaScript, React, and version control. Built a capstone project as a front-end developer.',
  },
  {
    id: 'cs50x',
    title: 'CS50x: Introduction to Computer Science',
    issuer: 'Harvard University / edX',
    date: 'November 2023',
    credentialUrl: 'https://cs50.harvard.edu/certificates/example',
    category: 'Computer Science',
    description:
      "Harvard's legendary intro course covering C, Python, SQL, data structures, and web development. Completed all problem sets and a final project.",
  },
  {
    id: 'fcc-js',
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: 'August 2023',
    credentialUrl: 'https://freecodecamp.org/certification/rafihassan/javascript',
    category: 'Programming',
    description:
      '300+ hours of JavaScript fundamentals, ES6+, regular expressions, debugging, data structures, and algorithm scripting.',
  },
  {
    id: 'fcc-responsive',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'May 2023',
    credentialUrl: 'https://freecodecamp.org/certification/rafihassan/responsive-web-design',
    category: 'Web Development',
    description:
      'Completed 300 hours of HTML, CSS, CSS Flexbox, CSS Grid, responsive design principles, and 5 certification projects.',
  },
  {
    id: 'google-ux',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google / Coursera',
    date: 'January 2024',
    credentialUrl: 'https://coursera.org/verify/professional-cert/google-ux',
    category: 'Design',
    description:
      "7-course certificate covering UX research, wireframing, prototyping in Figma, and usability testing. Informed my understanding of design-developer collaboration.",
  },
  {
    id: 'nextjs-vercel',
    title: 'Next.js Foundation & App Router',
    issuer: 'Vercel / Next.js Learn',
    date: 'June 2024',
    credentialUrl: 'https://nextjs.org/learn/certificate/example',
    category: 'Web Development',
    description:
      'Official Next.js learning path — covered the App Router, server components, streaming, data fetching patterns, and deployment on Vercel.',
  },
  {
    id: 'git-github',
    title: 'Git and GitHub Fundamentals',
    issuer: 'GitHub / Microsoft Learn',
    date: 'February 2023',
    credentialUrl: 'https://learn.microsoft.com/en-us/training/achievements/example',
    category: 'Tools',
    description:
      'Covered version control fundamentals, branching strategies, pull request workflows, GitHub Actions basics, and collaborative development patterns.',
  },
  {
    id: 'sql-basics',
    title: 'SQL for Data Science',
    issuer: 'UC Davis / Coursera',
    date: 'September 2023',
    credentialUrl: 'https://coursera.org/verify/sql-example',
    category: 'Database',
    description:
      'Foundational SQL course covering queries, joins, subqueries, aggregation, and data manipulation. Complemented my Database Systems coursework at AIUB.',
  },
]
