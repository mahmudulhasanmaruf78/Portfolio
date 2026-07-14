'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, Download, Mail, Mouse, ChevronDown } from 'lucide-react'
import { FacebookIcon, GithubIcon, LinkedinIcon } from '@/components/ui/Icons'
import { profile } from '@/lib/data/profile'
import { SOCIAL_LINKS } from '@/lib/constants'

// ─── Typing Text Hook ───────────────────────────────────────────────────────
function useTypingEffect(words: string[], typingSpeed = 65, deletingSpeed = 35, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(words[0])
      return
    }

    const current = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseMs)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed)
      } else {
        setIsDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs, shouldReduceMotion])

  return displayed
}

// ─── Cursor Blink ───────────────────────────────────────────────────────────
function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      className="ml-0.5 inline-block w-[2px] h-[1em] align-middle bg-accent rounded-full"
      aria-hidden
    />
  )
}

// ─── Social Link ─────────────────────────────────────────────────────────────
function SocialLink({
  href,
  icon: Icon,
  label,
  hoverColor = 'hover:text-foreground',
}: {
  href: string
  icon: React.ElementType
  label: string
  hoverColor?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors ${hoverColor}`}
    >
      <motion.div
        whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        className="flex h-8 w-8 items-center justify-center rounded-lg glass transition-all group-hover:border-white/20 group-hover:shadow-glass-hover"
      >
        <Icon size={14} />
      </motion.div>
      <span>{label}</span>
    </a>
  )
}

// ─── CTA Button with glass hover ─────────────────────────────────────────────
function HeroCTA({
  href,
  children,
  primary = false,
  download,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
  download?: boolean
}) {
  const shouldReduceMotion = useReducedMotion()
  const base =
    'inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background'
  const primaryCls = `${base} bg-accent text-white shadow-[0_1px_2px_hsl(0_0%_0%/0.5),inset_0_1px_0_hsl(255_100%_100%/0.15)] hover:bg-accent-hover hover:shadow-[0_4px_20px_hsl(220_96%_62%/0.4)]`
  const secondaryCls = `${base} glass hover:shadow-glass-hover hover:border-white/20 hover:bg-white/[0.07]`

  const el = (
    <motion.span
      whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      className={primary ? primaryCls : secondaryCls}
    >
      {children}
    </motion.span>
  )

  if (download) {
    return (
      <a href={href} download>
        {el}
      </a>
    )
  }

  return <Link href={href}>{el}</Link>
}

// ─── Portrait with Float + Aurora Glow ──────────────────────────────────────
function FloatingPortrait() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Aurora glow layers behind portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 scale-110"
        style={{ filter: 'blur(40px)', zIndex: 0 }}
      >
        {/* green blob */}
        <div className="absolute top-[10%] left-[10%] w-3/4 h-3/4 rounded-full bg-[hsl(160_80%_40%/0.35)]" />
        {/* purple blob */}
        <div className="absolute bottom-[5%] right-[5%] w-1/2 h-1/2 rounded-full bg-[hsl(270_70%_55%/0.30)]" />
        {/* blue blob */}
        <div className="absolute top-[30%] right-[15%] w-2/5 h-2/5 rounded-full bg-[hsl(220_90%_58%/0.25)]" />
      </div>

      {/* Floating portrait */}
      <motion.div
        className="relative z-10"
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -14, 0],
                rotate: [0, 1.2, -0.8, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
        }}
      >
        {/* Outer ring — aurora gradient border */}
        <div
          className="relative rounded-full p-[3px]"
          style={{
            background:
              'conic-gradient(from 0deg, hsl(160 80% 40%), hsl(220 90% 58%), hsl(270 70% 55%), hsl(160 80% 40%))',
          }}
        >
          {/* Inner glass ring */}
          <div className="rounded-full p-1 bg-background/80 backdrop-blur-sm">
            {/* Portrait image */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden">
              <Image
                src="/og-image.png"
                alt="Portrait of Mahmudul Hasan Maruf"
                fill
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Availability badge — floats on top-right of portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4, ease: 'easeOut' }}
          className="absolute -bottom-2 -right-2 sm:bottom-0 sm:right-0 flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-[11px] font-semibold text-emerald-400 shadow-glass z-20"
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── HeroSection ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Scroll parallax on the content column
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - left) / width - 0.5) * 40)
    mouseY.set(((e.clientY - top) / height - 0.5) * 40)
  }

  // Typing effect
  const typedText = useTypingEffect(profile.roles)

  const staggerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
    },
  }

  return (
    <section
      ref={containerRef}
      aria-label="Introduction"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-20 pb-28 md:pb-32"
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--surface-border)/0.5) 1px, transparent 1px),
            linear-gradient(to right, hsl(var(--surface-border)/0.5) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
        }}
      />

      {/* Radial vignette — fades grid towards center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, hsl(var(--background)) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y, opacity: shouldReduceMotion ? 1 : opacity }}
        className="container-custom relative z-10"
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20 xl:gap-28">
          
          {/* ── Left column: text ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
            className="max-w-[680px]"
          >
            {/* Status pill */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2.5 rounded-full glass px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="flex h-5 items-center gap-1.5 rounded-full bg-emerald-500/15 px-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-semibold tracking-wide uppercase text-[10px]">
                    Available
                  </span>
                </span>
                Internships from August 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl xl:text-7xl leading-[1.05]">
                {/* Greeting */}
                <span className="block text-muted-foreground text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight mb-3">
                  Hi, I&apos;m {profile.name.split(' ')[0]}.
                </span>

                {/* Static line */}
                <span className="block mb-1">I build clean,</span>

                {/* Gradient accent line */}
                <span className="block text-gradient pr-2">modern web</span>
                <span className="block">experiences.</span>
              </h1>
            </motion.div>

            {/* Typing role text */}
            <motion.div variants={itemVariants} className="mt-7 flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Role:
              </span>
              <span
                className="text-sm font-semibold text-accent min-w-[14ch] tabular-nums"
                aria-live="polite"
                aria-label={`Current role: ${typedText}`}
              >
                {typedText}
                <BlinkingCursor />
              </span>
            </motion.div>

            {/* Bio / tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-[1.7]"
            >
              Final-Year CS&amp;E student at{' '}
              <strong className="text-foreground font-semibold">AIUB</strong>. Passionate
              about frontend architecture, responsive design, and writing code that{' '}
              <em className="not-italic text-foreground/80">scales</em>. Seeking
              internship and entry-level opportunities in Web Development.
            </motion.p>

            {/* Tech stack tags */}
            <motion.div variants={itemVariants} className="mt-7 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mr-1">
                Stack:
              </span>
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind'].map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md glass px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:shadow-glass-hover transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <HeroCTA href="/projects" primary>
                View Projects
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </HeroCTA>

              <HeroCTA href="/contact">
                <Mail size={15} />
                Contact Me
              </HeroCTA>

              <HeroCTA href="/Mahmudul Hasan Maruf  CV.pdf" download>
                <Download size={15} />
                Resume
              </HeroCTA>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="mt-10 flex items-center gap-5">
              <SocialLink href={SOCIAL_LINKS.github} icon={GithubIcon} label="GitHub" />
              <SocialLink
                href={SOCIAL_LINKS.linkedin}
                icon={LinkedinIcon}
                label="LinkedIn"
                hoverColor="hover:text-accent"
              />
              <SocialLink
                href={SOCIAL_LINKS.facebook}
                icon={FacebookIcon}
                label="Facebook"
                hoverColor="hover:text-accent"
              />
            </motion.div>
          </motion.div>

          {/* ── Right column: portrait ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ x: shouldReduceMotion ? 0 : smoothX, y: shouldReduceMotion ? 0 : smoothY }}
            className="hidden lg:flex items-center justify-center"
          >
            <FloatingPortrait />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-0.5"
        >
          <Mouse size={18} className="text-muted-foreground/50" />
          <ChevronDown size={14} className="text-muted-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
