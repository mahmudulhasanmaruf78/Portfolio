'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { FacebookIcon, GithubIcon, LinkedinIcon } from '@/components/ui/Icons'
import { SOCIAL_LINKS } from '@/lib/constants'
import { Section, SectionHeader } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/Animations'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { contactSchema, type ContactFormData } from '@/lib/contact'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setIsError(false)
    setErrorMessage('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { message?: string } | null
        throw new Error(result?.message ?? 'Failed to send message')
      }

      setIsSuccess(true)
      setIsError(false)
      setErrorMessage('')
      reset()
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error(error)
      setIsError(true)
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
      setTimeout(() => setIsError(false), 6000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Section className="pt-32 pb-0">
        <FadeIn>
          <SectionHeader
            eyebrow="Get in Touch"
            title="Let's build something."
            description="I'm currently looking for an internship or junior developer role. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
          />
        </FadeIn>
      </Section>

      <Section className="pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] max-w-5xl mx-auto">
          {/* Contact Info */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col h-full">
              <div className="card p-8 flex-1 bg-surface-elevated/30">
                <h3 className="text-lg font-semibold text-foreground mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface border border-surface-border text-accent">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Email</p>
                      <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
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
                      <p className="text-sm font-medium text-foreground mb-1">Socials</p>
                      <div className="flex items-center gap-4 mt-2">
                        <a
                          href={SOCIAL_LINKS.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                        >
                          <LinkedinIcon size={16} /> LinkedIn
                        </a>
                        <a
                          href={SOCIAL_LINKS.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <GithubIcon size={16} /> GitHub
                        </a>
                        <a
                          href={SOCIAL_LINKS.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                        >
                          <FacebookIcon size={16} /> Facebook
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-surface-border">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    Available — Internships from August 2026
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.2}>
            <div className="card p-8 md:p-10 shadow-modal relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 h-64 w-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
              
              <h3 className="text-xl font-semibold text-foreground mb-6 relative z-10">Send a message</h3>

              {/* aria-live region announces validation errors and status to screen readers */}
              <div aria-live="polite" aria-atomic="true" className="sr-only">
                {errors.name && <span>{errors.name.message}</span>}
                {errors.email && <span>{errors.email.message}</span>}
                {errors.message && <span>{errors.message.message}</span>}
                {isSuccess && <span>Your message was sent successfully!</span>}
                {isError && <span>{errorMessage}</span>}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input id="company" tabIndex={-1} autoComplete="off" {...register('company')} />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      {...register('name')}
                      placeholder="John Doe"
                      className={cn(
                        'input-base',
                        errors.name && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                      )}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                        <AlertCircle size={12} /> {errors.name.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="john@example.com"
                      className={cn(
                        'input-base',
                        errors.email && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                      )}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                        <AlertCircle size={12} /> {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    placeholder="Hi Mahmudul, I'd like to talk about..."
                    className={cn(
                      'input-base resize-none',
                      errors.message && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                    )}
                  />
                  {errors.message && (
                    <p className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                      <AlertCircle size={12} /> {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto min-w-[140px]"
                  loading={isSubmitting}
                >
                  {isSuccess ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={16} /> Sent!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send size={14} />
                    </span>
                  )}
                </Button>
                
                {isSuccess && (
                  <p className="text-sm font-medium text-emerald-400 mt-3 animate-in fade-in slide-in-from-bottom-2">
                    Thanks for reaching out! I'll get back to you soon.
                  </p>
                )}

                {isError && (
                  <div className="space-y-2 mt-3 animate-in fade-in slide-in-from-bottom-2">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-red-400">
                      <AlertCircle size={14} /> {errorMessage || 'Something went wrong. Please try again.'}
                    </p>
                    <a
                      href={`mailto:${SOCIAL_LINKS.email}`}
                      className="inline-flex text-sm font-medium text-accent hover:text-accent/80"
                    >
                      Email me directly at {SOCIAL_LINKS.email}
                    </a>
                  </div>
                )}
              </form>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
