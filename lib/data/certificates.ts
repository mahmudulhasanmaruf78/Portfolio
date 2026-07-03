// lib/data/certificates.ts

export type Certificate = {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  credentialUrl?: string
  image: string
  category: string
}

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: '[Name of Certification, e.g., Meta Front-End Developer Professional Certificate]',
    issuer: '[Issuing Organization, e.g., Coursera / Meta]',
    date: '[Month Year]',
    description:
      'A comprehensive program covering the fundamentals of web development, advanced React paradigms, and UX/UI principles, culminating in a capstone project.',
    credentialUrl: '[https://coursera.org/verify/professional-cert/your-id]',
    image: '/placeholder-cert.jpg', // TODO: Replace with real certificate image
    category: 'Web Development',
  },
  {
    id: 'cert-2',
    title: '[Name of Certification, e.g., JavaScript (Basic) Certificate]',
    issuer: '[Issuing Organization, e.g., HackerRank]',
    date: '[Month Year]',
    description:
      'Successfully passed the assessment demonstrating proficiency in core JavaScript concepts, including functions, asynchronous programming, and DOM manipulation.',
    credentialUrl: '[https://hackerrank.com/certificates/your-id]',
    image: '/placeholder-cert.jpg', // TODO: Replace with real certificate image
    category: 'Programming',
  },
  {
    id: 'cert-3',
    title: '[Name of Certification, e.g., Responsive Web Design]',
    issuer: '[Issuing Organization, e.g., freeCodeCamp]',
    date: '[Month Year]',
    description:
      'Completed approximately 300 hours of coursework focused on building accessible, responsive web layouts using modern HTML5, CSS3, and Flexbox/Grid techniques.',
    credentialUrl: '[https://freecodecamp.org/certification/yourusername/responsive-web-design]',
    image: '/placeholder-cert.jpg', // TODO: Replace with real certificate image
    category: 'Web Development',
  },
  {
    id: 'cert-4',
    title: '[Name of Certification, e.g., Crash Course on Python]',
    issuer: '[Issuing Organization, e.g., Google / Coursera]',
    date: '[Month Year]',
    description:
      'Gained foundational knowledge of Python syntax, data structures, and object-oriented programming concepts through hands-on scripting exercises.',
    credentialUrl: '[https://coursera.org/verify/your-id]',
    image: '/placeholder-cert.jpg', // TODO: Replace with real certificate image
    category: 'Programming',
  },
  {
    id: 'cert-5',
    title: '[Name of Certification, e.g., SQL (Basic) Certificate]',
    issuer: '[Issuing Organization, e.g., HackerRank]',
    date: '[Month Year]',
    description:
      'Demonstrated competence in writing SQL queries, performing complex joins, and managing relational data through practical assessments.',
    credentialUrl: '[https://hackerrank.com/certificates/your-id]',
    image: '/placeholder-cert.jpg', // TODO: Replace with real certificate image
    category: 'Database',
  },
]
