import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Academic and personal projects by Rafi Hassan — full-stack web apps built with React, Next.js, Node.js, and PostgreSQL.',
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
