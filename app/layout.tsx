import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SITE_META } from '@/lib/constants'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { BackToTop } from '@/components/ui/BackToTop'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuroraBackground } from '@/components/ui/AuroraBackground'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_META.url),
  title: {
    default: SITE_META.title,
    template: `%s · ${SITE_META.name}`,
  },
  description: SITE_META.description,
  keywords: [
    'Mahmudul Hasan Maruf',
    'CS student portfolio',
    'web developer Bangladesh',
    'React developer intern',
    'Next.js developer',
    'AIUB CSE student',
    'junior web developer',
  ],
  authors: [{ name: SITE_META.name }],
  creator: SITE_META.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_META.url,
    title: SITE_META.title,
    description: SITE_META.description,
    siteName: SITE_META.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_META.title,
    description: SITE_META.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // `dark` class here = default aurora theme on first paint (before client JS runs)
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased relative">
        <ThemeProvider>
          {/* Aurora gradient blobs — fixed behind all content, dark-mode only */}
          <AuroraBackground />

          <ScrollProgress />
          <Navbar />
          <main id="main-content" tabIndex={-1} className="relative z-10">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}

