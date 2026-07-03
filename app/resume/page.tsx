import type { Metadata } from 'next'
import { Download, ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/ui/Icons'
import { profile } from '@/lib/data/profile'
import { skillCategories } from '@/lib/data/skills'
import { projects } from '@/lib/data/projects'
import { education } from '@/lib/data/education'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/Animations'
import { Button } from '@/components/ui/Button'
import { SOCIAL_LINKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'View or download the professional resume of Rafi Hassan.',
}

export default function ResumePage() {
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <>
      <Section className="pt-32 pb-0">
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between max-w-[850px] mx-auto mb-10">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Curriculum Vitae</p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                My Resume.
              </h1>
            </div>
            <Button
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Download size={16} className="mr-1" />
              Download PDF
            </Button>
          </div>
        </FadeIn>
      </Section>

      <Section className="pb-24">
        <FadeIn delay={0.1}>
          {/* A4-like container for the resume */}
          <div className="mx-auto max-w-[850px] rounded-2xl border border-surface-border bg-surface p-8 sm:p-12 md:p-16 shadow-modal">
            
            {/* Header */}
            <div className="mb-10 flex flex-col items-center justify-center text-center border-b border-surface-border pb-10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">{profile.name}</h2>
              <p className="text-base text-muted-foreground font-medium mb-6">Final Year CS&E Student &middot; Aspiring Web Developer</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span>{SOCIAL_LINKS.email}</span>
                <span className="hidden sm:inline opacity-30">•</span>
                <span>Dhaka, Bangladesh</span>
                <span className="hidden sm:inline opacity-30">•</span>
                <a href={SOCIAL_LINKS.linkedin} className="hover:text-accent transition-colors">LinkedIn</a>
                <span className="hidden sm:inline opacity-30">•</span>
                <a href={SOCIAL_LINKS.github} className="hover:text-accent transition-colors">GitHub</a>
              </div>
            </div>

            <div className="grid gap-12">
              {/* Summary */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4 border-b border-surface-border pb-2">
                  Professional Summary
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profile.bio[0]} Passionate about building robust web applications and currently seeking
                  an internship or junior developer role starting January 2026. Proven ability to learn quickly
                  and apply new technologies through numerous academic and personal projects.
                </p>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4 border-b border-surface-border pb-2">
                  Education
                </h3>
                <div className="space-y-6">
                  {/* University */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                      <h4 className="text-base font-semibold text-foreground">{education.university.name}</h4>
                      <span className="text-sm text-muted-foreground">{education.university.duration}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                      <p className="text-sm font-medium text-muted-foreground">{education.university.degree}</p>
                      {education.university.cgpa && <p className="text-sm font-medium text-foreground">CGPA: {education.university.cgpa.split('/')[0].trim()}</p>}
                    </div>
                    {education.university.courses && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground/70">Key Coursework:</span> {education.university.courses.slice(0, 5).join(', ')}
                      </p>
                    )}
                  </div>
                  
                  {/* Secondary */}
                  {education.secondary.map((school, i) => (
                    <div key={i}>
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                        <h4 className="text-base font-semibold text-foreground">{school.name}</h4>
                        <span className="text-sm text-muted-foreground">{school.year}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                        <p className="text-sm font-medium text-muted-foreground">{school.level} ({school.group})</p>
                        <p className="text-sm font-medium text-foreground">{school.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4 border-b border-surface-border pb-2">
                  Technical Skills
                </h3>
                <div className="space-y-3">
                  {skillCategories.map((cat, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                      <h4 className="text-sm font-semibold text-foreground sm:w-28 shrink-0">{cat.category}:</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {cat.skills.map((s) => s.name).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4 border-b border-surface-border pb-2">
                  Selected Projects
                </h3>
                <div className="space-y-8">
                  {featuredProjects.map((project, i) => (
                    <div key={i}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-semibold text-foreground">{project.title}</h4>
                          <span className="px-2 py-0.5 rounded-md bg-surface-elevated border border-surface-border text-[10px] font-medium text-muted-foreground">
                            {project.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm mt-1 sm:mt-0">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                              <GithubIcon size={12} /> Source
                            </a>
                          )}
                          {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                              <ExternalLink size={12} /> Live
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-xs font-medium text-foreground/70 mb-2">{project.stack.join(' • ')}</p>
                      <ul className="space-y-1.5 list-disc list-outside ml-4">
                        <li className="text-sm text-muted-foreground leading-relaxed pl-1">
                          <span className="font-medium text-foreground/80">Problem solved: </span>{project.problem}
                        </li>
                        <li className="text-sm text-muted-foreground leading-relaxed pl-1">
                          <span className="font-medium text-foreground/80">Contribution: </span>{project.contribution}
                        </li>
                        <li className="text-sm text-muted-foreground leading-relaxed pl-1">
                          <span className="font-medium text-foreground/80">Key learning: </span>{project.learned}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  )
}
