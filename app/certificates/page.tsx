'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Award, X, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { certificates, Certificate } from '@/lib/data/certificates'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { cn } from '@/lib/utils'

const allCategories = ['All', ...Array.from(new Set(certificates.map((c) => c.category)))]

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)

  const filtered =
    activeCategory === 'All'
      ? certificates
      : certificates.filter((c) => c.category === activeCategory)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedCert])

  return (
    <>
      <Section className="pt-32 pb-0">
        <FadeIn>
          <SectionHeader
            eyebrow="Continuous Learning"
            title="Verified expertise."
            description="Certifications and specialized training I've completed to deepen my technical knowledge."
            className="mb-8"
          />
        </FadeIn>
      </Section>

      <Section>
        {/* Filter tabs */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Certificate filters">
            {allCategories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
                  activeCategory === category
                    ? 'border-accent/40 bg-accent/10 text-accent shadow-[0_0_15px_hsl(var(--accent)/0.15)]'
                    : 'border-surface-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-hover hover:border-white/20',
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Certificates grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((cert) => (
                <StaggerItem key={cert.id}>
                  <div 
                    className="card-hover group flex h-full flex-col overflow-hidden cursor-pointer bg-surface/50 border border-surface-border"
                    onClick={() => setSelectedCert(cert)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${cert.title}`}
                    onKeyDown={(e) => { if (e.key === 'Enter') setSelectedCert(cert) }}
                  >
                    {/* Image Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-surface-elevated/50 border-b border-surface-border">
                      {/* Using a regular div with gradient for placeholder. If real images are used, uncomment Image component */}
                      <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-background flex items-center justify-center">
                        <Award size={48} className="text-muted-foreground/30" />
                      </div>
                      {/* <Image 
                        src={cert.image} 
                        alt={cert.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      /> */}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <span className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <ZoomIn size={16} /> View Certificate
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className="tag px-2 py-1 text-[10px]">{cert.category}</span>
                        <span className="text-xs font-medium text-muted-foreground">{cert.date}</span>
                      </div>

                      <h3 className="text-base font-semibold text-foreground tracking-tight leading-snug mb-1 group-hover:text-accent transition-colors">
                        {cert.title}
                      </h3>
                      
                      <p className="text-sm font-medium text-muted-foreground mb-4">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-surface border border-surface-border shadow-modal rounded-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-surface-border sticky top-0 bg-surface/80 backdrop-blur z-10">
                <div>
                  <h3 className="font-semibold text-foreground">{selectedCert.title}</h3>
                  <p className="text-xs text-muted-foreground">{selectedCert.issuer} • {selectedCert.date}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-lg hover:bg-surface-hover text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Image Area */}
              <div className="relative aspect-video w-full bg-surface-elevated/50 flex items-center justify-center border-b border-surface-border p-8">
                 <div className="w-full h-full border-2 border-dashed border-surface-border rounded-xl flex flex-col items-center justify-center text-muted-foreground gap-4">
                    <Award size={64} className="opacity-20" />
                    <p className="text-sm font-medium">Image Placeholder</p>
                    <p className="text-xs max-w-xs text-center opacity-60">
                      Replace this area with an actual `next/image` component pointing to your certificate image path.
                    </p>
                 </div>
              </div>

              {/* Details & CTA */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="max-w-2xl">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">About this credential</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>
                
                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all font-medium text-sm"
                  >
                    Verify Credential <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
