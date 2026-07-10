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
    id: 'it-essentials',
    title: 'IT Essentials',
    issuer: 'Cisco Networking Academy',
    date: '26 Dec 2022',
    description: 'Completed the IT Essentials course covering fundamental computer hardware, software, and networking concepts. Demonstrated practical skills in troubleshooting, configuring, and securing computer systems and networks.',
    credentialUrl: '/MAHMUDUL_HASANMARUF-Introduction_to_-certificate.pdf',
    image: '/images/Certificate/cisco.jpeg',
    category: 'IT Support & Networking',
  }
]
