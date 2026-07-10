'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ExternalLink, BookOpen, Code2, Award, TrendingUp, Mail,
  ChevronRight, GraduationCap, MessageSquare, Send, CheckCircle2,
  AlertCircle, X, Target, Circle, ArrowRight
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { HeroSection } from '@/components/ui/HeroSection'
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/ui/Animations'
import { SectionHeader } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

import { FacebookIcon, GithubIcon, LinkedinIcon } from '@/components/ui/Icons'
import { profile } from '@/lib/data/profile'
import { projects } from '@/lib/data/projects'
import { skillCategories, type SkillCategory } from '@/lib/data/skills'
import { education } from '@/lib/data/education'
import { certificates } from '@/lib/data/certificates'
import { currentlyLearning, roadmap } from '@/lib/data/learning'
import { SOCIAL_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { contactSchema, type ContactFormData } from '@/lib/contact'

// ── Helpers ────────────────────────────────────────────────────────────────

const stats = [
  { label: 'CGPA',         value: `${profile.stats.cgpa}`, icon: TrendingUp, sub: '/ 4.00' },
  { label: 'Projects',     value: `${profile.stats.projects}+`, icon: Code2, sub: 'shipped' },
  { label: 'Certificates', value: `${profile.stats.certificates}`, icon: Award, sub: 'earned' },
  { label: 'Months',       value: `${profile.stats.monthsLearning}+`, icon: BookOpen, sub: 'coding' },
]

const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

// ── Progress Bar (Learning) ───────────────────────────────────────────────
function ProgressBar({ progress, title }: { progress: number; title: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setWidth(progress), 300)
      return () => clearTimeout(t)
    }
  }, [isInView, progress])

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-xs font-medium text-muted-foreground group-hover:text-accent transition-colors">{progress}%</span>
      </div>
      <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden border border-surface-border/50">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent/80 to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>
    </div>
  )
}

