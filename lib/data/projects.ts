// lib/data/projects.ts

export type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  stack: string[]
  category: string[]
  role: string
  highlights: string[]
  github: string
  demo: string | null
  status: 'Completed' | 'In Progress' | 'Archived'
  year: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'scholarhub',
    title: 'ScholarHub',
    description:
      'A full-stack student management system for universities — handles course registration, grade tracking, and semester scheduling.',
    longDescription:
      'Built as the capstone project for my Database Systems course, ScholarHub is a multi-role web application serving students, faculty, and admins. It features a normalized relational database schema, role-based access control, and a React dashboard with real-time grade analytics.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'JWT'],
    category: ['Full Stack', 'Web App'],
    role: 'Full Stack Developer (Team of 3)',
    highlights: [
      'Designed a normalized schema for 12 entities — reduced data redundancy significantly',
      'Built JWT-based auth with role-based access (student, faculty, admin)',
      'Implemented a real-time grade analytics dashboard with Chart.js',
      'Followed RESTful API conventions throughout',
    ],
    github: 'https://github.com/rafihassan/scholarhub',
    demo: null,
    status: 'Completed',
    year: '2024',
    featured: true,
  },
  {
    id: 'devshop',
    title: 'DevShop',
    description:
      'A lightweight e-commerce storefront with product browsing, cart management, and a simulated checkout built with Next.js and TypeScript.',
    longDescription:
      'DevShop was my first serious Next.js project — I built it to understand SSR, ISR, and the App Router end to end. The product catalogue uses static generation for fast loads, and the cart state is managed with Zustand. No real payments — Stripe test mode only.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Stripe (Test)', 'Vercel'],
    category: ['Frontend', 'Full Stack'],
    role: 'Solo Developer',
    highlights: [
      'Used Next.js ISR for product pages — sub-100ms TTFB on Vercel',
      'Implemented cart persistence with localStorage + Zustand',
      'Added Stripe test checkout with webhook simulation',
      'Fully responsive — designed mobile-first',
    ],
    github: 'https://github.com/rafihassan/devshop',
    demo: 'https://devshop-rafi.vercel.app',
    status: 'Completed',
    year: '2024',
    featured: true,
  },
  {
    id: 'taskflow',
    title: 'TaskFlow',
    description:
      'A Kanban-style project management board with drag-and-drop task management, team collaboration features, and activity logs.',
    longDescription:
      'TaskFlow started as a simple to-do app and grew into a collaborative project board. I learned a great deal about optimistic UI updates, real-time state synchronization, and how to structure complex React component trees without prop drilling.',
    stack: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'dnd-kit'],
    category: ['Frontend', 'Web App'],
    role: 'Solo Developer',
    highlights: [
      'Implemented drag-and-drop with dnd-kit — accessible by keyboard too',
      'Used Firestore real-time listeners for multi-user collaboration',
      'Built an activity log system that tracks all board mutations',
      'Optimistic UI updates for instant response feel',
    ],
    github: 'https://github.com/rafihassan/taskflow',
    demo: 'https://taskflow-rafi.vercel.app',
    status: 'Completed',
    year: '2024',
    featured: true,
  },
  {
    id: 'weatherwise',
    title: 'WeatherWise',
    description:
      'A weather dashboard that visualises 7-day forecasts, hourly charts, and air quality indices using the OpenWeather API.',
    longDescription:
      'A deep-dive into API integration, data visualisation, and working with asynchronous JavaScript. WeatherWise fetches geolocation data, maps it to weather forecasts, and displays everything in an accessible, clean interface.',
    stack: ['React', 'TypeScript', 'Recharts', 'OpenWeather API', 'CSS Modules'],
    category: ['Frontend', 'API Integration'],
    role: 'Solo Developer',
    highlights: [
      'Integrated OpenWeather One Call API for hourly and weekly data',
      'Built responsive charts with Recharts for temperature and humidity trends',
      'Used browser Geolocation API with a manual city search fallback',
      'Reduced API calls with a 10-minute client-side cache',
    ],
    github: 'https://github.com/rafihassan/weatherwise',
    demo: 'https://weatherwise-rafi.vercel.app',
    status: 'Completed',
    year: '2023',
    featured: false,
  },
  {
    id: 'blogcms',
    title: 'BlogCMS',
    description:
      'A headless CMS-powered blog platform with markdown authoring, tagging, search, and RSS feed generation.',
    longDescription:
      'An exploration of the Jamstack architecture and headless CMS concepts. Content is authored in Contentful, transformed at build time with Next.js, and served as static HTML. Taught me a lot about content modelling, build pipelines, and static site generation.',
    stack: ['Next.js', 'TypeScript', 'Contentful', 'Tailwind CSS', 'next-mdx-remote'],
    category: ['Full Stack', 'CMS'],
    role: 'Solo Developer',
    highlights: [
      'Built a content model in Contentful for posts, tags, and authors',
      'Implemented full-text search with a client-side index (FlexSearch)',
      'Generated RSS feed at build time for feed reader compatibility',
      'Added OG image generation per post using @vercel/og',
    ],
    github: 'https://github.com/rafihassan/blogcms',
    demo: null,
    status: 'Archived',
    year: '2023',
    featured: false,
  },
  {
    id: 'expensetracker',
    title: 'ExpenseTracker',
    description:
      'A personal finance tracker with income/expense logging, category breakdowns, and monthly trend visualisation.',
    longDescription:
      'My first React + local storage project that evolved into a proper app with indexed data, chart visualisations, and CSV export. This taught me state management fundamentals and data modelling without a backend.',
    stack: ['React', 'JavaScript', 'Chart.js', 'CSS Modules'],
    category: ['Frontend', 'Web App'],
    role: 'Solo Developer',
    highlights: [
      'Built from scratch without any component library',
      'Implemented CSV export for expense data',
      'Monthly trend charts with Chart.js',
      'All data persisted in localStorage with versioned schema',
    ],
    github: 'https://github.com/rafihassan/expense-tracker',
    demo: 'https://expensetracker-rafi.vercel.app',
    status: 'Completed',
    year: '2023',
    featured: false,
  },
]
