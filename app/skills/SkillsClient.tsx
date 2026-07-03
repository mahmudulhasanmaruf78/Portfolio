'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillCategories, levelColors, type SkillLevel } from '@/lib/data/skills'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

const levelVariantMap: Record<SkillLevel, 'learning' | 'familiar' | 'confident'> = {
  Learning: 'learning',
  Familiar: 'familiar',
  Confident: 'confident',
}

export default function SkillsClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const categories = ['All', ...skillCategories.map((c) => c.category)]

  const filtered =
    activeCategory === 'All'
      ? skillCategories
      : skillCategories.filter((c) => c.category === activeCategory)

  return (
    <>
      <Section className="pt-32 pb-0">
        <FadeIn>
          <SectionHeader
            eyebrow="Technical Arsenal"
            title="What I know — honestly."
            description={
              <>
                I use three levels to describe my skills:{' '}
                <span className="text-warning font-medium">Learning</span> (actively studying),{' '}
                <span className="text-info font-medium">Familiar</span> (built projects with it), and{' '}
                <span className="text-success font-medium">Confident</span> (comfortable and consistent).
                No inflated percentages.
              </>
            }
          />
        </FadeIn>
      </Section>

      <Section className="pb-0">
        {/* Category tabs */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Skill categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
                  activeCategory === cat
                    ? 'border-accent/40 bg-accent/10 text-accent shadow-[0_0_15px_hsl(var(--accent)/0.15)]'
                    : 'border-surface-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-hover hover:border-white/20',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-16"
          >
            {filtered.map((category) => (
              <div key={category.category} className="relative">
                <div className="mb-6 flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
                  <h2 className="text-2xl font-semibold text-foreground tracking-tight">{category.category}</h2>
                  <p className="text-sm text-muted-foreground md:pb-1">{category.description}</p>
                </div>
                
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.skills.map((skill) => {
                    const percentage = skill.level === 'Confident' ? 90 : skill.level === 'Familiar' ? 65 : 35
                    return (
                      <div
                        key={skill.name}
                        className="group flex flex-col p-4 rounded-xl border border-surface-border bg-surface shadow-sm transition-all duration-200 hover:border-white/20 hover:bg-surface-hover hover:shadow-card-hover"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{skill.name}</span>
                          <Badge variant={levelVariantMap[skill.level]} dot>
                            {skill.level}
                          </Badge>
                        </div>
                        <div className="h-1.5 w-full bg-surface-elevated rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="h-full bg-accent/80 rounded-full"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* Honest note */}
      <Section>
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-warning-border bg-warning-subtle p-8 max-w-2xl">
            {/* Glow effect */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-warning/20 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-warning/20 text-warning">
                  !
                </span>
                <p className="text-sm font-semibold uppercase tracking-wider text-warning">
                  A note on honesty
                </p>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed mt-2">
                Every skill listed here is something I've actively used in a project or coursework —
                not something I watched a 10-minute intro video about. The levels reflect where I genuinely
                am today, not where I aspire to be.
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  )
}
