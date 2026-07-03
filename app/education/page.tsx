import type { Metadata } from 'next'
import { GraduationCap, MapPin, Award, Book } from 'lucide-react'
import { education } from '@/lib/data/education'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'

export const metadata: Metadata = {
  title: 'Education',
  description: 'Academic background, coursework, and university activities of Rafi Hassan at AIUB.',
}

export default function EducationPage() {
  const { university, secondary } = education

  return (
    <>
      <Section className="pt-32 pb-0">
        <FadeIn>
          <SectionHeader
            eyebrow="Academic Background"
            title="Where I've learned."
            description="My formal education in Computer Science and Engineering, focusing on software development and computer systems."
          />
        </FadeIn>
      </Section>

      <Section>
        <StaggerContainer className="space-y-12 max-w-4xl mx-auto">
          {/* University */}
          <StaggerItem>
            <div className="card-hover p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                  <div className="flex gap-4 sm:gap-6 items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-surface-elevated border border-surface-border shadow-sm">
                      <GraduationCap size={24} className="text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-1">{university.degree}</h2>
                      <h3 className="text-lg text-muted-foreground">{university.name}</h3>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="opacity-70" /> Dhaka, Bangladesh
                        </span>
                        <span className="hidden sm:block opacity-30">•</span>
                        <span className="font-medium text-foreground">{university.duration}</span>
                        <span className="hidden sm:block opacity-30">•</span>
                        <span className="font-medium text-accent">{university.status}</span>
                      </div>
                    </div>
                  </div>
                  {university.cgpa && (
                    <div className="flex flex-col items-start md:items-end p-4 rounded-xl bg-surface border border-surface-border md:bg-transparent md:border-transparent md:p-0 shrink-0">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        CGPA
                      </span>
                      <span className="text-2xl font-bold text-foreground">
                        {university.cgpa}
                      </span>
                    </div>
                  )}
                </div>

                {university.courses && (
                  <div className="mb-8 border-t border-surface-border pt-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                      Relevant Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {university.courses.map((course) => (
                        <span key={course} className="tag px-3 py-1.5">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {university.activities && (
                  <div className="border-t border-surface-border pt-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                      Extracurricular & Activities
                    </h4>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {university.activities.map((activity, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent mt-0.5">
                            <Award size={12} />
                          </span>
                          <span className="leading-relaxed">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </StaggerItem>

          {/* Secondary Education */}
          <StaggerItem>
            <div className="grid sm:grid-cols-2 gap-6">
              {secondary.map((school, i) => (
                <div key={i} className="card p-6 md:p-8 bg-surface-elevated/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface border border-surface-border text-muted-foreground">
                      <Book size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground leading-snug">{school.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{school.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4 gap-y-2 flex-wrap text-sm pt-4 border-t border-surface-border mt-auto">
                    <span className="text-muted-foreground">Group: <span className="text-foreground font-medium">{school.group}</span></span>
                    <span className="text-muted-foreground">Result: <span className="text-foreground font-medium">{school.result}</span></span>
                    <span className="text-muted-foreground">Year: <span className="text-foreground font-medium">{school.year}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Section>
    </>
  )
}
