'use client'

import { useState, useEffect, MouseEvent, useRef } from 'react'
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ExternalLink, Award, X, ZoomIn, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { certificates, Certificate } from '@/lib/data/certificates'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { cn } from '@/lib/utils'

const allCategories = ['All', ...Array.from(new Set(certificates.map((c) => c.category)))]

// --- Premium Spotlight Card Component ---
function SpotlightCard({ 
  children, 
  onClick,
  ariaLabel,
}: { 
  children: React.ReactNode
  onClick: (trigger: HTMLElement) => void
  ariaLabel: string
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-surface border border-surface-border cursor-pointer transition-all duration-500 hover:border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
      onMouseMove={handleMouseMove}
      onClick={(e) => onClick(e.currentTarget)}
      role="button"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(e.currentTarget)
        }
      }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              hsl(var(--accent) / 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </motion.div>
  )
}

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const filtered =
    activeCategory === 'All'
      ? certificates
      : certificates.filter((c) => c.category === activeCategory)

  const openCertificate = (cert: Certificate, trigger: HTMLElement) => {
    triggerRef.current = trigger
    setSelectedCert(cert)
  }

  const closeCertificate = () => {
    setSelectedCert(null)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCertificate()
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

  useEffect(() => {
    if (selectedCert) {
      closeButtonRef.current?.focus()
    }
  }, [selectedCert])

  return (
    <>
      <Section className="pt-32 pb-0">
        <FadeIn>
          <SectionHeader
            eyebrow="Continuous Learning"
            title="Verified Expertise."
            description="Professional certifications and specialized training I've completed to deepen my technical knowledge."
            className="mb-12"
          />
        </FadeIn>
      </Section>

      <Section>
        {/* Filter tabs */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-10 sm:mb-16" role="tablist" aria-label="Certificate filters">
            {allCategories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 border backdrop-blur-sm',
                  activeCategory === category
                    ? 'border-accent bg-accent/10 text-accent shadow-[0_0_20px_hsl(var(--accent)/0.2)]'
                    : 'border-surface-border bg-surface/50 text-muted-foreground hover:text-foreground hover:bg-surface-hover hover:border-white/20',
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((cert) => (
                <StaggerItem key={cert.id}>
                  <SpotlightCard
                    onClick={(trigger) => openCertificate(cert, trigger)}
                    ariaLabel={`View ${cert.title} credential`}
                  >
                    
                    {/* Image Thumbnail */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-elevated/40 border-b border-surface-border flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-background/50 flex items-center justify-center pointer-events-none">
                        <Award size={64} className="text-muted-foreground/20" strokeWidth={1} />
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-xl">
                          <ZoomIn size={16} /> Inspect Credential
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-10 bg-gradient-to-b from-transparent to-surface/50">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded-md">{cert.category}</span>
                        <span className="text-xs font-medium text-muted-foreground">{cert.date}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground tracking-tight leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
                        {cert.title}
                      </h3>
                      
                      <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <ShieldCheck size={14} className="text-emerald-500/70" />
                        {cert.issuer}
                      </p>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* Premium Glass Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/90 backdrop-blur-xl"
            onClick={closeCertificate}
          >
            <motion.div
              id="cert-modal"
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-full overflow-y-auto bg-surface-elevated/40 border border-white/10 shadow-2xl rounded-3xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-modal-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 sticky top-0 bg-surface/50 backdrop-blur-md z-10">
                <div>
                  <h3 id="cert-modal-title" className="text-xl md:text-2xl font-bold tracking-tight text-foreground">{selectedCert.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-500/70" /> {selectedCert.issuer} <span className="opacity-40">•</span> {selectedCert.date}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={closeCertificate}
                  className="p-3 rounded-full bg-surface hover:bg-surface-hover border border-surface-border text-muted-foreground hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid md:grid-cols-[1fr_400px] gap-0">
                {/* Image Area */}
                <div className="relative aspect-[4/3] md:aspect-auto w-full bg-black/40 flex items-center justify-center p-6 md:p-12">
                   <div className="w-full h-full border border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-muted-foreground gap-4 bg-surface-elevated/20 p-6">
                      <Award size={48} className="opacity-30" strokeWidth={1} />
                      <p className="text-sm font-medium text-center">Verified Credential</p>
                   </div>
                </div>

                {/* Details & CTA */}
                <div className="p-6 md:p-10 flex flex-col bg-surface-elevated/20 border-l border-white/10">
                  <div className="flex-1">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-4">About this credential</h4>
                    <p className="text-base text-muted-foreground leading-relaxed mb-8">
                      {selectedCert.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Category</p>
                        <p className="text-sm font-medium text-foreground">{selectedCert.category}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Date Earned</p>
                        <p className="text-sm font-medium text-foreground">{selectedCert.date}</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedCert.credentialUrl && (
                    <div className="mt-12 pt-8 border-t border-white/10">
                      <a
                        href={selectedCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full gap-2 px-6 py-4 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        Verify Externally <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
