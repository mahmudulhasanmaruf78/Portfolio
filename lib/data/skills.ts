// lib/data/skills.ts

export type SkillLevel = 'Learning' | 'Familiar' | 'Confident'

export type Skill = {
  name: string
  level: SkillLevel
  icon?: string
}

export type SkillCategory = {
  category: string
  description: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    description: 'Building interfaces and interactive user experiences',
    skills: [
      { name: 'HTML & CSS', level: 'Confident' },
      { name: 'JavaScript (ES2022+)', level: 'Confident' },
      { name: 'TypeScript', level: 'Familiar' },
      { name: 'React', level: 'Confident' },
      { name: 'Next.js', level: 'Familiar' },
      { name: 'Tailwind CSS', level: 'Confident' },
      { name: 'Framer Motion', level: 'Familiar' },
      { name: 'React Hook Form', level: 'Familiar' },
      { name: 'Zustand', level: 'Familiar' },
    ],
  },
  {
    category: 'Backend',
    description: 'Server-side logic, databases, and APIs',
    skills: [
      { name: 'Node.js', level: 'Familiar' },
      { name: 'Express.js', level: 'Familiar' },
      { name: 'REST API Design', level: 'Familiar' },
      { name: 'PostgreSQL', level: 'Familiar' },
      { name: 'MySQL', level: 'Familiar' },
      { name: 'Firebase / Firestore', level: 'Familiar' },
      { name: 'Prisma ORM', level: 'Learning' },
      { name: 'GraphQL', level: 'Learning' },
    ],
  },
  {
    category: 'Tools & Workflow',
    description: 'Development tools, version control, and deployment',
    skills: [
      { name: 'Git & GitHub', level: 'Confident' },
      { name: 'VS Code', level: 'Confident' },
      { name: 'Vercel', level: 'Familiar' },
      { name: 'Figma', level: 'Familiar' },
      { name: 'Postman', level: 'Familiar' },
      { name: 'Docker (basics)', level: 'Learning' },
      { name: 'Linux CLI', level: 'Familiar' },
      { name: 'npm / pnpm', level: 'Confident' },
    ],
  },
  {
    category: 'CS Fundamentals',
    description: 'Academic foundations and computer science core',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'Familiar' },
      { name: 'Object-Oriented Programming', level: 'Confident' },
      { name: 'Database Systems', level: 'Familiar' },
      { name: 'Operating Systems', level: 'Familiar' },
      { name: 'Computer Networks', level: 'Familiar' },
      { name: 'Software Engineering', level: 'Familiar' },
    ],
  },
]

export const levelColors: Record<SkillLevel, string> = {
  Learning: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Familiar: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Confident: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
}