// ── Contact Form ───────────────────────────────────────────────────────────
function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setIsError(false)
    setErrorMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const result = (await res.json().catch(() => null)) as { message?: string } | null
        throw new Error(result?.message ?? 'Failed to send message')
      }
      setIsSuccess(true)
      reset()
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setIsError(true)
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
      setTimeout(() => setIsError(false), 6000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card p-8 md:p-10 shadow-modal relative overflow-hidden">
      <div className="absolute top-0 right-0 h-64 w-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <h3 className="text-xl font-semibold text-foreground mb-6 relative z-10">Send a message</h3>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isSuccess && <span>Your message was sent successfully!</span>}
        {isError && <span>{errorMessage}</span>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input id="company" tabIndex={-1} autoComplete="off" {...register('company')} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
            <input
              id="name"
              {...register('name')}
              placeholder="Your name"
              className={cn('input-base', errors.name && 'border-red-500/50')}
            />
            {errors.name && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                <AlertCircle size={12} /> {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your@email.com"
              className={cn('input-base', errors.email && 'border-red-500/50')}
            />
            {errors.email && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                <AlertCircle size={12} /> {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            placeholder="Hi Mahmudul, I'd like to talk about..."
            className={cn('input-base resize-none', errors.message && 'border-red-500/50')}
          />
          {errors.message && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-red-400">
              <AlertCircle size={12} /> {errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto min-w-[140px]" loading={isSubmitting}>
          {isSuccess ? (
            <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Sent!</span>
          ) : (
            <span className="flex items-center gap-2">Send Message <Send size={14} /></span>
          )}
        </Button>

        {isSuccess && (
          <p className="text-sm font-medium text-emerald-400 mt-3">
            Thanks for reaching out! I&apos;ll get back to you soon.
          </p>
        )}
        {isError && (
          <div className="space-y-2 mt-3">
            <p className="flex items-center gap-1.5 text-sm font-medium text-red-400">
              <AlertCircle size={14} /> {errorMessage || 'Something went wrong.'}
            </p>
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`} target="_blank" rel="noopener noreferrer" className="inline-flex text-sm font-medium text-accent hover:text-accent/80">
              Email me directly at {SOCIAL_LINKS.email}
            </a>
          </div>
        )}
      </form>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null)

  return (
    <div className="relative">

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── STATS ────────────────────────────────────────────────── */}
      <section
        aria-label="Quick stats"
        className="relative z-10 bg-surface/30 border-y border-surface-border backdrop-blur-md"
      >
        <div className="container-custom py-6 sm:py-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 items-center">
            {stats.map(({ label, value, icon: Icon, sub }) => (
              <StaggerItem key={label} className="flex justify-center">
                <div className="group flex items-center gap-4 transition-colors w-full max-w-[200px] lg:max-w-none">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface border border-surface-border shadow-sm group-hover:border-accent/30 group-hover:bg-accent/5 transition-all">
                    <Icon size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
                      {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground truncate">{label}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="section-padding relative z-10 bg-background scroll-mt-20">
        <div className="container-custom">
          <FadeIn>
            <SectionHeader
              eyebrow="About Me"
              title="The person behind the code."
              description="A student, a builder, and someone who cares deeply about the craft of writing great software."
            />
          </FadeIn>

          <div className="grid gap-16 lg:grid-cols-[1fr_340px]">
            <FadeIn>
              <div className="space-y-6">
                {profile.bio.map((paragraph, i) => (
                  <p key={i} className="text-base text-muted-foreground leading-[1.85] max-w-prose">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Values */}
              <div className="mt-14">
                <h3 className="text-lg font-semibold text-foreground mb-8">How I work.</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  {profile.values.map((value) => (
                    <div key={value.title} className="card p-5">
                      <h4 className="text-sm font-semibold text-foreground mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5">
                {/* Quick Info */}
                <div className="card p-6 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Quick Info</h3>
                  <dl className="space-y-3">
                    {[
                      { label: 'University', value: 'AIUB' },
                      { label: 'Department', value: 'CS&E' },
                      { label: 'CGPA', value: `${profile.cgpa} / ${profile.cgpaScale}` },
                      { label: 'Graduation', value: profile.expectedGraduation },
                      { label: 'Location', value: profile.location },
                      { label: 'Status', value: 'Final Year' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-start justify-between gap-4">
                        <dt className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wide shrink-0">{label}</dt>
                        <dd className="text-sm text-foreground font-medium text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Connect */}
                <div className="card p-6 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Connect</h3>
                  <div className="space-y-3">
                    {[
                      { href: SOCIAL_LINKS.github, icon: GithubIcon, label: 'GitHub' },
                      { href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
                      { href: SOCIAL_LINKS.facebook, icon: FacebookIcon, label: 'Facebook' },
                    ].map(({ href, icon: Icon, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                        <Icon size={16} />
                        <span className="group-hover:text-accent transition-colors">{label}</span>
                        <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-70 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Fun facts */}
                <div className="card p-6 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Fun Facts</h3>
                  <div className="space-y-3">
                    {profile.funFacts.map((fact, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent text-xs font-bold">{i + 1}</div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ───────────────────────────────────────────────── */}
      <section id="skills" className="section-padding relative z-10 scroll-mt-20">
        <div className="container-custom">
          <FadeIn>
            <SectionHeader
              eyebrow="Technical Skills"
              title="My toolkit."
              description="Technologies, tools, and frameworks I've worked with — from fundamentals to modern full-stack development."
            />
          </FadeIn>

          <div className="space-y-12">
            {skillCategories.map((group: SkillCategory) => (
              <div key={group.category}>
                <FadeIn>
                  <h3 className="text-base font-semibold text-foreground mb-5">{group.category}</h3>
                </FadeIn>
                <StaggerContainer className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => {
                    const Icon = skill.icon
                    return (
                      <StaggerItem key={skill.name}>
                        <div 
                          className="group relative flex cursor-default items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                          style={{
                            borderColor: `${skill.color}40`,
                            color: skill.color,
                          }}
                        >
                          <div 
                            className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                            style={{ backgroundColor: skill.color }}
                          />
                          <div
                            className="absolute inset-0 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
                            style={{ boxShadow: `inset 0 0 12px ${skill.color}40` }}
                          />
                          <Icon className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                          <span className="relative z-10">{skill.name}</span>
                        </div>
                      </StaggerItem>
                    )
                  })}
                </StaggerContainer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─────────────────────────────────────────────── */}
      <section id="projects" className="section-padding relative z-10 bg-background scroll-mt-20">
        <div className="container-custom">
          <FadeIn>
            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Selected Work"
                title="Featured Projects"
                description="A selection of my best academic and personal builds."
                className="mb-0"
              />
              <Button href="/projects" variant="ghost" className="group hidden md:flex">
                View all projects
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <div className="card-hover group relative flex h-full flex-col p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated border border-surface-border shadow-sm">
                        <Code2 size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-surface-border text-muted-foreground hover:text-foreground hover:border-white/20 transition-all shadow-sm">
                            <GithubIcon size={14} />
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-surface-border text-muted-foreground hover:text-foreground hover:border-white/20 transition-all shadow-sm">
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="tag text-[10px] px-2 py-0.5">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-10 flex justify-center md:hidden">
            <Button href="/projects" variant="secondary" className="w-full sm:w-auto">
              View all projects
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* ─── EDUCATION ────────────────────────────────────────────── */}
      <section id="education" className="section-padding relative z-10 scroll-mt-20">
        <div className="container-custom">
          <FadeIn>
            <SectionHeader
              eyebrow="Education"
              title="Academic background."
              description="My formal education in Computer Science and Engineering."
            />
          </FadeIn>

          {/* University */}
          <FadeIn>
            <div className="card p-8 lg:p-10 mb-10">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                  <GraduationCap size={26} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">University</p>
                  <h2 className="text-xl font-semibold text-foreground">{education.university.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{education.university.degree}</p>
                  <p className="text-sm text-muted-foreground">{education.university.duration}</p>
                </div>
                <div className="ml-auto text-right hidden sm:block">
                  <p className="text-2xl font-bold text-foreground">{education.university.cgpa}</p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">CGPA</p>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Core Courses</h3>
              <div className="flex flex-wrap gap-2">
                {education.university.courses.map((course) => (
                  <span key={course} className="tag">{course}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Secondary */}
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {education.secondary.map((school) => (
              <StaggerItem key={school.name}>
                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-elevated border border-surface-border">
                      <BookOpen size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{school.level} · {school.year}</p>
                      <h3 className="text-base font-semibold text-foreground mb-1">{school.name}</h3>
                      <p className="text-sm text-muted-foreground">{school.group} · {school.result}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── CERTIFICATES ─────────────────────────────────────────── */}
      <section id="certificates" className="section-padding relative z-10 bg-background scroll-mt-20">
        <div className="container-custom">
          <FadeIn>
            <SectionHeader
              eyebrow="Certifications"
              title="Credentials earned."
              description="Online courses, assessments, and programs completed to supplement my CS degree."
            />
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <StaggerItem key={cert.id}>
                <button
                  onClick={() => setSelectedCert(cert)}
                  aria-label={`View details for ${cert.title}`}
                  className="card-hover group relative flex w-full flex-col items-start gap-4 p-6 text-left"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated border border-surface-border">
                    <Award size={22} className="text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{cert.category}</p>
                    <h3 className="text-base font-semibold text-foreground leading-snug mb-1 group-hover:text-accent transition-colors">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer} · {cert.date}</p>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate details: ${selectedCert.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card w-full max-w-lg p-8 shadow-modal relative"
            >
              <button onClick={() => setSelectedCert(null)} aria-label="Close"
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors">
                <X size={16} />
              </button>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 mb-6">
                <Award size={24} className="text-accent" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{selectedCert.category}</p>
              <h2 className="text-xl font-semibold text-foreground leading-snug mb-1">{selectedCert.title}</h2>
              <p className="text-sm text-muted-foreground mb-6">{selectedCert.issuer} · {selectedCert.date}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">{selectedCert.description}</p>
              {selectedCert.credentialUrl && (
                <a href={selectedCert.credentialUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors">
                  View Credential <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── LEARNING ─────────────────────────────────────────────── */}
      <section id="learning" className="section-padding relative z-10 scroll-mt-20">
        <div className="container-custom">
          <FadeIn>
            <SectionHeader
              eyebrow="Currently Learning"
              title="Always a student."
              description="Technology moves fast. Here's what I'm actively studying right now."
            />
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Active Learning */}
            <div>
              <FadeIn>
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-8 border-b border-surface-border pb-4">
                  <BookOpen size={16} className="text-accent" /> Active Focus
                </h3>
              </FadeIn>
              <StaggerContainer className="grid gap-5">
                {currentlyLearning.map((item) => (
                  <StaggerItem key={item.id}>
                    <div className="card-hover p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-semibold text-foreground">{item.topic}</h4>
                        <Badge variant={item.resourceType === 'Course' ? 'info' : item.resourceType === 'Book' ? 'warning' : 'purple'}>
                          {item.resourceType}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                        <strong className="text-foreground/80 font-medium">Resource:</strong> {item.resource}
                      </p>
                      <ProgressBar progress={item.progress} title="Completion" />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Roadmap */}
            <div>
              <FadeIn>
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-8 border-b border-surface-border pb-4">
                  <Target size={16} className="text-accent" /> Developer Roadmap
                </h3>
              </FadeIn>
              <StaggerContainer className="relative pl-6">
                <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-accent/50 via-surface-border to-transparent" />
                <div className="space-y-8">
                  {roadmap.map((phase) => (
                    <StaggerItem key={phase.quarter}>
                      <div className="relative group">
                        <div className="absolute -left-8 top-1 flex h-4 w-4 items-center justify-center bg-background">
                          {phase.quarter.includes('Current') ? (
                            <div className="h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20 animate-pulse" />
                          ) : (
                            <Circle size={12} className="text-muted-foreground" />
                          )}
                        </div>
                        <div className={cn(
                          'transition-all duration-200 p-5 rounded-xl border border-transparent hover:border-surface-border hover:bg-surface-elevated/30',
                          phase.quarter.includes('Current') && 'border-surface-border bg-surface-elevated/10'
                        )}>
                          <div className="flex items-center gap-3 mb-3">
                            <h4 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{phase.quarter}</h4>
                            {phase.quarter.includes('Current') && (
                              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-accent/10 text-accent border-accent/20">Active</span>
                            )}
                          </div>
                          <ul className="space-y-2">
                            {phase.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-surface-border" />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            </div>
          </div>

          {/* Motivation quote */}
          <FadeIn className="mt-16">
            <div className="card-glass p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-accent/10 blur-[80px] pointer-events-none" />
              <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface border border-surface-border shadow-sm mb-6">
                  <ArrowRight size={20} className="text-accent" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground tracking-tight mb-4">
                  The goal is mastery, not completion.
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  I firmly believe that the best engineers are lifelong learners. The tools will change, but the fundamentals remain.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="section-padding relative z-10 bg-background scroll-mt-20">
        <div className="container-custom">
          <FadeIn>
            <SectionHeader
              eyebrow="Get in Touch"
              title="Let's build something."
              description="I'm currently looking for an internship or junior developer role. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
            />
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] max-w-5xl mx-auto">
            {/* Info */}
            <FadeIn delay={0.1}>
              <div className="card p-8 h-full bg-surface-elevated/30">
                <h3 className="text-lg font-semibold text-foreground mb-8">Contact Information</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface border border-surface-border text-accent">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Email</p>
                      <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                        {SOCIAL_LINKS.email}
                      </a>
                      <p className="text-xs text-muted-foreground/60 mt-1">Best way to reach me</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface border border-surface-border text-accent">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Socials</p>
                      <div className="flex items-center gap-4">
                        {[
                          { href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
                          { href: SOCIAL_LINKS.github, icon: GithubIcon, label: 'GitHub' },
                          { href: SOCIAL_LINKS.facebook, icon: FacebookIcon, label: 'Facebook' },
                        ].map(({ href, icon: Icon, label }) => (
                          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors">
                            <Icon size={16} /> {label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-surface-border">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Available for opportunities
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.2}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────── */}
      <section className="section-padding-sm relative z-10 bg-background">
        <div className="container-custom">
          <ScaleIn>
            <div className="card-glass relative overflow-hidden p-8 md:p-16 text-center shadow-modal">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-[80px] pointer-events-none" />
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/20 blur-[80px] pointer-events-none" />
              <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                <span className="eyebrow mb-4">Availability</span>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                  Looking for my first engineering role.
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-xl">
                  Open to internships and junior positions starting early 2026. I bring a strong
                  foundation in computer science and a passion for building great products.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button href="#contact" size="lg" className="w-full sm:w-auto group">
                    Get in Touch
                    <Mail size={16} className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Button>
                  <Button href="/resume" variant="secondary" size="lg" className="w-full sm:w-auto bg-background/50 backdrop-blur-md">
                    View Resume
                  </Button>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>
    </div>
  )
}
