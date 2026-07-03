import type { Metadata } from 'next'
import SkillsClient from './SkillsClient'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Rafi Hassan\'s technical skills — Frontend, Backend, Tools, and CS Fundamentals. Honest proficiency levels: Learning, Familiar, and Confident.',
}

export default function SkillsPage() {
  return <SkillsClient />
}
