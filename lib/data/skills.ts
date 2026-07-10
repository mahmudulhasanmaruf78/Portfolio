// lib/data/skills.ts
import { IconType } from 'react-icons'
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiFramer, 
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiCplusplus,
  SiPython,
  SiGit,
  SiVercel,
  SiPostman,
  SiDocker,
  SiFigma
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { TbApi, TbBinaryTree, TbMathFunction, TbCube, TbSchema } from 'react-icons/tb'

export type SkillLevel = 'Learning' | 'Familiar' | 'Confident'

export type Skill = {
  name: string
  level: SkillLevel
  icon: IconType
  color: string
}

export type SkillCategory = {
  category: string
  description: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend Development',
    description: 'Technologies I use to build responsive, interactive user interfaces.',
    skills: [
      { name: 'React.js', level: 'Confident', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', level: 'Confident', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'TypeScript', level: 'Confident', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', level: 'Confident', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Tailwind CSS', level: 'Confident', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', level: 'Familiar', icon: SiFramer, color: '#0055FF' },
      { name: 'HTML5 & CSS3', level: 'Confident', icon: SiHtml5, color: '#E34F26' },
    ],
  },
  {
    category: 'Backend & Databases',
    description: 'Tools for building APIs, managing data, and server-side logic.',
    skills: [
      { name: 'Node.js', level: 'Familiar', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', level: 'Familiar', icon: SiExpress, color: '#ffffff' },
      { name: 'PostgreSQL', level: 'Familiar', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', level: 'Confident', icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', level: 'Learning', icon: SiMongodb, color: '#47A248' },
      { name: 'Prisma ORM', level: 'Familiar', icon: SiPrisma, color: '#5A67D8' },
      { name: 'REST APIs', level: 'Confident', icon: TbApi, color: '#FF6C37' },
    ],
  },
  {
    category: 'Languages & Core CS',
    description: 'Foundational programming languages and computer science concepts.',
    skills: [
      { name: 'C++', level: 'Confident', icon: SiCplusplus, color: '#00599C' },
      { name: 'Java', level: 'Familiar', icon: FaJava, color: '#007396' },
      { name: 'Python', level: 'Familiar', icon: SiPython, color: '#3776AB' },
      { name: 'Data Structures', level: 'Confident', icon: TbBinaryTree, color: '#10B981' },
      { name: 'Algorithms', level: 'Familiar', icon: TbMathFunction, color: '#F59E0B' },
      { name: 'OOP', level: 'Confident', icon: TbCube, color: '#8B5CF6' },
    ],
  },
  {
    category: 'Tools & Architecture',
    description: 'Software for version control, deployment, and system design.',
    skills: [
      { name: 'Git & GitHub', level: 'Confident', icon: SiGit, color: '#F05032' },
      { name: 'Vercel', level: 'Confident', icon: SiVercel, color: '#ffffff' },
      { name: 'Postman', level: 'Familiar', icon: SiPostman, color: '#FF6C37' },
      { name: 'Docker', level: 'Learning', icon: SiDocker, color: '#2496ED' },
      { name: 'Figma', level: 'Familiar', icon: SiFigma, color: '#F24E1E' },
      { name: 'System Design', level: 'Learning', icon: TbSchema, color: '#EC4899' },
    ],
  },
]
