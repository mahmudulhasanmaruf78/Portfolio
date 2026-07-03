// lib/data/skills.ts

export type SkillLevel = 'Learning' | 'Familiar' | 'Confident'

export type Skill = {
  name: string
  level: SkillLevel
}

export type SkillCategory = {
  category: string
  description: string
  skills: Skill[]
}

export const levelColors: Record<SkillLevel, 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple'> = {
  Learning: 'warning',
  Familiar: 'info',
  Confident: 'success',
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend Development',
    description: 'Technologies I use to build responsive, interactive user interfaces.',
    skills: [
      { name: 'React.js', level: 'Confident' },
      { name: 'Next.js (App Router)', level: 'Confident' },
      { name: 'TypeScript', level: 'Confident' },
      { name: 'JavaScript (ES6+)', level: 'Confident' },
      { name: 'Tailwind CSS', level: 'Confident' },
      { name: 'Framer Motion', level: 'Familiar' },
      { name: 'HTML5 & CSS3', level: 'Confident' },
    ],
  },
  {
    category: 'Backend & Databases',
    description: 'Tools for building APIs, managing data, and server-side logic.',
    skills: [
      { name: 'Node.js', level: 'Familiar' },
      { name: 'Express.js', level: 'Familiar' },
      { name: 'PostgreSQL', level: 'Familiar' },
      { name: 'MySQL', level: 'Confident' },
      { name: 'MongoDB', level: 'Learning' },
      { name: 'Prisma ORM', level: 'Familiar' },
      { name: 'REST APIs', level: 'Confident' },
    ],
  },
  {
    category: 'Languages & Core CS',
    description: 'Foundational programming languages and computer science concepts.',
    skills: [
      { name: 'C++', level: 'Confident' },
      { name: 'Java', level: 'Familiar' },
      { name: 'Python', level: 'Familiar' },
      { name: 'Data Structures', level: 'Confident' },
      { name: 'Algorithms', level: 'Familiar' },
      { name: 'Object-Oriented Programming', level: 'Confident' },
    ],
  },
  {
    category: 'Tools & Architecture',
    description: 'Software for version control, deployment, and system design.',
    skills: [
      { name: 'Git & GitHub', level: 'Confident' },
      { name: 'Vercel', level: 'Confident' },
      { name: 'Postman', level: 'Familiar' },
      { name: 'Docker', level: 'Learning' },
      { name: 'Figma', level: 'Familiar' },
      { name: 'System Design Basics', level: 'Learning' },
    ],
  },
]
