'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, ArrowRight, Code2 } from 'lucide-react'
import { GithubIcon } from '@/components/ui/Icons'
import { projects, type Project } from '@/lib/data/projects'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/ui/Animations'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.category)))]

export default function ProjectsClient() {
  const [activeTag, setActiveTag] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered =
    activeTag === 'All' ? projects : projects.filter((p) => p.category.includes(activeTag))

  return (
    <>
      <Section className="pt-32 pb-0">
        <FadeIn>
          <SectionHeader
            eyebrow="Academic & Personal Work"
            title="Projects I've built."
            description="A collection of web applications, experiments, and university assignments that demonstrate my technical growth."
            className="mb-8"
          />
        </FadeIn>
      </Section>

      <Section>
        {/* Filter tabs */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Project filters">
            {allTags.map((tag) => (
              <button
                key={tag}
                role="tab"
                aria-selected={activeTag === tag}
                onClick={() => setActiveTag(tag)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
                  activeTag === tag
                    ? 'border-accent/40 bg-accent/10 text-accent shadow-[0_0_15px_hsl(var(--accent)/0.15)]'
                    : 'border-surface-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-hover hover:border-white/20',
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <StaggerItem key={project.id}>
                  <div
                    className="card-hover group relative flex h-full flex-col p-6 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedProject(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
                    aria-label={`View details for ${project.title}`}
                  >
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-elevated border border-surface-border shadow-sm">
                          <Code2 size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                        </div>
                        <Badge
                          variant={project.status === 'In Progress' ? 'learning' : project.status === 'Archived' ? 'muted' : 'confident'}
                          className="shrink-0"
                          dot
                        >
                          {project.status}
                        </Badge>
                      </div>

                      <div className="mb-2">
                        <h2 className="text-xl font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-xs font-medium text-muted-foreground mt-1">
                          {project.year} <span className="mx-1.5 opacity-50">•</span> {project.role}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.stack.slice(0, 3).map((tech) => (
                            <span key={tech} className="tag text-[10px] px-2 py-0.5">{tech}</span>
                          ))}
                          {project.stack.length > 3 && (
                            <span className="tag text-[10px] px-2 py-0.5 bg-surface-border text-foreground">
                              +{project.stack.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between border-t border-surface-border pt-4">
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors flex items-center gap-1">
                            View details 
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                          </span>
                          <div className="flex items-center gap-2">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`${project.title} GitHub`}
                                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-hover hover:text-foreground transition-colors"
                              >
                                <GithubIcon size={16} />
                              </a>
                            )}
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`${project.title} live demo`}
                                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-hover hover:text-foreground transition-colors"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
              className="fixed inset-x-4 top-[5%] md:top-[10%] z-50 max-w-2xl mx-auto flex flex-col max-h-[90dvh] md:max-h-[80dvh] bg-surface border border-surface-border rounded-2xl shadow-modal overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 p-6 border-b border-surface-border bg-surface-elevated/50">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-semibold text-foreground tracking-tight">{selectedProject.title}</h2>
                    <Badge variant={selectedProject.status === 'In Progress' ? 'learning' : selectedProject.status === 'Archived' ? 'muted' : 'confident'}>
                      {selectedProject.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {selectedProject.year} <span className="mx-1.5 opacity-50">•</span> {selectedProject.role}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close modal"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-elevated border border-surface-border text-muted-foreground hover:bg-surface-hover hover:text-foreground transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6 md:p-8">
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4 mt-0">
                    Overview
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-8">
                    {selectedProject.longDescription}
                  </p>

                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                    Key Learnings & Features
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {selectedProject.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.stack.map((tech) => (
                      <span key={tech} className="skill-pill py-1.5 px-3">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-surface-border bg-surface-elevated/50 flex flex-wrap gap-3">
                {selectedProject.github && (
                  <Button
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                  >
                    <GithubIcon size={16} /> View Source
                  </Button>
                )}
                {selectedProject.demo && (
                  <Button
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} /> Visit Live Site
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
