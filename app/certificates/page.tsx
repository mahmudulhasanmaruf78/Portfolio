'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Award } from 'lucide-react'
import { certificates } from '@/lib/data/certificates'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { cn } from '@/lib/utils'

const allCategories = ['All', ...Array.from(new Set(certificates.map((c) => c.category)))]

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? certificates
      : certificates.filter((c) => c.category === activeCategory)

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
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((cert) => (
                <StaggerItem key={cert.id}>
                  <div className="card-hover group flex h-full flex-col p-6 cursor-default">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-elevated border border-surface-border shadow-sm group-hover:border-accent/30 group-hover:bg-accent/5 transition-colors">
                        <Award size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                      <span className="tag px-2 py-1 text-[10px]">{cert.category}</span>
                    </div>

                    <h3 className="text-base font-semibold text-foreground tracking-tight leading-snug mb-2 group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                    
                    <p className="text-sm font-medium text-muted-foreground mb-4">
                      {cert.issuer}
                    </p>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                      {cert.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-surface-border">
                      <span className="text-xs font-medium text-muted-foreground">
                        {cert.date}
                      </span>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Verify ${cert.title}`}
                          className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                        >
                          Verify <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </Section>
    </>
  )
}
