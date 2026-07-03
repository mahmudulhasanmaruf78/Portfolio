import type { Metadata } from 'next'
import { PlayCircle } from 'lucide-react'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Video Introduction',
  description: 'A brief video introduction by Mahmudul Hasan Maruf.',
}

export default function VideoPage() {
  const transcriptSections = [
    {
      time: '0:00',
      text: "Hi, I'm Mahmudul Hasan Maruf. I'm currently in my final year studying Computer Science and Engineering at American International University-Bangladesh (AIUB).",
    },
    {
      time: '0:15',
      text: "My journey into software development started with a fascination for how things work on the web. Over the past three years, I've transitioned from learning basic HTML/CSS to building full-stack applications with React, Next.js, and Node.js.",
    },
    {
      time: '0:45',
      text: "What drives me is the intersection of clean design and efficient code. I don't just want to build things that work; I want to build things that feel great to use and are maintainable for the developers who come after me.",
    },
    {
      time: '1:10',
      text: "I'm currently looking for an internship or junior developer role where I can contribute to real-world products and learn from experienced engineers. If you're building a team that values continuous learning and high-quality software, I'd love to connect.",
    },
  ]

  return (
    <>
      <Section className="pt-32 pb-0">
        <FadeIn>
          <SectionHeader
            eyebrow="Introduction"
            title="Beyond the resume."
            description="A quick video introducing myself, my journey into tech, and what I'm looking for in my next role."
            className="mb-10"
          />
        </FadeIn>
      </Section>

      <Section className="pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] max-w-6xl mx-auto">
          {/* Video Player */}
          <FadeIn delay={0.1}>
            <div className="card-glass overflow-hidden p-2 sm:p-4 shadow-modal">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-surface border border-surface-border">
                {/* Placeholder image that looks like a video player before load */}
                <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple-500/5 opacity-50" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent/90 text-white shadow-[0_0_30px_hsl(var(--accent)/0.5)] transition-transform group-hover:scale-110">
                    <PlayCircle size={32} />
                  </div>
                  <div className="absolute bottom-4 left-4 text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
                    1:45
                  </div>
                </div>

                <iframe
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1"
                  title="Video Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full opacity-0"
                  // Note: Removed opacity-0 in real usage once iframe is loaded or simply don't hide it
                  // For the sake of the premium placeholder look, you might use a facade component in React
                  style={{ zIndex: 10, opacity: 1 }} 
                />
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge variant="accent">Web Development</Badge>
              <Badge variant="default">Career</Badge>
              <span className="text-xs text-muted-foreground ml-auto">Recorded July 2026</span>
            </div>
          </FadeIn>

          {/* Transcript */}
          <FadeIn delay={0.2}>
            <div className="card p-6 md:p-8 h-full bg-surface-elevated/20">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-8 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" /> Transcript
              </h3>
              
              <StaggerContainer className="relative pl-4 border-l border-surface-border space-y-8">
                {transcriptSections.map((section, i) => (
                  <StaggerItem key={i}>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-surface border-2 border-surface-border ring-4 ring-background" />
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono font-medium text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                          {section.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {section.text}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
