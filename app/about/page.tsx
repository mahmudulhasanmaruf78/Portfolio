import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Mahmudul Hasan Maruf, a web developer and computer science student from Dhaka, Bangladesh.',
}

export default function AboutPage() {
  return <AboutClient />
}
