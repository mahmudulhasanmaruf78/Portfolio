import type { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons'
import { profile } from '@/lib/data/profile'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { SOCIAL_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Rafi Hassan, a web developer and computer science student from Dhaka, Bangladesh.',
}

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32 pb-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Main Content */}
          <div>
            <FadeIn>
              <SectionHeader
                eyebrow="About Me"
                title="Engineering the web, one component at a time."
                description="I'm a final-year Computer Science & Engineering student with a focus on frontend architecture and user experience."
                className="mb-10"
              />
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
                {profile.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-16">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-8">
                  My Core Values
                </h3>
                <StaggerContainer className="grid gap-6 sm:grid-cols-2">
                  {profile.values.map((value) => (
                    <StaggerItem key={value.title}>
                      <div className="card p-6 h-full">
                        <h4 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent text-xs">
                            {value.title.charAt(0)}
                          </span>
                          {value.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {value.description}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:mt-4">
            <FadeIn delay={0.3}>
              <div className="card p-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
                  Quick Facts
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-elevated border border-surface-border">
                      <MapPin size={14} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">Dhaka, Bangladesh (Open to Remote)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-elevated border border-surface-border">
                      <Mail size={14} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <a
                        href={`mailto:${SOCIAL_LINKS.email}`}
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        {SOCIAL_LINKS.email}
                      </a>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-8 border-t border-surface-border flex gap-3">
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface text-muted-foreground transition-all hover:bg-surface-hover hover:text-foreground">
                    <GithubIcon size={16} />
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface text-muted-foreground transition-all hover:bg-surface-hover hover:text-foreground">
                    <LinkedinIcon size={16} />
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="card p-8 bg-surface-elevated/30">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
                  Beyond Coding
                </h3>
                <ul className="space-y-3">
                  {profile.funFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                      <span className="leading-relaxed">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      <Section className="bg-surface/30 border-t border-surface-border">
        <FadeIn>
          <SectionHeader
            title="My Journey"
            description="A brief timeline of my academic and technical progression."
          />
        </FadeIn>

        <StaggerContainer className="relative mt-12 pl-6 sm:pl-0 max-w-3xl">
          <div className="timeline-line sm:left-[140px]" />
          
          <div className="space-y-12">
            {profile.timeline.map((item, i) => (
              <StaggerItem key={i}>
                <div className="relative sm:flex gap-10">
                  <div className="hidden sm:block w-28 shrink-0 text-right pt-1">
                    <span className="text-sm font-semibold text-muted-foreground">{item.year}</span>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-6 sm:static sm:flex shrink-0 items-start justify-center pt-1.5">
                    <div className="h-[11px] w-[11px] rounded-full bg-accent ring-4 ring-background z-10" />
                  </div>
                  
                  <div className="pb-2">
                    <div className="sm:hidden mb-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded-md bg-surface-elevated border border-surface-border text-muted-foreground">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </Section>
    </>
  )
}
