import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Code2 } from 'lucide-react'
import { GithubIcon } from '@/components/ui/Icons'
import { projects } from '@/lib/data/projects'
import { Section } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  }
}

export default function ProjectCaseStudyPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <>
      <article className="pt-24 pb-32">
        {/* Navigation & Header */}
        <Section className="mb-12">
          <FadeIn>
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} /> Back to Projects
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={project.status === 'In Progress' ? 'learning' : 'confident'}>
                    {project.status}
                  </Badge>
                  <span className="text-sm font-medium text-muted-foreground">
                    {project.year} <span className="mx-1.5 opacity-50">•</span> {project.role}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  {project.overview}
                </p>
              </div>
              
              <div className="flex items-center gap-3 shrink-0 pb-1">
                {project.github && (
                  <Button href={project.github} target="_blank" rel="noopener noreferrer" variant="secondary">
                    <GithubIcon size={16} /> Source Code
                  </Button>
                )}
                {project.demo && (
                  <Button href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} /> Live Demo
                  </Button>
                )}
              </div>
            </div>
          </FadeIn>
        </Section>

        {/* Massive Hero Image */}
        <Section className="mb-24">
          <FadeIn delay={0.1}>
            <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] md:aspect-[2.5/1] rounded-3xl overflow-hidden bg-surface-elevated border border-surface-border shadow-modal">
              <Image
                src={project.coverImage}
                alt={`${project.title} Cover`}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            </div>
          </FadeIn>
        </Section>

        {/* Case Study Content Layout */}
        <Section>
          <div className="grid gap-16 lg:grid-cols-[1fr_300px]">
            
            {/* Main Content Body */}
            <div className="space-y-16">
              <FadeIn delay={0.2}>
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-6 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-accent/50" /> The Problem
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                    <p>{project.problemStatement}</p>
                  </div>
                </section>
              </FadeIn>

              <FadeIn delay={0.25}>
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-surface-border" /> Development Process
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                    <p>{project.developmentProcess}</p>
                  </div>
                </section>
              </FadeIn>

              <FadeIn delay={0.3}>
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-surface-border" /> Technical Challenges
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                    <p>{project.challenges}</p>
                  </div>
                </section>
              </FadeIn>

              <FadeIn delay={0.35}>
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-emerald-400/50" /> Solutions & Implementations
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                    <p>{project.solutions}</p>
                  </div>
                </section>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-surface-border" /> Lessons Learned
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed bg-surface p-8 rounded-2xl border border-surface-border shadow-sm">
                    <p className="mb-0">{project.lessonsLearned}</p>
                  </div>
                </section>
              </FadeIn>
            </div>

            {/* Sidebar (Meta & Role) */}
            <div className="space-y-10 lg:pl-10 lg:border-l lg:border-surface-border">
              <FadeIn delay={0.3}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                    My Role
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.myRole}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <span key={tech} className="skill-pill py-1.5 px-3 bg-surface border border-surface-border rounded-lg text-sm font-medium text-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.5}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.category.map(cat => (
                      <span key={cat} className="text-sm font-medium text-muted-foreground">
                        {cat}
                        <span className="mx-2 opacity-30 last:hidden">•</span>
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
            
          </div>
        </Section>

        {/* Gallery / Mockups */}
        {project.gallery && project.gallery.length > 0 && (
          <Section className="mt-24 pt-24 border-t border-surface-border">
            <FadeIn>
              <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-12 text-center">
                Visual Showcase
              </h2>
            </FadeIn>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img, idx) => (
                <StaggerItem key={idx} className={cn(
                  "relative rounded-2xl overflow-hidden bg-surface-elevated border border-surface-border shadow-sm group",
                  idx === 0 && project.gallery.length % 2 !== 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                )}>
                  <div className="absolute inset-0 bg-accent/5 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
                  <Image
                    src={img}
                    alt={`${project.title} mockup ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Section>
        )}
      </article>
    </>
  )
}
