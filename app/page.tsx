'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  ExternalLink,
  BookOpen,
  Code2,
  Award,
  TrendingUp,
  Mail,
  ChevronRight,
  Mouse,
  ChevronDown
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons'
import { profile } from '@/lib/data/profile'
import { projects } from '@/lib/data/projects'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/ui/Animations'
import { SOCIAL_LINKS } from '@/lib/constants'
import { SectionHeader } from '@/components/layout/Section'

const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS']

const stats = [
  { label: 'CGPA', value: '3.72', icon: TrendingUp, sub: '/ 4.00' },
  { label: 'Projects', value: `${profile.stats.projects}+`, icon: Code2, sub: 'shipped' },
  { label: 'Certificates', value: `${profile.stats.certificates}`, icon: Award, sub: 'earned' },
  { label: 'Months', value: `${profile.stats.monthsLearning}+`, icon: BookOpen, sub: 'coding' },
]

const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Mouse Parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const reverseX = useTransform(smoothX, (v) => -v)
  const reverseY = useTransform(smoothY, (v) => -v)

  const shouldReduceMotion = useReducedMotion()
  const yOffset = shouldReduceMotion ? 0 : 15

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    mouseX.set(x * 50) // Reduced from 100px to 50px for subtler mouse parallax
    mouseY.set(y * 50)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        aria-label="Introduction"
        onMouseMove={handleMouseMove}
        className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-16 md:pt-20"
      >
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 bg-grid-pattern opacity-40 mix-blend-overlay pointer-events-none" />
        <motion.div 
          style={{ x: smoothX, y: smoothY }}
          className="glow-orb glow-orb-blue top-1/4 -left-32 w-96 h-96 pointer-events-none" 
        />
        <motion.div 
          style={{ x: reverseX, y: reverseY }}
          className="glow-orb glow-orb-purple bottom-1/4 right-0 w-[30rem] h-[30rem] pointer-events-none opacity-10" 
        />
        
        <motion.div
          style={{ y, opacity }}
          className="container-custom relative z-10"
        >
          <motion.div 
            className="max-w-[800px]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                }
              }
            }}
          >
            {/* Status Pill */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: yOffset },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] } }
              }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-surface-border bg-surface-elevated/40 py-1.5 pl-2 pr-4 text-xs font-medium text-muted-foreground backdrop-blur-md shadow-card"
            >
              <span className="flex h-6 items-center justify-center rounded-full bg-emerald-500/15 px-2.5">
                <span className="status-dot text-emerald-400 mr-1.5" />
                <span className="text-emerald-400 font-semibold tracking-wide uppercase text-[10px]">Available</span>
              </span>
              <span>Internships starting Jan 2026</span>
            </motion.div>

            {/* Main Headline - Reveal line by line */}
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl md:text-7xl lg:text-[5rem] leading-[1.05]">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  variants={{
                    hidden: { y: shouldReduceMotion ? 0 : "100%", opacity: shouldReduceMotion ? 0 : 1 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
                  }}
                  className="block text-muted-foreground text-2xl sm:text-3xl md:text-5xl mb-2 font-medium tracking-tight"
                >
                  Hi, I&apos;m Rafi Hassan.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  variants={{
                    hidden: { y: shouldReduceMotion ? 0 : "100%", opacity: shouldReduceMotion ? 0 : 1 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
                  }}
                  className="block"
                >
                  I build clean, modern
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  variants={{
                    hidden: { y: shouldReduceMotion ? 0 : "100%", opacity: shouldReduceMotion ? 0 : 1 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
                  }}
                  className="block text-gradient pr-2"
                >
                  web experiences.
                </motion.span>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: yOffset },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] } }
              }}
              className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-[1.6]"
            >
              Final Year CS&E Student at <strong className="text-foreground font-semibold">AIUB</strong>. 
              Passionate about frontend architecture, responsive design, and writing code that scales. 
              Seeking my first engineering role.
            </motion.p>

            {/* Tech stack */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: yOffset },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] } }
              }}
              className="mt-8 flex flex-wrap items-center gap-2"
            >
              <span className="text-sm text-muted-foreground mr-2 font-medium">Core Stack:</span>
              {techStack.map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: yOffset },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] } }
              }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <Button href="/projects" size="lg" className="group">
                View My Work 
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get in Touch
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: yOffset },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] } }
              }}
              className="mt-14 flex items-center gap-6"
            >
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <motion.div 
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-surface-border shadow-card transition-all group-hover:border-white/20 group-hover:bg-surface-hover"
                >
                  <GithubIcon size={14} />
                </motion.div>
                <span>GitHub</span>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <motion.div 
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-surface-border shadow-card transition-all group-hover:border-accent/30 group-hover:text-accent group-hover:bg-accent/5"
                >
                  <LinkedinIcon size={14} />
                </motion.div>
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <Mouse size={20} className="text-muted-foreground opacity-70" />
            <ChevronDown size={16} className="text-muted-foreground opacity-50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Section ────────────────────────────────────────────────── */}
      <section aria-label="Quick stats" className="relative z-10 bg-surface/50 border-y border-surface-border backdrop-blur-md">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-surface-border lg:divide-y-0 -mx-5 sm:-mx-8 xl:-mx-10 border-x border-surface-border">
            {stats.map(({ label, value, icon: Icon, sub }) => (
              <StaggerItem key={label}>
                <div className="group flex flex-col p-6 sm:p-10 transition-colors hover:bg-surface-hover/50">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-surface-border shadow-sm group-hover:border-accent/30 group-hover:bg-accent/5 transition-all">
                    <Icon size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-3xl font-semibold tracking-tight text-foreground">{value}</span>
                    {sub && <span className="text-sm font-medium text-muted-foreground">{sub}</span>}
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">{label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────────── */}
      <section className="section-padding relative z-10 bg-background">
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
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated border border-surface-border shadow-sm">
                        <Code2 size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Repository"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-surface-border text-muted-foreground hover:bg-surface-hover hover:text-foreground hover:border-white/20 transition-all shadow-sm"
                          >
                            <GithubIcon size={14} />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Live Demo"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-surface-border text-muted-foreground hover:bg-surface-hover hover:text-foreground hover:border-white/20 transition-all shadow-sm"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                      {project.description}
                    </p>
                    
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
          
          <FadeIn className="mt-10 md:hidden flex justify-center">
            <Button href="/projects" variant="secondary" className="w-full sm:w-auto">
              View all projects
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────── */}
      <section className="section-padding-sm pt-0 relative z-10 bg-background">
        <div className="container-custom">
          <ScaleIn>
            <div className="card-glass relative overflow-hidden p-8 md:p-16 text-center shadow-modal">
              {/* Decorative glows */}
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-[80px] pointer-events-none" />
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/20 blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                <span className="eyebrow mb-4">Availability</span>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
                  Looking for my first engineering role.
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-xl">
                  Open to internships and junior positions starting early 2026. 
                  I bring a strong foundation in computer science and a passion for building great products.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button href="/contact" size="lg" className="w-full sm:w-auto group">
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
