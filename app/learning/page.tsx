'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { BookOpen, Target, CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import { currentlyLearning, roadmap } from '@/lib/data/learning'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

function ProgressBar({ progress, title }: { progress: number; title: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isInView) {
      // Small delay for better visual effect
      const timer = setTimeout(() => setWidth(progress), 300)
      return () => clearTimeout(timer)
    }
  }, [isInView, progress])

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-xs font-medium text-muted-foreground group-hover:text-accent transition-colors">{progress}%</span>
      </div>
      <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden border border-surface-border/50 shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent/80 to-accent relative"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
    </div>
  )
}

export default function LearningPage() {
  return (
    <>
      <Section className="pt-32 pb-0">
        <FadeIn>
          <SectionHeader
            eyebrow="Currently Learning"
            title="Always a student."
            description="Technology moves fast. Here's what I'm actively studying right now and what I plan to tackle next."
            className="mb-12"
          />
        </FadeIn>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Active Learning Topics */}
          <div>
            <FadeIn>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-8 border-b border-surface-border pb-4">
                <BookOpen size={18} className="text-accent" /> Active Focus
              </h3>
            </FadeIn>
            <StaggerContainer className="grid gap-6">
              {currentlyLearning.map((item) => (
                <StaggerItem key={item.id}>
                  <div className="card-hover p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-semibold text-foreground">{item.topic}</h4>
                      <Badge variant={item.resourceType === 'Course' ? 'info' : item.resourceType === 'Book' ? 'warning' : 'purple'}>
                        {item.resourceType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      <strong className="text-foreground/80 font-medium">Resource:</strong> {item.resource}
                    </p>
                    <ProgressBar progress={item.progress} title="Completion" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Roadmap */}
          <div>
            <FadeIn>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-8 border-b border-surface-border pb-4">
                <Target size={18} className="text-accent" /> Developer Roadmap
              </h3>
            </FadeIn>
            <StaggerContainer className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-accent/50 via-surface-border to-transparent" />
              
              <div className="space-y-10">
                {roadmap.map((phase) => (
                  <StaggerItem key={phase.quarter}>
                    <div className="relative group">
                      {/* Timeline Dot */}
                      <div className="absolute -left-8 top-1 flex h-4 w-4 items-center justify-center bg-background">
                        {phase.quarter.includes('Current') ? (
                          <div className="h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20 animate-pulse" />
                        ) : (
                          <Circle size={12} className="text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className={cn(
                        "transition-all duration-200 p-5 rounded-xl border border-transparent hover:border-surface-border hover:bg-surface-elevated/30",
                        phase.quarter.includes('Current') && "border-surface-border bg-surface-elevated/10"
                      )}>
                        <div className="flex items-center gap-3 mb-4">
                          <h4 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                            {phase.quarter}
                          </h4>
                          {phase.quarter.includes('Current') && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-accent/10 text-accent border-accent/20">
                              Active
                            </span>
                          )}
                        </div>
                        <ul className="space-y-3">
                          {phase.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-surface-border" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </div>
      </Section>
      
      {/* Newsletter / Motivation block */}
      <Section className="pb-24">
        <FadeIn>
          <div className="card-glass p-8 md:p-12 text-center relative overflow-hidden">
             {/* Glows */}
             <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-accent/10 blur-[80px] pointer-events-none" />
             
             <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface border border-surface-border shadow-sm mb-6">
                 <ArrowRight size={20} className="text-accent" />
               </div>
               <h3 className="text-2xl font-semibold text-foreground tracking-tight mb-4">
                 The goal is mastery, not completion.
               </h3>
               <p className="text-base text-muted-foreground leading-relaxed">
                 I firmly believe that the best engineers are lifelong learners. The tools and frameworks will change, but the fundamentals and problem-solving skills remain.
               </p>
             </div>
          </div>
        </FadeIn>
      </Section>
    </>
  )
}
