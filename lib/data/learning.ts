// lib/data/learning.ts

export type CurriculumPhase = {
  phase: string
  topics: string[]
}

export type LearningPath = {
  title: string
  duration: string
  status: string
  curriculum: CurriculumPhase[]
}

export const learningPath: LearningPath = {
  title: "AI Driven Full Stack Web Engineer",
  duration: "6-7 Months",
  status: "In Progress",
  curriculum: [
    {
      phase: "Foundation & Frontend",
      topics: ["HTML5", "CSS3", "ES6+", "TypeScript", "React", "Next.js", "Tailwind CSS", "ShadCN"]
    },
    {
      phase: "Backend & Database",
      topics: ["Node.js", "Express.js", "MongoDB", "Modular Pattern", "API Integration"]
    },
    {
      phase: "Security, Payments & Advanced",
      topics: ["BetterAuth", "RBAC", "Stripe & SSLCommerz", "Testing"]
    },
    {
      phase: "AI Mastery",
      topics: ["AI Mindset Development", "AI Integration", "AI Assisted Coding"]
    }
  ]
}
