import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Rafi Hassan, a web developer and computer science student from Dhaka, Bangladesh.',
}

export default function AboutPage() {
  return <AboutClient />
}
