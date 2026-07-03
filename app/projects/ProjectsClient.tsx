'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, ArrowRight, Code2 } from 'lucide-react'
import { GithubIcon } from '@/components/ui/Icons'
import { projects } from '@/lib/data/projects'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export default function ProjectsClient() {
  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <>
      <Section className="pt-32 pb-16">
        <FadeIn>
          <SectionHeader
            eyebrow="Case Studies"
            title="Featured Work."
            description="Deep dives into the architecture, challenges, and solutions behind my most significant technical projects."
            className="mb-20"
          />
        </FadeIn>

        {/* Featured Projects - Zig Zag Layout */}
        <div className="space-y-32">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0
            return (
              <FadeIn key={project.id} delay={0.1}>
                <div className={cn(
                  "flex flex-col gap-12 lg:gap-20 items-center",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}>
                  {/* Image Container */}
                  <Link href={`/projects/${project.id}`} className="group relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-surface-elevated border border-surface-border block flex-shrink-0">
                    <div className="absolute inset-0 bg-accent/5 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>

                  {/* Text Content */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant={project.status === 'In Progress' ? 'learning' : 'confident'}>
                        {project.status}
                      </Badge>
                      <span className="text-sm font-medium text-muted-foreground">
                        {project.year} <span className="mx-1.5 opacity-50">•</span> {project.role}
                      </span>
                    </div>

                    <Link href={`/projects/${project.id}`} className="group inline-block w-fit">
                      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4 group-hover:text-accent transition-colors">
                        {project.title}
                      </h2>
                    </Link>

                    <p className="text-base text-muted-foreground leading-relaxed mb-8">
                      {project.overview}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.stack.map(tech => (
                        <span key={tech} className="skill-pill py-1.5 px-3 bg-surface text-foreground border border-surface-border rounded-lg text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6">
                      <Link 
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors group"
                      >
                        Read Case Study
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </Link>

                      <div className="flex items-center gap-3">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
                            <GithubIcon size={20} />
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </Section>

      {/* Other Projects Grid */}
      {otherProjects.length > 0 && (
        <Section className="bg-surface/30 border-t border-surface-border py-24">
          <FadeIn>
            <SectionHeader
              eyebrow="More Work"
              title="Other Projects & Experiments."
              description="Smaller applications and university assignments that helped build my foundational skills."
              className="mb-16"
            />
          </FadeIn>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <StaggerItem key={project.id}>
                <Link href={`/projects/${project.id}`} className="card-hover group relative flex h-full flex-col p-6 sm:p-8 bg-surface border border-surface-border rounded-2xl block">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none rounded-2xl" />
                  
                  <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-elevated border border-surface-border shadow-sm">
                      <Code2 size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <span className="text-muted-foreground hover:text-foreground transition-colors"><GithubIcon size={18} /></span>
                      )}
                      {project.demo && (
                        <span className="text-muted-foreground hover:text-foreground transition-colors"><ExternalLink size={18} /></span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 relative z-10">
                    <h3 className="text-xl font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 flex flex-wrap gap-2 relative z-10">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs font-medium text-muted-foreground bg-surface-elevated px-2.5 py-1 rounded-md border border-surface-border">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="text-xs font-medium text-muted-foreground bg-surface-elevated px-2.5 py-1 rounded-md border border-surface-border">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      )}
    </>
  )
}
