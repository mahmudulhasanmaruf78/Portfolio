import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import { FacebookIcon, GithubIcon, LinkedinIcon } from '@/components/ui/Icons'
import { NAV_LINKS, SOCIAL_LINKS, SITE_META } from '@/lib/constants'
import { FadeIn } from '@/components/ui/Animations'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-surface-border bg-surface/30">
      <FadeIn direction="none" duration={0.8} delay={0.1}>
        <div className="container-custom py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand & Bio */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-surface border border-surface-border shadow-card">
                {SITE_META.name[0]}
              </div>
              <span>{SITE_META.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Final-year CS&E student building premium web applications. Passionate about interfaces, performance, and clean code.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-surface text-muted-foreground shadow-card transition-all hover:border-accent/40 hover:text-accent hover:bg-accent/10"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-surface text-muted-foreground shadow-card transition-all hover:border-accent/40 hover:text-accent hover:bg-accent/10"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`}
                aria-label="Email me"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-surface text-muted-foreground shadow-card transition-all hover:border-accent/40 hover:text-accent hover:bg-accent/10"
              >
                <Mail size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-surface text-muted-foreground shadow-card transition-all hover:border-accent/40 hover:text-accent hover:bg-accent/10"
              >
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Portfolio</h3>
              <ul className="space-y-3">
                {NAV_LINKS.slice(0, 4).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground hover-underline pb-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Details</h3>
              <ul className="space-y-3">
                {NAV_LINKS.slice(4).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground hover-underline pb-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Elsewhere</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    GitHub
                    <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 opacity-50 group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    LinkedIn
                    <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 opacity-50 group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Facebook
                    <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 opacity-50 group-hover:opacity-100" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Mahmudul Hasan Maruf. Built with Next.js & Tailwind.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500/20 items-center justify-center">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </FadeIn>
  </footer>
)
}
