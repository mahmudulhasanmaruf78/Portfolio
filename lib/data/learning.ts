// lib/data/learning.ts

export type LearningItem = {
  id: string
  topic: string
  resource: string
  resourceType: 'Course' | 'Book' | 'Docs' | 'YouTube' | 'Project'
  progress: number // 0–100
  status: 'Active' | 'Paused'
  why: string
  startedAt: string
}

export type RoadmapPhase = {
  quarter: string
  items: string[]
}

export const currentlyLearning: LearningItem[] = [
  {
    id: 'programming-hero-fullstack',
    topic: 'AI Driven Full Stack Web Engineer',
    resource: 'Programming Hero (Structured Bootcamp)',
    resourceType: 'Course',
    progress: 85,
    status: 'Active',
    why: 'Pursuing a comprehensive, structured curriculum to bridge the gap between academic theory and industry-standard full-stack web development practices.',
    startedAt: 'Jan 2025',
  },
  {
    id: 'nextjs-architecture',
    topic: 'Next.js App Router & Architecture',
    resource: 'Next.js Official Documentation & Vercel Blogs',
    resourceType: 'Docs',
    progress: 75,
    status: 'Active',
    why: 'Aiming to deeply understand React Server Components, streaming, and advanced routing patterns to build performant web applications.',
    startedAt: 'May 2025',
  },
  {
    id: 'advanced-typescript',
    topic: 'Advanced TypeScript Patterns',
    resource: 'Total TypeScript by Matt Pocock',
    resourceType: 'Course',
    progress: 50,
    status: 'Active',
    why: 'Transitioning from basic type definitions to mastering generics and complex type inference to write safer, self-documenting code.',
    startedAt: 'April 2025',
  },
  {
    id: 'docker-fundamentals',
    topic: 'Docker & Containerization',
    resource: 'TechWorld with Nana (YouTube) & Official Docs',
    resourceType: 'YouTube',
    progress: 35,
    status: 'Active',
    why: 'Containerization is an essential industry standard. I want to build a solid mental model of how images and containers function before automating deployments.',
    startedAt: 'June 2025',
  },
  {
    id: 'dsa-interview-prep',
    topic: 'DSA & Interview Preparation',
    resource: 'LeetCode (Blind 75 & NeetCode 150)',
    resourceType: 'Course',
    progress: 60,
    status: 'Active',
    why: 'Actively preparing for technical interviews by focusing on pattern recognition (sliding window, two pointers, dynamic programming) rather than rote memorization.',
    startedAt: 'March 2025',
  },
]

export const roadmap: RoadmapPhase[] = [
  {
    quarter: 'Q3 2025 (Current)',
    items: [
      'Master advanced TypeScript concepts and strict type checking.',
      'Attain fundamental proficiency with Docker and containerized workflows.',
      'Solve 150+ algorithmic problems on LeetCode focusing on core patterns.',
      'Architect and deploy the final-year capstone engineering project.',
    ],
  },
  {
    quarter: 'Q4 2025',
    items: [
      'Explore GraphQL implementations using Apollo Client and Server.',
      'Develop a full-stack, end-to-end type-safe application utilizing tRPC.',
      'Implement automated CI/CD pipelines using GitHub Actions.',
      'Contribute meaningful pull requests to recognized open-source projects.',
    ],
  },
  {
    quarter: 'Q1 2026',
    items: [
      'Deep dive into automated testing methodologies (Vitest & Playwright).',
      'Integrate Redis for advanced caching strategies in backend services.',
      'Investigate edge computing paradigms with Cloudflare Workers.',
      'Actively interview for full-time junior software engineering positions.',
    ],
  },
]
