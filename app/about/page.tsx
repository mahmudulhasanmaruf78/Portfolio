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
                  <p key={i} className={i === 0 ? "text-lg text-foreground/90 font-medium" : ""}>
                    {paragraph}
                  </p>
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
                      <div className="card p-6 h-full transition-all duration-300 hover:shadow-card-hover hover:border-accent/30 hover:bg-surface-hover/50 group">
                        <h4 className="text-base font-semibold text-foreground mb-3 flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent text-sm font-bold group-hover:bg-accent group-hover:text-white transition-colors">
                            {value.title.charAt(0)}
                          </span>
                          {value.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
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
            
            {/* Profile Image Placeholder */}
            <FadeIn delay={0.25}>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-surface-border bg-surface-elevated/50 group">
                {/* Replace this div with a next/image component */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-6 text-center z-10">
                  <div className="h-16 w-16 mb-4 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
                    <span className="text-2xl">📸</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">Profile Picture</p>
                  <p className="text-xs opacity-70 mt-1">Add your professional headshot here.</p>
                </div>
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-50 pointer-events-none" />
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="card p-6 sm:p-8 transition-all duration-300 hover:border-white/10">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
                  Quick Facts
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-elevated border border-surface-border shadow-sm">
                      <MapPin size={16} className="text-muted-foreground" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-medium text-foreground mb-0.5">Location</p>
                      <p className="text-sm text-muted-foreground">Dhaka, Bangladesh</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-elevated border border-surface-border shadow-sm">
                      <Mail size={16} className="text-muted-foreground" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-medium text-foreground mb-0.5">Email</p>
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface text-muted-foreground shadow-sm transition-all hover:bg-surface-hover hover:text-foreground hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    <GithubIcon size={16} />
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface text-muted-foreground shadow-sm transition-all hover:bg-surface-hover hover:text-foreground hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    <LinkedinIcon size={16} />
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="card p-6 sm:p-8 bg-surface-elevated/30 transition-all duration-300 hover:bg-surface-elevated/50">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
                  Beyond Coding
                </h3>
                <ul className="space-y-4">
                  {profile.funFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
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

        <StaggerContainer className="relative mt-16 pl-6 sm:pl-0 max-w-3xl">
          <div className="timeline-line sm:left-[140px]" />
          
          <div className="space-y-12">
            {profile.timeline.map((item, i) => (
              <StaggerItem key={i}>
                <div className="relative sm:flex gap-10 group cursor-default">
                  <div className="hidden sm:block w-28 shrink-0 text-right pt-1">
                    <span className="text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">{item.year}</span>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-6 sm:static sm:flex shrink-0 items-start justify-center pt-1.5">
                    <div className="h-[11px] w-[11px] rounded-full bg-surface-border ring-4 ring-background z-10 transition-colors duration-300 group-hover:bg-accent" />
                  </div>
                  
                  <div className="pb-2">
                    <div className="sm:hidden mb-3">
                      <span className="text-xs font-semibold px-2 py-1 rounded-md bg-surface-elevated border border-surface-border text-muted-foreground">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
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
