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

export type Roadmap = {
  quarter: string
  items: string[]
}

export const currentlyLearning: LearningItem[] = [
  {
    id: 'nextjs-advanced',
    topic: 'Next.js Advanced Patterns',
    resource: 'Next.js Docs + Lee Robinson\'s Examples',
    resourceType: 'Docs',
    progress: 70,
    status: 'Active',
    why: 'I want to deeply understand server components, streaming, and parallel routes — not just use them.',
    startedAt: 'May 2025',
  },
  {
    id: 'typescript-deep',
    topic: 'TypeScript: Deep Types',
    resource: 'Matt Pocock — Total TypeScript',
    resourceType: 'Course',
    progress: 45,
    status: 'Active',
    why: 'I can write TypeScript, but I want to understand generics, conditional types, and inference at a level that makes me useful in a real codebase.',
    startedAt: 'April 2025',
  },
  {
    id: 'docker-basics',
    topic: 'Docker & Containerisation',
    resource: 'Docker Documentation + TechWorld with Nana',
    resourceType: 'YouTube',
    progress: 30,
    status: 'Active',
    why: 'Every job listing expects basic Docker knowledge. I want to understand the "why" before memorising commands.',
    startedAt: 'June 2025',
  },
  {
    id: 'dsa-patterns',
    topic: 'DSA Problem Patterns',
    resource: 'Blind 75 + NeetCode on LeetCode',
    resourceType: 'Course',
    progress: 55,
    status: 'Active',
    why: 'Preparing for technical interviews. Focusing on sliding window, two-pointer, BFS/DFS, and DP patterns.',
    startedAt: 'March 2025',
  },
]

export const roadmap: Roadmap[] = [
  {
    quarter: 'Q3 2025 (Current)',
    items: [
      'Complete Total TypeScript',
      'Finish Docker fundamentals',
      'Reach 100 LeetCode problems solved',
      'Ship final year project',
    ],
  },
  {
    quarter: 'Q4 2025',
    items: [
      'Learn GraphQL (Apollo Client + Server)',
      'Build a full-stack project with tRPC',
      'Set up CI/CD with GitHub Actions',
      'Start contributing to an open-source project',
    ],
  },
  {
    quarter: 'Q1 2026',
    items: [
      'Deep dive into testing (Vitest + Playwright)',
      'Learn Redis for caching',
      'Explore edge computing (Cloudflare Workers)',
      'Apply for internship / junior dev positions',
    ],
  },
]
