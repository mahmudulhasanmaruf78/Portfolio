import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Code2, CheckCircle2 } from 'lucide-react'
import { GithubIcon } from '@/components/ui/Icons'
import { projects } from '@/lib/data/projects'
import { Section } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import * as ReactIconsSi from 'react-icons/si'
import * as ReactIconsFa from 'react-icons/fa'
import * as ReactIconsTb from 'react-icons/tb'

// Helper to dynamically get the icon component from string names like "SiPhp"
const getIconComponent = (iconName: string) => {
  if (iconName.startsWith('Si')) return (ReactIconsSi as any)[iconName]
  if (iconName.startsWith('Fa')) return (ReactIconsFa as any)[iconName]
  if (iconName.startsWith('Tb')) return (ReactIconsTb as any)[iconName]
  if (iconName.startsWith('Di')) return (ReactIconsSi as any)[iconName.replace('Di', 'Si')]
  return Code2
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)
  
  if (!project) {
    return { title: 'Project Not Found' }
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
        <Section className="mb-16">
          <FadeIn>
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} /> Back to Projects
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {project.tagline}
                </p>
              </div>
              
              <div className="flex items-center gap-3 shrink-0 pb-1">
                {project.githubLink && (
                  <Button href={project.githubLink} target="_blank" rel="noopener noreferrer" variant="secondary">
                    <GithubIcon size={16} /> Source Code
                  </Button>
                )}
                {project.liveLink && (
                  <Button href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} /> Live Demo
                  </Button>
                )}
              </div>
            </div>
          </FadeIn>
        </Section>

        {/* Case Study Content Layout */}
        <Section>
          <div className="grid gap-16 lg:grid-cols-[1fr_350px]">
            
            {/* Main Content Body */}
            <div className="space-y-16">
              <FadeIn delay={0.1}>
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-6 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-accent/50" /> Project Overview
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                    <p>{project.description}</p>
                  </div>
                </section>
              </FadeIn>

              {/* Lifecycle Steps */}
              <FadeIn delay={0.2}>
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-foreground mb-8 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-surface-border" /> Development Lifecycle
                  </h2>
                  <div className="space-y-8">
                    {project.lifecycleSteps.map((step, idx) => (
                      <div key={idx} className="relative pl-8 border-l border-surface-border before:absolute before:left-[-5px] before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-accent/50">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{step.phase}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.details}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>
            </div>

            {/* Sidebar (Meta & Role) */}
            <div className="space-y-12 lg:pl-10 lg:border-l lg:border-surface-border">
              <FadeIn delay={0.2}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                    My Role: {project.myRole.title}
                  </h3>
                  <ul className="space-y-4">
                    {project.myRole.contributions.map((contribution, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                        <span>{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => {
                      const Icon = getIconComponent(tech.icon)
                      return (
                        <div 
                          key={tech.name} 
                          className="flex items-center gap-2 py-1.5 px-3 rounded-lg text-sm font-medium border"
                          style={{
                            borderColor: `${tech.color}40`,
                            backgroundColor: `${tech.color}10`,
                            color: tech.color
                          }}
                        >
                          <Icon className="w-4 h-4" />
                          {tech.name}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </FadeIn>
            </div>
            
          </div>
        </Section>

        {/* Visual Showcase */}
        {project.visualThoughtProcess && project.visualThoughtProcess.length > 0 && (
          <Section className="mt-24 pt-24 border-t border-surface-border">
            <FadeIn>
              <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-12 text-center">
                Visual Thought Process
              </h2>
            </FadeIn>
            
            <div className="space-y-16">
              {project.visualThoughtProcess.map((item, idx) => (
                <FadeIn key={idx}>
                  <div className="flex flex-col lg:flex-row gap-8 items-center bg-surface border border-surface-border rounded-2xl p-6 sm:p-8">
                    <div className="w-full lg:w-1/3 space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                    <div className="w-full lg:w-2/3 relative aspect-[16/9] rounded-xl overflow-hidden border border-surface-border shadow-sm">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Section>
        )}
      </article>
    </>
  )
}
