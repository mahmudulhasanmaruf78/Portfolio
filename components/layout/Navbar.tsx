'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons'
import { NAV_LINKS } from '@/lib/constants'

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-background/70 backdrop-blur-md border-b border-surface-border shadow-sm'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <div className="container-custom flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group relative z-50 flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface border border-surface-border text-foreground transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent shadow-card group-hover:shadow-glow-sm">
              R
            </div>
            <span>Rafi Hassan</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-elevated/40 rounded-full px-2 py-1.5 border border-surface-border/50 backdrop-blur-sm shadow-inner-highlight">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'relative px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 rounded-full',
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 z-[-1] rounded-full bg-surface border border-surface-border shadow-card"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Right Actions / Mobile Toggle */}
          <div className="flex items-center gap-4 z-50">
            <Link
              href="/contact"
              className="hidden md:inline-flex h-8 items-center justify-center rounded-lg bg-foreground px-4 text-xs font-medium text-background transition-colors hover:bg-foreground/90 active:scale-95"
            >
              Hire Me
            </Link>

            <button
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border bg-surface text-foreground transition-colors hover:bg-surface-hover active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-background/90 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
              className="flex h-full flex-col justify-center px-8"
            >
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'text-2xl font-semibold tracking-tight transition-colors',
                          isActive ? 'text-accent' : 'text-foreground hover:text-muted-foreground',
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex flex-col gap-6"
              >
                <div className="h-px w-full bg-surface-border" />
                <div className="flex gap-4">
                  <a
                    href="https://github.com/rafihassan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-surface-border text-muted-foreground transition-colors hover:text-foreground hover:bg-surface-hover"
                  >
                    <GithubIcon size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/rafihassan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-surface-border text-muted-foreground transition-colors hover:text-foreground hover:bg-surface-hover"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
